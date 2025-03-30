import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './EnrollForm.module.css';
import { useAuth } from '../../../context/AuthContext';
import { FiAlertCircle, FiCheckCircle, FiLoader, FiPhone, FiInfo } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const EnrollForm = ({ course, onClose, onSuccess }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [checkoutRequestId, setCheckoutRequestId] = useState('');
  const [statusCheckInterval, setStatusCheckInterval] = useState(null);
  const { currentUser } = useAuth();

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    };
  }, [statusCheckInterval]);

  // Format phone number to ensure it starts with 254
  const formatPhoneNumber = (phoneNumber) => {
    // Remove any non-digit characters
    let cleaned = phoneNumber.replace(/\D/g, '');
    
    // If starts with 0, replace with 254
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1);
    }
    
    // If it doesn't start with 254, add it
    if (!cleaned.startsWith('254') && cleaned.length <= 9) {
      cleaned = '254' + cleaned;
    }
    
    return cleaned;
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
  };

  const checkPaymentStatus = async () => {
    if (!checkoutRequestId) return;
    
    try {
      // Get fresh token
      const token = await currentUser.getIdToken(true);
      
      const response = await axios.get(
        `${API_URL}/api/orders/status/${checkoutRequestId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      console.log('Payment status response:', response.data);
      const { status, message, mpesaCode } = response.data;
      
      // Update state with new status
      setPaymentStatus(status);
      
      if (status === 'completed') {
        // Payment successful
        if (statusCheckInterval) {
          clearInterval(statusCheckInterval);
          setStatusCheckInterval(null);
        }
        
        // Call onSuccess with the payment data
        onSuccess({
          status,
          message,
          mpesaCode,
          checkoutRequestId
        });
      } else if (status === 'failed') {
        // Payment failed
        if (statusCheckInterval) {
          clearInterval(statusCheckInterval);
          setStatusCheckInterval(null);
        }
        setError(message || 'Payment failed. Please try again.');
        setPaymentInitiated(false); // Allow user to try again
      }
      // For 'pending', continue checking
      
    } catch (error) {
      console.error('Error checking payment status:', error);
      
      // Check if we can extract a status from the error response
      if (error.response?.data?.status === 'completed') {
        // Even if there was an error, the payment was completed
        setPaymentStatus('completed');
        
        if (statusCheckInterval) {
          clearInterval(statusCheckInterval);
          setStatusCheckInterval(null);
        }
        
        onSuccess({
          status: 'completed',
          message: 'Payment processed successfully',
          checkoutRequestId
        });
      }
      
      // Don't stop checking on error, might be temporary
      // But limit consecutive errors
      const consecutiveErrors = (window.mpesaStatusErrors || 0) + 1;
      window.mpesaStatusErrors = consecutiveErrors;
      
      // After 5 consecutive errors, stop checking and suggest manual verification
      if (consecutiveErrors > 5) {
        if (statusCheckInterval) {
          clearInterval(statusCheckInterval);
          setStatusCheckInterval(null);
        }
        setError('Unable to verify payment status. If you completed the payment, please contact support with your M-Pesa receipt.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPaymentInitiated(false);
    
    // Phone validation
    if (!phone.match(/^254[0-9]{9}$/)) {
      setError('Please enter a valid M-Pesa number starting with 254 followed by 9 digits');
      setLoading(false);
      return;
    }

    try {
      if (!currentUser) {
        setError('Please log in to continue');
        setLoading(false);
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

      console.log('Payment initiated:', response.data);
      
      // Set payment initiated flag and store checkout request ID
      setPaymentInitiated(true);
      setCheckoutRequestId(response.data.checkoutRequestId);
      
      // Success message
      setPaymentStatus('pending');
      
      // Check status after 10 seconds to give time for user to complete payment
      setTimeout(() => {
        checkPaymentStatus();
        
        // Then start regular checking
        const interval = setInterval(checkPaymentStatus, 5000); // Check every 5 seconds
        setStatusCheckInterval(interval);
      }, 10000);
      
      setLoading(false);
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.details || 
                          'Failed to initiate payment. Please try again.';
      
      setError(errorMessage);
    }
  };

  const renderPaymentStatus = () => {
    if (!paymentInitiated) return null;
    
    if (paymentStatus === 'completed') {
      return (
        <div className={styles.successMessage}>
          <FiCheckCircle className={styles.successIcon} />
          <p>Payment successful! You are now enrolled in this course.</p>
          <button 
            onClick={onClose} 
            className={styles.successButton}
          >
            Continue to course
          </button>
        </div>
      );
    }
    
    if (paymentStatus === 'failed') {
      return (
        <div className={styles.errorMessage}>
          <FiAlertCircle className={styles.errorIcon} />
          <p>{error || 'Payment failed. Please try again.'}</p>
          <div className={styles.buttons}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setPaymentInitiated(false)}
              className={styles.retryButton}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    
    // Default case - pending
    return (
      <div className={styles.statusMessage}>
        <div className={styles.spinnerContainer}>
          <FiLoader className={styles.spinnerIcon} />
        </div>
        <h3>Payment Initiated</h3>
        <p>Please check your phone and complete the M-Pesa payment. This page will update automatically.</p>
        <div className={styles.infoBox}>
          <FiInfo className={styles.infoIcon} />
          <p>If you don't receive a prompt, please check your phone notifications or open your M-Pesa app.</p>
        </div>
        
        {error && (
          <div className={styles.statusError}>
            <FiAlertCircle className={styles.errorIcon} />
            <p>{error}</p>
          </div>
        )}
        
        <button 
          onClick={() => checkPaymentStatus()} 
          className={styles.refreshButton}
        >
          Check Payment Status
        </button>
      </div>
    );
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {!paymentInitiated ? (
          <>
            <h2>Enroll in {course.title}</h2>
            <p className={styles.price}>Price: KES {course.price.toLocaleString()}</p>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="phone">
                  <FiPhone className={styles.inputIcon} />
                  M-Pesa Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="e.g., 254712345678"
                  pattern="^254[0-9]{9}$"
                  required
                />
                <small className={styles.helpText}>
                  Enter your M-Pesa phone number starting with 254
                </small>
              </div>

              {error && (
                <div className={styles.error}>
                  <FiAlertCircle className={styles.errorIcon} />
                  {error}
                </div>
              )}

              <div className={styles.buttons}>
                <button
                  type="button"
                  onClick={onClose}
                  className={styles.cancelButton}
                  disabled={loading}
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
          </>
        ) : (
          renderPaymentStatus()
        )}
      </div>
    </div>
  );
};

export default EnrollForm; 