// src/ExamPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExamPage.css"; // Add this line to import the CSS file

const ExamPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/admin/questions");
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOptionChange = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex,
    });
  };

  const handleSubmitExam = async () => {
    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      questionId,
      selectedOption: answers[questionId],
    }));

    try {
      const res = await axios.post("http://localhost:9000/api/exam/evaluate", {
        answers: formattedAnswers,
      });
      alert(`Your score: ${res.data.score}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="exam-container">
      <h2 className="exam-title">Exam</h2>
      <div className="questions-container">
        {questions.map((q, index) => (
          <div key={q._id} className="question-item">
            {/* Display the question number */}
            <h3 className="question-text">
              Question {index + 1}: {q.questionText}
            </h3>
            <div className="options-container">
              {q.answerOptions.map((option, optIndex) => (
                <div key={optIndex} className="option-item">
                  <input
                    type="radio"
                    name={q._id}
                    className="radio-input"
                    onChange={() => handleOptionChange(q._id, optIndex)}
                  />
                  <label>{option.text}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="submit-btn" onClick={handleSubmitExam}>
        Submit Exam
      </button>
    </div>
  );
};

export default ExamPage;
