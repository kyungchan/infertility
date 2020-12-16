const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");

const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const testRouter = require("./routes/tests");
const indexRouter = require("./routes/index");

const dbconnect = require("./modules/dbconnect");

const app = express();

dotenv.config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

dbconnect();

app.use("/posts", postsRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/tests", testRouter);
app.use("/", indexRouter);

module.exports = app;
