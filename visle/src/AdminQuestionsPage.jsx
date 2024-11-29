import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminQuestionsPage.css"; // External CSS for styling

const AdminQuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState([
    { text: "", isCorrect: false },
  ]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null); // For updating questions

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

  const handleAddOption = () => {
    setNewOptions([...newOptions, { text: "", isCorrect: false }]);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index].text = value;
    setNewOptions(updatedOptions);
  };

  const handleCreateQuestion = async () => {
    const updatedOptions = newOptions.map((option, index) => ({
      ...option,
      isCorrect: index === correctOptionIndex,
    }));

    try {
      await axios.post("http://localhost:9000/api/admin/questions", {
        questionText: newQuestion,
        answerOptions: updatedOptions,
      });
      fetchQuestions();
      setNewQuestion("");
      setNewOptions([{ text: "", isCorrect: false }]);
      setCorrectOptionIndex(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/admin/questions/${id}`);
      fetchQuestions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setNewQuestion(question.questionText);
    setNewOptions(question.answerOptions);
    const correctIndex = question.answerOptions.findIndex(
      (option) => option.isCorrect
    );
    setCorrectOptionIndex(correctIndex);
  };

  const handleUpdateQuestion = async () => {
    const updatedOptions = newOptions.map((option, index) => ({
      ...option,
      isCorrect: index === correctOptionIndex,
    }));

    try {
      await axios.put(
        `http://localhost:9000/api/admin/questions/${editingQuestion._id}`,
        {
          questionText: newQuestion,
          answerOptions: updatedOptions,
        }
      );
      fetchQuestions();
      setEditingQuestion(null);
      setNewQuestion("");
      setNewOptions([{ text: "", isCorrect: false }]);
      setCorrectOptionIndex(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-container">
      {/* Container for adding questions */}
      <div className="floating-container add-question">
        <h2>{editingQuestion ? "Edit Question" : "Add Question"}</h2>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Enter question"
        />
        {newOptions.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
            <input
              type="radio"
              name="correctOption"
              checked={correctOptionIndex === index}
              onChange={() => setCorrectOptionIndex(index)}
            />{" "}
            Correct
          </div>
        ))}
        <button onClick={handleAddOption}>Add Option</button>
        <button
          onClick={
            editingQuestion ? handleUpdateQuestion : handleCreateQuestion
          }
        >
          {editingQuestion ? "Update Question" : "Create Question"}
        </button>
      </div>

      {/* Container for managing questions */}
      <div className="floating-container manage-questions">
        <h2>Manage Questions</h2>

        {questions.map((q, index) => (
          <li key={q._id} className="question-item">
            <strong>
              Question {index + 1}: {q.questionText}
            </strong>
            <ul className="answer-list">
              {q.answerOptions.map((option, i) => (
                <li key={i} className="answer-item">
                  {option.text} {option.isCorrect ? "(Correct)" : ""}
                </li>
              ))}
            </ul>
            <div className="button-group">
              <button onClick={() => handleEditQuestion(q)}>Edit</button>
              <button onClick={() => handleDeleteQuestion(q._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default AdminQuestionsPage;
