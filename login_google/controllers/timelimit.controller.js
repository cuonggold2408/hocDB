const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.session.token;

  jwt.verify(token, "123456789", (e) => {
    if (e) {
      req.flash("change-password", "Thời gian đổi mật khẩu đã hết");
      return res.redirect("/auth/dang-nhap");
    }
    return next();
  });
};
