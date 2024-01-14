const isLogin = false;

const authMiddleware = (req, res, next) => {
  if (!isLogin) {
    res.redirect("/login");
    return;
  }
  next();
};

module.exports = authMiddleware;
