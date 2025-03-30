import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaBell, FaCreditCard, FaCalendarAlt, FaGlobe, FaSave, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
import styles from './SettingsComponent.module.css';

const SettingsComponent = () => {
  const { currentUser, updateUserProfile, logout } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Initialize state with values from auth context if available
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    bio: currentUser?.bio || '',
    specialization: currentUser?.specialization || '',
    education: currentUser?.education || '',
    profileImage: currentUser?.profileImage || 'https://ui-avatars.com/api/?name=User&background=random'
  });
  
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: currentUser?.settings?.emailNotifications ?? true,
    smsNotifications: currentUser?.settings?.smsNotifications ?? false,
    newStudentAlerts: currentUser?.settings?.newStudentAlerts ?? true,
    assignmentAlerts: currentUser?.settings?.assignmentAlerts ?? true,
    paymentAlerts: currentUser?.settings?.paymentAlerts ?? true,
    marketingEmails: currentUser?.settings?.marketingEmails ?? false
  });
  
  const [accountSettings, setAccountSettings] = useState({
    language: currentUser?.settings?.language || 'english',
    timeZone: currentUser?.settings?.timeZone || 'Africa/Nairobi',
    currency: currentUser?.settings?.currency || 'KES'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountSettings(prev => ({ ...prev, [name]: value }));
  };

  const saveProfileData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real implementation, connect to the backend
      const response = await axios.put(`${API_URL}/api/tutors/profile`, {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
        bio: profileData.bio,
        specialization: profileData.specialization,
        education: profileData.education
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Update the user profile in auth context
      if (response.data.success) {
        updateUserProfile(response.data.user);
        setMessage({
          text: 'Profile updated successfully!',
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({
        text: error.response?.data?.message || 'Failed to update profile. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    }
  };

  const saveSecuritySettings = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (securityData.newPassword !== securityData.confirmPassword) {
      setMessage({
        text: 'New passwords do not match!',
        type: 'error'
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real implementation, connect to the backend
      const response = await axios.put(`${API_URL}/api/tutors/change-password`, {
        currentPassword: securityData.currentPassword,
        newPassword: securityData.newPassword
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        setSecurityData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setMessage({
          text: 'Password updated successfully!',
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage({
        text: error.response?.data?.message || 'Failed to update password. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    }
  };

  const saveNotificationSettings = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real implementation, connect to the backend
      const response = await axios.put(`${API_URL}/api/tutors/settings/notifications`, notificationSettings, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        // Update user context with new settings
        updateUserProfile({
          ...currentUser,
          settings: {
            ...currentUser.settings,
            ...notificationSettings
          }
        });
        
        setMessage({
          text: 'Notification preferences updated!',
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Error updating notification settings:', error);
      setMessage({
        text: error.response?.data?.message || 'Failed to update notification settings. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    }
  };

  const saveAccountSettings = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real implementation, connect to the backend
      const response = await axios.put(`${API_URL}/api/tutors/settings/account`, accountSettings, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        // Update user context with new settings
        updateUserProfile({
          ...currentUser,
          settings: {
            ...currentUser.settings,
            ...accountSettings
          }
        });
        
        setMessage({
          text: 'Account settings updated!',
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Error updating account settings:', error);
      setMessage({
        text: error.response?.data?.message || 'Failed to update account settings. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      // Redirect to login page will be handled by the auth context
    }
  };

  const handleDeactivateAccount = async () => {
    if (window.confirm('Are you sure you want to deactivate your account? You can reactivate it later.')) {
      try {
        const response = await axios.put(`${API_URL}/api/tutors/deactivate`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.data.success) {
          alert('Your account has been deactivated. You will be logged out now.');
          logout();
        }
      } catch (error) {
        console.error('Error deactivating account:', error);
        setMessage({
          text: error.response?.data?.message || 'Failed to deactivate account. Please try again.',
          type: 'error'
        });
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('WARNING: This action cannot be undone. Are you absolutely sure you want to permanently delete your account and all associated data?')) {
      const confirmText = prompt('Please type "DELETE" to confirm account deletion:');
      
      if (confirmText === 'DELETE') {
        try {
          const response = await axios.delete(`${API_URL}/api/tutors/account`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          if (response.data.success) {
            alert('Your account has been permanently deleted. You will be logged out now.');
            logout();
          }
        } catch (error) {
          console.error('Error deleting account:', error);
          setMessage({
            text: error.response?.data?.message || 'Failed to delete account. Please try again.',
            type: 'error'
          });
        }
      } else if (confirmText !== null) {
        setMessage({
          text: 'Account deletion cancelled: Confirmation text did not match.',
          type: 'error'
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1>Settings</h1>
          <p className={styles.subheader}>Manage your account settings and preferences</p>
        </div>
        
        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}
      </div>
      
      <div className={styles.settingsBody}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'profile' ? styles.active : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser /> Profile
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'security' ? styles.active : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <FaLock /> Security
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'notifications' ? styles.active : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <FaBell /> Notifications
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'account' ? styles.active : ''}`}
            onClick={() => setActiveTab('account')}
          >
            <FaGlobe /> Account
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'billing' ? styles.active : ''}`}
            onClick={() => setActiveTab('billing')}
          >
            <FaCreditCard /> Billing
          </button>
        </div>
        
        <div className={styles.tabContent}>
          {activeTab === 'profile' && (
            <form onSubmit={saveProfileData} className={styles.form}>
              <h2>Profile Information</h2>
              <p>Update your personal information and public profile</p>
              
              <div className={styles.profileHeader}>
                <div className={styles.profileImageContainer}>
                  <img 
                    src={profileData.profileImage} 
                    alt="Profile" 
                    className={styles.profileImage} 
                  />
                  <button type="button" className={styles.changeImageButton}>
                    Change Photo
                  </button>
                </div>
                
                <div className={styles.profileActions}>
                  <button type="button" className={styles.viewProfileButton}>
                    View Public Profile
                  </button>
                </div>
              </div>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className={styles.formGroup + ' ' + styles.fullWidth}>
                  <label htmlFor="specialization">Specialization</label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={profileData.specialization}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className={styles.formGroup + ' ' + styles.fullWidth}>
                  <label htmlFor="education">Education</label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={profileData.education}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className={styles.formGroup + ' ' + styles.fullWidth}>
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    rows="4"
                  />
                </div>
              </div>
              
              <div className={styles.formActions}>
                <button 
                  type="submit" 
                  className={styles.saveButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
          
          {activeTab === 'security' && (
            <form onSubmit={saveSecuritySettings} className={styles.form}>
              <h2>Security Settings</h2>
              <p>Manage your password and account security</p>
              
              <div className={styles.formGroup + ' ' + styles.fullWidth}>
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={securityData.currentPassword}
                  onChange={handleSecurityChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup + ' ' + styles.fullWidth}>
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={securityData.newPassword}
                  onChange={handleSecurityChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup + ' ' + styles.fullWidth}>
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={securityData.confirmPassword}
                  onChange={handleSecurityChange}
                  required
                />
              </div>
              
              <div className={styles.securityOptions}>
                <h3>Security Options</h3>
                
                <div className={styles.securityOption}>
                  <div>
                    <h4>Two-Factor Authentication</h4>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <button type="button" className={styles.enableButton}>
                    Enable
                  </button>
                </div>
                
                <div className={styles.securityOption}>
                  <div>
                    <h4>Active Sessions</h4>
                    <p>Manage devices where you're currently logged in</p>
                  </div>
                  <button type="button" className={styles.viewButton}>
                    View
                  </button>
                </div>
              </div>
              
              <div className={styles.formActions}>
                <button 
                  type="submit" 
                  className={styles.saveButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          )}
          
          {activeTab === 'notifications' && (
            <form onSubmit={saveNotificationSettings} className={styles.form}>
              <h2>Notification Preferences</h2>
              <p>Control how and when you receive notifications</p>
              
              <div className={styles.notificationOptions}>
                <div className={styles.notificationOption}>
                  <div>
                    <h4>Email Notifications</h4>
                    <p>Receive notifications via email</p>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                
                <div className={styles.notificationOption}>
                  <div>
                    <h4>SMS Notifications</h4>
                    <p>Receive notifications via text message</p>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={notificationSettings.smsNotifications}
                      onChange={handleNotificationChange}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                
                <h3>Notification Types</h3>
                
                <div className={styles.notificationOption}>
                  <div>
                    <h4>New Student Alerts</h4>
                    <p>When a new student enrolls in your course</p>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      name="newStudentAlerts"
                      checked={notificationSettings.newStudentAlerts}
                      onChange={handleNotificationChange}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                
                <div className={styles.notificationOption}>
                  <div>
                    <h4>Assignment Alerts</h4>
                    <p>When students submit assignments</p>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      name="assignmentAlerts"
                      checked={notificationSettings.assignmentAlerts}
                      onChange={handleNotificationChange}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                
                <div className={styles.notificationOption}>
                  <div>
                    <h4>Payment Alerts</h4>
                    <p>When you receive payments</p>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      name="paymentAlerts"
                      checked={notificationSettings.paymentAlerts}
                      onChange={handleNotificationChange}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                
                <div className={styles.notificationOption}>
                  <div>
                    <h4>Marketing Emails</h4>
                    <p>Receive news, updates and promotions</p>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      name="marketingEmails"
                      checked={notificationSettings.marketingEmails}
                      onChange={handleNotificationChange}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
              
              <div className={styles.formActions}>
                <button 
                  type="submit" 
                  className={styles.saveButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </form>
          )}
          
          {activeTab === 'account' && (
            <form onSubmit={saveAccountSettings} className={styles.form}>
              <h2>Account Settings</h2>
              <p>Manage your account preferences</p>
              
              <div className={styles.formGroup}>
                <label htmlFor="language">Language</label>
                <select
                  id="language"
                  name="language"
                  value={accountSettings.language}
                  onChange={handleAccountChange}
                >
                  <option value="english">English</option>
                  <option value="swahili">Swahili</option>
                  <option value="french">French</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="timeZone">Time Zone</label>
                <select
                  id="timeZone"
                  name="timeZone"
                  value={accountSettings.timeZone}
                  onChange={handleAccountChange}
                >
                  <option value="Africa/Nairobi">East Africa Time (UTC+3)</option>
                  <option value="UTC">Coordinated Universal Time (UTC)</option>
                  <option value="America/New_York">Eastern Time (UTC-5)</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="currency">Currency</label>
                <select
                  id="currency"
                  name="currency"
                  value={accountSettings.currency}
                  onChange={handleAccountChange}
                >
                  <option value="KES">Kenyan Shilling (KES)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>
              
              <div className={styles.dangerZone}>
                <h3>Danger Zone</h3>
                
                <div className={styles.dangerOption}>
                  <div>
                    <h4>Deactivate Account</h4>
                    <p>Temporarily disable your account</p>
                  </div>
                  <button type="button" className={styles.dangerButton} onClick={handleDeactivateAccount}>
                    Deactivate
                  </button>
                </div>
                
                <div className={styles.dangerOption}>
                  <div>
                    <h4>Delete Account</h4>
                    <p>Permanently remove your account and all data</p>
                  </div>
                  <button type="button" className={styles.dangerButton} onClick={handleDeleteAccount}>
                    Delete
                  </button>
                </div>
              </div>
              
              <div className={styles.formActions}>
                <button 
                  type="submit" 
                  className={styles.saveButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </form>
          )}
          
          {activeTab === 'billing' && (
            <div className={styles.form}>
              <h2>Billing & Payments</h2>
              <p>Manage your payment methods and billing information</p>
              
              <div className={styles.billingSection}>
                <h3>Payment Methods</h3>
                <p className={styles.emptyMessage}>No payment methods added yet.</p>
                <button className={styles.addButton}>Add Payment Method</button>
              </div>
              
              <div className={styles.billingSection}>
                <h3>Billing Information</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Name</label>
                    <input type="text" placeholder="Full Name" />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Company (Optional)</label>
                    <input type="text" placeholder="Company Name" />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Address</label>
                    <input type="text" placeholder="Street Address" />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>City</label>
                    <input type="text" placeholder="City" />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Country</label>
                    <select>
                      <option value="kenya">Kenya</option>
                      <option value="uganda">Uganda</option>
                      <option value="tanzania">Tanzania</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Postal Code</label>
                    <input type="text" placeholder="Postal Code" />
                  </div>
                </div>
                
                <div className={styles.billingActions}>
                  <button className={styles.saveButton}>Save Billing Information</button>
                </div>
              </div>
              
              <div className={styles.billingSection}>
                <h3>Payment History</h3>
                <p className={styles.emptyMessage}>No payment history available.</p>
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.logoutSection}>
          <button type="button" className={styles.logoutButton} onClick={handleLogout}>
            <FaSignOutAlt /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;