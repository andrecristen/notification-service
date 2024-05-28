require('dotenv').config({ path: '././.env.test' });
const WebSocket = require('ws');
const NotificationService = require('./NotificationService');
const EmailObserver = require('../observers/EmailObserver');
const WebSocketObserver = require('../observers/WebSocketObserver');

describe('NotificationService', () => {
    let service;
    let emailObserver;
    let webSocketObserver;
    let client;

    const message = {
        "email": "andre.cristen.dev@gmail.com",
        "details": "TESTE PROCESSADO",
        "user": 1
    };

    beforeEach((done) => {
        service = new NotificationService();
        emailObserver = new EmailObserver();
        webSocketObserver = new WebSocketObserver();

        // Iniciar cliente WebSocket
        client = new WebSocket(`ws://localhost:${process.env.WEBSOCKET_PORT}`);
        client.on('open', done);
    });

    afterEach(() => {
        client.close();
        webSocketObserver.wss.close();
    });

    test('Adicionar Observers', () => {
        service.addObserver(emailObserver);
        service.addObserver(webSocketObserver);
        expect(service.observers).toContain(emailObserver);
        expect(service.observers).toContain(webSocketObserver);
    });

    test('Notificar E-mail', async () => {
        service.addObserver(emailObserver);
        const result = await service.notify(message);
        expect(result).toBe(true);
    });

    test('Notificar WebSocket', async () => {
        service.addObserver(webSocketObserver);
        client.on('message', (data) => {
            const receivedMessage = JSON.parse(data);
            expect(receivedMessage).toEqual(message);
        });
        const result = await service.notify(message);
        expect(result).toBe(true);
    });

    test('Notificar Todos Tipos', async () => {
        service.addObserver(emailObserver);
        service.addObserver(webSocketObserver);
        const result = await service.notify(message);
        expect(result).toBe(true);
    });

});
