var express = require("express");
const historyController = require("../controllers/history.controller");
var router = express.Router();

router.get("/", historyController.index);

module.exports = router;
