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

// Loading component with pencil animation
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
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      transform: 'translateY(-50px)' // Move the entire content up by 50px
    }}>
      <h2 style={{ marginBottom: '1rem' }}>Elimu Tuts</h2>
      <p style={{ marginBottom: '2rem', textAlign: 'center', maxWidth: '90%', color: '#666' }}>
        First load might take up to a minute while our server wakes up.
      </p>
      
      {/* Pencil Loader */}
      <span className="loader"></span>
    </div>
    
    <style>
      {`
        .loader {
          position: relative;
          height: 200px;
          width: 200px;
          border-bottom: 3px solid #ff3d00;
          box-sizing: border-box;
          animation: drawLine 4s linear infinite;
        }
        .loader:before {
          content: "";
          position: absolute;
          left: calc(100% + 14px);
          bottom: -6px;
          width: 16px;
          height: 100px;
          border-radius: 20px 20px 50px 50px;
          background-repeat: no-repeat;
          background-image: linear-gradient(#ff3d00 6px, transparent 0),
            linear-gradient(45deg, rgba(0, 0, 0, 0.02) 49%, white 51%),
            linear-gradient(315deg, rgba(0, 0, 0, 0.02) 49%, white 51%),
            linear-gradient( to bottom, #ffffff 10%, #ff3d00 10%, #ff3d00 90%, #ffffff 90% );
          background-size: 3px 3px, 8px 8px, 8px 8px, 16px 88px;
          background-position: center bottom, left 88px, right 88px, left top;
          transform: rotate(25deg);
          animation: pencilRot 4s linear infinite;
        }

        @keyframes drawLine {
          0%, 100% { width: 0px }
          45%, 55% { width: 200px }
        }

        @keyframes pencilRot {
          0%, 45% {
            bottom: -6px;
            left: calc(100% + 14px);
            transform: rotate(25deg);
          }
          55%,
          100% {
            bottom: -12px;
            left: calc(100% + 16px);
            transform: rotate(220deg);
          }
        }
        
        /* Make the loader responsive */
        @media (max-width: 480px) {
          .loader {
            height: 150px;
            width: 150px;
          }
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
