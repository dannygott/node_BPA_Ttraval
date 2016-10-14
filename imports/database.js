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
    r.tableCreate('destinations').run(conn, function(err, result) {
        if (err) {
            console.log('Using existing destinations table');
        } else {
            console.log('Creating destinations table...');
        }
    });
    r.tableCreate('users').run(conn, function(err, result) {
        if (err) {
            console.log('Using existing users table');
        } else {
            console.log('Creating users table...');
        }
    });
});

module.exports = {
// Destinations
    getDest(dest, cb) {
        r.table('destinations').get(dest).run(conn, cb);
    },
    getDests(cb) {
        r.table('destinations').run(conn, cb);
    },
    addDest(obj,cb) {
        r.table('destinations').insert(obj).run(conn, cb);
    },
    delDest(id) {
        r.table('destinations').get(id).delete().run(conn);
    },

// Users
    getUser(username, cb) {
        r.table('users').get(username).run(conn, cb);
    }
}
