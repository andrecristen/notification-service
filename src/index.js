require('dotenv').config();
const connectRabbitMQ = require('./retryRabbitMQ');
const NotificationService = require('./services/NotificationService');
const EmailObserver = require('./observers/EmailObserver');
const WebSocketObserver = require('./observers/WebSocketObserver');

const notificationService = new NotificationService();
const webSocketObserver = new WebSocketObserver();
const emailObserver = new EmailObserver();

notificationService.addObserver(webSocketObserver);
notificationService.addObserver(emailObserver);

async function start() {
    try {
        const channel = await connectRabbitMQ();

        channel.consume('notifications', (msg) => {
            console.log("Nova mensagem na fila...");
            if (msg !== null) {
                try {
                    const content = msg.content.toString();
                    if (content) {
                        const message = JSON.parse(content);
                        notificationService.notify(message);
                    } else {
                        console.log("Mensagem fora do padrão: ", content);
                    }
                } catch (error) {
                    console.log("Erro na mensagem: ", error);
                } finally {
                    channel.ack(msg);
                }
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