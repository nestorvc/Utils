// -----------------------
// Variables
// -----------------------

// Globals
_MONGOOSE = require('mongoose');
_DEBUG = "\033[31m \033[1m";
_DOMAIN = "http://domain.com"; //TODO: Cambiar dominio

// Main dependecies
var port = process.env.PORT || 5000;
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];
var express = require('express');
var passport = require('passport');
var moment = require('moment');
var fs = require('fs');
var flash = require('connect-flash');

require('express-namespace');
moment.lang('es');

// -----------------------
// Utils
// -----------------------

// Mongoose 
_MONGOOSE.connect(config.db);
fs.readdirSync(__dirname + '/app/models').forEach(function(file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Passport 
require('./config/passport')(passport, config)


// -----------------------
// Main
// -----------------------

// Configure the app
var app = express();
app.use(express.bodyParser());
app.use(express.cookieParser('interaction_parser'));
app.use(express.session({
  cookie: {
    maxAge: 6000000000
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

// Underscore 
app.locals._ = require('underscore');

app.listen(port, function() {
  console.log(_DEBUG + "Listening on " + port);
});

// -----------------------
// Routes
// -----------------------

require('./config/routes')(app)
app.use(express.static(__dirname + '/public'));