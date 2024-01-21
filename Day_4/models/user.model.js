const sql = require("../utils/db");
const bcrypt = require("bcrypt");

module.exports = {
  create: async ({ name, email, password }) => {
    const hashPassword = await bcrypt.hash(password, 10);
    return sql`INSERT INTO users(name, email, password, created_at, updated_at) VALUES(${name}, ${email}, ${hashPassword}, NOW(), NOW())`;
  },

  existEmail: (email) => {
    return sql`SELECT id FROM users WHERE email=${email}`;
  },
  getPassword: (email) => {
    return sql`SELECT password FROM users WHERE email = ${email}`;
  },
  checkPassword: async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
  },
  changePassword: async (email, password) => {
    const hashPassword = await bcrypt.hash(password, 10);
    return sql`UPDATE users SET password = ${hashPassword} WHERE email = ${email}`;
  },
  getUser: async (email) => {
    return sql`SELECT id,name FROM users WHERE email = ${email}`;
  },
  getStatus: async (email) => {
    return sql`SELECT status FROM users WHERE email = ${email}`;
  },
};
