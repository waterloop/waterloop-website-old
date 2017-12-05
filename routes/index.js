const express = require('express');
const router = express.Router();
const teamStructureJSON = require('./teamStructure.json');
const sponsorStructureJSON = require('./sponsorStructure.json');
const sender = require('../api/index');
const flockJSON = require('./flock.json');

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
        pageParams: {
          flock: flockJSON
        }
    });
});

// The geese (flock pages)
for(var i in flockJSON) {
    var a = flockJSON[i];
    router.get('/flock/' + a.url, function(req, res, next) {
        res.render('index', {
            title: 'Waterloop – ' + a.name,
            pageName: 'goose',
            pageParams: {
              goose: a
            }
        });
    });
}

router.get('/media', function(req, res, next) {
    var tweets = [];
    var instas = [];
    sender.getTweeterPosts(function(tweetList){
        sender.getInstaPosts(function(instaList){
            console.log(tweetList);
            console.log(instaList.data.length);
            res.render('index', {
                title: 'Waterloop – Media',
                pageName: 'media',
                pageParams: {
                    tweets: tweetList,
                    instas: instaList.data
                }
            });
        });
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
    res.render('index', {
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
    res.render('index', {
        title: 'Waterloop – Contact',
        pageName: 'contact',
        pageParams: {}
    });
});

router.post('/api/submitEmailForm', (req, res) => {
    console.log(`[200] ${req.method} ${req.url}`);

    sender.sendEmail(req.query, (result) => {
        if (result) {
            res.status(200).json({"message": "Email sent successfully"});
        } else {
            res.status(500).json({"message": "Error when sending email"});
        }
    });

});

router.post('/api/submitSlackForm', (req, res) => {
    console.log(`[200] ${req.method} ${req.url}`);

    sender.sendSlack(req.query, (result) => {
        if (result) {
            res.status(200).json({"message": "Slack sent successfully"});
        } else {
            res.status(500).json({"message": "Error when sending message"});
        }
    });
});

module.exports = router;

