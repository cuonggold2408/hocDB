const deviceModel = require("../models/device.model");
const useragent = require("express-useragent");
const { format } = require("date-fns");
const { vi } = require("date-fns/locale");

const homeController = {
  index: async (req, res, next) => {
    let user;
    let userId;
    let formattedDate;
    let formatTimeLogout;
    let records;
    const source = req.headers["user-agent"];
    const ua = useragent.parse(source);
    try {
      console.log("req.session.user", req.session.user);
      user = req.session.user[0].name;
      userId = req.session.user[0].id;
      // const currentDate = new Date();
      // formattedDate = format(currentDate, "d MMMM yyyy", {
      //   locale: vi,
      // });
      const timeLogout = req.session.lastActivity;
      if (timeLogout !== "") {
        // formatTimeLogout = format(timeLogout, "d MMMM yyyy", {
        //   locale: vi,
        // });
        await deviceModel.insertLastTime(userId, timeLogout);
      }

      // console.log("formattedDate", formattedDate);
      await deviceModel.insertData(userId, ua.browser, new Date(), ua.os);
      records = await deviceModel.getData(userId);
      console.log("records", records);
    } catch (e) {
      return next(e);
    }
    res.render("index", {
      user: user,
      title: "Trang chủ",
      os: ua.os, // hệ điều hành
      browser: ua.browser, // trình duyệt
      records: records,
      format: format,
      vi: vi,
    });
  },

  logout: (req, res) => {
    const logout = new Date();
    req.session.lastActivity = logout;
    req.flash("successLogout", "Đăng xuất thành công");
    delete req.session.user;
    delete req.session.statusLogin;
    return res.redirect("/login");
  },

  // index: (req, res) => {
  //   res.render("index", { });
  // },
};

module.exports = homeController;
