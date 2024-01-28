module.exports = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/auth/dang-nhap");
  }
  return next();
};
