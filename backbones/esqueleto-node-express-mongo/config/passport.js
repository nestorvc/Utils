/* ===================
    Dependencies
   =================== */

var GoogleStrategy = require('passport-google').Strategy
var FacebookStrategy = require('passport-facebook').Strategy
var TwitterStrategy = require('passport-twitter').Strategy
var LocalStrategy = require('passport-local').Strategy

module.exports = function(passport, config) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    //The following method is an example of what you should do
    //with your own db models

    /*YourUserModel.yourCustomizedFindById(id, function(err, user) {
            done(err, user);
        });*/
  });

  function requiresLogin(req, res, next) {
    if (!req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl
      return res.redirect('/')
    }
    next()
  }

  passport.use(new LocalStrategy(
    function(_username, _password, done) {
      //The following method is an example of what you should do
      //with your own db models

      /*YourUserModel.yourCustomizedFindOne({
                username: _username
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }
                if (!user.validPassword(_password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                return done(null, user);
            });*/
    }
  ));

  passport.use(new TwitterStrategy({
      consumerKey: "TWITTER_CONSUMER_KEY",
      consumerSecret: "TWITTER_CONSUMER_SECRET",
      callbackURL: "YOUR_CALLBACK_URL"
    },
    function(token, tokenSecret, profile, done) {
      //The following method is an example of what you should do
      //with your own db models

      /*YourUserModel.yourCustomizedFindOrCreate(..., function(err, user) {
                if (err) {
                    return done(err);
                }
                done(null, user);
            });*/
    }
  ));

  passport.use(new FacebookStrategy({
      clientID: "FACEBOOK_APP_ID",
      clientSecret: "FACEBOOK_APP_SECRET",
      callbackURL: "YOUR_CALLBACK_URL"
    },
    function(accessToken, refreshToken, profile, done) {
      //The following method is an example of what you should do
      //with your own db models

      /*YourUserModel.yourCustomizedFindOrCreate(..., function(err, user) {
                if (err) {
                    return done(err);
                }
                done(null, user);
            });*/
    }
  ));

  passport.use(new GoogleStrategy({
      returnURL: 'YOUR_CALLBACK_URL',
      realm: config.realm
    },
    function(identifier, profile, done) {
      //The following method is an example of what you should do
      //with your own db models

      /*YourUserModel.yourCustomizedFindOrCreate({
                openId: identifier
            }, function(err, user) {
                done(err, user);
            });*/
    }
  ));
}