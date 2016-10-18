var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    db = require('./database'),
    bcrypt = require('bcrypt');

function verifyPassword(pwd, hash) {
    let matches = false;
    matches = bcrypt.compareSync(pwd, hash, function(err, res) {
        if (err) throw err;
        return res;
    });

    return matches;
}

passport.use(new LocalStrategy({
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

passport.serializeUser(function(user,cb) {
    cb(null, user);
});
passport.deserializeUser(function(user,cb) {
    cb(null, user);
});
