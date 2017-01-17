var express = require('express'),
    router  = express.Router(),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');

router.get('/', function(req, res){
  User.find({}).exec()
  .then(function(allUsers){
    console.log(allUsers);
    res.json(allUsers);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

router.put('/', function(req, res){
  User.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
  .then(function(user){
    console.log(user);
    res.json(user);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

router.post('/register', function(req, res){
  User.register(new User(
    {username: req.body.username}),
    req.body.password, function(err, user){
      if (err) {
        res.json(err);
      }
      else {
        req.login(user, function(err){
          if (err) {res.json(err)}
          else {
            console.log(req.user.username)
            res.json({status: 201, statusText: 'success', user: user});
          }
        });
      }
    });
});

router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info){
    if (err) {
      return res.json({err});
    }
    if (!user) {
      return res.json({message: "<strong>Authentication Failed!</strong> Check your username and password!"});
    }
    req.login(user, function(err){
      if(err){
        return next(err);
      }
      return res.json({success: true});
    });
  })(req, res, next);
});

// update username function
// router.patch('/:_id', function(req, res){
//   User.findOneAndUpdate({_id: req.params._id}, req.body.username).exec()
//   .then(function(data) {
//     console.log(req.params._id, data);
//   })
//   .catch(function(error){
//     console.error(error);
//   })
// });

var authenticate = function(req, res, next) {
  if (!req.user || req.user.id != req.params.id) {
    res.json({status: 401, message: 'unauthorized'})
  } else {
    next()
  }
}

router.get('/:pId', function(req, res){
  User.findById(req.params.pId).exec()
  .then(function(user){
    console.log(user);
    res.json(user);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

//update password patch route
// router.get('/:userId', authenticate, function(req,res){
//   res.json('profile/password', {user: req.user});
// });
// router.patch('/:userId', function(req, res){
//   User.findOne({_id: req.params.userId}).exec()
//   .catch(function(error){
//     console.error(error);
//   })
//   .then(function(user){
//     console.log(req.body.password, req.body.passwordConfirmation);
//     console.log(user);
//     if (req.body.password) {
//       if (req.body.password === req.body.passwordConfirmation) {
//         user.setPassword(req.body.password, function(){
//           console.log('Password reset');
//           user.save();
//         });
//       } else {
//         console.log('Passwords do not match');
//       }
//     }
//   });
// });

router.delete('/logout', function(req, res){
  req.logout();
  res.json("User logged out.")
});

module.exports = router;
