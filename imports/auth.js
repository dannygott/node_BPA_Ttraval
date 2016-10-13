var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    db = require('./auth');

passport.use(new LocalStrategy(
    function(username, password, cb) {
        db.getUser(username, function(err, user) {
            if (err) return cb(err);
            if (!user) return cb(null, false, {message: 'Incorrect username.'});
            if (!user.validatePassword(password))
                return cb(null, false, {message: 'Incorrect password.'});

            return(null, user);
        });
    }
));
