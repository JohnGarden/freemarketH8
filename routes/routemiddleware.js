module.exports = function(){
  this.isAuthenticaded = function (req, res, next) {
    if (req.user && req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
}
