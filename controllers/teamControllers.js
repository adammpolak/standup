var express = require('express');
var router = express.Router();
var Team = require('../models/team');

// ROUTE :: GET --------------------------all teams
router.get('/', function(req, res){
  Team.find({}).exec()
  .then(function(allTeams){
    console.log(allTeams);
    res.json(allTeams);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: CREATE ------------------------one team
router.post('/', function(req, res){
  console.log(req.body);
  Team.create(req.body)
  .then(function(team){
    console.log(team);
    res.json(team);
  })
  .catch(function(err){
    console.log(err);
    res.status(400);
  })
});

// ROUTE :: GET ---------------------------one team
router.get('/:pId', function(req, res){
  Team.findById(req.params.pId).exec()
  .then(function(team){
    console.log(team);
    res.json(team);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: UPDATE ------------------------one team
router.put('/', function(req, res){
  Team.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
  .then(function(team){
    console.log(team);
    res.json(team);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

router.delete('/:id', function(req, res){
  console.log(req.params.id);
  Team.remove({_id: req.params.id})
  .then(function(team){
    console.log(team);
    res.json(team);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

module.exports = router;
