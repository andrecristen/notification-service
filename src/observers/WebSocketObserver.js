const WebSocket = require('ws');

class WebSocketObserver {
  constructor() {
    this.wss = new WebSocket.Server({ port: process.env.WEBSOCKET_PORT });
    this.clients = new Set();

    this.wss.on('connection', (ws) => {
      this.clients.add(ws);
      ws.on('close', () => {
        this.clients.delete(ws);
      });
    });
  }

  update(message) {
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    }
  }
}

module.exports = WebSocketObserver;