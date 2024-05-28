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

  async update(message) {
    if (this.clients.size > 0) {
      for (const client of this.clients) {
        if (client.readyState === WebSocket.OPEN) {
          await client.send(JSON.stringify(message));
          return true;
        }
      }
    } else {
      console.log("Nenhuma conexão de WebSocket ativa.");
      return false;
    }
  }
}

module.exports = WebSocketObserver;
