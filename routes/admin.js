var express = require('express');
var router = express.Router();
var multer = require('multer');
var moment = require('moment');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: storage });

var db = require('../imports/database.js'),
    logReader = require('../imports/logReader.js');
    authorizeUser = require('../imports/auth.js').authorizeUser;

var navItems = require('../config.json').navItems;

// authenticate for the everything in /admin
router.use(authorizeUser('admin'));

/* GET home page. */
router.get('/', function(req, res, next) {
    db.getDests(function(err, cursor) {
        if (err) throw err;
        cursor.toArray(function(err, result) {
            if (err) throw err;
            var dests = result;
            db.getTrips(function(err, cursor) {
                if (err) throw err;
                cursor.toArray(function(err, result) {
                    var trips = result.map(function(x) {
                        x.timestamp = moment(x.timestamp).format('MMM Do, Y');
                        return x;
                    });
                    var logs = logReader.readLog();
                    res.render('admin', {dests: dests, trips: trips, user: req.user,
                        logs: logs, navItems: navItems});
                });
            });
        });
    });
});

//
// DESTINATIONS
//
router.post('/addDest', upload.single('image'), function(req, res) {
    let dest = req.body.dest,
        id = req.body.id.toLowerCase(),
        desc = req.body.desc,
        airport = req.body.airport.toUpperCase(),
        image = req.file.filename;

    db.addDest({ title: dest, id: id, airport: airport, description: desc, image: image },function(err, result) {
        if (err) throw err;

    });

    res.redirect('/admin');
});

router.post('/modDest/:id', upload.single('image'), function(req, res) {
    let updateObj = {};
    let id = req.params.id;

    if (req.body.airport) updateObj.airport = req.body.airport.toUpperCase();
    if (req.body.desc) updateObj.description = req.body.desc;
    if (req.body.dest) updateObj.title = req.body.dest;
    if (req.file) updateObj.image = req.file.filename;

    db.modDest(id, updateObj, function(err, result) {
        if (err) throw err;

        res.redirect('/admin');
    });
});

router.get('/delDest/:id', function(req, res) {
    let dest = req.params.id;

    db.delDest(dest);

    res.redirect('/admin');
});

//
// BOOKED TRIPS
//
router.get('/delTrip/:id', function(req, res) {
    let tripID = req.params.id;

    db.cancelTrip(tripID);

    res.redirect('/admin');
});

//
// LOGS
//
router.get('/delLogs', function(req, res) {
    logReader.deleteLog();

    res.redirect('/admin');
});

module.exports = router;
