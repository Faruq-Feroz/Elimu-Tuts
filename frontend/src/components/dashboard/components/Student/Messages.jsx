// src/components/Messages.jsx
import React, { useState } from 'react';

const MessagesComponent = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  
  return (
    <div className="container mt-4">
      <h2>Messages</h2>
      <p>Communicate with tutors and classmates.</p>
      
      <div className="card mt-4">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'inbox' ? 'active' : ''}`} 
                onClick={() => setActiveTab('inbox')}
              >
                Inbox
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'sent' ? 'active' : ''}`} 
                onClick={() => setActiveTab('sent')}
              >
                Sent
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'tutors' ? 'active' : ''}`} 
                onClick={() => setActiveTab('tutors')}
              >
                Tutors
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {activeTab === 'inbox' && (
            <div>
              <div className="list-group">
                <div className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Quiz Feedback</h5>
                    <small className="text-muted">3 days ago</small>
                  </div>
                  <p className="mb-1">From: Mr. James (Math Tutor)</p>
                  <small className="text-muted">Great job on your recent quiz! I have some suggestions...</small>
                </div>
                <div className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Study Group Invitation</h5>
                    <small className="text-muted">1 week ago</small>
                  </div>
                  <p className="mb-1">From: Sarah W. (Classmate)</p>
                  <small className="text-muted">Would you like to join our science study group?</small>
                </div>
                <div className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Assignment Extension</h5>
                    <small className="text-muted">2 weeks ago</small>
                  </div>
                  <p className="mb-1">From: Mrs. Kamau (English Tutor)</p>
                  <small className="text-muted">I've approved your request for an extension...</small>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'sent' && (
            <div>
              <div className="list-group">
                <div className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Help with Math Problem</h5>
                    <small className="text-muted">1 day ago</small>
                  </div>
                  <p className="mb-1">To: Mr. James (Math Tutor)</p>
                  <small className="text-muted">I'm having trouble with question 5 in the homework...</small>
                </div>
                <div className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Study Group Response</h5>
                    <small className="text-muted">5 days ago</small>
                  </div>
                  <p className="mb-1">To: Sarah W. (Classmate)</p>
                  <small className="text-muted">Yes, I'd love to join the study group...</small>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'tutors' && (
            <div>
              <div className="list-group">
                <div className="list-group-item list-group-item-action d-flex align-items-center">
                  <div className="me-3">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>MJ</div>
                  </div>
                  <div>
                    <h5 className="mb-1">Mr. James</h5>
                    <p className="mb-0 text-muted">Mathematics Tutor</p>
                  </div>
                  <button className="btn btn-outline-primary ms-auto">Message</button>
                </div>
                <div className="list-group-item list-group-item-action d-flex align-items-center">
                  <div className="me-3">
                    <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>MK</div>
                  </div>
                  <div>
                    <h5 className="mb-1">Mrs. Kamau</h5>
                    <p className="mb-0 text-muted">English Tutor</p>
                  </div>
                  <button className="btn btn-outline-primary ms-auto">Message</button>
                </div>
                <div className="list-group-item list-group-item-action d-flex align-items-center">
                  <div className="me-3">
                    <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>DO</div>
                  </div>
                  <div>
                    <h5 className="mb-1">Dr. Omondi</h5>
                    <p className="mb-0 text-muted">Science Tutor</p>
                  </div>
                  <button className="btn btn-outline-primary ms-auto">Message</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="card-footer">
          <button className="btn btn-primary">Compose New Message</button>
        </div>
      </div>
    </div>
  );
};

export default MessagesComponent;