const express = require('express');
const router = express.Router();
const teamStructureJSON = require('./teamStructure.json');
const sponsorStructureJSON = require('./sponsorStructure.json');
const sender = require('../api/index');
const flockJSON = require('./flock.json');
const downloadsJSON = require('./downloads.json');

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Waterloop – Canada\'s Hyperloop',
        pageName: 'home',
        pageParams: {}
    });
});

router.get('/flock', function(req, res, next) {
    res.render('index', {
        title: 'Waterloop – Flock',
        pageName: 'flock',
        pageParams: {
          flock: flockJSON
        }
    });
});

// The geese (flock pages)
for(let i in flockJSON) {
    router.get('/flock/' + flockJSON[i].url, function(req, res, next) {
        res.render('index', {
            title: 'Waterloop – ' + flockJSON[i].name,
            pageName: 'goose',
            pageParams: {
              goose: flockJSON[i]
            }
        });
    });
}

router.get('/downloads/', function(req, res, next) {
    res.render('index', {
        title: 'Waterloop – Downloads',
        pageName: 'download',
        pageParams: {
          dl: {
              cur: 0,
              total: Math.ceil(downloadsJSON.length / 4),
              img: downloadsJSON.slice(0, Math.min(downloadsJSON.length, 4))
          }
        }
    });
});

for(let i = 0; i < downloadsJSON.length; i += 4) {
    router.get('/downloads/' + (i/4 + 1), function(req, res, next) {
        res.render('index', {
            title: 'Waterloop – Downloads page ' + (i/4 + 1),
            pageName: 'download',
            pageParams: {
              dl: {
                  cur: i/4,
                  total: Math.ceil(downloadsJSON.length / 4),
                  img: downloadsJSON.slice(i, Math.min(downloadsJSON.length, i+4))
              }
            }
        });
    });
}

router.get('/media', function(req, res, next) {
    var tweets = [];
    var instas = [];
    sender.getTweeterPosts(function(tweetList) {
        sender.getInstaPosts(function(instaList) {

            var instaSortedData = {
                video: [],
                image: []
            }
            instaList.data.forEach(element => {
                if(element.type === "image" || element.type === "carousel") {
                    instaSortedData["image"].push(element);
                } else {
                    instaSortedData["video"].push(element);                    
                }
            });

            res.render('index', {
                title: 'Waterloop – Media',
                pageName: 'media',
                pageParams: {
                    tweets: tweetList,
                    instas: instaSortedData
                }
            });
        });
    });
});

router.get('/hyperloop', function(req, res, next) {
    res.render('index', {
        title: 'Waterloop – Flock',
        pageName: 'hyperloop',
        pageParams: {
          flock: flockJSON
        }
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

/*
router.get('/downloads', function(req, res, next) {
    res.render('index', {
        title: 'Waterloop – Downloads',
        pageName: 'downloads',
        pageParams: {}
    });
});
*/

router.get('/shop', function(req, res, next) {
    res.render('index', {
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

router.get('*', function(req, res, next) {
    res.render('index', {
        title: 'Waterloop – Canada\'s Hyperloop',
        pageName: '404',
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
