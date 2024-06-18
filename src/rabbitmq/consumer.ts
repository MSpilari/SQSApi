import amqp from "amqplib/callback_api";
import { prismaClient } from "../db/prismaClient";
import { minioClient } from "../configs/minIOClient";
import { saveUpdateObject } from "../minioMethods/saveUpdateObject";
import { deleteObject } from "../minioMethods/deleteObject";

const rabbitmqUrl = process.env.RABBITMQ_URL;

const consumer = (exchange: string, queue: string) => {
	if (!rabbitmqUrl) throw new Error("RABBITMQ_URL env is missing.");

	amqp.connect(rabbitmqUrl, (error0, connection) => {
		if (error0) throw error0;

		connection.createChannel((error1, channel) => {
			if (error1) throw error1;

			channel.assertExchange(exchange, "direct", { durable: false });
			channel.assertQueue(queue, { durable: false });
			channel.bindQueue(queue, exchange, "catalog_update");

			console.log(
				` [*] Waiting for messages in ${queue}. To exit press CTRL+C`,
			);

			channel.consume(
				queue,
				async (msg: any) => {
					if (msg !== null) {
						const message = JSON.parse(msg.content.toString());
						const { userId, type } = message;

						const catalog = await prismaClient.user.findMany({
							where: { id: userId },
							select: {
								id: true,
								email: true,
								categories: {
									select: {
										id: true,
										title: true,
										description: true,
										products: {
											select: {
												id: true,
												title: true,
												description: true,
												price: true,
												categoryID: true,
												userId: true,
											},
										},
									},
								},
							},
						});

						const catalogJSON = JSON.stringify(catalog);

						// Armazenar JSON no MinIO
						const bucketName = "catalogos";
						const objectName = `${userId}-catalogo.json`;

						const bucketExists = await minioClient.bucketExists(bucketName);

						if (!bucketExists) await minioClient.makeBucket(bucketName, "");

						if (type === "ADD_OBJECT" || type === "UPDATE_OBJECT")
							await saveUpdateObject(bucketName, objectName, catalogJSON);

						if (type === "DELETE_OBJECT")
							await deleteObject(bucketName, objectName);

						channel.ack(msg);
					}
				},
				{ noAck: false },
			);
		});
	});
};

export { consumer };
