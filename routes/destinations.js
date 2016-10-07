var express = require('express');
var router = express.Router();
var navItems = require('../config.json').navItems;

var db = require('../imports/database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('error', { message: 'No destination specified', error: { }, navItems: navItems, section: 'destinations' });
});

router.get('/:id', function(req, res, next) {
    // database logic later
    db.getDest(req.params.id, function(err, result) {
        console.log(result);
        if (!err) {
            res.render('index', { title: result.title, navItems: navItems });
        } else {
            console.error(err);
        }
    });
});

module.exports = router;
