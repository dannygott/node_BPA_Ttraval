var express = require('express');
var router = express.Router();
var navItems = require('../config.json').navItems;

var db = require('../imports/database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var dests = [{image: "cancun.jpeg", caption: "young bool betta come hea"}, {image: "cancun.jpeg", caption: "young bool betta come hea"},{image: "cancun.jpeg", caption: "young bool betta come hea"}, {image: "cancun.jpeg", caption: "young bool betta come hea"}, {image: "cancun.jpeg", caption: "young bool betta come hea"}, {image: "cancun.jpeg", caption: "young bool betta come hea"}, {image: "cancun.jpeg", caption: "young bool betta come hea"}];

    res.render('destination', {navItems: navItems, section: 'destinations',
        dests: dests });
});

router.get('/:id', function(req, res, next) {
    // database logic later
    db.getDest(req.params.id, function(err, result) {
        if (err) throw err;

        if (!result) {
            res.render('error', { message: 'Destination Not Found', error: {},
            navItems: navItems });
        } else {

            res.render('destination', { title: result.title, description: result.description, navItems: navItems });
        }
    });
});

module.exports = router;
