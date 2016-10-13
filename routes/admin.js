var express = require('express');
var router = express.Router();

var db = require('../imports/database.js');

var navItems = require('../config.json').navItems;

/* GET home page. */
router.get('/', function(req, res, next) {
    db.getDests(function(err, cursor) {
        if (err) throw err;

        cursor.toArray(function(err, result) {
            if (err) throw err;
            res.render('admin', {dests: result, navItems: navItems});
        });
    });
});

module.exports = router;
