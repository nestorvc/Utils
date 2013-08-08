/* ===================
    Controllers
   =================== */

var exampleController = require('../app/controllers/exampleController');
var passport = require('passport');

/* ===================
    Extras
   =================== */

/*PASSPORT*/
var passportExampleOptions = {
    successRedirect: '/success',
    failureRedirect: '/login'
}

/* ===================
    Main
   =================== */

module.exports = function(app) {

    // Home
    app.get('/', exampleController.exampleFunction);

    // Middleware
    app.param('exampleId', exampleController.load);

    //Gets
    app.get('/:exampleId', exampleController.show);
    app.get('/success', passport.requiresLogin, exampleController.exampleFunction);

    //Posts
    app.post('/create', exampleController.create);
    app.post('/auth/login', passport.authenticate('local', passportExampleOptions));
}