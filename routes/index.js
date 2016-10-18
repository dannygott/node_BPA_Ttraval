var express = require('express');
var router = express.Router();

var navItems = require('../config.json').navItems;

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('req.user: ' + JSON.stringify(req.user));
    res.render('index', { title: 'Express', section: 'home', navItems: navItems, user: req.user});
});

module.exports = router;
