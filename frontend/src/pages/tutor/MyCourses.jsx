import React, { useState, useEffect, useCallback } from 'react';
import { useCourses } from '../../../context/CourseContext';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import styles from './ManageCourses.module.css';

// Subject and level options
const SUBJECTS = [
  'Mathematics',
  'English',
  'Kiswahili',
  'Science',
  'Social Studies',
  'ICT',
  'Religious Education',
  'Creative Arts',
  'Music',
  'Home Science',
  'Agriculture',
  'Physical Education',
  'Health Education',
  'Life Skills',
  'Indigenous Languages',
  'Foreign Languages',
  'Business Studies',
  'Pre-Technical Studies'
];

const LEVELS = [
  'Pre-Primary',
  'Lower Primary',
  'Upper Primary',
  'Junior Secondary',
  'Senior Secondary'
];

const MyCourses = () => {
  const { 
    courses, 
    loading, 
    error, 
    createCourse, 
    updateCourse, 
    deleteCourse,
    fetchCourses 
  } = useCourses();
  const { currentUser } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    level: '',
    price: '',
    coverImage: '',
    isCBCAligned: true
  });
  const [formError, setFormError] = useState(null);

  // Filter courses for current tutor
  const myCourses = courses.filter(course => course.tutor === currentUser?.uid);

  // Memoize the fetchCourses call
  const loadCourses = useCallback(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser, fetchCourses]);

  // Fetch courses when component mounts or currentUser changes
  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      subject: '',
      level: '',
      price: '',
      coverImage: '',
      isCBCAligned: true
    });
    setFormError(null);
    setIsCreating(false);
    setIsEditing(false);
    setEditingCourseId(null);
  };

  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      description: course.description,
      subject: course.subject,
      level: course.level,
      price: course.price.toString(),
      coverImage: course.coverImage || '',
      isCBCAligned: course.isCBCAligned
    });
    setEditingCourseId(course._id);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.title.trim()) errors.push('Title is required');
    if (!formData.description.trim()) errors.push('Description is required');
    if (!formData.subject) errors.push('Subject is required');
    if (!formData.level) errors.push('Level is required');
    if (!formData.price || parseFloat(formData.price) <= 0) errors.push('Price must be greater than 0');
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setFormError({
        message: 'Please fix the following errors:',
        details: validationErrors
      });
      return;
    }

    try {
      const courseData = {
        ...formData,
        price: parseFloat(formData.price),
        title: formData.title.trim(),
        description: formData.description.trim()
      };

      if (isEditing) {
        await updateCourse(editingCourseId, courseData);
        toast.success('Course updated successfully!');
      } else {
        await createCourse(courseData);
        toast.success('Course created successfully!');
      }
      
      resetForm();
      loadCourses(); // Refresh the courses list
    } catch (err) {
      console.error('Failed to save course:', err);
      setFormError({
        message: err.response?.data?.message || 'Failed to save course',
        details: err.response?.data?.errors || [err.message]
      });
      toast.error(err.response?.data?.message || 'Failed to save course');
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        await deleteCourse(courseId);
        toast.success('Course deleted successfully!');
        loadCourses(); // Refresh the courses list
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete course');
      }
    }
  };

  // Render loading state
  if (loading.fetch) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading courses...</p>
      </div>
    );
  }

  // Render fetch error
  if (error.fetch) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error Loading Courses</h2>
        <p>{error.fetch.message}</p>
        {error.fetch.details && (
          <details>
            <summary>Error Details</summary>
            <pre>{JSON.stringify(error.fetch.details, null, 2)}</pre>
          </details>
        )}
        <button onClick={() => window.location.reload()}>
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Manage Your Courses</h1>
        <button 
          className={styles.createButton}
          onClick={() => setIsCreating(true)}
          disabled={loading.create}
        >
          {loading.create ? 'Creating...' : 'Create New Course'}
        </button>
      </div>

      {/* Form for creating/editing courses */}
      {(isCreating || isEditing) && (
        <div className={styles.formOverlay}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2>{isEditing ? 'Edit Course' : 'Create New Course'}</h2>
            
            {/* Form Error Display */}
            {formError && (
              <div className={styles.formError}>
                <p>{formError.message}</p>
                {formError.details && Array.isArray(formError.details) && (
                  <ul className={styles.errorList}>
                    {formError.details.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Title Input */}
            <div className={styles.formGroup}>
              <label htmlFor="title">Course Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Description Input */}
            <div className={styles.formGroup}>
              <label htmlFor="description">Course Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
              />
            </div>

            {/* Subject Input */}
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

            {/* Level Input */}
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

            {/* Price Input */}
            <div className={styles.formGroup}>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* Cover Image Input */}
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

            {/* CBC Alignment Checkbox */}
            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="isCBCAligned"
                  checked={formData.isCBCAligned}
                  onChange={handleInputChange}
                />
                CBC Aligned
              </label>
            </div>

            <div className={styles.formActions}>
              <button 
                type="button" 
                className={styles.cancelButton}
                onClick={resetForm}
              >
                Cancel
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

      {/* Courses Grid */}
      {myCourses.length === 0 ? (
        <div className={styles.noCourses}>
          <p>You haven't created any courses yet. Start by creating your first course!</p>
        </div>
      ) : (
        <div className={styles.coursesGrid}>
          {myCourses.map(course => (
            <div key={course._id} className={styles.courseCard}>
              {course.coverImage && (
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className={styles.courseImage}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                  }}
                />
              )}
              <div className={styles.courseContent}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className={styles.courseStats}>
                  <span className={styles.price}>${course.price}</span>
                  <div className={styles.stats}>
                    <span>{course.enrolledStudents?.length || 0} students</span>
                    <span>{course.rating ? `${course.rating.toFixed(1)} ★` : 'No ratings'}</span>
                  </div>
                </div>
                <div className={styles.courseActions}>
                  <button
                    onClick={() => handleEdit(course)}
                    className={styles.editButton}
                    disabled={loading.update}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className={styles.deleteButton}
                    disabled={loading.delete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses; 