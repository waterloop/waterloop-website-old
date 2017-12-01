const nodemailer = require('nodemailer');
const Instagram = require('node-instagram').default;
const slackmailer = require('slack-node');
const twitter = require('twitter');
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
    },

    getInstaPosts: function (callback) {
        const instagram = new Instagram({
            clientId: secret.insta_account.client_id,
            clientSecret: secret.insta_account.client_id,
            accessToken: secret.insta_account.access_token,
        });

        instagram.get('users/self/media/recent', (err, data) => {
            if (err) {
                callback(err);
            } else {
                callback(data);
            }
        });
    },

    getTweeterPosts: function (callback) {
        const twitterClient = new twitter({
            consumer_key: secret.twitter_account.consumer_key,
            consumer_secret: secret.twitter_account.consumer_secret,
            access_token_key: secret.twitter_account.access_token_key,
            access_token_secret: secret.twitter_account.access_token_secret
        });

        let params = {screen_name: 'team_waterloop'};

        twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                callback(tweets);
            } else {
                callback(response);
            }
        });
    }
};