var config = require(__dirname + '/config');
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy
var User = require(__dirname + '/models/User');

passport.use(new FacebookStrategy(config.facebook, function(accessToken, refreshToken, profile, done) {
    User.findOne({ facebookId: profile.id }, function (err, user) {
      if (err) return done(err);

      if (user) return done(null, user);

      User.create({
        facebookId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      }, function (err, user) {
        if (err) return done(err);

        done(null, user);
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).populate('followers following microposts').exec(function (err, user) {
    if (err) return done(err);

    done(null, user);
  });
});

module.exports = function (app) {
  app.all(/^(?!(\/$)|(\/auth\/.*))/, function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/');
    }

    next();
  });

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/feed',
    failureRedirect: '/'
  }));
  app.get('/signout', function(req, res){
    req.logout();
    res.redirect('/');
  });
}
