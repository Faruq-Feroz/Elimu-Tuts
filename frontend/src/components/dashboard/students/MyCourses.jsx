import React, { useState, useEffect } from 'react';
import { useCourses } from '../../../context/CourseContext';
import CourseCard from './CourseCard';
import styles from './Courses.module.css';

const MyCourses = () => {
  const { courses, loading, error, fetchCourses } = useCourses();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filters, setFilters] = useState({
    subject: '',
    level: '',
    priceRange: 'all'
  });

  // Fetch courses only once when component mounts
  useEffect(() => {
    fetchCourses();
  }, []); // Remove fetchCourses from dependencies

  // Update filtered courses whenever courses or filters change
  useEffect(() => {
    if (!courses) return;

    let filtered = [...courses];

    // Apply subject filter
    if (filters.subject) {
      filtered = filtered.filter(course => course.subject === filters.subject);
    }

    // Apply level filter
    if (filters.level) {
      filtered = filtered.filter(course => course.level === filters.level);
    }

    // Apply price range filter
    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'free':
          filtered = filtered.filter(course => course.price === 0);
          break;
        case 'paid':
          filtered = filtered.filter(course => course.price > 0);
          break;
        default:
          break;
      }
    }

    setFilteredCourses(filtered);
  }, [courses, filters]);

  const handleEnroll = async (courseId) => {
    try {
      // TODO: Implement enrollment logic
      console.log('Enrolling in course:', courseId);
    } catch (error) {
      console.error('Enrollment error:', error);
      // You can add a toast notification here
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      subject: '',
      level: '',
      priceRange: 'all'
    });
  };

  // Show loading state only on initial load
  if (loading && !courses.length) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading courses...</p>
      </div>
    );
  }

  // Show error state only if there's an error and no courses
  if (error && !courses.length) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error Loading Courses</h2>
        <p>{error}</p>
        <button 
          onClick={fetchCourses}
          className={styles.retryButton}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Available Courses</h1>
        <div className={styles.filters}>
          <select
            name="subject"
            value={filters.subject}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="English">English</option>
            <option value="Kiswahili">Kiswahili</option>
            <option value="Science">Science</option>
            <option value="Social Studies">Social Studies</option>
            <option value="ICT">ICT</option>
            <option value="Religious Education">Religious Education</option>
            <option value="Creative Arts">Creative Arts</option>
            <option value="Music">Music</option>
            <option value="Home Science">Home Science</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Physical Education">Physical Education</option>
            <option value="Health Education">Health Education</option>
            <option value="Life Skills">Life Skills</option>
            <option value="Indigenous Languages">Indigenous Languages</option>
            <option value="Foreign Languages">Foreign Languages</option>
            <option value="Business Studies">Business Studies</option>
            <option value="Pre-Technical Studies">Pre-Technical Studies</option>
          </select>

          <select
            name="level"
            value={filters.level}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="">All Levels</option>
            <option value="Pre-Primary">Pre-Primary</option>
            <option value="Lower Primary">Lower Primary</option>
            <option value="Upper Primary">Upper Primary</option>
            <option value="Junior Secondary">Junior Secondary</option>
            <option value="Senior Secondary">Senior Secondary</option>
          </select>

          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="all">All Prices</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>

          <button 
            onClick={resetFilters}
            className={styles.resetButton}
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className={styles.coursesGrid}>
        {filteredCourses.length === 0 ? (
          <div className={styles.noCourses}>
            <p>No courses found matching your filters.</p>
          </div>
        ) : (
          filteredCourses.map(course => (
            <CourseCard
              key={course._id}
              course={course}
              onEnroll={handleEnroll}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyCourses;