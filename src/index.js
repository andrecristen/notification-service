require('dotenv').config();
const connectRabbitMQ = require('./rabbitmq');
const NotificationService = require('./services/NotificationService');
const EmailObserver = require('./observers/EmailObserver');
const WebSocketObserver = require('./observers/WebSocketObserver');

const notificationService = new NotificationService();
const emailObserver = new EmailObserver();
const webSocketObserver = new WebSocketObserver();

notificationService.addObserver(emailObserver);
notificationService.addObserver(webSocketObserver);

async function start() {
    const channel = await connectRabbitMQ();

    channel.consume('notifications', (msg) => {
        if (msg !== null) {
            const message = JSON.parse(msg.content.toString());
            notificationService.notify(message);
            channel.ack(msg);
        }
    }, {
        noAck: false
    });

    console.log('Notification service is running...');
}

start().catch(console.error);