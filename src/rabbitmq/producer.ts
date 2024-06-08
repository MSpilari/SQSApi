import amqp from "amqplib/callback_api";

const rabbitmqUrl = process.env.RABBITMQ_URL;

const producer = (
	exchange: string,
	type: string,
	data: any,
	userId: number,
) => {
	if (!rabbitmqUrl) throw new Error("RABBITMQ_URL env is missing.");

	amqp.connect(rabbitmqUrl, (error0, connection) => {
		if (error0) throw error0;

		connection.createChannel((error1, channel) => {
			if (error1) throw error1;

			const msg = JSON.stringify({
				type,
				data,
				userId,
			});

			channel.assertExchange(exchange, "direct", { durable: false });
			channel.publish(exchange, exchange, Buffer.from(msg));
			console.log(`[x] Sent ${msg}`);
		});
	});
};

export { producer };
