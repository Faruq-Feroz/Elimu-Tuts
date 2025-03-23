// src/components/Calendar.jsx
import React from 'react';

const CalendarComponent = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  
  return (
    <div className="container mt-4">
      <h2>Academic Calendar</h2>
      <p>Manage your study schedule and upcoming events.</p>
      
      <div className="card mt-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{currentMonth}</h5>
          <div>
            <button className="btn btn-sm btn-outline-secondary me-2">Previous</button>
            <button className="btn btn-sm btn-outline-secondary">Next</button>
          </div>
        </div>
        <div className="card-body">
          {/* This would be replaced with an actual calendar component */}
          <div className="alert alert-info">
            This is a placeholder for a full calendar component. In a complete implementation, 
            you would integrate a library like react-big-calendar or FullCalendar.
          </div>
          
          <h5 className="mt-4">Upcoming Events</h5>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>Mathematics Quiz</strong>
                <p className="mb-0 text-muted">March 25, 2025 • 10:00 AM</p>
              </div>
              <span className="badge bg-primary rounded-pill">2 days</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>Science Project Deadline</strong>
                <p className="mb-0 text-muted">April 2, 2025 • 11:59 PM</p>
              </div>
              <span className="badge bg-warning rounded-pill">10 days</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>Live English Class</strong>
                <p className="mb-0 text-muted">April 5, 2025 • 3:00 PM</p>
              </div>
              <span className="badge bg-info rounded-pill">13 days</span>
            </li>
          </ul>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary">Add New Event</button>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;