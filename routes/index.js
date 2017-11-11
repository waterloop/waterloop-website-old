var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Waterloop' });
});

router.get('/flock', function(req, res, next) {
    res.render('flock', { title: 'Waterloop' });
});

module.exports = router;
