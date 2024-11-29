const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  studentResponses: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      response: String,
      isCorrect: Boolean,
    },
  ],
  score: { type: Number, default: 0 },
});

const Exam = mongoose.model("Exam", ExamSchema);
module.exports = Exam;
