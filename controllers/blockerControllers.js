var express = require('express');
var router = express.Router();
var Blocker = require('../models/blocker');

// ROUTE :: GET --------------------------all blockers
router.get('/', function(req, res){
  Blocker.find({}).exec()
  .then(function(allBlockers){
    console.log(allBlockers);
    res.json(allBlockers);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: CREATE ------------------------one blocker
router.post('/', function(req, res){
  console.log(req.body);
  Blocker.create(req.body)
  .then(function(blocker){
    console.log(blocker);
    res.json(blocker);
  })
  .catch(function(err){
    console.log(err);
    res.status(400);
  })
});

// ROUTE :: GET ---------------------------one blocker
router.get('/:pId', function(req, res){
  Blocker.findById(req.params.pId).exec()
  .then(function(blocker){
    console.log(blocker);
    res.json(blocker);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: UPDATE ------------------------one blocker
router.put('/', function(req, res){
  Blocker.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
  .then(function(blocker){
    console.log(blocker);
    res.json(blocker);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

router.delete('/:id', function(req, res){
  console.log(req.params.id);
  Blocker.remove({_id: req.params.id})
  .then(function(blocker){
    console.log(blocker);
    res.json(blocker);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

module.exports = router;
