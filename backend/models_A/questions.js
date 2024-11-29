// models/Question.js
const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  answerOptions: [{ text: String, isCorrect: Boolean }], // answerOptions stores options with one marked as correct
});

module.exports = mongoose.model("Question", QuestionSchema);
