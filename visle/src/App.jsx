// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminQuestionsPage from "./AdminQuestionsPage";
import AdminTutorialsPage from "./AdminTutorialsPage";
import ExamPage from "./examPage";
import TutorialsPage from "./TutorialsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route will be AdminQuestionsPage */}
        <Route path="/" element={<AdminQuestionsPage />} />

        {/* Explicit route for AdminQuestionsPage */}
        <Route path="/AdminQuestionsPage" element={<AdminQuestionsPage />} />

        {/* Route for ExamPage */}
        <Route path="/exam" element={<ExamPage />} />

        {/* Route for AdminTutorialsPage */}
        <Route path="/AdminTutorialsPage" element={<AdminTutorialsPage />} />

        <Route path="/TutorialsPage" element={<TutorialsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
