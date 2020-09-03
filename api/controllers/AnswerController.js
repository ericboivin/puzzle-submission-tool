var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Answer = require('../models/Answer');
var Team = require('../models/Team');

router.post('/', function (req, res) {
  console.log(req.body.key, req.body.id)
  Team.findOne({key: req.body.id}, function (err, team){
      if (err) return res.status(500).send("Problem encountered while finding the team");
      if (team) {
        Answer.findOne({key: req.body.key.toUpperCase()}, function (err, answer){
            if (err) return res.status(500).send("Problem encountered while returning the answer");
            if (answer) {
              if(team.completedQuestions.indexOf(answer.name) === -1) {
                team.completedQuestions.push(answer.name)
                let filter = { key: req.body.id }
                let update = { completedQuestions: team.completedQuestions }
                let opts = { new: true}
                Team.findOneAndUpdate(filter, update, opts, function (err, updatedTeam){
                  if (err) return res.status(500).send(err);
                  let count
                  console.log('avant:'+count)
                  Answer.count({}, function(err, c) {
                    console.log(c)
                    if (team.completedQuestions.length === c) {
                      res.status(200).send("6cfa9402-a6f4-4202-b852-0fb0a75b0b38")
                    } else {
                      res.status(200).send(updatedTeam);
                    }
                  });
                })
              } else {
                res.status(200).send("Already submitted");
              }
            } else {
              return res.status(404).send("Wrong answer");
            }

        });
      } else {
        res.status(404).send("Wrong credentials")
      }
  });



});
router.get('/:key', function (req, res) {
  console.log(req.params.key)
    Answer.findOne({key: req.params.key}, function (err, answer){
        if (err) return res.status(500).send("Problem encountered while returning the answer");
        if (!answer) return res.status(404).send("Wrong answer");
        res.status(200).send(answer);
    });
});

module.exports = router;
