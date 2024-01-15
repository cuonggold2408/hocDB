const homeController = {
  index: async (req, res, next) => {
    let user;
    try {
      console.log("req.session.user", req.session.user);
      user = req.session.user[0].name;
    } catch (e) {
      return next(e);
    }
    res.render("index", { user: user, title: "Trang chủ" });
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
