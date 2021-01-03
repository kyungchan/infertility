// 라이브러리
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
// 라우터
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const testRouter = require("./routes/tests");
const imageRouter = require("./routes/images");
const indexRouter = require("./routes/index");
// 모듈
const dbconnect = require("./modules/dbconnect");
const boardInfo = require("./modules/boardInfo");

const app = express();

dotenv.config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

dbconnect();
boardInfo.setRecentCount();

app.use("/posts", postsRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/tests", testRouter);
app.use("/images", imageRouter);
app.use("/images", express.static("uploads/board/image"));
app.use("/", indexRouter);

module.exports = app;
