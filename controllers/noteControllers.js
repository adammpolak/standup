var express = require('express');
var router = express.Router();
var Note = require('../models/note');

// ROUTE :: GET --------------------------all notes
router.get('/', function(req, res){
  Note.find({}).exec()
  .then(function(allNotes){
    console.log(allNotes);
    res.json(allNotes);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: CREATE ------------------------one note
router.post('/', function(req, res){
  console.log("req.body:" + req.body);
  Note.create(req.body)
  .then(function(note){
    console.log(note);
    res.json(note);
  })
  .catch(function(err){
    console.log(err);
    res.status(400);
  })
});

// ROUTE :: GET ---------------------------one note
router.get('/:pId', function(req, res){
  Note.findById(req.params.pId).exec()
  .then(function(note){
    console.log(note);
    res.json(note);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: UPDATE ------------------------one note
router.put('/', function(req, res){
  Note.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
  .then(function(note){
    console.log(note);
    res.json(note);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

router.delete('/:id', function(req, res){
  console.log(req.params.id);
  Note.remove({_id: req.params.id})
  .then(function(note){
    console.log(note);
    res.json(note);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

module.exports = router;
