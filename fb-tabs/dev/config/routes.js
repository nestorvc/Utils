/* ===================
    Controllers
   =================== */

var mainController = require('../app/controllers/mainController');
var adminController = require('../app/controllers/adminController');


/* ===================
    Utils
   =================== */

/* ===================
    Main
   =================== */

module.exports = function(app) {

  app.get('/', mainController.index);
  app.get('/result', mainController.result);

  app.get('/admin/', adminController.login);
  app.get('/admin/logout', adminController.logout);
  app.get('/admin/cotizaciones', adminController.cotizaciones);
  app.get('/admin/configuracion', adminController.configuracion);
}