var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const url = "mongodb://127.0.0.1:27017/Neuroscan";
const dotenv = require("dotenv");
var cors = require("cors");
app.use(cors());
// get config vars
dotenv.config();

mongoose.connect(url, function (err, connect) {
  if (err) throw err;
  console.log("Connected");
});

// const connection = mongoose.connect('mongodb://127.0.0.1:27017/Neuroscan', { useNewUrlParser: true, useUnifiedTopology: true });
// var app = express();
// connection.then((db) => {
//     console.log("Connected correctly to server");
// }, (err) => { console.log(err); });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var eegRouter = require("./routes/eeg");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/eeg", eegRouter);

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
