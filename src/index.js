require('dotenv').config();
const connectRabbitMQ = require('./retryRabbitMQ');
const NotificationService = require('./services/NotificationService');
const EmailObserver = require('./observers/EmailObserver');
const WebSocketObserver = require('./observers/WebSocketObserver');

const notificationService = new NotificationService();
const emailObserver = new EmailObserver();
const webSocketObserver = new WebSocketObserver();

notificationService.addObserver(emailObserver);
notificationService.addObserver(webSocketObserver);

async function start() {
    try {
        const channel = await connectRabbitMQ();

        channel.consume('notifications', (msg) => {
            console.log("Nova mensagem: ", msg);
            if (msg !== null) {
                const message = JSON.parse(msg.content.toString());
                notificationService.notify(message);
                channel.ack(msg);
            }
        }, {
            noAck: false
        });

        console.log('Serviço de notificações está em execução...');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

start().catch(console.error);