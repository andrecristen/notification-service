const amqp = require('amqplib');

async function connectRabbitMQ(retries = 5) {
    const retryDelay = 15000; // 15 segundos de espera entre as tentativas
    while (retries > 0) {
        try {
            console.log(`RabbitMQ URL: ${process.env.RABBITMQ_URL}`);
            const connection = await amqp.connect(process.env.RABBITMQ_URL);
            const channel = await connection.createChannel();
            await channel.assertQueue('notifications');
            console.log('Conexão com RabbitMQ estabelecida com sucesso.');
            return channel;
        } catch (error) {
            console.error(`Falha ao conectar com RabbitMQ: ${error.message}. Tentativas restantes: ${retries - 1}`);
            retries -= 1;
            await new Promise(res => setTimeout(res, retryDelay));
        }
    }
    throw new Error('Falha ao conectar com RabbitMQ após várias tentativas.');
}

module.exports = connectRabbitMQ;