import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
import TutorDashboards from './pages/dashboard/TutorDashboard';
import ParentsDashboard from './pages/dashboard/ParentDashboard';
import Courses from './pages/dashboard/Courses';
import CourseDetail from './pages/dashboard/CourseDetail';
import Quiz from './pages/dashboard/Quiz';
import Checkout from './pages/dashboard/Checkout';

function App() {
  return (
    <AuthProvider>
      <Router>
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
          <Route path="/dashboard/tutor" element={<TutorDashboards />} />
          <Route path="/dashboard/parent" element={<ParentsDashboard />} />
          <Route path="/dashboard/courses" element={<Courses />} />
          <Route path="/dashboard/courses/:courseId" element={<CourseDetail />} />
          <Route path="/dashboard/quiz/:quizId" element={<Quiz />} />
          <Route path="/dashboard/checkout" element={<Checkout />} />
          
          {/* Legacy routes - redirect to dashboard routes */}
          <Route path="/student" element={<Navigate to="/dashboard/student" replace />} />
          <Route path="/tutor" element={<Navigate to="/dashboard/tutor" replace />} />
          <Route path="/parent" element={<Navigate to="/dashboard/parent" replace />} />
          <Route path="/courses" element={<Navigate to="/dashboard/courses" replace />} />
          <Route path="/courses/:courseId" element={<Navigate to={`/dashboard/courses/:courseId`} replace />} />
          <Route path="/quiz/:quizId" element={<Navigate to={`/dashboard/quiz/:quizId`} replace />} />
          <Route path="/checkout" element={<Navigate to="/dashboard/checkout" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;