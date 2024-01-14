var express = require("express");
const authController = require("../controllers/auth.controller");
const homeController = require("../controllers/home.controller");
const authMiddleware = require("../middlewares/auth.middleware");
var router = express.Router();

router.get("/", authMiddleware, homeController.index);

router.get("/login", authController.login);
router.post("/login", authController.handleLogin);

router.get("/register", authController.register);
router.post("/register", authController.handleRegister);

module.exports = router;
