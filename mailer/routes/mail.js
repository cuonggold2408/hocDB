var express = require("express");
const mailController = require("../controllers/mail.controller");
var router = express.Router();

/* GET users listing. */
router.get("/", mailController.index);
router.post("/", mailController.sendMail);

module.exports = router;
