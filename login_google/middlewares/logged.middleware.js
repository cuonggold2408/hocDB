const loggedMiddleware = (req, res, next) => {
  const isLogin = req.session.statusLogin;
  console.log("isLogin của loggedMiddleware: ", isLogin);
  if (req.user) {
    return res.redirect("/");
  }

  return next();
};

module.exports = loggedMiddleware;
