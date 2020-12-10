const tag = "[dbconnect.js]";
const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");

module.exports = () => {
  function connect() {
    mongoose.set("useCreateIndex", true);
    console.log(tag, "MongoDB connecting...");
    mongoose
      .connect(`${process.env.MONGO_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        auth: { authSource: process.env.MONGO_AUTH_DB },
        user: process.env.MONGO_ID,
        pass: process.env.MONGO_PWD,
      })
      .then(() => {
        console.log(tag, "MongoDB connected.");
      })
      .catch((err) => {
        console.log(tag, "MongoDB connecting error:", err);
      });
  }
  connect();

  // if on error, do re-connect
  mongoose.connection.on("disconnected", () => {
    console.log(tag, "MongoDB disconnected, reconnect after 3sec");
    setInterval(() => {
      connect();
    }, 3000);
  });
};
