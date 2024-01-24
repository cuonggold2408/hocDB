const model = require("../models/index");
const Mail = model.Mail;
const moment = require("moment-timezone");

const historyController = {
  index: async (req, res) => {
    const data = await Mail.findAll();
    // let formattedData;
    // if (data) {
    //   formattedData = data.map((item) => {
    //     try {
    //       console.log("item.time_send", item.time_send);

    //       item.time_send = moment(item.time_send).format("DD/MM/YYYY HH:mm:ss");

    //       console.log("item.time_send", item.time_send);
    //     } catch (error) {
    //       console.error("Error formatting date:", error);
    //       item.time_send = "Error formatting date";
    //     }
    //     return item;
    //   });
    // }
    res.render("history", { title: "Lịch sử gửi mail", data });
  },
};

module.exports = historyController;
