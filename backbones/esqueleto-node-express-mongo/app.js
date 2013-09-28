/* ===================
    Variables
   =================== */

// Globals
_MONGOOSE = require('mongoose');
_DEBUG = "\033[31m \033[1m";

// Main dependecies
var port = process.env.PORT || 5000;
var env = process.env.NODE_ENV || 'development';
if (port != 5000) env = "staging";
var config = require('./config/config')[env];
var express = require('express');
var passport = require('passport');
var moment = require('moment');
var fs = require('fs');

moment.lang('es');

/* ===================
    Utils
   =================== */

/* MONGOOSE */
_MONGOOSE.connect(config.db);
fs.readdirSync(__dirname + '/app/models').forEach(function(file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

/* PASSPORT */
require('./config/passport')(passport, config)


/* ===================
    Main
   =================== */

// Configure the app
var app = express();
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
  secret: 'yoursecret' /* TODO: Remember to change to your own secret */
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

/* UNDERSCORE */
app.locals._ = require('underscore');

app.listen(port, function() {
  console.log(_DEBUG + "Listening on " + port);
});

/* ===================
    Routes
   =================== */

require('./config/routes')(app)
app.use(express.static(__dirname + '/public'));