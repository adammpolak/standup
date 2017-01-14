var express = require('express');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var port = process.env.PORT || 80;
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/mywebsite';

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var User = require('./models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var app = express();
mongoose.connect(mongoURI);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'loremipsum',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/projects', require('./controllers/projectControllers.js'));
app.use('/api/users', require('./controllers/usersController.js'));
app.use('/api/helpers', require('./controllers/helpersController.js'));

app.all("/*", function(req,res,next) {
  res.sendFile("index.html", { root: __dirname + "/public" });
})




app.listen(port, function() {
  console.log('listening to: '+ port);
});
