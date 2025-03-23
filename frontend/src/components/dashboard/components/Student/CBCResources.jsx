// src/components/CBCResources.jsx
import React from 'react';

const CBCResources = () => {
  return (
    <div className="container mt-4">
      <h2>CBC Resources</h2>
      <p>Resources aligned with the Competency-Based Curriculum (CBC).</p>

      <div className="accordion mt-4" id="cbcResourcesAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Lower Primary (Grades 1-3)
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#cbcResourcesAccordion">
            <div className="accordion-body">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Grade 1 English Activities
                  <button className="btn btn-sm btn-outline-primary">Access</button>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Grade 2 Mathematics Workbook
                  <button className="btn btn-sm btn-outline-primary">Access</button>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Grade 3 Environmental Activities
                  <button className="btn btn-sm btn-outline-primary">Access</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Upper Primary (Grades 4-6)
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#cbcResourcesAccordion">
            <div className="accordion-body">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Grade 4 Science Experiments
                  <button className="btn btn-sm btn-outline-primary">Access</button>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Grade 5 Social Studies Projects
                  <button className="btn btn-sm btn-outline-primary">Access</button>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Grade 6 Art and Craft Ideas
                  <button className="btn btn-sm btn-outline-primary">Access</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Junior Secondary (Grades 7-9)
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#cbcResourcesAccordion">
            <div className="accordion-body">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Grade 7 Pre-Technical Studies
                  <button className="btn btn-sm btn-outline-primary">Access</button>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Grade 8 Integrated Science
                  <button className="btn btn-sm btn-outline-primary">Access</button>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Grade 9 Business Studies
                  <button className="btn btn-sm btn-outline-primary">Access</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CBCResources;