var express = require('express');
var r = require('rethinkdb');
var router = express.Router();
var navItems = require('../config.json').navItems;

var conn = require('../imports/database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('error', { message: 'No destination specified', error: { }, navItems: navItems, section: 'destinations' });
});

router.get('/:id', function(req, res, next) {
    // database logic later
    r.table('destinations').filter({section: req.params.id}).run(conn, function(err, result) {
        if (!err) {
            res.render('index', { title: result.title, navItems: navItems });
        }
    });
});

module.exports = router;
