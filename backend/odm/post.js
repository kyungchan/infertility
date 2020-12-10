const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  boardCode: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  preview: { type: String },
  createdAt: { type: Date, default: new Date() },
  view: { type: Number, default: 0 },
});

module.exports = mongoose.model("post", postSchema);
