import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/config';
import axios from 'axios';

// API URL from environment variables - Using Vite's approach
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Clear any previous error
  const clearError = () => setError('');

  // Sign up
  const signup = async (email, password, fullName, role, phoneNumber) => {
    clearError();
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
     
      // Update display name in Firebase
      await updateProfile(userCredential.user, { displayName: fullName });
     
      // Get ID token
      const idToken = await userCredential.user.getIdToken();
     
      // Create user in our database with role information
      const response = await axios.post(`${API_URL}/api/users/create-or-update`,
        { email, fullName, role, phoneNumber },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
     
      setUserRole(response.data.user.role);
      return response.data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign in
  const login = async (email, password) => {
    clearError();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
     
      // Get the user's role from our database
      const idToken = await userCredential.user.getIdToken();
      const response = await axios.get(`${API_URL}/api/users/current-user`,
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
     
      setUserRole(response.data.user.role);
      return response.data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign out
  const logout = async () => {
    clearError();
    try {
      await signOut(auth);
      setUserRole(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Password reset
  const resetPassword = async (email) => {
    clearError();
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Get user role from backend
  const fetchUserRole = async (user) => {
    try {
      const idToken = await user.getIdToken();
      const response = await axios.get(`${API_URL}/api/users/current-user`,
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      setUserRole(response.data.user.role);
    } catch (err) {
      console.error('Error fetching user role:', err);
      setError('Failed to fetch user role');
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
     
      if (user) {
        await fetchUserRole(user);
      } else {
        setUserRole(null);
      }
     
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    error,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;