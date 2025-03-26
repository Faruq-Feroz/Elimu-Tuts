import React, { useState } from 'react';
import axios from 'axios';
import styles from './EnrollForm.module.css';
import { useAuth } from '../../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const EnrollForm = ({ course, onClose, onSuccess }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!currentUser) {
        setError('Please log in to continue');
        return;
      }

      // Get fresh token from current user
      const token = await currentUser.getIdToken(true);
      
      // Make the request with the fresh token
      const response = await axios.post(
        `${API_URL}/api/orders`,
        {
          courseId: course._id,
          phone
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      onSuccess(response.data);
      onClose();
    } catch (error) {
      console.error('Payment error:', error);
      
      if (error.response?.status === 401) {
        // Try one more time with a fresh token
        try {
          const newToken = await currentUser.getIdToken(true);
          const retryResponse = await axios.post(
            `${API_URL}/api/orders`,
            {
              courseId: course._id,
              phone
            },
            {
              headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
              }
            }
          );
          onSuccess(retryResponse.data);
          onClose();
          return;
        } catch (retryError) {
          console.error('Retry failed:', retryError);
        }
        setError('Your session has expired. Please log in again.');
      } else {
        setError(error.response?.data?.error || 'Failed to initiate payment');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Enroll in {course.title}</h2>
        <p className={styles.price}>Price: KES {course.price.toLocaleString()}</p>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="phone">M-Pesa Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g., 254712345678"
              pattern="^254[0-9]{9}$"
              required
            />
            <small className={styles.helpText}>
              Enter your M-Pesa phone number starting with 254
            </small>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Processing...' : 'Pay with M-Pesa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollForm; 