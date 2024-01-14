const userModel = require("../models/user.model");
const { string } = require("yup");
const authController = {
  register: (req, res) => {
    res.render("register", { req, title: "Đăng ký" });
  },

  handleRegister: async (req, res) => {
    const body = await req.validate(req.body, {
      name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .test("check-email", "Email đã tồn tại", async (value) => {
          const result = await userModel.existEmail(value);
          console.log(result);
          return !result.length;
        }),
      password: string().required("Mật khẩu bắt buộc phải nhập"),
    });
    if (body) {
      await userModel.create(body);
      req.flash("successRegister", "Đăng ký thành công");
      return res.redirect("/login");
    }
    return res.redirect("/register");
  },

  login: (req, res) => {
    const successRegister = req.flash("successRegister");
    const errorPassword = req.flash("errorPassword");
    const errorStatus = req.flash("errorStatus");
    // const successLogout = req.flash("successLogout");
    res.render("login", {
      req,
      errorPassword,
      successRegister,
      errorStatus,
      title: "Đăng nhập",
      // successLogout,
    });
  },

  handleLogin: async (req, res) => {
    const body = await req.validate(req.body, {
      // name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
      password: string().required("Mật khẩu bắt buộc phải nhập"),
    });
    if (body) {
      const hashPassword = await userModel.getPassword(body.email);
      const status = await userModel.getStatus(body.email);
      console.log("status: ", status);
      if (hashPassword.length) {
        const checkPassword = await userModel.checkPassword(
          body.password,
          hashPassword[0].password
        );

        if (checkPassword) {
          // req.session.user = await userModel.findEmail(body.email);
          if (status[0].status) {
            req.session.user = await userModel.getUser(body.email);
            req.session.statusLogin = true;
            return res.redirect("/");
          } else {
            req.flash("errorStatus", "Tài khoản của bạn chưa được kích hoạt");
            return res.redirect("/login");
          }
        }
        req.flash("errorPassword", "Email hoặc mật khẩu không đúng");
        return res.redirect("/login");
      }
    }
    return res.redirect("/login");
  },
};

module.exports = authController;
