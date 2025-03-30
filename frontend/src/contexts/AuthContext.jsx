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
     
      // Get ID token with forced refresh to ensure it's up-to-date
      const idToken = await userCredential.user.getIdToken(true);
     
      // Create user in our database with role information
      const response = await axios.post(`${API_URL}/api/users/create-or-update`,
        { email, fullName, role, phoneNumber },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
     
      // Set the role from the response we already have, no need to fetch again
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
      const idToken = await userCredential.user.getIdToken(true);
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
  // Get user role from backend with retry mechanism
  const fetchUserRole = async (user) => {
    try {
      // Try up to 3 times with a delay between attempts
      let attempts = 0;
      let success = false;
      
      while (attempts < 3 && !success) {
        try {
          const idToken = await user.getIdToken(true); // Force refresh token
          const response = await axios.get(`${API_URL}/api/users/current-user`, 
            { headers: { Authorization: `Bearer ${idToken}` } }
          );
          setUserRole(response.data.user.role);
          success = true;
        } catch (error) {
          attempts++;
          if (attempts < 3) {
            console.log(`Attempt ${attempts} failed, retrying in 1 second...`);
            // Wait 1 second before trying again
            await new Promise(resolve => setTimeout(resolve, 1000));
          } else {
            throw error; // Rethrow after final attempt
          }
        }
      }
    } catch (err) {
      console.error('Error fetching user role:', err);
      // Set a default role if fetch fails
      setUserRole('user'); 
    }
  };
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
     
      if (user) {
        try {
          await fetchUserRole(user);
        } catch (error) {
          console.error('Could not fetch user role:', error);
          // Default to a basic role if fetching fails
          setUserRole('user');
        }
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