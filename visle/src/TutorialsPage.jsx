import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tutorialspage.css";

const TutorialsPage = () => {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9000/api/tutorial/tutorials"
      );
      setTutorials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="tutorials-page">
      <h2>Available Tutorials</h2>
      <div className="tutorial-list">
        {tutorials.length > 0 ? (
          <ul>
            {tutorials.map((tutorial) => (
              <li key={tutorial._id} className="tutorial-item">
                <h3>{tutorial.title}</h3>
                <p>{tutorial.content}</p>
                <p>
                  <strong>Tutor:</strong> {tutorial.tutor}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tutorials available.</p>
        )}
      </div>
    </div>
  );
};

export default TutorialsPage;
