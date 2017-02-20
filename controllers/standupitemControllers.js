var express = require('express');
var router = express.Router();
var StandupItem = require('../models/standupitem');

// ROUTE :: GET --------------------------all standupitems
router.get('/', function(req, res){
  StandupItem.find({}).exec()
  .then(function(allStandupItems){
    console.log(allStandupItems);
    res.json(allStandupItems);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: CREATE ------------------------one standupitem
router.post('/', function(req, res){
  console.log("req.body:" + req.body);
  StandupItem.create(req.body)
  .then(function(standupitem){
    console.log(standupitem);
    res.json(standupitem);
  })
  .catch(function(err){
    console.log(err);
    res.status(400);
  })
});

// ROUTE :: GET ---------------------------one standupitem
router.get('/:pId', function(req, res){
  StandupItem.findById(req.params.pId).exec()
  .then(function(standupitem){
    console.log(standupitem);
    res.json(standupitem);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: UPDATE ------------------------one standupitem
router.put('/', function(req, res){
  StandupItem.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
  .then(function(standupitem){
    console.log(standupitem);
    res.json(standupitem);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

router.delete('/:id', function(req, res){
  console.log(req.params.id);
  StandupItem.remove({_id: req.params.id})
  .then(function(standupitem){
    console.log(standupitem);
    res.json(standupitem);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

module.exports = router;
