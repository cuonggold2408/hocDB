const { string } = require("yup");
const { User } = require("../models/index");
const bcrypt = require("bcrypt");

const authController = {
  login: (req, res) => {
    if (req.user) {
      return res.redirect("/");
    }
    const successRegister = req.flash("successRegister");
    const error = req.flash("error");
    res.render("auth/login", {
      successRegister,
      error,
      layout: "auth/layout",
      title: "Đăng nhập",
    });
  },
  handleLogin: (req, res) => {},

  register: (req, res) => {
    if (req.user) {
      return res.redirect("/");
    }
    res.render("auth/register", {
      req,
      layout: "auth/layout",
      title: "Đăng ký",
    });
  },
  handleRegister: async (req, res) => {
    const body = await req.validate(req.body, {
      name: string().required("Vui lòng nhập tên"),
      email: string()
        .required("Vui lòng nhập email")
        .test("check-email", "Email đã tồn tại", async (value) => {
          const existEmail = await User.findOne({ where: { email: value } });

          return !!!existEmail?.id;
        }),
      password: string().required("Vui lòng nhập mật khẩu"),
    });

    if (body) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(body.password, salt);
      body.password = hashPassword;

      const user = await User.create(body);

      req.flash("successRegister", "Đăng ký thành công");
      return res.redirect("/auth/dang-nhap");
    }

    return res.redirect("/auth/dang-ky");
  },
};

module.exports = authController;
