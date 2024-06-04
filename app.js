const express = require("express");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
const routes = require("./routes/routes");
const route_data = require("./routes/db_apis");
const cors = require("cors");

require("dotenv").config();
const app = express();

app.use(express.static("public"));
app.use(cookieParser());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.TOKEN_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.use(routes);
app.use(route_data);

app.listen(80);

console.log("https://nervous-field-93678.pktriot.net/");



