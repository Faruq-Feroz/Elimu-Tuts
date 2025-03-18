import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Landing page components
import Home from './pages/landing/Home';
import About from './pages/landing/About';
import Pricing from './pages/landing/Pricing';
import Contact from './pages/landing/Contact';

// Auth page placeholders (not implementing authentication yet)
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Dashboard placeholders
import StudentDashboard from './pages/dashboard/StudentDashboard';
import TutorDashboard from './pages/dashboard/TutorDashboard';
import ParentDashboard from './pages/dashboard/ParentDashboard';
import Courses from './pages/dashboard/Courses';
import CourseDetail from './pages/dashboard/CourseDetail';
import Quiz from './pages/dashboard/Quiz';
import Checkout from './pages/dashboard/Checkout';

function App() {
  return (
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
        
        {/* Dashboard routes */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/tutor" element={<TutorDashboard />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;