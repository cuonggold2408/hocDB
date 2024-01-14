require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
// var loginRouter = require("./routes/login");
const flash = require("connect-flash");
const session = require("express-session");
const validateMiddleware = require("./middlewares/validate.middleware");

var app = express();

app.use(
  session({
    secret: "bt_d4",
    name: "d4_session_id",
  })
);

app.use(flash());

// Set mặc định trạng thái đăng nhập lên session
app.use((req, res, next) => {
  if (req.session.statusLogin === undefined) {
    req.session.statusLogin = false;
  }
  if (req.session.user === undefined) {
    req.session.user = {};
  }
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(validateMiddleware);

app.use("/", indexRouter);
// app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
