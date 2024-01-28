const { string } = require("yup");
const { User } = require("../models/index");
const { Provider } = require("../models/index");
const bcrypt = require("bcrypt");

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
        },
      });
      if (getUser) {
        const checkPassword = bcrypt.compareSync(
          body.password,
          getUser.password
        );
        if (checkPassword) {
          req.session.user = getUser;
          return res.redirect("/");
        }
      }
    }
    return res.redirect("/auth/dang-nhap");
  },

  register: (req, res) => {
    res.render("auth/register", { req });
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
        await User.update(
          { password: hashPassword },
          {
            where: {
              email: body.email,
            },
          }
        );
        await Provider.update(
          { name: "email" },
          {
            where: {
              id: existingUser.provider_id,
            },
          }
        );
        req.flash("success", "Đăng ký thành công");

        return res.redirect("/auth/dang-nhap");
      } else if (!existingUser) {
        // Người dùng không tồn tại, tạo người dùng mới.
        const hashPassword = bcrypt.hashSync(body.password, 10);
        body.password = hashPassword;

        const user = await User.create(body, { provider_id: Provider.id });
        await Provider.create({
          id,
          name: "email",
        });
        req.flash("success", "Đăng ký thành công");
        return res.redirect("/auth/dang-nhap");
      } else {
        // Người dùng tồn tại và đã có mật khẩu.
        req.flash("error", "Email đã được sử dụng.");
        return res.redirect("/auth/dang-ky");
      }
    }

    return res.redirect("/auth/dang-ky");
  },
};

module.exports = authController;
