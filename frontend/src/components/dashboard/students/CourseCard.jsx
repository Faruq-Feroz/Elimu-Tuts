import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Courses.module.css';
import EnrollForm from './EnrollForm';

const CourseCard = ({ course }) => {
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);

  const handleEnroll = () => {
    setShowEnrollForm(true);
  };

  const handleEnrollmentSuccess = (data) => {
    setEnrollmentStatus('pending');
    // You can add a toast notification here
    console.log('Payment initiated:', data);
  };

  return (
    <Card className={styles.courseCard}>
      <Card.Img 
        variant="top" 
        src={course.coverImage || '/default-course-thumbnail.png'} 
        className={styles.courseCardImage}
      />
      <Card.Body>
        <Card.Title className={styles.courseTitle}>{course.title}</Card.Title>
        <Card.Text className={styles.courseDescription}>
          {course.description.length > 100 
            ? `${course.description.substring(0, 100)}...` 
            : course.description}
        </Card.Text>
        <div className={styles.courseDetails}>
          <span className={styles.subject}>
            <strong>Subject:</strong> {course.subject}
          </span>
          <span className={styles.difficulty}>
            <strong>Level:</strong> {course.level}
          </span>
          <span className={styles.price}>
            {course.price === 0 ? 'Free' : `KSh ${course.price}`}
          </span>
        </div>
        <div className={styles.courseActions}>
          <Link 
            to={`/courses/${course._id}`} 
            className={`btn btn-primary ${styles.viewDetailsBtn}`}
          >
            View Details
          </Link>
          {enrollmentStatus === 'pending' ? (
            <span className={styles.pendingStatus}>
              Payment Pending - Check your phone
            </span>
          ) : (
            <Button 
              variant="success" 
              onClick={handleEnroll}
              className={styles.enrollBtn}
            >
              Enroll Now
            </Button>
          )}
        </div>
      </Card.Body>

      {showEnrollForm && (
        <EnrollForm
          course={course}
          onClose={() => setShowEnrollForm(false)}
          onSuccess={handleEnrollmentSuccess}
        />
      )}
    </Card>
  );
};

export default CourseCard; 