'use strict';

const nodemailer = require('nodemailer');

module.exports = class EmailService {

    async sendWelcomeEmail(mail, firstName) {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: '"Nicolas Trenchs" <no-reply@yourservice.com>',
            to: mail,
            subject: 'Welcome to you',
            text: `Hello ${firstName},\nBienvenue\nWelcome\nBienvenido/a\nWillkommen\nBenvenuto/a\nBem-vindo/a\nWelkom\nVälkommen\nVelkommen\nVelkommen\nTervetuloa\nДобро пожаловать\n欢喜 (Huānyíng)\nようこそ (Yōkoso)\nأهلاً وسهلاً (Ahlan wa sahlan)`
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.messageId);
            console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
};
