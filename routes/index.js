var express = require('express');
var router = express.Router();

var navItems = require('../config.json').navItems;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('destination', { title: 'Express', section: 'Home', navItems: navItems});
});

module.exports = router;
