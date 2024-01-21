const useragent = require("express-useragent");

const homeController = {
  index: async (req, res, next) => {
    let user;
    const source = req.headers["user-agent"];
    const ua = useragent.parse(source);
    try {
      console.log("req.session.user", req.session.user);
      user = req.session.user[0].name;
    } catch (e) {
      return next(e);
    }
    res.render("index", {
      user: user,
      title: "Trang chủ",
      os: ua.os, // hệ điều hành
      browser: ua.browser, // trình duyệt
    });
  },

  logout: (req, res) => {
    req.flash("successLogout", "Đăng xuất thành công");
    delete req.session.user;
    delete req.session.statusLogin;
    return res.redirect("/login");
  },

  // index: (req, res) => {
  //   res.render("index", { });
  // },
};

module.exports = homeController;
