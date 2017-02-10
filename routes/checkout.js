var express = require('express');
var router = express.Router();
var navItems = require('../config.json').navItems;

var db = require('../imports/database.js');
var authorizeUser = require('../imports/auth.js').authorizeUser;

/* GET checkout page for a destination */
router.get('/:id', authorizeUser(), function(req, res, next) {
    db.getDest(req.params.id, function(err, result) {
        if (err) throw err;

        if (!result) {
            res.render('error', { message: 'Destination Not Found', error: {},
            navItems: navItems });
        } else {

            res.render('checkout', { dest: result, user: req.user,
                navItems: navItems });
        }
    });
});

router.get('/confirm/:id', authorizeUser(), function(req, res, next) {
    let id = req.params.id;
});


module.exports = router;
