// elimu-tuts-client/src/components/auth/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser, userRole, loading } = useAuth();
  
  // Still loading authentication state
  if (loading) {
    return <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }
  
  // Not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to the appropriate dashboard based on role
    if (userRole === 'student') {
      return <Navigate to="/dashboard/student" />;
    } else if (userRole === 'tutor') {
      return <Navigate to="/dashboard/tutor" />;
    } else if (userRole === 'parent') {
      return <Navigate to="/dashboard/parent" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }
  
  // Authorized, render the component
  return children;
};

export default PrivateRoute;