import amqp from "amqplib/callback_api";

const { RABBITMQ_URL } = process.env;

const producer = (
	exchange: string,
	routingKey: string,
	type: string,
	data: any,
	userId: number,
) => {
	if (!RABBITMQ_URL) throw new Error("RABBITMQ_URL env is missing.");

	amqp.connect(RABBITMQ_URL, (error0, connection) => {
		if (error0) throw error0;

		connection.createChannel((error1, channel) => {
			if (error1) throw error1;

			const msg = JSON.stringify({
				type,
				data,
				userId,
			});

			channel.assertExchange(exchange, "direct", { durable: false });
			channel.publish(exchange, routingKey, Buffer.from(msg));
			console.log(`[x] Sent ${msg}`);
		});
	});
};

export { producer };
