const check = false;

const checkMiddleware = (req, res, next) => {
  if (!check) {
    return res.redirect("/send-mail");
  }
  next();
};

module.exports = checkMiddleware;
