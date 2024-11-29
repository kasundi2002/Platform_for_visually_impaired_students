// routes/admin.js
const express = require("express");
const Question = require("../models_A/questions");
const router = express.Router();

// Create a new question
router.post("/questions", async (req, res) => {
  const { questionText, answerOptions } = req.body;
  try {
    const newQuestion = new Question({ questionText, answerOptions });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all questions
router.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a question
router.delete("/questions/:id", async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/questions/:id", async (req, res) => {
  const { questionText, answerOptions } = req.body;
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { questionText, answerOptions },
      { new: true }
    );
    res.status(200).json(updatedQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
