const loggedMiddleware = (req, res, next) => {
  if (req.user) {
    return res.redirect("/");
  }
  return next();
};

module.exports = loggedMiddleware;
