var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Waterloop' });
});

router.get('/flock', function(req, res, next) {
    res.render('flock', { title: 'Waterloop' });
});

router.get('/media', function(req, res, next) {
    res.render('media', { title: 'Waterloop' });
});

router.get('/sponsors', function(req, res, next) {
    res.render('sponsors', { title: 'Waterloop' });
});

router.get('/downloads', function(req, res, next) {
    res.render('downloads', { title: 'Waterloop' });
});

router.get('/shop', function(req, res, next) {
    res.render('shop', { title: 'Waterloop' });
});

router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Waterloop' });
});

module.exports = router;
