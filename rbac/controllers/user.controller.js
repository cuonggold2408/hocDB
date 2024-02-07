const { User, Role } = require("../models/index");

const userController = {
  index: async (req, res) => {
    const users = await User.findAll();
    res.render("users/index", { req, users });
  },
  permission: async (req, res) => {
    const { id } = req.params;
    const roles = await Role.findAll();
    const user = await User.findByPk(id, {
      include: {
        model: Role,
        as: "roles",
      },
    });

    res.render("users/permission", { req, roles, user });
  },
  handlePermission: async (req, res) => {
    const { id } = req.params;
    if (!req.body.roles) {
      req.body.roles = [];
    }

    const roles = Array.isArray(req.body.roles)
      ? req.body.roles
      : [req.body.roles];

    const user = await User.findByPk(id);
    if (user) {
      const roleInstances = await Promise.all(
        roles.map((roleId) => Role.findByPk(roleId))
      );
      await user.setRoles(roleInstances);
    }
    return res.redirect("/users/permission/" + id);
  },
};

module.exports = userController;
