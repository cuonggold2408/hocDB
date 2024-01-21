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
    const successLogout = req.flash("successLogout");
    const successChangePassword = req.flash("successChangePassword");
    res.render("login", {
      req,
      errorPassword,
      successRegister,
      errorStatus,
      successChangePassword,
      title: "Đăng nhập",
      successLogout,
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

  changePassword: (req, res) => {
    res.render("changePassword", {
      req,
      title: "Đổi mật khẩu",
    });
  },
  handleChangePassword: async (req, res) => {
    const body = await req.validate(req.body, {
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .test("checkEmail", "Email không tồn tại", async (value) => {
          if (value) {
            const result = await userModel.existEmail(value);
            console.log(result);
            return result.length;
          }
        }),
      password: string().required("Mật khẩu bắt buộc phải nhập"),
      passwordOld: string().test(
        "check-password",
        "Mật khẩu không đúng",
        async (value) => {
          console.log("value:", value);
          if (value) {
            const getPassword = await userModel.getPassword(req.body.email);
            console.log("getPassword: ", getPassword);
            const checkPassword = await userModel.checkPassword(
              value,
              getPassword[0].password
            );
            return checkPassword;
          }
        }
      ),
      passwordNew: string().test(
        "check-password-new",
        "Mật khẩu mới không được trùng với mật khẩu cũ",
        async (value) => {
          if (value) {
            const getPassword = await userModel.getPassword(req.body.email);
            const checkPassword = await userModel.checkPassword(
              value,
              getPassword[0].password
            );
            return !checkPassword;
          }
        }
      ),
      passwordConfirm: string().test(
        "check-password-confirm",
        "Mật khẩu không trùng khớp",
        function (value) {
          console.log("this.parent.passwordNew: ", this.parent.passwordNew);
          return this.parent.passwordNew === value;
        }
      ),
    });
    if (req.body) {
      // await userModel.create(body);
      await userModel.changePassword(req.body.email, req.body.passwordNew);
      req.flash("successChangePassword", "Đổi mật khẩu thành công");
      return res.redirect("/login");
    }
    return res.redirect("/doi-mat-khau");
  },
};

module.exports = authController;
