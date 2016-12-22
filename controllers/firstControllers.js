var express = require('express');
var router = express.Router();
var Counter = require('../models/counter');

// ROUTE :: GET --------------------------all projects
router.get('/', function(req, res){
  Counter.find({}).exec()
  .then(function(allCounters){
    console.log(allCounters);
    res.json(allCounters);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: CREATE ------------------------one project
router.post('/', function(req, res){
  console.log("req.body:" + req.body);
  Counter.create(req.body)
  .then(function(counter){
    console.log(counter);
    res.json(counter);
  })
  .catch(function(err){
    console.log(err);
    res.status(400);
  })
});

// ROUTE :: GET ---------------------------one project
router.get('/:pId', function(req, res){
  Counter.findById(req.params.pId).exec()
  .then(function(counter){
    console.log(counter);
    res.json(counter);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: UPDATE ------------------------one project
router.put('/', function(req, res){
  Counter.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
  .then(function(counter){
    console.log(counter);
    res.json(counter);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

router.delete('/:id', function(req, res){
  console.log(req.params.id);
  Counter.remove({_id: req.params.id})
  .then(function(counter){
    console.log(counter);
    res.json(counter);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

module.exports = router;
