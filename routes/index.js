var express = require('express');
var router = express.Router();

var navItems = require('../config.json').navItems;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', section: 'Home', navItems: navItems});
});

router.get('/thing', function(req, res, next) {
  res.render('index', { title: 'Thing', section: 'Something else', navItems: navItems});
});

module.exports = router;
