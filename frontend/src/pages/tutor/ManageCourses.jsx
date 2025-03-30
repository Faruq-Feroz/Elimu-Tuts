import { useState, useEffect } from 'react';
import { useCourses } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ManageCourses = () => {
  const { 
    courses, 
    loading: { create: isCreatingCourse, fetch: isFetchingCourses }, 
    error: { create: createError, fetch: fetchError },
    createCourse, 
    updateCourse, 
    deleteCourse, 
    fetchCourses 
  } = useCourses();
  const { currentUser } = useAuth();
  
  // Initialize state with default values
  const [isCreating, setIsCreating] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    level: '',
    difficulty: 'Beginner',
    price: '',
    coverImage: ''
  });
  const [formError, setFormError] = useState(null);

  // Add effect to log state changes
  useEffect(() => {
    console.log('isCreating changed:', isCreating);
  }, [isCreating]);

  useEffect(() => {
    console.log('formError changed:', formError);
  }, [formError]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (createError) {
      setFormError({
        message: createError.message,
        details: createError.details
      });
    }
  }, [createError]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Validate required fields
    const validationErrors = [];
    
    if (!formData.title.trim()) {
      validationErrors.push('Title is required');
    } else if (formData.title.length > 100) {
      validationErrors.push('Title cannot be more than 100 characters');
    }

    if (!formData.description.trim()) {
      validationErrors.push('Description is required');
    } else if (formData.description.length > 500) {
      validationErrors.push('Description cannot be more than 500 characters');
    }

    if (!formData.subject) {
      validationErrors.push('Subject is required');
    }

    if (!formData.level) {
      validationErrors.push('Education level is required');
    }

    if (!formData.price || formData.price <= 0) {
      validationErrors.push('Price must be greater than 0');
    }

    if (validationErrors.length > 0) {
      setFormError({ 
        message: 'Please fix the following errors:',
        details: validationErrors
      });
      return; // Stop here if there are validation errors
    }

    // Only proceed if all validations pass
    try {
      const courseData = {
        ...formData,
        price: Number(formData.price),
        title: formData.title.trim(),
        description: formData.description.trim(),
        tutor: currentUser.uid
      };

      // Remove empty fields
      Object.keys(courseData).forEach(key => {
        if (courseData[key] === '' || courseData[key] === null || courseData[key] === undefined) {
          delete courseData[key];
        }
      });

      if (editingCourse) {
        await updateCourse(editingCourse._id, courseData);
        toast.success('Course updated successfully!');
      } else {
        await createCourse(courseData);
        toast.success('Course created successfully!');
      }
      
      resetForm();
      fetchCourses(); // Refresh the courses list
    } catch (err) {
      console.error('Failed to save course:', err);
      setFormError({
        message: err.response?.data?.message || 'Failed to save course',
        details: err.response?.data?.errors
      });
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      subject: course.subject,
      level: course.level,
      difficulty: course.difficulty,
      price: course.price,
      coverImage: course.coverImage
    });
    setIsCreating(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(courseId);
        toast.success('Course deleted successfully!');
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to delete course');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      subject: '',
      level: '',
      difficulty: 'Beginner',
      price: '',
      coverImage: ''
    });
    setIsCreating(false);
    setEditingCourse(null);
  };

  const toggleCreateForm = () => {
    console.log('Current isCreating:', isCreating);
    setIsCreating(!isCreating);
    console.log('Setting isCreating to:', !isCreating);
    setFormError(null);
    if (!isCreating) {
      setFormData({
        title: '',
        description: '',
        subject: '',
        level: '',
        difficulty: 'Beginner',
        price: '',
        coverImage: ''
      });
    }
  };

  // Add console log in render to see if we reach the form condition
  console.log('Rendering ManageCourses, isCreating:', isCreating);

  if (isFetchingCourses) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Add console log to check if we're hitting other conditions
  console.log('Past loading check, fetchError:', fetchError);

  if (fetchError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {fetchError.message || 'An error occurred while fetching your courses.'}
              </p>
              {fetchError.details && (
                <details className="mt-2">
                  <summary className="text-sm text-red-500 cursor-pointer">Error Details</summary>
                  <pre className="mt-2 text-xs text-red-700 bg-red-50 p-2 rounded">
                    {JSON.stringify(fetchError.details, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Your Courses</h1>
        <button
          onClick={toggleCreateForm}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          {isCreating ? 'Cancel' : 'Create New Course'}
        </button>
      </div>

      {/* Add console log right before form condition */}
      {console.log('Before form render, isCreating:', isCreating)}
      {isCreating && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-lg relative z-10">
          <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
          
          {formError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{formError.message}</p>
                  {formError.details && Array.isArray(formError.details) && (
                    <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                      {formError.details.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  )}
                  {formError.details && !Array.isArray(formError.details) && (
                    <pre className="mt-2 text-xs text-red-700 bg-red-50 p-2 rounded">
                      {JSON.stringify(formError.details, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select a subject</option>
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

              <div>
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select a level</option>
                  <option value="Pre-Primary">Pre-Primary</option>
                  <option value="Lower Primary">Lower Primary</option>
                  <option value="Upper Primary">Upper Primary</option>
                  <option value="Junior Secondary">Junior Secondary</option>
                  <option value="Senior Secondary">Senior Secondary</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={toggleCreateForm}
                className="mr-4 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={isCreatingCourse}
              >
                {isCreatingCourse ? 'Creating...' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="bg-white rounded-lg shadow overflow-hidden">
            {course.coverImage && (
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-500 font-medium">${course.price}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCourses; 