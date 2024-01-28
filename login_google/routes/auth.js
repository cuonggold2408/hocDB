var express = require("express");
const authController = require("../controllers/auth.controller");
const passport = require("passport");
const loggedMiddleware = require("../middlewares/logged.middleware");
const timelimitController = require("../controllers/timelimit.controller");
var router = express.Router();

router.get("/dang-nhap", loggedMiddleware, authController.login);
router.post("/dang-nhap", authController.handleLogin);

router.get("/dang-ky", loggedMiddleware, authController.register);
router.post("/dang-ky", authController.handleRegister);

router.get("/quen-mat-khau", authController.forgotPassword);
router.post("/quen-mat-khau", authController.handleForgotPassword);

router.get(
  "/thay-doi-mat-khau/:token",
  timelimitController,
  authController.changePassword
);
router.post("/thay-doi-mat-khau/:token", authController.handleChangePassword);

router.get(
  "/google/redirect",
  loggedMiddleware,
  passport.authenticate("google")
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/dang-nhap",
    failureFlash: true,
    successRedirect: "/",
  })
);

module.exports = router;
