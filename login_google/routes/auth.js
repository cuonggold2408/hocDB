var express = require("express");
const authController = require("../controllers/auth.controller");
const passport = require("passport");
const loggedMiddleware = require("../middlewares/logged.middleware");
var router = express.Router();

router.get("/dang-nhap", loggedMiddleware, authController.login);
router.post("/dang-nhap", authController.handleLogin);

router.get("/dang-ky", loggedMiddleware, authController.register);
router.post("/dang-ky", authController.handleRegister);

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
