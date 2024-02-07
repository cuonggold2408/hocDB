var express = require("express");
var router = express.Router();
const homeController = require("../controllers/home.controller");

/* GET home page. */
router.get("/", homeController.index);
router.get("/logout", homeController.logout);

module.exports = router;
