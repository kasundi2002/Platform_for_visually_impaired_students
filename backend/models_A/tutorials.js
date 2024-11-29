const mongoose = require("mongoose");

const TutorialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  tutor: { type: String, default: "" },
});

module.exports = mongoose.model("Tutorial", TutorialSchema);
