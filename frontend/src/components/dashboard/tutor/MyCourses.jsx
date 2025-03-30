import React, { useState, useEffect } from 'react';
import { FaPlus, FaTimes, FaEdit, FaTrashAlt, FaGraduationCap, FaStar, FaUsers, FaBookOpen } from 'react-icons/fa';
import styles from './ManageCourses.module.css';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

// Constants for subjects and levels
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

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

// Initial form state
const initialFormState = {
  title: '',
  description: '',
  subject: '',
  level: '',
  difficulty: 'Beginner',
  price: 0,
  coverImage: '',
  isCBCAligned: false
};

// API URL from environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MyCourses = () => {
  // State for courses and form
  const [courses, setCourses] = useState([]);
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState(initialFormState);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false
  });

  // Filtered courses by tutor
  const [myCourses, setMyCourses] = useState([]);

  // Fetch courses when component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  // Filter courses by current tutor
  useEffect(() => {
    if (courses && currentUser) {
      try {
        // Check if courses is an array
        if (Array.isArray(courses)) {
          const filteredCourses = courses.filter(course => course.tutor === currentUser.uid);
          setMyCourses(filteredCourses);
        } else if (courses.data && Array.isArray(courses.data)) {
          // If courses is an object with a data property that's an array
          const filteredCourses = courses.data.filter(course => course.tutor === currentUser.uid);
          setMyCourses(filteredCourses);
        } else {
          // If courses is neither an array nor has a data property that's an array
          console.error('Courses data is not in expected format:', courses);
          setMyCourses([]);
        }
      } catch (error) {
        console.error('Error filtering courses:', error);
        setMyCourses([]);
      }
    } else {
      setMyCourses([]);
    }
  }, [courses, currentUser]);

  // Fetch courses from API
  const fetchCourses = async () => {
    setLoading({ ...loading, fetch: true });
    try {
      const response = await axios.get(`${API_URL}/api/tutor/courses?tutorId=${currentUser?.uid}`);
      // Check if the response has data property
      if (response.data) {
        setCourses(Array.isArray(response.data) ? response.data : []);
      } else {
        setCourses([]);
        console.error('API returned unexpected data format:', response);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
      toast.error('Failed to fetch courses');
    } finally {
      setLoading({ ...loading, fetch: false });
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    // Form validation
    let validationErrors = [];
    if (!formData.title.trim()) validationErrors.push('Title is required');
    if (formData.title.trim().length < 5) validationErrors.push('Title must be at least 5 characters long');
    if (formData.title.trim().length > 100) validationErrors.push('Title cannot exceed 100 characters');
    if (!formData.description.trim()) validationErrors.push('Description is required');
    if (formData.description.trim().length < 10) validationErrors.push('Description must be at least 10 characters long');
    if (formData.description.trim().length > 500) validationErrors.push('Description cannot exceed 500 characters');
    if (!formData.subject) validationErrors.push('Subject is required');
    if (!formData.level) validationErrors.push('Level is required');
    if (formData.price < 0) validationErrors.push('Price cannot be negative');

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isEditing) {
      handleUpdateCourse();
    } else {
      handleCreateCourse();
    }
  };

  // Create a new course
  const handleCreateCourse = async () => {
    setLoading({ ...loading, create: true });
    try {
      const response = await axios.post(`${API_URL}/api/tutor/courses`, 
        {
          ...formData,
          tutor: currentUser.uid  // Include the tutor ID in the request
        }
      );
      
      if (response && response.data) {
        // Ensure courses is always treated as an array
        const currentCourses = Array.isArray(courses) ? [...courses] : [];
        setCourses([...currentCourses, response.data]);
        resetForm();
        setShowForm(false);
        toast.success('Course created successfully!');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      setErrors(error.response?.data?.errors || ['Failed to create course']);
      toast.error('Failed to create course');
    } finally {
      setLoading({ ...loading, create: false });
    }
  };

  // Update an existing course
  const handleUpdateCourse = async () => {
    setLoading({ ...loading, update: true });
    try {
      const response = await axios.put(
        `${API_URL}/api/tutor/courses/${editingCourseId}`, 
        {
          ...formData,
          tutor: currentUser.uid
        }
      );
      
      if (response && response.data) {
        // Ensure courses is always treated as an array
        if (Array.isArray(courses)) {
          const updatedCourses = courses.map(course => 
            course._id === editingCourseId ? response.data : course
          );
          setCourses(updatedCourses);
        } else {
          console.error('Courses is not an array when updating');
          // Refetch the courses to ensure we have the latest data
          await fetchCourses();
        }
        
        resetForm();
        setShowForm(false);
        toast.success('Course updated successfully!');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      setErrors(error.response?.data?.errors || ['Failed to update course']);
      toast.error('Failed to update course');
    } finally {
      setLoading({ ...loading, update: false });
    }
  };

  // Delete a course
  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setLoading({ ...loading, delete: true });
      try {
        await axios.delete(`${API_URL}/api/tutor/courses/${courseId}`);
        
        // Ensure courses is always treated as an array
        if (Array.isArray(courses)) {
          const updatedCourses = courses.filter(course => course._id !== courseId);
          setCourses(updatedCourses);
        } else {
          console.error('Courses is not an array when deleting');
          // Refetch the courses to ensure we have the latest data
          await fetchCourses();
        }
        
        toast.success('Course deleted successfully!');
      } catch (error) {
        console.error('Error deleting course:', error);
        toast.error('Failed to delete course');
      } finally {
        setLoading({ ...loading, delete: false });
      }
    }
  };

  // Set up form for editing
  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      description: course.description,
      subject: course.subject,
      level: course.level,
      difficulty: course.difficulty || 'Beginner',
      price: course.price,
      coverImage: course.coverImage || '',
      isCBCAligned: course.isCBCAligned || false
    });
    setIsEditing(true);
    setEditingCourseId(course._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset the form
  const resetForm = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setEditingCourseId(null);
    setErrors([]);
  };

  // Toggle form visibility
  const toggleForm = () => {
    if (showForm) {
      resetForm();
    }
    setShowForm(!showForm);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          <FaBookOpen className={styles.headerIcon} /> Manage Your Courses
        </h1>
        <p className={styles.subheader}>Create, edit and manage your courses to share with students</p>
        
        <button 
          className={`${styles.toggleFormButton} ${showForm ? styles.closeButton : styles.addButton}`}
          onClick={toggleForm}
        >
          {showForm ? (
            <>
              <FaTimes /> Cancel
            </>
          ) : (
            <>
              <FaPlus /> Create New Course
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit} className={styles.courseForm}>
            <h2 className={styles.formTitle}>
              {isEditing ? 'Edit Course' : 'Create New Course'}
            </h2>

            {errors.length > 0 && (
              <div className={styles.errorBox}>
                <h3>Please fix the following errors:</h3>
                <ul>
                  {errors.map((error, index) => (
                      <li key={index}>{typeof error === 'string' ? error : JSON.stringify(error)}</li>
                    ))}
                  </ul>
              </div>
            )}

            <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Course Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a descriptive title (5-100 characters)"
                required
                minLength="5"
                maxLength="100"
              />
              </div>
            </div>

            <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="description">Course Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what students will learn (minimum 10 characters)"
                required
                minLength="10"
                rows="4"
              />
              </div>
            </div>

            <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a subject</option>
                {SUBJECTS.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="level">Course Level</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a level</option>
                {LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              </div>
            </div>

            <div className={styles.formRow}>
            <div className={styles.formGroup}>
                <label htmlFor="difficulty">Course Difficulty</label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a difficulty</option>
                {DIFFICULTIES.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price">Price (KSh)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                  placeholder="0 for free courses"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="coverImage">Cover Image URL</label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="isCBCAligned"
                  checked={formData.isCBCAligned}
                  onChange={handleInputChange}
                />
                CBC Aligned Course
              </label>
            </div>

            <div className={styles.formActions}>
              <button 
                type="button" 
                className={styles.cancelButton}
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
              >
                <FaTimes /> Cancel
              </button>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={loading.create || loading.update}
              >
                {loading.create ? 'Creating...' : 
                 loading.update ? 'Updating...' : 
                 (isEditing ? 'Update Course' : 'Create Course')}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading.fetch ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading your courses...</p>
        </div>
      ) : !Array.isArray(myCourses) ? (
        <div className={styles.errorContainer}>
          <h2>Error Loading Courses</h2>
          <p>There was a problem retrieving your courses. Please try again.</p>
          <button className={styles.retryButton} onClick={fetchCourses}>
            Retry
          </button>
        </div>
      ) : myCourses.length === 0 ? (
        <div className={styles.noCourses}>
          <FaGraduationCap className={styles.noCoursesIcon} />
          <h2>You haven't created any courses yet</h2>
          <p>Start by creating your first course to share your knowledge with students.</p>
          <button 
            className={styles.startButton}
            onClick={() => setShowForm(true)}
          >
            <FaPlus /> Create Your First Course
          </button>
        </div>
      ) : (
        <div className={styles.statsAndCourses}>
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}><FaBookOpen /></div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>{myCourses.length}</div>
                <div className={styles.statLabel}>Total Courses</div>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon}><FaUsers /></div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>
                  {myCourses.reduce((total, course) => {
                    try {
                      return total + (Array.isArray(course.enrolledStudents) ? course.enrolledStudents.length : 0);
                    } catch (error) {
                      console.error('Error calculating student count:', error);
                      return total;
                    }
                  }, 0)}
                </div>
                <div className={styles.statLabel}>Total Students</div>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon}><FaStar /></div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>
                  {(() => {
                    try {
                      const coursesWithRating = myCourses.filter(course => typeof course.rating === 'number' && !isNaN(course.rating));
                      if (coursesWithRating.length === 0) return 'N/A';
                      const avgRating = coursesWithRating.reduce((sum, course) => sum + course.rating, 0) / coursesWithRating.length;
                      return avgRating.toFixed(1);
                    } catch (error) {
                      console.error('Error calculating rating:', error);
                      return 'N/A';
                    }
                  })()}
                </div>
                <div className={styles.statLabel}>Avg. Rating</div>
              </div>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>Your Courses</h2>
          
        <div className={styles.coursesGrid}>
          {myCourses.map(course => (
              <div key={course._id || `temp-${Math.random()}`} className={styles.courseCard}>
                <div className={styles.courseImageContainer}>
                <img
                    src={course.coverImage || 'https://via.placeholder.com/400x200?text=Course+Image'}
                    alt={course.title || 'Course'}
                  className={styles.courseImage}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                  }}
                />
                  {course.isCBCAligned && (
                    <div className={styles.cbcBadge}>CBC Aligned</div>
              )}
                </div>
                
              <div className={styles.courseContent}>
                  <h3 className={styles.courseTitle}>{course.title || 'Untitled Course'}</h3>
                  
                  <div className={styles.courseMeta}>
                    <span className={styles.courseSubject}>{course.subject || 'No Subject'}</span>
                    <span className={styles.courseLevel}>{course.level || 'No Level'}</span>
                  </div>
                  
                  <p className={styles.courseDescription}>
                    {course.description 
                      ? (course.description.length > 120 
                        ? `${course.description.substring(0, 120)}...` 
                        : course.description)
                      : 'No description available'}
                  </p>
                  
                <div className={styles.courseStats}>
                    <div className={styles.priceTag}>
                      {(typeof course.price === 'number' && course.price === 0) ? 'Free' : `KSh ${course.price || 0}`}
                    </div>
                  <div className={styles.stats}>
                      <span className={styles.studentCount}>
                        <FaUsers /> {Array.isArray(course.enrolledStudents) ? course.enrolledStudents.length : 0}
                      </span>
                      <span className={styles.ratingDisplay}>
                        <FaStar /> {typeof course.rating === 'number' ? course.rating.toFixed(1) : 'N/A'}
                      </span>
                    </div>
                  </div>
                  
                <div className={styles.courseActions}>
                  <button
                    onClick={() => handleEdit(course)}
                    className={styles.editButton}
                    disabled={loading.update}
                  >
                      <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className={styles.deleteButton}
                    disabled={loading.delete}
                  >
                      <FaTrashAlt /> Delete
                  </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;