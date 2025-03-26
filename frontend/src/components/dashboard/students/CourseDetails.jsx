import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuizzes } from '../../../context/QuizContext';
import styles from './CourseDetails.module.css';

const CourseDetails = () => {
  const { courseId } = useParams();
  const { quizzes, loading, error, fetchCourseQuizzes } = useQuizzes();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetchCourseQuizzes(courseId);
      // TODO: Fetch course details from CourseContext
      // This is a placeholder for now
      setCourse({
        title: 'Sample Course',
        description: 'This is a sample course description.',
        instructor: 'John Doe',
        duration: '8 weeks',
        level: 'Beginner',
        price: '$99.99'
      });
    }
  }, [courseId, fetchCourseQuizzes]);

  if (loading) {
    return <div className={styles.loading}>Loading course details...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!course) {
    return <div className={styles.error}>Course not found</div>;
  }

  return (
    <div className={styles.courseDetails}>
      <div className={styles.courseHeader}>
        <h1>{course.title}</h1>
        <div className={styles.courseInfo}>
          <p><strong>Instructor:</strong> {course.instructor}</p>
          <p><strong>Duration:</strong> {course.duration}</p>
          <p><strong>Level:</strong> {course.level}</p>
          <p><strong>Price:</strong> {course.price}</p>
        </div>
      </div>

      <div className={styles.courseDescription}>
        <h2>Course Description</h2>
        <p>{course.description}</p>
      </div>

      <div className={styles.quizzesSection}>
        <h2>Course Quizzes</h2>
        {quizzes.length === 0 ? (
          <p className={styles.noQuizzes}>No quizzes available for this course yet.</p>
        ) : (
          <div className={styles.quizzesList}>
            {quizzes.map(quiz => (
              <div key={quiz._id} className={styles.quizCard}>
                <h3>{quiz.title}</h3>
                <p>{quiz.description}</p>
                <div className={styles.quizInfo}>
                  <span>Duration: {quiz.duration} minutes</span>
                  <span>Questions: {quiz.questions.length}</span>
                  <span>Passing Score: {quiz.passingScore}%</span>
                </div>
                <Link
                  to={`/courses/${courseId}/quizzes/${quiz._id}`}
                  className={styles.startQuizButton}
                >
                  Start Quiz
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails; 