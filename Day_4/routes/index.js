var express = require("express");
const authController = require("../controllers/auth.controller");
const homeController = require("../controllers/home.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const loggedMiddleware = require("../middlewares/logged.middleware");
var router = express.Router();

router.get("/", authMiddleware, homeController.index);
router.post("/", homeController.logout);

router.get("/login", loggedMiddleware, authController.login);
router.post("/login", authController.handleLogin);

router.get("/register", loggedMiddleware, authController.register);
router.post("/register", authController.handleRegister);

router.get("/doi-mat-khau", authController.changePassword);
router.post("/doi-mat-khau", authController.handleChangePassword);

module.exports = router;
