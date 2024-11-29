const express = require("express");
const Tutorial = require("../models_A/tutorials");
const router = express.Router();

// Create a new tutorial
router.post("/tutorials", async (req, res) => {
  const { title, content, tutor } = req.body;
  try {
    const newTutorial = new Tutorial({ title, content, tutor });
    await newTutorial.save();
    res.status(201).json(newTutorial);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all tutorials
router.get("/tutorials", async (req, res) => {
  try {
    const tutorials = await Tutorial.find();
    res.status(200).json(tutorials);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a tutorial
router.put("/tutorials/:id", async (req, res) => {
  try {
    const updatedTutorial = await Tutorial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTutorial);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a tutorial
router.delete("/tutorials/:id", async (req, res) => {
  try {
    await Tutorial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Tutorial deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
