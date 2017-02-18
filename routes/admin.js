var express = require('express');
var router = express.Router();
var multer = require('multer');

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
    if (req.body.desc) updateObj.desc = req.body.desc;
    if (req.body.dest) updateObj.dest = req.body.dest;
    if (req.file) updateObj.image = req.file.filename;

    console.log(updateObj);

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

module.exports = router;
