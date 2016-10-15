var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    db = require('./database'),
    bcrypt = require('bcrypt');

function verifyPassword(pwd, hash) {
    console.log(pwd);
    console.log(hash);
    return bcrypt.compare(pwd, hash, function(err, res) {
        return res;
    });
}

passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password'
    },
    function(username, password, cb) {
        db.getUser(username, function(err, user) {
            console.log('user:' + user);
            if (err) return cb(err);
            if (!user) {
                return cb(null, false, {message: 'Incorrect username.'});
            }
            if (!verifyPassword(password, user.password))
                return cb(null, false, {message: 'Incorrect password.'});

            return done(null, user);
        });
    }
));
