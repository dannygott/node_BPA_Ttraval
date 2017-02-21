var passport = require('passport'),  // requirements
    LocalStrategy = require('passport-local').Strategy,
    db = require('./database'),
    bcrypt = require('bcrypt');

function verifyPassword(pwd, hash) { // varivies the password
    let matches = false;
    matches = bcrypt.compareSync(pwd, hash, function(err, res) {
        if (err) throw err;
        return res;
    });

    return matches;
}

passport.use(new LocalStrategy({ // defines where password and username fields are
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, cb) {
        db.getUser(username, function(err, user) {
            if (err) return cb(err);
            if (!user) {
                return cb(null, false, {message: 'Incorrect username.'});
            }

            if (!verifyPassword(password, user.password))
                return cb(null, false, {message: 'Incorrect password.'});

            return cb(null, user);
        });
    }
));

passport.serializeUser(function(user,cb) { // serializes user profile
    cb(null, user);
});
passport.deserializeUser(function(user,cb) {
    cb(null, user);
});

module.exports = {
    authorizeUser(group) { // defines a function for autherization on other pages
        return function(req, res, next) {
            if (!group && req.user) {
                next();
            } else if (group && req.user && req.user.group === group) {
                next();
            } else {
                res.render('error', { message: 'Unauthorized', error: {} });
            }
        }
    }
}
