/* ===================
    Variables
   =================== */

// Globals
_DEBUG = "\033[31m \033[1m";
_DOMAIN = ""

// Main dependecies
var port = process.env.PORT || 5000;
var env = process.env.NODE_ENV || 'development';
if (port != 5000) env = "staging";
var config = require('./config/config')[env];
var express = require('express');
var fs = require('fs');

/* ===================
    Utils
   =================== */


/* ===================
    Main
   =================== */

// Configure the app
var app = express();
app.use(express.bodyParser());
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