const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

require("dotenv").config();
const compression = require("compression");
const CORS = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");

const indexRouter = require("./routes/index");

const todo = require("./routes/todolist");

var db = require("./models");

const app = express();

//Sync Database
db.sequelize
  .sync()
  .then(function () {
    console.log("Nice! Database looks fine");
  })
  .catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

app.use(compression());
app.use(CORS());

app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,DELETE,PUT");
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "k#y$", resave: false, saveUninitialized: true }));

app.use("/", indexRouter);

app.use("/todo", todo);

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
