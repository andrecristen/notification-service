const WebSocket = require('ws');

/**
 * Observador de WebSocket que lida com notificações enviadas via WebSocket.
 * @class
 */
class WebSocketObserver {

  /**
   * Cria uma instância do WebSocketObserver.
   * @constructor
   * @param {Object} config - Configuração para o observador de WebSocket.
   */
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

  /**
  * Envia uma notificação via WebSocket.
  * @param {string} message - Mensagem da notificação.
  * @returns {boolean} Retorna true se a notificação foi enviada com sucesso.
  */
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
