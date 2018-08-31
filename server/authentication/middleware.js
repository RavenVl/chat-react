function authenticationMiddleware () {
  return function (req, res, next) {
    console.log('middle');
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
}

module.exports = authenticationMiddleware;
