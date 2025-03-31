import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// Landing page components
import Home from './pages/landing/Home';
import About from './pages/landing/About';
import Pricing from './pages/landing/Pricing';
import Contact from './pages/landing/Contact';
// Auth components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import PrivateRoute from './pages/auth/PrivateRoute'
// Dashboard placeholders
import StudentsDashboard from './pages/dashboard/StudentDashboard';
import TutorsDashboards from './pages/dashboard/TutorDashboard';
import ParentsDashboard from './pages/dashboard/ParentDashboard';
import Courses from './pages/dashboard/Courses';
import CourseDetail from './pages/dashboard/CourseDetail';
import Quizs from './pages/dashboard/Quiz';
import Checkout from './pages/dashboard/Checkout';
// Sample standalone components
import SampleQuiz from './pages/SampleQuiz';
// Utility components
import ScrollToTop from './components/utils/ScrollToTop';
import { useAuth } from './context/AuthContext';

// Loading component
const GlobalLoader = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    zIndex: 9999
  }}>
    <h2 style={{ marginBottom: '1rem' }}>Elimu Tuts</h2>
    <p style={{ marginBottom: '2rem', textAlign: 'center', maxWidth: '90%', color: '#666' }}>
      First load might take up to a minute while our server wakes up.
    </p>
    <div style={{
      width: '50px',
      height: '50px',
      border: '5px solid rgba(0,0,0,0.1)',
      borderRadius: '50%',
      borderTopColor: '#ff5722',
      animation: 'spin 1s ease-in-out infinite'
    }}></div>
    <style>
      {`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

function App() {
  const { loading } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);

  // After component mounts, set initialLoad to false after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 2000); // 2 seconds minimum loading screen
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show loader if auth is loading or during initial load
  if (loading || initialLoad) {
    return <GlobalLoader />;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Landing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
       
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
       
        {/* Dashboard routes with dashboard prefix */}
        <Route path="/dashboard/student" element={<StudentsDashboard />} />
        <Route path="/dashboard/tutor" element={<TutorsDashboards />} />
        <Route path="/dashboard/parent" element={<ParentsDashboard />} />
        <Route path="/dashboard/progress-report" element={<ParentsDashboard />} />
        <Route path="/dashboard/courses" element={<Courses />} />
        <Route path="/dashboard/courses/:courseId" element={<CourseDetail />} />
        <Route path="/dashboard/quiz/:quizId" element={<Quizs />} />
        <Route path="/dashboard/checkout" element={<Checkout />} />
        
        {/* Sample standalone routes */}
        <Route path="/sample-quiz" element={<SampleQuiz />} />
        
        {/* Legacy routes - redirect to dashboard routes */}
        <Route path="/student" element={<Navigate to="/dashboard/student" replace />} />
        <Route path="/tutor" element={<Navigate to="/dashboard/tutor" replace />} />
        <Route path="/parent" element={<Navigate to="/dashboard/parent" replace />} />
        <Route path="/courses" element={<Navigate to="/dashboard/courses" replace />} />
        <Route path="/courses/:courseId" element={<Navigate to={`/dashboard/courses/:courseId`} replace />} />
        <Route path="/quizs/:quizId" element={<Navigate to={`/dashboard/quiz/:quizId`} replace />} />
        <Route path="/checkout" element={<Navigate to="/dashboard/checkout" replace />} />
      </Routes>
    </>
  );
}

export default App;
