const nodemailer = require('nodemailer');

class EmailSender {
    constructor(to, subject, text) {
        this.mailOptions = {
            from: 'bierkastenzaehler@gmail.com',
            to: to,
            subject: subject,
            text: text
        };
    };

    setUp = () => {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.mailOptions.from,
                pass: 'vpfvqwtxqmdpjxio'
            }
        });
    };

    send = () => {
        this.transporter.sendMail(this.mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    };
}

module.exports = EmailSender;
