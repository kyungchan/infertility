const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");

const dbconnect = require("./modules/dbconnect");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

dbconnect();

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

module.exports = app;
