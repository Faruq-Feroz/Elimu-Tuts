import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import styles from './Courses.module.css';

const Courses = () => {
  const { courses, loading, error, fetchCourses } = useCourses();
  
  // Filter states
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Subjects and levels from the Course model
  const SUBJECTS = [
    'Mathematics', 'English', 'Kiswahili', 'Science', 
    'Social Studies', 'ICT', 'Religious Education', 
    'Creative Arts', 'Music', 'Home Science', 
    'Agriculture', 'Physical Education', 'Health Education', 
    'Life Skills', 'Indigenous Languages', 'Foreign Languages', 
    'Business Studies', 'Pre-Technical Studies'
  ];

  const LEVELS = [
    'Pre-Primary', 'Lower Primary', 'Upper Primary', 
    'Junior Secondary', 'Senior Secondary'
  ];

  // Memoized filtering of courses
  const filteredCourses = useMemo(() => {
    if (!courses || !Array.isArray(courses)) return [];
    return courses.filter(course => {
      const matchesSubject = !selectedSubject || course.subject?.toLowerCase() === selectedSubject.toLowerCase();
      const matchesLevel = !selectedLevel || course.level?.toLowerCase() === selectedLevel.toLowerCase();
      return matchesSubject && matchesLevel;
    });
  }, [courses, selectedSubject, selectedLevel]);

  // Reset filters
  const resetFilters = () => {
    setSelectedSubject('');
    setSelectedLevel('');
  };

  // Render loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading courses...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button 
          onClick={() => fetchCourses()} 
          className={styles.retryButton}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.coursesPage}>
      <div className={styles.header}>
        <h1>Available Courses</h1>
        <p>Explore our comprehensive collection of CBC-aligned courses</p>
      </div>

      {/* Filters */}
      <div className={styles.filtersContainer}>
        <div className={styles.filterGroup}>
          <label htmlFor="subject-select">Subject</label>
          <select 
            id="subject-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Subjects</option>
            {SUBJECTS.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="level-select">Level</label>
          <select 
            id="level-select"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Levels</option>
            {LEVELS.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {(selectedSubject || selectedLevel) && (
          <button 
            onClick={resetFilters} 
            className={styles.resetButton}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className={styles.noCoursesContainer}>
          <h2>No Courses Found</h2>
          <p>Try adjusting your filters or check back later</p>
        </div>
      ) : (
        <div className={styles.coursesGrid}>
          {filteredCourses.map(course => (
            <div key={course._id} className={styles.courseCard}>
              {course.coverImage && (
                <div className={styles.courseImage}>
                  <img src={course.coverImage} alt={course.title} />
                </div>
              )}
              <div className={styles.courseContent}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className={styles.courseDetails}>
                  <span className={styles.subject}>{course.subject}</span>
                  <span className={styles.level}>{course.level}</span>
                  <span className={styles.price}>${course.price}</span>
                </div>
                <div className={styles.courseFooter}>
                  <Link to={`/courses/${course._id}`} className={styles.viewButton}>
                    View Details
                  </Link>
                  {course.isCBCAligned && (
                    <span className={styles.cbcBadge}>CBC Aligned</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses; 