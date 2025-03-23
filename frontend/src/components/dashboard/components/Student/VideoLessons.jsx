// src/components/VideoLessons.jsx
import React from 'react';

const VideoLessons = () => {
  return (
    <div className="container mt-4">
      <h2>Video Lessons</h2>
      <p>This component will display various video lessons for the student.</p>
      
      {/* Placeholder for video content */}
      <div className="row mt-4">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Introduction to Algebra</h5>
              <p className="card-text">Learn the basics of algebra with our interactive video.</p>
              <button className="btn btn-primary">Watch Now</button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Chemistry Fundamentals</h5>
              <p className="card-text">Explore the world of atoms and molecules.</p>
              <button className="btn btn-primary">Watch Now</button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">English Grammar</h5>
              <p className="card-text">Master the rules of grammar with our comprehensive guide.</p>
              <button className="btn btn-primary">Watch Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLessons;