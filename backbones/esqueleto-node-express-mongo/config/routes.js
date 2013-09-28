/* ===================
    Controllers
   =================== */

var exampleController = require('../app/controllers/exampleController');
var passport = require('passport');

/* ===================
    Middlewares
   =================== */

var auth = require('./middlewares/authorization');

/* ===================
    Utils
   =================== */

var passportExampleOptions = {
  successRedirect: '/example',
  failureRedirect: '/login'
}

/* ===================
    Main
   =================== */

module.exports = function(app) {

  app.get('/', exampleController.index);
  app.get('/example/new', exampleController.new);
  app.get('/example/:objectId', exampleController.readIt);
  app.post('/example/create', exampleController.createIt);
  app.post('/example/update', exampleController.updateIt);
  app.post('/example/delete', exampleController.deleteIt);

  //Passport only if you create the login process
  // app.get('/example', auth.requiresLogin, exampleController.exampleFunction);
  // app.post('/auth/login', passport.authenticate('local', passportExampleOptions));
}