const homeController = {
  index: (req, res) => {
    res.render("index", { req });
  },
  logout: (req, res) => {
    req.logout((err) => {});
    res.redirect("/auth/dang-nhap");
  },
};

module.exports = homeController;
