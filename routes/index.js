const express = require('express');
const router = express.Router();
const teamStructureJSON = require('./teamStructure.json');
const sponsorStructureJSON = require('./sponsorStructure.json');
const sender = require('../api/index');

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Waterloop',
        pageName: 'home',
        pageParams: {}
    });
});

router.get('/flock', function(req, res, next) {
    res.render('index', {
        title: 'Waterloop - Flock',
        pageName: 'flock',
        pageParams: {}
    });
});

router.get('/media', function(req, res, next) {
    res.render('media', {
        title: 'Waterloop – Media',
        pageName: 'media',
        pageParams: {}
    });
});

router.get('/team', function(req, res, next) {
    res.render('index', {
        title: 'Waterloop – Team',
        pageName: 'team',
        pageParams: {
            teamStructure: teamStructureJSON
        }
    });
});

router.get('/sponsors', function(req, res, next) {
    res.render('index', {
        title: 'Waterloop – Sponsors',
        pageName: 'sponsors',
        pageParams: {
            sponsors: sponsorStructureJSON.sponsors
        }
    });
});

router.get('/downloads', function(req, res, next) {
    res.render('downloads', {
        title: 'Waterloop – Downloads',
        pageName: 'downloads',
        pageParams: {}
    });
});

router.get('/shop', function(req, res, next) {
    res.render('shop', {
        title: 'Waterloop – Shop',
        pageName: 'shop',
        pageParams: {}
    });
});

router.get('/contact', function(req, res, next) {
    res.render('contact', {
        title: 'Waterloop – Contact',
        pageName: 'contact',
        pageParams: {}
    });
});

router.post('/api/submitEmailForm', (req, res) => {
    console.log(`[200] ${req.method} ${req.url}`);
    const data = req.query;

    sender.sendEmail({
        to: data.email,
        subject: data.subject,
        html: data.msg,
    }, (result) => {
        if (result) {
            res.status(200).json({"message": "Email sent successfully"});
        } else {
            res.status(500).json({"message": "Error when sending email"});
        }
    });

});

router.post('/api/submitSlackForm', (req, res) => {
    console.log(`[200] ${req.method} ${req.url}`);
    const data = req.query;
    console.log(data);
    sender.sendSlack({
        to: data.email,
        subject: data.subject,
        html: data.msg,
    }, (result) => {
        if (result) {
            res.status(200).json({"message": "Slack sent successfully"});
        } else {
            res.status(500).json({"message": "Error when sending message"});
        }
    });
});

module.exports = router;
