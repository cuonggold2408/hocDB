var express = require("express");
const homeController = require("../controllers/home.controller");
const checkMiddleware = require("../middlewares/check.middleware");
var router = express.Router();

router.get("/", checkMiddleware, homeController.index);

module.exports = router;
