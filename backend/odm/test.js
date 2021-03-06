const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  testee: { type: mongoose.Types.ObjectId, required: true },
  answer: { type: Object, required: true },
  createdAt: { type: Date, default: new Date() },
  score: { type: Number, default: 0 },
});

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  surveyData: { type: Object, required: true },
  answers: { type: [answerSchema] },
});

module.exports = mongoose.model("test", testSchema);
