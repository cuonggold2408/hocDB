var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const permissionMiddleware = require("../middlewares/permission.middleware");

router.get("/", permissionMiddleware("users.read"), userController.index);

router.get(
  "/permission/:id",
  permissionMiddleware("users.update"),
  userController.permission
);
router.post(
  "/permission/:id",
  permissionMiddleware("users.update"),
  userController.handlePermission
);

module.exports = router;
