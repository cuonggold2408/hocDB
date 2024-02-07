const { Role, Permission, User } = require("../models/index");
const { isPermission } = require("../utils/permission");

const roleController = {
  index: async (req, res) => {
    const roles = await Role.findAll({
      order: [["id", "desc"]],
    });
    res.render("roles/index", { req, roles });
  },
  add: (req, res) => {
    res.render("roles/add", { req });
  },
  handleAdd: async (req, res) => {
    let { name, permissions } = req.body;
    if (!name) {
      req.flash("msg", "Vui lòng nhập tên vai trò");
      return res.redirect("/roles/add");
    }

    if (!permissions) {
      permissions = [];
    }

    permissions = Array.isArray(permissions) ? permissions : [permissions];

    const role = await Role.create({ name });

    if (role && permissions.length) {
      // Lấy được 1 mảng chứa danh sách các instance của từng permission (Đã được thêm vào database hoặc được lấy ra từ database)
      const permissionInstances = await Promise.all(
        permissions.map(async (value) => {
          const [permissionInstance] = await Permission.findOrCreate({
            where: {
              value: value.trim(),
            },
            defaults: {
              name: value.trim(),
            },
          });
          return permissionInstance;
        })
      );
      //Thêm role và permission vào bảng: roles_permissions
      await role.addPermissions(permissionInstances);
    }

    // const role = await Role.create({ name });
    // return res.redirect("/roles/add");
    return res.redirect("/roles");
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const role = await Role.findByPk(id, {
      include: {
        model: Permission,
        as: "permissions",
      },
    });
    res.render("roles/edit", { req, role, isPermission });
  },
  handleEdit: async (req, res) => {
    const { id } = req.params;
    let { name, permissions } = req.body;
    if (!name) {
      req.flash("msg", "Vui lòng nhập tên vai trò");
      return res.redirect("/roles/edit/" + id);
    }

    if (!permissions) {
      permissions = [];
    }

    permissions = Array.isArray(permissions) ? permissions : [permissions];

    await Role.update({ name }, { where: { id } });
    const role = await Role.findByPk(id);

    if (role && permissions.length) {
      // Lấy được 1 mảng chứa danh sách các instance của từng permission (Đã được thêm vào database hoặc được lấy ra từ database)
      const permissionInstances = await Promise.all(
        permissions.map(async (value) => {
          const [permissionInstance] = await Permission.findOrCreate({
            where: {
              value: value.trim(),
            },
            defaults: {
              name: value.trim(),
            },
          });
          return permissionInstance;
        })
      );
      //Thêm role và permission vào bảng: roles_permissions
      await role.setPermissions(permissionInstances);
    }

    // const role = await Role.create({ name });
    // return res.redirect("/roles/add");
    return res.redirect("/roles/edit/" + id);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const role = await Role.findByPk(id, {
      include: [
        {
          model: Permission,
          as: "permissions",
        },
        {
          model: User,
          as: "users",
        },
      ],
    });
    await role.removePermissions(role.permissions);
    await role.removeUsers(role.users);
    await role.destroy();
    return res.redirect("/roles");
  },
};

module.exports = roleController;
