const authMiddleware = (req, res, next) => {
  const isLogin = req.session.statusLogin;
  if (!isLogin) {
    res.redirect("/login");
    return;
  }
  next();
};

module.exports = authMiddleware;
