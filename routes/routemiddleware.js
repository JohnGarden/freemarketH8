module.exports = function(){
  this.isAuthenticaded = function (req, res, next) {
    if (req.user && req.user.authenticated) {
      return next();
    }
    res.redirect('/');
  }
}
