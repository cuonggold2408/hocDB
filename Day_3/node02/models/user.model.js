const sql = require("../utils/db");

module.exports = {
  all: (status, keyword) => {
    // console.log(status);
    let filter = sql`WHERE id IS NOT NULL`;

    if (status === "active" || status === "inactive") {
      filter = sql`${filter} AND status = ${status === "active"}`;
    }
    if (keyword) {
      filter = sql`${filter} AND (LOWER(email) LIKE ${`%${keyword.toLowerCase()}%`} OR LOWER(name) LIKE ${`%${keyword.toLowerCase()}%`})`;
    }
    return sql`SELECT * FROM users ${filter}`;
  },
  checkEmail: (email) => {
    return sql`SELECT * FROM users WHERE email = ${email}`;
  },
  create: ({ name, email, status }) => {
    return sql`INSERT INTO users(name, email, status, created_at, updated_at) VALUES(${name}, ${email}, ${status}, NOW(), NOW())`;
  },
  update: (userId) => {
    return sql`SELECT name,email,status FROM users WHERE id = ${userId}`;
  },
  updateUser: (userId, { name, email, status }) => {
    return sql`UPDATE users SET name = ${name}, email = ${email}, status = ${status} WHERE id = ${userId}`;
  },
  deleteUser: (userId) => {
    return sql`DELETE FROM users WHERE id = ${userId}`;
  },
};
