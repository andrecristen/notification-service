const nodemailer = require('nodemailer');

class EmailObserver {

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

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
