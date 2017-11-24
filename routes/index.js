var express = require('express');
var router = express.Router();
var teamStructureJSON = require('./teamStructure.json');
var sponsorStructureJSON = require('./sponsorStructure.json');


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

module.exports = router;
