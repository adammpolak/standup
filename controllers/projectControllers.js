var express = require('express');
var router = express.Router();
var Project = require('../models/project');

// ROUTE :: GET --------------------------all projects
router.get('/', function(req, res){
  Project.find({}).exec()
  .then(function(allProjects){
    console.log(allProjects);
    res.json(allProjects);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: CREATE ------------------------one project
router.post('/', function(req, res){
  console.log("req.body:" + req.body);
  Project.create(req.body)
  .then(function(project){
    console.log(project);
    res.json(project);
  })
  .catch(function(err){
    console.log(err);
    res.status(400);
  })
});

// ROUTE :: GET ---------------------------one project
router.get('/:pId', function(req, res){
  Project.findById(req.params.pId).exec()
  .then(function(project){
    console.log(project);
    res.json(project);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: UPDATE ------------------------one project
router.put('/', function(req, res){
  Project.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
  .then(function(project){
    console.log(project);
    res.json(project);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

router.delete('/:id', function(req, res){
  console.log(req.params.id);
  Project.remove({_id: req.params.id})
  .then(function(project){
    console.log(project);
    res.json(project);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

module.exports = router;
