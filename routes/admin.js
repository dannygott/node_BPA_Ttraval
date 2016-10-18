var express = require('express');
var router = express.Router();

var db = require('../imports/database.js'),
    authorizeUser = require('../imports/auth.js').authorizeUser;

var navItems = require('../config.json').navItems;

/* GET home page. */
router.get('/', authorizeUser('admin'), function(req, res, next) {
    db.getDests(function(err, cursor) {
        if (err) throw err;

        cursor.toArray(function(err, result) {
            if (err) throw err;
            res.render('admin', {dests: result, navItems: navItems});
        });
    });
});

router.post('/addDest', function(req, res) {
    let dest = req.body.dest,
        id = req.body.id,
        desc = req.body.desc,
        image = req.body.image;

    db.addDest({ title: dest, id: id, description: desc, image: image },function(err, result) {
        if (err) throw err;

    });

    res.redirect('/admin');
});

router.get('/delDest/:id', function(req, res) {
    let dest = req.params.id;

    db.delDest(dest);

    res.redirect('/admin');
});

module.exports = router;
