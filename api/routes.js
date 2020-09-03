var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Puzzle API'});
});

router.route("/puzzle/:key")
    .post(function(req, res) {

    	console.log(req.params.key)
        res.json(req.params.key);
    });

module.exports = router;
