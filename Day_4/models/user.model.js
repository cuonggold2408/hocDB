const sql = require("../utils/db");
const bcrypt = require("bcrypt");

module.exports = {
  create: async ({ name, email, password }) => {
    const hashPassword = await bcrypt.hash(password, 10);
    return sql`INSERT INTO users(name, email, password, created_at, updated_at) VALUES(${name}, ${email}, ${hashPassword}, NOW(), NOW())`;
  },
  findStatus: (status) => {
    return sql`SELECT * FROM users WHERE status = ${status}`;
  },
  existEmail: (email) => {
    return sql`SELECT id FROM users WHERE email=${email}`;
  },
};
