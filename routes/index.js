var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Waterloop' });
});

router.get('/flock', function(req, res, next) {
    res.render('flock', { title: 'Waterloop – Flock' });
});

router.get('/media', function(req, res, next) {
    res.render('media', { title: 'Waterloop – Media' });
});

router.get('/sponsors', function(req, res, next) {
    res.render('sponsors', { title: 'Waterloop – Sponsors' });
});

router.get('/downloads', function(req, res, next) {
    res.render('downloads', { title: 'Waterloop – Downloads' });
});

router.get('/shop', function(req, res, next) {
    res.render('shop', { title: 'Waterloop – Shop' });
});

router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Waterloop – Contact' });
});

module.exports = router;
