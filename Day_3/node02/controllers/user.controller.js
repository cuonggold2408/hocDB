// const sql = require("../utils/db.js");
const { string } = require("yup");
const userModel = require("../models/user.model");

module.exports = {
  index: async (req, res, next) => {
    let users;
    const { status, keyword } = req.query;
    // console.log(status);
    try {
      users = await userModel.all(status, keyword);
      // console.log(users);
    } catch (e) {
      // console.log(e);
      return next(e); // trả về lỗi lên trình duyệt
      // return next(new Error("Lỗi truy vấn")); // trả về lỗi lên trình duyệt, custom lỗi
    }
    res.render("users/index", { users, addSuccess: req.flash("msg") });
  },
  add: (req, res) => {
    res.render("users/add", { req });
  },
  handleAdd: async (req, res) => {
    // const body = req.body;
    // console.log(body);
    const body = await req.validate(req.body, {
      name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không hợp lệ")
        .test("check-email", "Email đã tồn tại", async (value) => {
          let users;
          users = await userModel.checkEmail(value);
          console.log(users);
          if (users.length === 0) {
            return true;
          }
        }),
      status: string().test(
        "check-status",
        "Trạng thái không hợp lệ",
        (value) => {
          // value = +value;
          // if (!isNaN(value) && (value === 0 || value === 1)) {
          //   return true;
          // }
          // return false;
          return +value === 0 || +value === 1;
        }
      ),
    });
    // res.send("submit");
    console.log("req.body: ", req.body);
    console.log("body: ", body);
    if (body) {
      //Gọi create
      await userModel.create(body);

      req.flash("msg", "Thêm người dùng thành công");
      return res.redirect("/users");
    }
    return res.redirect("/users/add");
  },
  update: async (req, res) => {
    // console.log("req.params: ", req.params);
    const userId = req.params.id;
    let data = await userModel.update(userId);
    let user = data && data.length > 0 ? data[0] : {};
    // console.log(user);
    res.render("users/update", { userUpdate: user, req });
  },
  handleUpdate: async (req, res) => {
    const userId = req.params.id;
    const body = await req.validate(req.body, {
      name: string().required("Tên bắt buộc phải nhập"),

      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không hợp lệ"),
      status: string().test(
        "check-status",
        "Trạng thái không hợp lệ",
        (value) => {
          return +value === 0 || +value === 1;
        }
      ),
    });
    // console.log("userId: ", userId);
    // console.log("body: ", body);
    if (body) {
      //Gọi create
      if (body.status === "0") {
        body.status = false;
      } else if (body.status === "1") {
        body.status = true;
      }
      console.log("body.status: ", body.status);
      await userModel.updateUser(userId, body);
      req.flash("msg", "Sửa thông tin người dùng thành công");
      return res.redirect("/users");
    }
    return res.redirect("/users/update/" + userId);
  },
  delete: async (req, res) => {
    const userId = req.params.id;
    let data = await userModel.update(userId);
    let user = data && data.length > 0 ? data[0] : {};
    res.render("users/delete", { userDelete: user, id: userId, req });
  },
  handleDelete: async (req, res) => {
    const userId = req.params.id;
    // console.log("userId: ", userId);
    await userModel.deleteUser(userId);
    req.flash("msg", "Xóa người dùng thành công");
    return res.redirect("/users");
  },
};
