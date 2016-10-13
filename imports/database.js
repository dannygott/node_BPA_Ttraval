var r = require('rethinkdb');

var conn = null;

r.connect({
    db: 'travel'
}, function(err, connection) {
    if (err) throw err;
    conn = connection;
    console.log("DB Connected!");

    r.dbCreate('travel').run(conn, function(err, result) {
        if (err) {
            console.log('Using existing travel DB');
        }
        else {
            console.log('Creating travel DB...');
        }
    });
    r.db('travel').tableCreate('destinations').run(conn, function(err, result) {
        if (err) {
            console.log('Using existing destinations table');
        } else {
            console.log('Creating destinations table...');
        }
    });
});

module.exports = {
    getDest(dest, cb) {
        r.table('destinations').get(dest).run(conn, cb);
    },
    getDests(cb) {
        r.table('destinations').run(conn, cb);
    },
    addDest(obj,cb) {
        r.table('destinations').insert(obj).run(conn, cb);
    }
}
