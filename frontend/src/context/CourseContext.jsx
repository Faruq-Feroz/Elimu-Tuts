import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

// API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create the context
const CourseContext = createContext();

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};

// Course Provider Component
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/api/courses`);
      setCourses(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  // Fetch single course
  const fetchCourse = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/api/courses/${id}`);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch course');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create course
  const createCourse = async (courseData) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Creating course with data:', courseData);
      const response = await axios.post(
        `${API_URL}/api/courses`,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`
          }
        }
      );
      console.log('Course creation response:', response.data);
      setCourses(prev => [...prev, response.data.data]);
      return response.data.data;
    } catch (err) {
      console.error('Course creation error details:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      setError(err.response?.data?.error || 'Failed to create course');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update course
  const updateCourse = async (id, courseData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(
        `${API_URL}/api/courses/${id}`,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`
          }
        }
      );
      setCourses(prev => 
        prev.map(course => 
          course._id === id ? response.data.data : course
        )
      );
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update course');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete course
  const deleteCourse = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(
        `${API_URL}/api/courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`
          }
        }
      );
      setCourses(prev => prev.filter(course => course._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete course');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Provide context value
  const value = {
    courses,
    loading,
    error,
    fetchCourses,
    fetchCourse,
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