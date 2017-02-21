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
            req.user.checkout = {
                destID: req.params.id,
                startDate: startRaw.toDate(),
                endDate: endRaw.toDate()
            };
            console.log("MEME!");
        }
    });
});

/* GET after done with checkout */
router.get('/confirm', authorizeUser(), function(req, res, next) {
    if (req.user.checkout) {
        let startDate = req.user.checkout.startDate,
            endDate = req.user.checkout.endDate,
            user = req.user,
            destID = req.user.checkout.destID;

        db.bookTrip(user.id,destID,startDate,endDate,function(err,res) {
            if (err) throw err;
        });

    } else {
        res.redirect('/error');
    }

});


module.exports = router;
