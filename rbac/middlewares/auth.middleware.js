const authMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/auth/dang-nhap");
  }
  next();
};

module.exports = authMiddleware;
