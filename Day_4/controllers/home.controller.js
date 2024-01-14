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
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        // req.flash("successLogout", "Đăng xuất thành công");
        return res.redirect("/login");
      }
    });
  },

  // index: (req, res) => {
  //   res.render("index", { });
  // },
};

module.exports = homeController;
