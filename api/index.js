const nodemailer = require("nodemailer");
const Instagram = require("node-instagram").default;
const slackmailer = require("slack-node");
const twitter = require("twitter");
const medium = require("medium-get-latest-posts");
const GoogleSpreadsheet = require("google-spreadsheet");

const secret = require("../secret/index.json");

const email = secret.email_account;
const slack = secret.slack_account;
const medium_username = secret.medium_account.username;

module.exports = {
  sendEmail: function (data, callback) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email.username,
        pass: email.password
      }
    });

    const mailOptions = {
      from: email.username,
      to: "nikolaevra@hotmail.com",
      subject: `Contact us request: ${data.subject}`,
      text: `Incoming contact us request:\nName: ${data.firstname} ${data.lastname}\nEmail: ${data.email}\nSubject: ${data.subject}\nMessage: ${data.msg}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        callback(false);
      } else {
        console.log("Email sent: " + info.response);
        callback(true);
      }
    });
  },

  sendSlack: function (data, callback) {
    let slackClient = new slackmailer(slack.api_token);

    slackClient.api("chat.postMessage", {
      token: slack.api_token,
      text: `*Incoming contact us request:*\n*Name:* \`${data["entry.204801274"]}\`\n*Email:* \`${data["entry.79140437"]}\`\n*Message:* ${data["entry.59625375"]}`,
      channel: "#contact_us",
    }, function(err, response) {

      if (err) {
        callback(false);
      } else {
        const google_creds = secret.google_creds;
        const doc = new GoogleSpreadsheet("1JGe07rwKV9SRbTr2tGs9wLouq4BWECFbNOEwO0a483k");

        doc.useServiceAccountAuth(google_creds, (err) => {

          doc.addRow(1, {
            email: data["entry.79140437"],
            first_name: data["entry.204801274"],
            message: data["entry.59625375"]
          }, function(err) {
            if (err) {
              callback(false);
            } else {
              callback(true);
            }
          });
        });
      }
    });
  },

  getInstaPosts: function (callback) {
    const instagram = new Instagram({
      clientId: secret.insta_account.client_id,
      clientSecret: secret.insta_account.client_id,
      accessToken: secret.insta_account.access_token
    });

    instagram.get("users/self/media/recent", (err, data) => {
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

    let params = {screen_name: "team_waterloop"};

    twitterClient.get("statuses/user_timeline", params, function(error, tweets, response) {
      if (!error) {
        callback(tweets);
      } else {
        callback(response);
      }
    });
  },

  getMediumPosts: function (callback) {
    medium.getPublisherLatestPosts(medium_username).then((data) => {
      console.log(data);
      callback(data);
    }).catch((err) => {
      console.log(err);
      callback(err);
    });
  },
};