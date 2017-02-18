var express = require('express');
var router = express.Router();
var navItems = require('../config.json').navItems;

var db = require('../imports/database.js');
var authorizeUser = require('../imports/auth.js').authorizeUser;

function parseDate(str) {
    let parts = str.split('/');
    return new Date(parts[2], parts[0]-1, parts[1]);
}

/* POST checkout page for a destination */
router.post('/:id', authorizeUser(), function(req, res, next) {
    // maybe do some regex to verify here later
    let dates = req.body.daterange.split(" - ");
    let startDate = parseDate(dates[0]);
    let endDate = parseDate(dates[1]);

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
    let id = req.params.id,
        startDate = req.params.startDate,
        endDate = req.params.endDate,
        user = req.user;

    db.getDest(req.params.id, function(err, result) {
        if (err) throw err;

        if (!result) {
            res.render('error', { message: 'Destination does not exist', error: {},
            navItems: navItems });
        } else {
            db.bookTrip(user.id, id,startDate,endDate, function(err, res) {
                if (err) throw err;

                // redirect to a success page
            });
        }
    });
});


module.exports = router;
