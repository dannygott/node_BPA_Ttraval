var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt');
var db = require('../imports/database.js');

var navItems = require('../config.json').navItems;

router.get('/', function(req, res, next) {
    db.getDests(function(err, cursor) {
        if (err) throw err;

        cursor.toArray(function(err, result) {
            if (err) throw err;
            res.render('admin', {dests: result, navItems: navItems});
        });
    });
});

router.post('/login', passport.authenticate('local', { successRedirect: 'back',
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

    // check for password requirements (length, has number, has uppercase)
    if (password.length >= 6 && /\d/.test(password) && /[A-Z]/.test(password)) {
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
    } else {
        res.render('error', { message: 'Password requirements not met',
        description: 'A password must have: At least 6 characters, 1 number, and one uppercase letter'});
    }

});

module.exports = router;
