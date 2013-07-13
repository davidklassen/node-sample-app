var express = require('express');
var mongoose = require('mongoose');
var ejs = require('ejs-locals');
var passport = require('passport');
var gravatar = require('gravatar');
var pluralize = require('pluralize');
var timeago = require('timeago');
var config = require(__dirname + '/config');
var app = express();

// setup database connection
var mongoUri = process.env.MONGOLAB_URI
  || process.env.MONGOHQ_URL
  || 'mongodb://' + config.mongo.host + '/' + config.mongo.name;

mongoose.connect(mongoUri);

// configure application middleware
app.use(express.favicon());
app.use(express.static(__dirname + '/../public'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.engine('ejs', ejs);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.cookieParser());
app.use(express.cookieSession({ key: 'sid', secret: '4vno0fj4w9juvjiqhx936358cgfvtph' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.req = req;
  res.locals.gravatar = gravatar;
  res.locals.pluralize = pluralize;
  res.locals.timeago = timeago;
  next();
});
app.use(app.router);

// setup auth
require(__dirname + '/auth')(app);

// setup routes
require(__dirname + '/router')(app);

// 404 middleware
app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

module.exports = app;
