import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

// Custom error class for more detailed error handling
class CourseError extends Error {
  constructor(message, type, details = {}) {
    super(message);
    this.name = 'CourseError';
    this.type = type;
    this.details = details;
  }
}

const CourseContext = createContext();

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false
  });
  const [error, setError] = useState({
    fetch: null,
    create: null,
    update: null,
    delete: null
  });
  const { currentUser } = useAuth();

  const handleError = (errorType, err) => {
    let errorMessage = 'An unexpected error occurred';
    let errorDetails = {};

    if (axios.isAxiosError(err)) {
      // Handle API error responses
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        // Get validation errors from response
        errorMessage = 'Validation failed';
        errorDetails = {
          status: err.response.status,
          data: err.response.data,
          errors: err.response.data.errors
        };
      } else {
        // Get general error message
        errorMessage = err.response?.data?.error || 
                     err.response?.data?.message || 
                     err.message || 
                     'Network error';
        errorDetails = {
          status: err.response?.status,
          data: err.response?.data,
          errors: err.response?.data?.errors
        };
      }
    } else if (err instanceof Error) {
      errorMessage = err.message;
      errorDetails = err;
    }

    setError(prev => ({
      ...prev,
      [errorType]: new CourseError(errorMessage, errorType, errorDetails)
    }));

    console.error(`${errorType.toUpperCase()} Error:`, errorMessage, errorDetails);
  };

  const fetchCourses = useCallback(async () => {
    if (!currentUser) return; // Don't fetch if no user

    setLoading(prev => ({ ...prev, fetch: true }));
    setError(prev => ({ ...prev, fetch: null }));

    try {
      const token = await currentUser.getIdToken(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/courses`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setCourses(response.data.data);
    } catch (err) {
      handleError('fetch', err);
      setCourses([]);
    } finally {
      setLoading(prev => ({ ...prev, fetch: false }));
    }
  }, [currentUser]); // Only depend on currentUser

  // Initial fetch when component mounts or currentUser changes
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const createCourse = async (courseData) => {
    if (!currentUser) {
      const authError = new CourseError(
        'User not authenticated', 
        'create', 
        { code: 'AUTH_REQUIRED' }
      );
      setError(prev => ({ ...prev, create: authError }));
      throw authError;
    }

    setLoading(prev => ({ ...prev, create: true }));
    setError(prev => ({ ...prev, create: null }));

    try {
      const token = await currentUser.getIdToken(true);
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/courses`, 
        courseData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const newCourse = response.data.data;
      setCourses(prevCourses => [...prevCourses, newCourse]);
      return newCourse;
    } catch (err) {
      handleError('create', err);
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, create: false }));
    }
  };

  const updateCourse = async (courseId, courseData) => {
    if (!currentUser) {
      const authError = new CourseError(
        'User not authenticated', 
        'update', 
        { code: 'AUTH_REQUIRED' }
      );
      setError(prev => ({ ...prev, update: authError }));
      throw authError;
    }

    setLoading(prev => ({ ...prev, update: true }));
    setError(prev => ({ ...prev, update: null }));

    try {
      const token = await currentUser.getIdToken(true);
      
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/courses/${courseId}`, 
        courseData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const updatedCourse = response.data.data;
      setCourses(prevCourses => 
        prevCourses.map(course => 
          course._id === courseId ? updatedCourse : course
        )
      );
      return updatedCourse;
    } catch (err) {
      handleError('update', err);
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, update: false }));
    }
  };

  const deleteCourse = async (courseId) => {
    if (!currentUser) {
      const authError = new CourseError(
        'User not authenticated', 
        'delete', 
        { code: 'AUTH_REQUIRED' }
      );
      setError(prev => ({ ...prev, delete: authError }));
      throw authError;
    }

    setLoading(prev => ({ ...prev, delete: true }));
    setError(prev => ({ ...prev, delete: null }));

    try {
      const token = await currentUser.getIdToken(true);
      
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/courses/${courseId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      setCourses(prevCourses => prevCourses.filter(course => course._id !== courseId));
    } catch (err) {
      handleError('delete', err);
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, delete: false }));
    }
  };

  const value = {
    courses,
    loading,
    error,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;