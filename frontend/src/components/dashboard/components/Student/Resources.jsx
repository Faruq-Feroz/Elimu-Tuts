// src/components/Resources.jsx
import React from 'react';

const ResourcesComponent = () => {
  return (
    <div className="container mt-4">
      <h2>Learning Resources</h2>
      <p>Access additional learning materials to enhance your studies.</p>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Study Guides</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Mathematics Formula Sheet
                <button className="btn btn-sm btn-outline-primary">Download</button>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Science Lab Safety Rules
                <button className="btn btn-sm btn-outline-primary">Download</button>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                English Grammar Reference
                <button className="btn btn-sm btn-outline-primary">Download</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Reference Materials</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Periodic Table
                <button className="btn btn-sm btn-outline-primary">View</button>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                World Map
                <button className="btn btn-sm btn-outline-primary">View</button>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Historical Timeline
                <button className="btn btn-sm btn-outline-primary">View</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesComponent;