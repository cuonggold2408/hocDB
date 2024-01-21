const sql = require("../utils/db");

module.exports = {
  insertData: async (user_id, device_name, time_login, device_os) => {
    // Kiểm tra xem liệu bản ghi với cùng user_id và device_name đã tồn tại hay chưa
    const existingRecord =
      await sql`SELECT * FROM devices WHERE user_id = ${user_id} AND device_name = ${device_name}`;

    // Nếu không có bản ghi nào tồn tại, thì thực hiện insertData
    if (existingRecord.length === 0) {
      return sql`INSERT INTO devices(user_id,device_name,time_login,device_os) VALUES(${user_id},${device_name},${time_login},${device_os})`;
    }
  },
  getData: async (user_id) => {
    return sql`SELECT * FROM devices WHERE user_id = ${user_id}`;
  },
  insertLastTime: async (user_id, time_action_last) => {
    return sql`UPDATE devices SET time_action_last = ${time_action_last} WHERE user_id = ${user_id}`;
  },
};
