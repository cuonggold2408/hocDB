var express = require("express");
var router = express.Router();
const passport = require("passport");
const authController = require("../controllers/api/v1/auth.controller");
const { ServerResponse } = require("http");
const { errorResponse } = require("../utils/response");

router.get("/auth/google", (req, res) => {
  const emptyResponse = new ServerResponse(req);

  passport.authenticate(
    "google",
    { scope: ["profile", "email"], session: false },
    (err, user, info) => {
      console.log(err, user, info);
      errorResponse(res, 400, "Lỗi lấy link redirect từ google", err);
    }
  )(req, emptyResponse);

  const url = emptyResponse.getHeader("location");
  return res.status(200).json({
    status: 200,
    success: true,
    message: "Lấy link redirect từ google thành công",

    result: {
      urlRedirect: url,
    },
  });
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  authController.login
);

router.get("/auth/github", (req, res) => {
  const emptyResponse = new ServerResponse(req);

  passport.authenticate(
    "github",
    { scope: ["user:email"], session: false },
    (err, user, info) => {
      console.log(err, user, info);
      errorResponse(res, 400, "Lỗi lấy link redirect từ github", err);
    }
  )(req, emptyResponse);

  const url = emptyResponse.getHeader("location");
  return res.status(200).json({
    status: 200,
    success: true,
    message: "Lấy link redirect từ github thành công",

    result: {
      urlRedirect: url,
    },
  });
});

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { session: false }),
  authController.login
);

module.exports = router;
