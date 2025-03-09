import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [language, setLanguage] = useState('C++');
  const [code, setCode] = useState('');

  // Disable right-click, copy, and paste
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    const disableCopyPaste = (e) => {
      e.preventDefault();
    };

    // Add event listeners
    document.addEventListener('contextmenu', disableRightClick); // Disable right-click
    document.addEventListener('copy', disableCopyPaste); // Disable copy
    document.addEventListener('paste', disableCopyPaste); // Disable paste

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('copy', disableCopyPaste);
      document.removeEventListener('paste', disableCopyPaste);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = {
      name,
      college,
      language,
      code,
      timestamp: new Date().toISOString(),
    };

    try {
      // Replace with your Google Apps Script Web App URL
      const response = await axios.post(
        'https://script.google.com/macros/s/AKfycbwWM78hFsLucA7lqH26IO0gmaHbR0kNXWnW5tgKwB6G1Mk5lOawnkxDNBNlcKpSQNPn/exec',
        submission
      );
      console.log('Submission successful:', response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Form submission failed. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Code Submission Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>College:</label>
          <input
            type="text"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Programming Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          >
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
          </select>
        </div>

        <div className="form-group">
          <label>Question:</label>
          <div className="question-text">
            <p>
              <strong>Problem Statement:</strong> Write a function to reverse a string.
            </p>
            <p>
              <strong>Test Case 1:</strong> Input: "hello" → Output: "olleh"
            </p>
            <p>
              <strong>Test Case 2:</strong> Input: "world" → Output: "dlrow"
            </p>
            <p>
              <strong>Test Case 3:</strong> Input: "12345" → Output: "54321"
            </p>
          </div>
        </div>

        <div className="form-group">
          <label>Code:</label>
          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;