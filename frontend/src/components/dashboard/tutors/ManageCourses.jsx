import React, { useState } from 'react';
import { useCourses } from '../../../context/CourseContext';
import styles from './ManageCourses.module.css';

const ManageCourses = () => {
  const { courses, loading, error, createCourse, updateCourse, deleteCourse } = useCourses();
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
  const [formError, setFormError] = useState('');

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
    setFormError('');
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
      coverImage: course.coverImage,
      isCBCAligned: course.isCBCAligned
    });
    setEditingCourseId(course._id);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      const courseData = {
        ...formData,
        price: Number(formData.price)
      };

      if (isEditing) {
        await updateCourse(editingCourseId, courseData);
      } else {
        await createCourse(courseData);
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving course:', error);
      const errorMessage = error.response?.data?.errors?.[0]?.msg || 
                          error.response?.data?.error || 
                          error.response?.data?.message || 
                          'Failed to save course';
      setFormError(errorMessage);
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        await deleteCourse(courseId);
      } catch (error) {
        console.error('Error deleting course:', error);
        setFormError('Failed to delete course. Please try again.');
      }
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Manage Your Courses</h1>
        <button 
          className={styles.createButton}
          onClick={() => setIsCreating(true)}
        >
          Create New Course
        </button>
      </div>

      {(isCreating || isEditing) && (
        <div className={styles.formOverlay}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2>{isEditing ? 'Edit Course' : 'Create New Course'}</h2>
            {formError && <div className={styles.formError}>{formError}</div>}
            <div className={styles.formGroup}>
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                minLength="5"
                maxLength="100"
                placeholder="Enter a title (5-100 characters)"
              />
              <small className={styles.helpText}>Title must be between 5 and 100 characters</small>
            </div>
            <div className={styles.formGroup}>
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                minLength="10"
                maxLength="500"
                placeholder="Enter a description (10-500 characters)"
              />
              <small className={styles.helpText}>Description must be between 10 and 500 characters</small>
            </div>
            <div className={styles.formGroup}>
              <label>Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              >
                <option value="">Select Subject</option>
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
            </div>
            <div className={styles.formGroup}>
              <label>Level</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: e.target.value})}
                required
              >
                <option value="">Select Level</option>
                <option value="Pre-Primary">Pre-Primary</option>
                <option value="Lower Primary">Lower Primary</option>
                <option value="Upper Primary">Upper Primary</option>
                <option value="Junior Secondary">Junior Secondary</option>
                <option value="Senior Secondary">Senior Secondary</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Cover Image URL</label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>
                <input
                  type="checkbox"
                  checked={formData.isCBCAligned}
                  onChange={(e) => setFormData({...formData, isCBCAligned: e.target.checked})}
                />
                CBC Aligned
              </label>
            </div>
            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>
                {isEditing ? 'Update Course' : 'Create Course'}
              </button>
              <button 
                type="button" 
                className={styles.cancelButton}
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.coursesGrid}>
        {courses.map(course => (
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
              <div className={styles.courseActions}>
                <button 
                  className={styles.editButton}
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>
                <button 
                  className={styles.deleteButton}
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCourses; 