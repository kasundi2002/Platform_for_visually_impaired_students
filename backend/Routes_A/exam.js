// routes/exam.js
const express = require("express");
const Question = require("../models_A/questions");
const router = express.Router();

// Evaluate student's answers
router.post("/evaluate", async (req, res) => {
  const { answers } = req.body; // Array of question IDs and selected options
  let score = 0;

  try {
    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);
      if (question.answerOptions[answer.selectedOption].isCorrect) {
        score += 1;
      }
    }

    res.status(200).json({ score });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
