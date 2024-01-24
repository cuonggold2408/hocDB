const mailer = require("../utils/mail");
const model = require("../models/index");
const Mail = model.Mail;
const { format } = require("date-fns");
const { vi } = require("date-fns/locale");

const mailController = {
  index: (req, res) => {
    res.render("mail/index", {
      title: "Gửi mail",
      successSend: req.flash("successSend"),
    });
  },
  sendMail: async (req, res) => {
    const body = req.body;
    const { email, title, content } = body;
    const currentDate = new Date();
    formattedDate = format(currentDate, "d MMMM yyyy", {
      locale: vi,
    });

    try {
      const info = await mailer(email, title, content);
      const mail = await Mail.create({
        email: email,
        title: title,
        content: content,
        time_send: currentDate,
      });
      req.flash("successSend", "Gửi mail thành công");
      return res.redirect("/send-mail");
    } catch (error) {
      console.error("Email không thể gửi:", error);

      return res.redirect("/send-mail");
    }
  },
};

module.exports = mailController;
