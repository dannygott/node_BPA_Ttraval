var express = require('express');
var router = express.Router();
var navItems = require('../config.json').navItems;

var db = require('../imports/database.js');
var authorizeUser = require('../imports/auth.js').authorizeUser;

/* GET sample destselect page. */
router.get('/', function(req, res, next) {
    db.getDests(function(err, cursor) {
        cursor.toArray(function(err, dests) {
            if (err) throw err;

            res.render('destselect', {navItems: navItems, user: req.user,
                section: 'destselect', dests: dests });
        });

    });
});

/* GET destselect page for a destination */
router.get('/:id', authorizeUser(), function(req, res, next) {
    db.getDest(req.params.id, function(err, result) {
        if (err) throw err;

        if (!result) {
            res.render('error', { message: 'Destination Not Found', error: {},
            navItems: navItems });
        } else {

            res.render('destselect', { dest: result, user: req.user,
                navItems: navItems });
        }
    });
});


module.exports = router;
