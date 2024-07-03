const nodemailer = require('nodemailer');

/**
 * Observador de email que lida com notificações enviadas por email.
 * @class
 */
class EmailObserver {

  /**
   * Cria uma instância do EmailObserver.
   * @constructor
   * @param {Object} config - Configuração para o observador de email.
   */
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  /**
   * Envia uma notificação por email.
   * @param {string} message - Mensagem da notificação.
   * @returns {boolean} Retorna true se o email foi enviado com sucesso.
   */
  async update(message) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: message.email,
      subject: 'Planilha Processada',
      text: `Sua planilha foi processada com sucesso. Detalhes: ${message.details}`
    };
    await this.transporter.sendMail(mailOptions);
    return true;
  }
}

module.exports = EmailObserver;
