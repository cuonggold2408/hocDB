const jwt = require("jsonwebtoken");

module.exports = {
  // Tạo access token
  createAccessToken: (data = {}) => {
    const { JWT_SECRET, JWT_ACCESS_TOKEN_EXPIRE } = process.env;
    const token = jwt.sign(data, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRE,
    });
    return token;
  },

  // verify access token
  decodeToken: (token) => {
    const { JWT_SECRET } = process.env;
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  },

  createRefreshToken: () => {
    const { JWT_SECRET, JWT_REFRESH_TOKEN_EXPIRE } = process.env;

    const data = Math.random() + new Date().getTime();
    const token = jwt.sign({ data }, JWT_SECRET, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRE,
    });
    return token;
  },
};
