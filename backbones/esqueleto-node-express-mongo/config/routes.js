/* ===================
    Controllers
   =================== */

var ejemploController = require('../app/controllers/ejemploController');

var passport = require('passport');

/* ===================
    Middlewares
   =================== */
var auth = require('./middlewares/authorization');

/* ===================
    Options
   =================== */

var passportLocalOptions = {
  successRedirect: '/ejemplos',
  failureRedirect: '/',
}

/* ===================
    Main
   =================== */

module.exports = function(app) {

  //Ejemplo  
  app.get('/', ejemploController.login);
  app.post('/auth/login', passport.authenticate('local', passportLocalOptions));
  app.get('/logout', auth.requiresLogin, ejemploController.logout);
  app.get('/ejemplos', auth.requiresLogin, ejemploController.index);
  app.get('/ejemplos/new', auth.requiresLogin, ejemploController.new);
  app.get('/ejemplos/:objectId', auth.requiresLogin, ejemploController.readIt);
  app.post('/ejemplos/create', auth.requiresLogin, ejemploController.createIt);
  app.post('/ejemplos/:objectId', auth.requiresLogin, ejemploController.updateIt);
  app.post('/ejemplos/:objectId', auth.requiresLogin, ejemploController.upsertIt);
  app.post('/ejemplos/:objectId', auth.requiresLogin, ejemploController.deleteIt;
  }