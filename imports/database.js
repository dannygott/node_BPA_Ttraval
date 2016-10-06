var r = require('rethinkdb');

r.connect({
    db: 'travel'
}, function(err, conn) {
    if !err {
        module.exports = conn;
    } else {
        console.error(err);
    }
});
