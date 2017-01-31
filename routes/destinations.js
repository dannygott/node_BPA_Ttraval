var express = require('express');
var router = express.Router();
var navItems = require('../config.json').navItems;

var db = require('../imports/database.js');

/* GET destinations listing. */
router.get('/', function(req, res, next) {
    db.getDests(function(err, cursor) {
        cursor.toArray(function(err, dests) {
            if (err) throw err;

            res.render('destinations', {navItems: navItems, section: 'destinations',
                user: req.user, dests: dests });
        });

    });
});

/* GET a single destination */
router.get('/:id', function(req, res, next) {
    db.getDest(req.params.id, function(err, result) {
        if (err) throw err;

        if (!result) {
            res.render('error', { message: 'Destination Not Found', error: {},
            navItems: navItems });
        } else {

            res.render('destination', { dest: result, user: req.user,
                navItems: navItems });
        }
    });
});

module.exports = router;
