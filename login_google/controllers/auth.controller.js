const { string } = require("yup");
const { User } = require("../models/index");
const { Provider } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/mail");

const authController = {
  login: (req, res) => {
    const successRegister = req.flash("success");
    res.render("auth/login", { req, successRegister });
  },
  handleLogin: async (req, res) => {
    const body = await req.validate(req.body, {
      email: string()
        .test("checkEmpty", "Email bắt buộc phải nhập", (value) => {
          return value !== undefined && value !== null && value !== "";
        })
        .email("Email không đúng định dạng")
        .test("checkEmail", "Email không tồn tại", async (value) => {
          if (value) {
            const user = await User.findOne({
              where: {
                email: value,
              },
            });
            return user;
          }
          return true;
        }),
      password: string().required("Mật khẩu bắt buộc phải nhập"),
    });
    if (body) {
      const provider = await Provider.findOne({
        where: {
          name: "email",
        },
      });

      const getUser = await User.findOne({
        where: {
          email: body.email,
          provider_id: provider.id,
        },
      });
      console.log(getUser);
      if (getUser) {
        const checkPassword = bcrypt.compareSync(
          body.password,
          getUser.password
        );
        console.log(checkPassword);
        if (checkPassword) {
          req.session.statusLogin = true;
          return res.redirect("/");
        }
      }
    }
    return res.redirect("/auth/dang-nhap");
  },

  register: (req, res) => {
    const errorName = req.flash("errorName");
    res.render("auth/register", { req, errorName });
  },
  handleRegister: async (req, res) => {
    const body = await req.validate(req.body, {
      name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
      password: string().required("Mật khẩu bắt buộc phải nhập"),
    });

    if (body) {
      const existingUser = await User.findOne({
        where: {
          email: body.email,
        },
      });

      if (existingUser && existingUser.password === null) {
        // Người dùng đã tồn tại và đăng nhập qua Google, cập nhật mật khẩu.
        const hashPassword = bcrypt.hashSync(body.password, 10);
        body.password = hashPassword;
        if (body.name !== existingUser.name) {
          req.flash("errorName", "Tên không tồn tại");
          return res.redirect("/auth/dang-ky");
        }
        const provider = await Provider.create({ name: "email" });

        body.provider_id = provider.id;
        await User.create(body);
        req.flash("success", "Đăng ký thành công");

        return res.redirect("/auth/dang-nhap");
      } else if (!existingUser) {
        // Người dùng không tồn tại, tạo người dùng mới.
        const hashPassword = bcrypt.hashSync(body.password, 10);
        body.password = hashPassword;

        const provider = await Provider.create({ name: "email" });

        body.provider_id = provider.id;
        await User.create(body);
        req.flash("success", "Đăng ký thành công");
        return res.redirect("/auth/dang-nhap");
      } else {
        // Người dùng tồn tại và đã có mật khẩu.
        req.flash("errors", "Email đã được sử dụng.");
        return res.redirect("/auth/dang-ky");
      }
    }

    return res.redirect("/auth/dang-ky");
  },

  forgotPassword: (req, res) => {
    const sendedFailed = req.flash("sendedFailed");
    const sendedSuccess = req.flash("sendedSuccess");
    return res.render("auth/forgot", { sendedFailed, sendedSuccess });
  },
  handleForgotPassword: async (req, res) => {
    const { email } = req.body;
    const body = await req.validate(req.body, {
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
    });

    if (body) {
      const getUser = await User.findOne({
        where: {
          email,
        },
        include: {
          model: Provider,
          where: {
            name: "email",
          },
        },
      });

      if (!getUser) {
        req.flash("sendedFailed", "Người dùng không tồn tại");

        return res.redirect("/auth/quen-mat-khau");
      }

      const token = jwt.sign(
        {
          email: body.email,
          created_at: new Date(),
        },
        "123456789",
        {
          expiresIn: 60 * 15,
        }
      );

      const link = `<a href="http://localhost:3000/auth/thay-doi-mat-khau/${token}">Link thay đổi mật khẩu</a>`;
      const info = await sendMail(body.email, "Link thay đổi mật khẩu", link);

      req.flash("sendedSuccess", "Mật khẩu được đổi thành công");

      return res.redirect("/auth/thay-doi-mat-khau");
    }

    return res.redirect("/auth/quen-mat-khau");
  },

  changePassword: (req, res) => {
    const { token } = req.params;
    return res.render("auth/changepassword", {
      token,
      req,
    });
  },
  handleChangePassword: async (req, res) => {
    const { token } = req.params;
    // if (req.session.token > 0) {
    const body = req.validate(req.body, {
      password: string().required("Mật khẩu bắt buộc phải nhập"),
      confirm_password: string()
        .required("Mật khẩu xác nhận bắt buộc phải nhập")
        .oneOf([req.body.password], "Mật khẩu xác nhận không đúng"),
    });
    if (body) {
      jwt.verify(token, "123456789", async (err, decoded) => {
        if (err) {
          req.flash(
            "limit-change-password",
            "Thời gian đổi mật khẩu đã hết hạn"
          );
        } else {
          const { email } = decoded;

          try {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(body.password, salt);
            body.password = hashPassword;
            const provider = await Provider.findOne({
              where: {
                name: "email",
              },
            });
            const getUser = await User.findOne({
              where: {
                email,
                provider_id: provider.id,
              },
            });
            await User.update(body, {
              where: {
                id: getUser.id,
              },
            });

            req.flash("change-password", "Đổi mật khẩu thành công");
          } catch (e) {
            return next(e);
          }
        }
      });
      //   const salt = bcrypt.genSaltSync(10);
      //   const hashPassword = bcrypt.hashSync(body.password, salt);
      //   body.password = hashPassword;
      //   const provider = await Provider.findOne({
      //     where: {
      //       name: "email",
      //     },
      //   });
      //   const getUser = await User.findOne({
      //     where: {
      //       email: req.session.email,
      //       provider_id: provider.id,
      //     },
      //   });
      //   await User.update(body, {
      //     where: {
      //       id: getUser.id,
      //     },
      //   });
      //   req.flash("success", "Đổi mật khẩu thành công");
      //   return res.redirect("/auth/dang-nhap");
    }
    return res.redirect(`/auth/thay-doi-mat-khau/${token}`);
  },
};

module.exports = authController;
