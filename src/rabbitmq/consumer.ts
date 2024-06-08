import amqp from "amqplib/callback_api";

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

			channel.consume(queue, async (msg) => {
				if (msg !== null) {
					console.log(msg);
					channel.ack(msg);
				}
			});
		});
	});
};

export { consumer };
