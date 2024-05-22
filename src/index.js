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
            console.log("Nova mensagem na fila: ", msg);
            if (msg !== null) {
                try {
                    const content = msg.content.toString();
                    if (content) {
                        console.log("Conteúdo da mensagem: ", content);
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