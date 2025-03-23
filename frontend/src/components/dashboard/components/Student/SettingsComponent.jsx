// src/components/Settings.jsx
import React from 'react';

const SettingsComponent = () => {
  return (
    <div className="container mt-4">
      <h2>Settings</h2>
      <p>Manage your account settings and preferences.</p>
      
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="list-group">
            <button className="list-group-item list-group-item-action active">Profile</button>
            <button className="list-group-item list-group-item-action">Notifications</button>
            <button className="list-group-item list-group-item-action">Privacy</button>
            <button className="list-group-item list-group-item-action">Appearance</button>
            <button className="list-group-item list-group-item-action">Subscription</button>
            <button className="list-group-item list-group-item-action">Password</button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Profile Settings</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" defaultValue="John" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" id="phone" defaultValue="+254 712 345 678" />
                </div>
                <div className="mb-3">
                  <label htmlFor="grade" className="form-label">Grade Level</label>
                  <select className="form-select" id="grade">
                    <option>Grade 7</option>
                    <option>Grade 8</option>
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="bio" className="form-label">Bio</label>
                  <textarea className="form-control" id="bio" rows="3" defaultValue="I'm a student interested in science and mathematics."></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="profilePic" className="form-label">Profile Picture</label>
                  <input type="file" className="form-control" id="profilePic" />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;