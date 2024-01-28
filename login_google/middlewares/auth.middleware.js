module.exports = (req, res, next) => {
  const isLogin = req.session.statusLogin;
  console.log("isLogin của authMiddleware: ", isLogin);
  if (!req.user) {
    return res.redirect("/auth/dang-nhap");
  }

  return next();
};
