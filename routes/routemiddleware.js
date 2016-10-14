module.exports = function(){
  this.isAuthenticated = function (req, res, next) {
    if (req.user && req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
}
