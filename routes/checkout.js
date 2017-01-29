var express = require('express');
var router = express.Router();
var navItems = require('../config.json').navItems;

var db = require('../imports/database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    db.getDests(function(err, cursor) {
        cursor.toArray(function(err, dests) {
            if (err) throw err;

            res.render('checkout', {navItems: navItems, section: 'checkout',
                dests: dests });
        });

    });
});


module.exports = router;
