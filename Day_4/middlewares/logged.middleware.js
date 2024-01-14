const loggedMiddleware = (req, res, next) => {
  const isLogin = req.session.statusLogin;
  if (isLogin) {
    res.redirect("/");
    return;
  }
  next();
};

module.exports = loggedMiddleware;
