const nodemailer = require('nodemailer');

class EmailObserver {

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  update(message) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: message.email,
      subject: 'Planilha Processada',
      text: `Sua planilha foi processada com sucesso. Detalhes: ${message.details}`
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email enviado: ' + info.response);
    });
  }
}

module.exports = EmailObserver;
