var express = require('express');
var session = require('express-session');
MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/standup';

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var User = require('./models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

mongoose.connect(mongoURI);
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'loremipsum',
  resave: false,
  saveUninitialized: false,
  maxAge: new Date(Date.now() + 86400000),
  // store: new MongoStore(
  //   {mongooseConnection: mongoose.connection},
  //   function(err){
  //     if (err) {console.log(err)}
  //     else {console.log('session saved')}
  //   }
  // )
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/teams', require('./controllers/teamControllers.js'));
app.use('/api/blockers', require('./controllers/blockerControllers.js'));
app.use('/api/notes', require('./controllers/noteControllers.js'));
app.use('/api/standupitems', require('./controllers/standupitemControllers.js'));
app.use('/api/users', require('./controllers/usersController.js'));
app.use('/api/helpers', require('./controllers/helpersController.js'));

app.all("/*", function(req,res,next) {
  res.sendFile("index.html", { root: __dirname + "/public" });
})




app.listen(port, function() {
  console.log('listening to: '+ port);
});
