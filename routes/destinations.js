var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('error', { message: 'No destination specified', error: { } });
});

router.get('/:id', function(req, res, next) {
    // database logic later
    res.render('index', { title: req.params.id });
});

module.exports = router;
