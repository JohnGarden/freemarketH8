var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var router = express.Router();

passport.use(new Strategy({
    clientID: '749317298544850',
    clientSecret: 'f8e639b92453e45d7934ba42cb5cff56',
    callbackURL: '/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  if (req.user && req.isAuthenticated()) {
    res.redirect('/shops');    
  } else {
    res.redirect('/login');
  }
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: "FreeMarket H8" });
});

router.get('/login/facebook', passport.authenticate('facebook'));

router.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
