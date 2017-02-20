var express = require('express');
var moment = require('moment');
var router = express.Router();
var navItems = require('../config.json').navItems;

var db = require('../imports/database.js');
var authorizeUser = require('../imports/auth.js').authorizeUser;

/* POST checkout page for a destination */
router.post('/:id', authorizeUser(), function(req, res, next) {
    // maybe do some regex to verify here later
    let dates = req.body.daterange.split(" - ");

    let startRaw = moment(dates[0],"M/DD/YYYY"),
        endRaw = moment(dates[0],"M/DD/YYYY");
    let startDate = startRaw.format('MMM Do, Y'),
        endDate = endRaw.format('MMM Do, Y');

    db.getDest(req.params.id, function(err, result) {
        if (err) throw err;

        if (!result) {
            res.render('error', { message: 'Destination Not Found', error: {},
            navItems: navItems });
        } else {
            res.render('checkout', { dest: result, user: req.user, startDate: startDate,
                endDate: endDate, navItems: navItems });
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
