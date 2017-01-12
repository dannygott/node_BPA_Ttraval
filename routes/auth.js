var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt');
var db = require('../imports/database.js');

var navItems = require('../config.json').navItems;

/* GET home page. */
router.get('/', function(req, res, next) {
    db.getDests(function(err, cursor) {
        if (err) throw err;

        cursor.toArray(function(err, result) {
            if (err) throw err;
            res.render('admin', {dests: result, navItems: navItems});
        });
    });
});

router.post('/login', passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/error'}
));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/register', function(req, res, next) {
    let username = req.body.username,
        password = req.body.password,
        airport = req.body.airport,
        passHash;

    db.getUser(username, function(err, result) {
        if (err) throw err;

        if (!result) {
            bcrypt.hash(password, 10, function(err, hash) {
                passHash = hash;
                db.createUser(username, hash, airport, function(err, res) {
                    if (err) throw err;
                });
            });
            res.redirect('/');
        } else {
            // user already exists
            res.render('error', { message: 'User Already Exists' });
        }
    });

});

module.exports = router;
