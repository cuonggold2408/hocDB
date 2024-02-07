var express = require("express");
var router = express.Router();
const roleController = require("../controllers/role.controller");
const permissionMiddleware = require("../middlewares/permission.middleware");

router.get("/", permissionMiddleware("roles.read"), roleController.index);

router.get("/add", permissionMiddleware("roles.create"), roleController.add);
router.post(
  "/add",
  permissionMiddleware("roles.create"),
  roleController.handleAdd
);

router.get(
  "/edit/:id",
  permissionMiddleware("roles.update"),
  roleController.edit
);
router.post(
  "/edit/:id",
  permissionMiddleware("roles.update"),
  roleController.handleEdit
);

router.post(
  "/delete/:id",
  permissionMiddleware("roles.delete"),
  roleController.delete
);

module.exports = router;
