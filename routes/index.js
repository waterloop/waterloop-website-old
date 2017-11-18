var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', { 
        title: 'Waterloop',
        pageName: 'home'
    });
});

router.get('/flock', function(req, res, next) {
    res.render('index', {
        title: 'Waterloop - Flock',
        pageName: 'flock'
    });
});

router.get('/media', function(req, res, next) {
    res.render('media', { 
        title: 'Waterloop – Media',
        pageName: 'media'
    });
});

router.get('/team', function(req, res, next) {
    res.render('index', { 
        title: 'Waterloop – Team', 
        pageName: 'team'
    });
});

router.get('/sponsors', function(req, res, next) {
    res.render('sponsors', { 
        title: 'Waterloop – Sponsors',
        pageName: 'sponsors'
    });
});

router.get('/downloads', function(req, res, next) {
    res.render('downloads', { 
        title: 'Waterloop – Downloads',
        pageName: 'downloads'
    });
});

router.get('/shop', function(req, res, next) {
    res.render('shop', { 
        title: 'Waterloop – Shop', 
        pageName: 'shop'
    });
});

router.get('/contact', function(req, res, next) {
    res.render('contact', { 
        title: 'Waterloop – Contact', 
        pageName: 'contact'
    });
});

module.exports = router;
