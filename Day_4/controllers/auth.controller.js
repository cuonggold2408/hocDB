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
    res.render("login", { req, successRegister, title: "Đăng nhập" });
  },

  handleLogin: async (req, res) => {
    const body = await req.validate(req.body, {
      // name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
      password: string().required("Mật khẩu bắt buộc phải nhập"),
    });
    return res.redirect("/login");
  },
};

module.exports = authController;
