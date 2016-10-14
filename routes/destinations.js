var express = require('express');
var router = express.Router();
var navItems = require('../config.json').navItems;

var db = require('../imports/database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('destination', {navItems: navItems, section: 'destinations' });
});

router.get('/:id', function(req, res, next) {
    // database logic later
    db.getDest(req.params.id, function(err, result) {
        if (err) throw err;
        console.log("DEBUG");
        res.render('destination', { title: result.title, description: result.description, navItems: navItems });
    });
});

module.exports = router;
