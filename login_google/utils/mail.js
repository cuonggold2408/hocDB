"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "cuonggold2408@gmail.com",
    pass: "pptw xvpm bqpa paxt",
  },
});

module.exports = async (to, subject, content) => {
  const info = await transporter.sendMail({
    from: '"Cường Nguyễn 👻" <cuonggold2408@gmail.com>',
    to,
    subject,
    html: "Link này đổi mật khẩu chỉ có thời hạn 15 phút " + content,
  });
  return info;
};
