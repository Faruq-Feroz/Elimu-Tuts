import React, { useState, useEffect } from 'react';
import { FiUser, FiLock, FiSettings, FiEye, FiEyeOff, FiSave, FiAlertCircle, FiBell } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import styles from './Settings.module.css';

const Settings = () => {
  const { currentUser } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    county: '',
    profilePicture: null
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification preferences state
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    appNotifications: true,
    marketingEmails: false,
    newResourceAlert: true,
    paymentReminders: true,
    tutorMessages: true,
    childProgressUpdates: true,
    systemUpdates: false
  });
  
  // Curriculum preferences state
  const [curriculumPreferences, setcurriculumPreferences] = useState({
    preferredCurriculum: 'cbc', // CBC or 8-4-4
    languagePreference: 'english', // English or Swahili
    contentLevel: 'standard' // Standard, Advanced, Basic
  });

  // Initialize with user data
  useEffect(() => {
    if (currentUser) {
      // Extract display name parts (assuming format is "First Last")
      const displayNameParts = currentUser.displayName ? currentUser.displayName.split(' ') : ['Jane', 'Smith'];
      const firstName = displayNameParts[0] || 'Jane';
      const lastName = displayNameParts.length > 1 ? displayNameParts.slice(1).join(' ') : 'Smith';
      
      // In a real app, this would be populated from the user object
      setProfileForm({
        firstName: firstName,
        lastName: lastName,
        email: currentUser.email || 'jane.smith@example.com',
        phone: currentUser.phoneNumber || '+254 712 345 678',
        address: currentUser.address || '123 Moi Avenue',
        county: currentUser.county || 'Nairobi',
        profilePicture: currentUser.photoURL || null
      });
      
      setLoading(false);
    }
  }, [currentUser]);

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileForm({
        ...profileForm,
        profilePicture: file
      });
    }
  };

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
  };

  // Handle notification preferences changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationPreferences({
      ...notificationPreferences,
      [name]: checked
    });
  };

  // Handle curriculum preferences changes
  const handleCurriculumChange = (e) => {
    const { name, value } = e.target;
    setcurriculumPreferences({
      ...curriculumPreferences,
      [name]: value
    });
  };

  // Submit profile form
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    try {
      setLoading(true);
      
      // In a real app, this would call the updateUserProfile function from AuthContext
      // await updateUserProfile(profileForm);
      
      // Simulating API call
      setTimeout(() => {
        setLoading(false);
        setSuccess('Profile updated successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }, 1000);
    } catch (error) {
      setLoading(false);
      setError('Failed to update profile. Please try again.');
      console.error(error);
    }
  };

  // Submit password form
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    
    try {
      setLoading(true);
      
      // In a real app, this would call the updatePassword function from AuthContext
      // await updatePassword(passwordForm.currentPassword, passwordForm.newPassword);
      
      // Simulating API call
      setTimeout(() => {
        setLoading(false);
        setSuccess('Password updated successfully!');
        
        // Reset password form
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }, 1000);
    } catch (error) {
      setLoading(false);
      setError('Failed to update password. Please ensure your current password is correct.');
      console.error(error);
    }
  };

  // Submit notification preferences
  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    try {
      setLoading(true);
      
      // In a real app, this would call an API to update notification preferences
      
      // Simulating API call
      setTimeout(() => {
        setLoading(false);
        setSuccess('Notification preferences updated successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }, 1000);
    } catch (error) {
      setLoading(false);
      setError('Failed to update notification preferences. Please try again.');
      console.error(error);
    }
  };

  // Submit curriculum preferences
  const handleCurriculumSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    try {
      setLoading(true);
      
      // In a real app, this would call an API to update curriculum preferences
      
      // Simulating API call
      setTimeout(() => {
        setLoading(false);
        setSuccess('Curriculum preferences updated successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }, 1000);
    } catch (error) {
      setLoading(false);
      setError('Failed to update curriculum preferences. Please try again.');
      console.error(error);
    }
  };

  // Delete account
  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, this would call an API to delete the account
      alert('In a production environment, this would delete your account and log you out.');
    }
  };

  // Loading state
  if (loading && !currentUser) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <h2>Account Settings</h2>
        <p>Manage your profile and preferences</p>
      </div>
      
      {/* Tabs */}
      <div className={styles.settingsTabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'profile' ? styles.active : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FiUser />
          <span>Profile</span>
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'security' ? styles.active : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <FiLock />
          <span>Security</span>
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'notifications' ? styles.active : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <FiBell />
          <span>Notifications</span>
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'preferences' ? styles.active : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          <FiSettings />
          <span>Preferences</span>
        </button>
      </div>
      
      {/* Success and error messages */}
      {success && (
        <div className={styles.successMessage}>
          {success}
        </div>
      )}
      
      {error && (
        <div className={styles.errorMessage}>
          <FiAlertCircle />
          <span>{error}</span>
        </div>
      )}
      
      {/* Tab content */}
      <div className={styles.tabContent}>
        {/* Profile tab */}
        {activeTab === 'profile' && (
          <div className={styles.profileSettings}>
            <h3>Personal Information</h3>
            <form onSubmit={handleProfileSubmit}>
              <div className={styles.profilePictureSection}>
                <div className={styles.profilePicture}>
                  {profileForm.profilePicture ? (
                    <img 
                      src={typeof profileForm.profilePicture === 'string' 
                        ? profileForm.profilePicture 
                        : URL.createObjectURL(profileForm.profilePicture)
                      } 
                      alt="Profile" 
                    />
                  ) : (
                    <div className={styles.profileInitials}>
                      {profileForm.firstName.charAt(0)}{profileForm.lastName.charAt(0)}
                    </div>
                  )}
                </div>
                <div className={styles.profilePictureControls}>
                  <p>Profile Picture</p>
                  <label className={styles.uploadButton}>
                    Upload Photo
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleProfilePictureChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {profileForm.profilePicture && (
                    <button 
                      type="button" 
                      className={styles.removeButton}
                      onClick={() => setProfileForm({...profileForm, profilePicture: null})}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    value={profileForm.firstName}
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
                    value={profileForm.lastName}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={profileForm.email}
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
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Home Address</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    value={profileForm.address}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="county">County</label>
                  <select 
                    id="county" 
                    name="county" 
                    value={profileForm.county}
                    onChange={handleProfileChange}
                  >
                    <option value="Nairobi">Nairobi</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Kisumu">Kisumu</option>
                    <option value="Nakuru">Nakuru</option>
                    <option value="Eldoret">Eldoret</option>
                    <option value="Kitui">Kitui</option>
                    <option value="Machakos">Machakos</option>
                    <option value="Garissa">Garissa</option>
                    <option value="Nyeri">Nyeri</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.formActions}>
                <button type="submit" className={styles.saveButton}>
                  <FiSave />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Security tab */}
        {activeTab === 'security' && (
          <div className={styles.securitySettings}>
            <h3>Change Password</h3>
            <form onSubmit={handlePasswordSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="currentPassword">Current Password</label>
                <div className={styles.passwordInput}>
                  <input 
                    type={showCurrentPassword ? "text" : "password"} 
                    id="currentPassword" 
                    name="currentPassword" 
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <button 
                    type="button" 
                    className={styles.passwordToggle}
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="newPassword">New Password</label>
                <div className={styles.passwordInput}>
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    id="newPassword" 
                    name="newPassword" 
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <button 
                    type="button" 
                    className={styles.passwordToggle}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <p className={styles.passwordHint}>Password must be at least 8 characters long</p>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <div className={styles.passwordInput}>
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <button 
                    type="button" 
                    className={styles.passwordToggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              
              <div className={styles.formActions}>
                <button type="submit" className={styles.saveButton}>
                  <FiSave />
                  Update Password
                </button>
              </div>
            </form>
            
            <div className={styles.dangerZone}>
              <h3>Account Actions</h3>
              <p>These actions are permanent and cannot be undone.</p>
              <button 
                type="button" 
                className={styles.deleteButton}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
        
        {/* Notifications tab */}
        {activeTab === 'notifications' && (
          <div className={styles.notificationSettings}>
            <h3>Notification Preferences</h3>
            <form onSubmit={handleNotificationSubmit}>
              <div className={styles.notificationSection}>
                <h4>Notification Channels</h4>
                <div className={styles.checkboxGroup}>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      name="emailNotifications"
                      checked={notificationPreferences.emailNotifications}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="emailNotifications">Email Notifications</label>
                  </div>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      name="smsNotifications"
                      checked={notificationPreferences.smsNotifications}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="smsNotifications">SMS Notifications</label>
                  </div>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="appNotifications"
                      name="appNotifications"
                      checked={notificationPreferences.appNotifications}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="appNotifications">In-App Notifications</label>
                  </div>
                </div>
              </div>
              
              <div className={styles.notificationSection}>
                <h4>Notification Types</h4>
                <div className={styles.checkboxGroup}>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="newResourceAlert"
                      name="newResourceAlert"
                      checked={notificationPreferences.newResourceAlert}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="newResourceAlert">New Learning Resources</label>
                  </div>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="paymentReminders"
                      name="paymentReminders"
                      checked={notificationPreferences.paymentReminders}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="paymentReminders">Payment Reminders</label>
                  </div>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="tutorMessages"
                      name="tutorMessages"
                      checked={notificationPreferences.tutorMessages}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="tutorMessages">Tutor Messages</label>
                  </div>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="childProgressUpdates"
                      name="childProgressUpdates"
                      checked={notificationPreferences.childProgressUpdates}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="childProgressUpdates">Child Progress Updates</label>
                  </div>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="systemUpdates"
                      name="systemUpdates"
                      checked={notificationPreferences.systemUpdates}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="systemUpdates">System Updates</label>
                  </div>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="marketingEmails"
                      name="marketingEmails"
                      checked={notificationPreferences.marketingEmails}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="marketingEmails">Marketing Emails</label>
                  </div>
                </div>
              </div>
              
              <div className={styles.formActions}>
                <button type="submit" className={styles.saveButton}>
                  <FiSave />
                  Save Preferences
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Preferences tab */}
        {activeTab === 'preferences' && (
          <div className={styles.preferencesSettings}>
            <h3>Curriculum & Content Preferences</h3>
            <form onSubmit={handleCurriculumSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="preferredCurriculum">Preferred Curriculum</label>
                <select 
                  id="preferredCurriculum" 
                  name="preferredCurriculum" 
                  value={curriculumPreferences.preferredCurriculum}
                  onChange={handleCurriculumChange}
                >
                  <option value="cbc">Competency-Based Curriculum (CBC)</option>
                  <option value="8-4-4">8-4-4 System</option>
                  <option value="both">Both (Show resources for both)</option>
                </select>
                <p className={styles.fieldHint}>
                  This setting determines which curriculum resources are prioritized in your child's dashboard.
                </p>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="languagePreference">Language Preference</label>
                <select 
                  id="languagePreference" 
                  name="languagePreference" 
                  value={curriculumPreferences.languagePreference}
                  onChange={handleCurriculumChange}
                >
                  <option value="english">English</option>
                  <option value="swahili">Swahili</option>
                  <option value="both">Bilingual (English & Swahili)</option>
                </select>
                <p className={styles.fieldHint}>
                  This determines the default language for learning materials where multiple languages are available.
                </p>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="contentLevel">Content Difficulty Level</label>
                <select 
                  id="contentLevel" 
                  name="contentLevel" 
                  value={curriculumPreferences.contentLevel}
                  onChange={handleCurriculumChange}
                >
                  <option value="basic">Basic (Simplified content)</option>
                  <option value="standard">Standard (Grade-level content)</option>
                  <option value="advanced">Advanced (Challenging content)</option>
                </select>
                <p className={styles.fieldHint}>
                  This helps us customize the difficulty level of recommended resources.
                </p>
              </div>
              
              <div className={styles.formActions}>
                <button type="submit" className={styles.saveButton}>
                  <FiSave />
                  Save Preferences
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings; 