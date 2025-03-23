// src/components/PracticeTests.jsx
import React from 'react';

const PracticeTests = () => {
  return (
    <div className="container mt-4">
      <h2>Practice Tests</h2>
      <p>Prepare for your exams with these practice tests.</p>

      <div className="list-group mt-4">
        <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">Mathematics End Term Test</h5>
            <p className="mb-1">60 minutes | 50 questions</p>
          </div>
          <button className="btn btn-outline-primary">Start Test</button>
        </div>
        <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">Science Mock Exam</h5>
            <p className="mb-1">90 minutes | 75 questions</p>
          </div>
          <button className="btn btn-outline-primary">Start Test</button>
        </div>
        <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">English Language Assessment</h5>
            <p className="mb-1">45 minutes | 40 questions</p>
          </div>
          <button className="btn btn-outline-primary">Start Test</button>
        </div>
      </div>
    </div>
  );
};

export default PracticeTests;