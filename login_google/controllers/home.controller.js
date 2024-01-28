const homeController = {
  index: (req, res) => {
    res.render("index");
  },
  logout: (req, res) => {
    delete req.session.user;
    req.logout((err) => {});
    res.redirect("/auth/dang-nhap");
  },
};

module.exports = homeController;
