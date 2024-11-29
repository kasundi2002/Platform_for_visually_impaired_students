require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors package
const app = express();

const adminRoutes = require("./Routes_A/admin");
const examRoutes = require("./Routes_A/exam");
const tutorialRoutes = require("./Routes_A/tutorial");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/tutorial", tutorialRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("Error connecting to database:", err));

app.get("/", (req, res) => {
  res.send("Welcome to project Tech?H");
});

app.get("/gf", (req, res) => {
  res.send("Welcome to project Tech?Hostel");
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
