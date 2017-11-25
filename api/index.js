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
            subject: 'Sending Email using Node.js',
            text: '<h1>Welcome</h1><p>That was easy!</p>'
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

        slackClient.api('chat.postMessage', {
            token: slack.api_token,
            text: data.firstname + " " + data.lastname + ": \n" + data.subject + "\n" + data.msg,
            channel: '#contact_us',
        }, function(err, response){
            console.log(response);
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
        });
    }
};