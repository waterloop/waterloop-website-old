const nodemailer = require('nodemailer');
const slackmailer = require('slack-node');
const secret = require('../secret/index.json');
const email = secret.email_account;
const slack = secret.slack_account;

module.exports = {
    sendEmail: function (data, callback) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: email.username,
                pass: email.password
            }
        });

        const mailOptions = {
            from: email.username,
            to: 'nikolaevra@hotmail.com',
            subject: `Contact us request: ${data.subject}`,
            text: `Incoming contact us request:\nName: ${data.firstname} ${data.lastname}\nEmail: ${data.email}\nSubject: ${data.subject}\nMessage: ${data.msg}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                callback(false);
            } else {
                console.log('Email sent: ' + info.response);
                callback(true);
            }
        });
    },

    sendSlack: function (data, callback) {
        let slackClient = new slackmailer(slack.api_token);
        console.log(data.firstname);

       slackClient.api('chat.postMessage', {
            token: slack.api_token,
            text: `*Incoming contact us request:*\n*Name:* \`${data.firstname} ${data.lastname}\`\n*Email:* \`${data.email}\`\n*Subject:* ${data.subject}\n*Message:* ${data.msg}`,
            channel: '#contact_us',
        }, function(err, response){
            //console.log(response);
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
        });
    }
};