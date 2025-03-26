import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const QuizContext = createContext();

export const useQuizzes = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  const fetchCourseQuizzes = async (courseId) => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API_URL}/api/quizzes/courses/${courseId}`);
      setQuizzes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch quizzes');
      console.error('Quiz fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuiz = async (quizId) => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API_URL}/api/quizzes/${quizId}`);
      setCurrentQuiz(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch quiz');
      console.error('Quiz fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = async (quizId, answers) => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${API_URL}/api/quizzes/${quizId}/submit`, {
        answers
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit quiz');
      console.error('Quiz submission error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createQuiz = async (courseId, quizData) => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      if (!currentUser) {
        throw new Error('User must be logged in to create a quiz');
      }

      const config = { 
        headers: { 
          Authorization: `Bearer ${await currentUser.getIdToken()}` 
        } 
      };

      const response = await axios.post(
        `${API_URL}/api/quizzes/courses/${courseId}`,
        quizData,
        config
      );
      
      setQuizzes(prevQuizzes => [...prevQuizzes, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create quiz');
      console.error('Quiz creation error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateQuiz = async (quizId, quizData) => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      if (!currentUser) {
        throw new Error('User must be logged in to update a quiz');
      }

      const config = { 
        headers: { 
          Authorization: `Bearer ${await currentUser.getIdToken()}` 
        } 
      };

      const response = await axios.put(
        `${API_URL}/api/quizzes/${quizId}`,
        quizData,
        config
      );
      
      setQuizzes(prevQuizzes => 
        prevQuizzes.map(quiz => 
          quiz._id === quizId ? response.data : quiz
        )
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update quiz');
      console.error('Quiz update error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (quizId) => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      if (!currentUser) {
        throw new Error('User must be logged in to delete a quiz');
      }

      const config = { 
        headers: { 
          Authorization: `Bearer ${await currentUser.getIdToken()}` 
        } 
      };

      await axios.delete(`${API_URL}/api/quizzes/${quizId}`, config);
      
      setQuizzes(prevQuizzes => 
        prevQuizzes.filter(quiz => quiz._id !== quizId)
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete quiz');
      console.error('Quiz deletion error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    quizzes,
    currentQuiz,
    loading,
    error,
    fetchCourseQuizzes,
    fetchQuiz,
    submitQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext; 