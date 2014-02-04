/* ===================
    Dependencies
   =================== */

var LocalStrategy = require('passport-local').Strategy;
var Ejemplo = _MONGOOSE.model('Ejemplo');

module.exports = function(passport, config) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {

    Ejemplo.readIt(id, function(err, result) {
      if (err) {
        console.log(_DEBUG + "ERROR: ", err); //DEBUG
        return done(err);
      } else {
        done(err, result);
      }
    })
  })

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'pass'
    },
    function(email, pass, done) {
      console.log(_DEBUG + "LOCAL STRATEGY: ", email); //DEBUG

      // TODO: Se debe crear un método "readItByEmail"
      /*Ejemplo.readItByEmail(email, function(err, user) {
        if (err) {
          console.log(_DEBUG + "ERROR: ", err); //DEBUG
          return done(err);
        }
        if (!user) {
          console.log(_DEBUG + "ERROR: Email incorrecto. ", err); //DEBUG
          return done(null, false, {
            message: 'Email incorrecto.'
          });
        }
        if (!user.validateIt(pass)) {
          console.log(_DEBUG + "ERROR: Password incorrecto. ", err); //DEBUG
          return done(null, false, {
            message: 'Password incorrecto.'
          });
        }
        console.log(_DEBUG + "Usuario autenticado."); //DEBUG
        return done(null, user);
      });*/
    }
  ))
}