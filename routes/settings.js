var express = require('express');
var router = express.Router();

var navItems = require('../config.json').navItems;
var authorizeUser = require('../imports/auth.js').authorizeUser;

/* GET home page. */
router.get('/', authorizeUser(), function(req, res, next) {
    res.render('settings', { navItems: navItems, user: req.user});
});

module.exports = router;
