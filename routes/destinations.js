var express = require('express');
var router = express.Router();
var navItems = require('../config.json').navItems;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('error', { message: 'No destination specified', error: { }, navItems: navItems, section: 'destinations' });
});

router.get('/:id', function(req, res, next) {
    // database logic later
    res.render('index', { title: req.params.id, navItems: navItems });
});

module.exports = router;
