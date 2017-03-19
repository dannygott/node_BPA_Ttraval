var r = require('rethinkdb');
var fs = require('fs');
var winston = require('winston');
var conn = null;

var winston = new(winston.Logger)({ // winston for logging
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({
            filename: 'DBlog.log'
        })
    ]
});


var dbConfig = require('../config.json').dbConfig;

r.connect(dbConfig, function(err, connection) { // connects to the rethikdb database
    if (err) winston.error(err);
    conn = connection;
    winston.info("DB Connected!");

    r.dbCreate('travel').run(conn, function(err, result) {   // creates tables if need be. If not uses existing tables
        if (err) {
            winston.info('Using existing travel DB');
        }
        else {
            winston.info('Creating travel DB...');
        }
    });
    r.tableCreate('destinations').run(conn, function(err, result) {
        if (err) {
            winston.info('Using existing destinations table');
        } else {
            winston.info('Creating destinations table...');
        }
    });
    r.tableCreate('users').run(conn, function(err, result) {
        if (err) {
            winston.info('Using existing users table');
        } else {
            winston.info('Creating users table...');
        }
    });
    r.tableCreate('bookedTrips').run(conn, function(err, result) {
        if (err) {
            winston.info('Using existing bookedTrips table');
        } else {
            winston.info('Creating bookedTrips table...');
        }
    });
});

module.exports = { // defines fuctions for use on other pages ( self explanitory )
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
    modDest(id,obj,cb) {
        r.table('destinations').get(id).update(obj).run(conn,cb);
    },
    delDest(id) {
        this.getDest(id, function(err, res) {
            fs.unlinkSync('public/img/' + res.image);
            r.table('destinations').get(id).delete().run(conn);
        });
    },

// Trips
    bookTrip(userID, destID, startDate, endDate, cb) {
        r.table('bookedTrips').insert({
            timestamp: Date.now(),
            userID: userID,
            destID: destID,
            startDate: startDate,
            endDate: endDate
        }).run(conn,cb);
    },
    getTrips(cb) {
        // Move the trip id to be called tripID and merge table
        r.table('bookedTrips').eqJoin('destID', r.table('destinations'))
            .without({"right": {"id": true}})
            .zip().orderBy(r.desc('timestamp')).run(conn,cb);
    },
    cancelTrip(id) {
        r.table('bookedTrips').get(id).delete().run(conn);
    },

// Users
    getUser(username, cb) {
        r.table('users').get(username).run(conn, cb);
    },
    createUser(user, pass, airport, cb) {
        r.table('users').insert({
            id: user,
            password: pass,
            airport: airport,
            group: 'user'
        }).run(conn, cb);
    }
}
