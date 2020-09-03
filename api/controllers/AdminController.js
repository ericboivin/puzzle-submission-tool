var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Admin = require('../models/Admin');
var Team = require('../models/Team');

router.post('/login', function (req, res) {
    Admin.findOne({pd: req.body.password, nm: req.body.adminName}, function (err, admin){
        if (err) return res.status(500).send("Problem encountered while returning the answer");
        if (!admin) return res.status(404).send("Wrong answer");
        res.status(200).send(admin);
    });
});

router.post('/team', function (req, res) {
  keygen = uuidv4()
  Team.create({
      name : req.body.teamName,
      key : keygen
  },
  function (err, team) {
      if (err) return res.status(500).send("Problem encountered while saving the new team");
      return res.status(200).send(team);
  });
});

router.get('/team', function (req, res) {
  Team.find({}, function (err, teams) {
      if (err) return res.status(500).send("Problem encountered while retrieving teams");
      return res.status(200).send(teams);
  });
});


module.exports = router;

function uuidv4() {
  return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

console.log(uuidv4());
