/* ===================
    Controllers
   =================== */

var exampleController = require('../app/controllers/exampleController');

/* ===================
    Main
   =================== */

module.exports = function (app) {

  // Home
    app.get('/', exampleController.exampleFunction);

  // Middleware
  app.param('exampleId', exampleController.load);

  //Gets
  app.get('/:exampleId', exampleController.show);

  //Posts
  app.post('/create', exampleController.create);

}