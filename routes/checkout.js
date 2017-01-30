var express = require('express');
var router = express.Router();
var navItems = require('../config.json').navItems;

var db = require('../imports/database.js');
var authorizeUser = require('../imports/auth.js').authorizeUser;

/* GET sample checkout page. */
router.get('/', function(req, res, next) {
    db.getDests(function(err, cursor) {
        cursor.toArray(function(err, dests) {
            if (err) throw err;

            res.render('checkout', {navItems: navItems, section: 'checkout',
                dests: dests });
        });

    });
});

/* GET checkout page for a destination */
router.get('/:id', authorizeUser(), function(req, res, next) {
    db.getDest(req.params.id, function(err, result) {
        if (err) throw err;

        if (!result) {
            res.render('error', { message: 'Destination Not Found', error: {},
            navItems: navItems });
        } else {

            res.render('destination', { dest: result, navItems: navItems });
        }
    });
});


module.exports = router;
