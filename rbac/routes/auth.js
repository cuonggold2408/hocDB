var express = require("express");
const authController = require("../controllers/auth.controller");
const passport = require("passport");
var router = express.Router();

router.get("/dang-nhap", authController.login);
router.post(
  "/dang-nhap",
  passport.authenticate("local", {
    failureRedirect: "/auth/dang-nhap",
    failureFlash: true,
    badRequestMessage: "Vui lòng nhập đầy đủ thông tin",
    successRedirect: "/",
  })
);

router.get("/dang-ky", authController.register);
router.post("/dang-ky", authController.handleRegister);

module.exports = router;
