// src/components/Settings.jsx
import React, { useState, useEffect } from 'react';
import styles from './SettingsComponent.module.css';
import { 
  FaUser, 
  FaBell, 
  FaLock, 
  FaPalette, 
  FaCreditCard, 
  FaKey, 
  FaCamera,
  FaUserCircle,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import { useAuth } from '../../../../context/AuthContext';

const SettingsComponent = () => {
  // Get user data from auth context
  const { currentUser: user } = useAuth();

  // State variables
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // State for profile data
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  });
  
  // State for password data
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // State for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: false,
    courseUpdates: false,
    assignmentReminders: false,
    forumActivity: false
  });
  
  // State for privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    showEmail: false,
    showCourses: true,
    allowMessages: true
  });
  
  // State for appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    darkMode: false,
    fontSize: 'medium',
    colorScheme: 'blue'
  });

  // Load user data on component mount
  useEffect(() => {
    if (user) {
      setProfileImage(user.photoURL || null);
      
      // Initialize profile data
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        name: user.displayName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        location: user.location || '',
        bio: user.bio || ''
      });
      
      // Initialize notification settings
      if (user.preferences?.notifications) {
        setNotificationSettings(user.preferences.notifications);
      }
      
      // Initialize privacy settings
      if (user.preferences?.privacy) {
        setPrivacySettings(user.preferences.privacy);
      }
      
      // Initialize appearance settings
      if (user.preferences?.appearance) {
        setAppearanceSettings(user.preferences.appearance);
      }
    }
  }, [user]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile data changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle notification toggle
  const handleNotificationToggle = (setting) => {
    setNotificationSettings(prevSettings => ({
      ...prevSettings,
      [setting]: !prevSettings[setting]
    }));
  };

  // Handle privacy toggle
  const handlePrivacyToggle = (setting) => {
    setPrivacySettings(prevSettings => ({
      ...prevSettings,
      [setting]: !prevSettings[setting]
    }));
  };

  // Handle appearance settings
  const handleAppearanceChange = (setting, value) => {
    setAppearanceSettings(prevSettings => ({
      ...prevSettings,
      [setting]: value
    }));
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would call an API to update the profile
      // For example:
      // const result = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(profileData)
      // });
      // const updatedUser = await result.json();
      
      // Since we can't directly update the user in the auth context,
      // we'll just simulate a successful update for now
      
      setIsLoading(false);
      setSuccess("Profile updated successfully");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Failed to update profile");
    }
  };

  // Handle password form submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('New passwords do not match');
      }
      
      // Mock function for updating password - in a real app, this would be an API call
      // await updatePassword(passwordData);
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setIsLoading(false);
      setSuccess("Password updated successfully");
      
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Failed to update password");
    }
  };

  // Handle notification settings submission
  const handleSaveNotifications = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would save these settings to your backend
      // For example:
      // await fetch('/api/user/preferences/notifications', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(notificationSettings)
      // });
      
      setIsLoading(false);
      setSuccess("Notification preferences saved");
      
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Failed to save notification preferences");
    }
  };

  // Handle privacy settings submission
  const handleSavePrivacy = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would save these settings to your backend
      // For example:
      // await fetch('/api/user/preferences/privacy', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(privacySettings)
      // });
      
      setIsLoading(false);
      setSuccess("Privacy settings saved");
      
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Failed to save privacy settings");
    }
  };

  // Handle appearance settings submission
  const handleSaveAppearance = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would save these settings to your backend
      // For example:
      // await fetch('/api/user/preferences/appearance', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(appearanceSettings)
      // });
      
      setIsLoading(false);
      setSuccess("Appearance settings saved");
      
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Failed to save appearance settings");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className={styles.settingsCard}>
            <div className={styles.settingsCardHeader}>
              <h2 className={styles.settingsCardTitle}>Personal Information</h2>
            </div>
            <div className={styles.settingsCardBody}>
              {/* File Upload for Profile Image */}
              <div className={styles.fileUploadContainer}>
                <div className={styles.fileUploadPreview}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className={styles.profileImage} />
                  ) : (
                    <FaUser />
                  )}
                </div>
                <label htmlFor="profileImage" className={styles.fileUploadLabel}>
                  Change Photo
                </label>
                <input
                  type="file"
                  id="profileImage"
                  onChange={handleImageUpload}
                  className={styles.fileUploadInput}
                  accept="image/*"
                />
              </div>

              {/* Profile Form */}
              <form onSubmit={handleProfileSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formColumn}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Full Name</label>
                      <input
                        type="text"
                        className={styles.formInput}
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.formColumn}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Email Address</label>
                      <input
                        type="email"
                        className={styles.formInput}
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formColumn}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Phone Number</label>
                      <input
                        type="tel"
                        className={styles.formInput}
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                  <div className={styles.formColumn}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Location</label>
                      <input
                        type="text"
                        className={styles.formInput}
                        name="location"
                        value={profileData.location}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Bio</label>
                  <textarea
                    className={styles.formTextarea}
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        );
      case 'notifications': {
        // Moving the declaration outside the case block to avoid the lexical declaration error
        const notificationContent = (
          <div className={styles.settingsCard}>
            <div className={styles.settingsCardHeader}>
              <h2 className={styles.settingsCardTitle}>Notification Preferences</h2>
            </div>
            <div className={styles.settingsCardBody}>
              <div className={styles.switchContainer}>
                <div>
                  <h3 className={styles.switchLabel}>Email Notifications</h3>
                  <p className={styles.switchDescription}>Receive email notifications for important updates</p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    className={styles.switchInput}
                    checked={notificationSettings.email}
                    onChange={() => handleNotificationToggle('email')}
                  />
                  <span className={styles.switchSlider}></span>
                </label>
              </div>

              <div className={styles.switchContainer}>
                <div>
                  <h3 className={styles.switchLabel}>Course Updates</h3>
                  <p className={styles.switchDescription}>Get notified when courses are updated</p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    className={styles.switchInput}
                    checked={notificationSettings.courseUpdates}
                    onChange={() => handleNotificationToggle('courseUpdates')}
                  />
                  <span className={styles.switchSlider}></span>
                </label>
              </div>

              <div className={styles.switchContainer}>
                <div>
                  <h3 className={styles.switchLabel}>Assignment Reminders</h3>
                  <p className={styles.switchDescription}>Get reminders for upcoming assignments</p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    className={styles.switchInput}
                    checked={notificationSettings.assignmentReminders}
                    onChange={() => handleNotificationToggle('assignmentReminders')}
                  />
                  <span className={styles.switchSlider}></span>
                </label>
              </div>

              <div className={styles.switchContainer}>
                <div>
                  <h3 className={styles.switchLabel}>Forum Activity</h3>
                  <p className={styles.switchDescription}>Get notified of new posts and replies</p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    className={styles.switchInput}
                    checked={notificationSettings.forumActivity}
                    onChange={() => handleNotificationToggle('forumActivity')}
                  />
                  <span className={styles.switchSlider}></span>
                </label>
              </div>

              <button 
                onClick={handleSaveNotifications} 
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </div>
        );
        return notificationContent;
      }
      case 'privacy':
        return (
          <div className={styles.settingsCard}>
            <div className={styles.settingsCardHeader}>
              <h2 className={styles.settingsCardTitle}>Privacy Settings</h2>
            </div>
            <div className={styles.settingsCardBody}>
              <div className={styles.switchContainer}>
                <div>
                  <h3 className={styles.switchLabel}>Public Profile</h3>
                  <p className={styles.switchDescription}>Allow other users to view your profile</p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    className={styles.switchInput}
                    checked={privacySettings.showProfile}
                    onChange={() => handlePrivacyToggle('showProfile')}
                  />
                  <span className={styles.switchSlider}></span>
                </label>
              </div>

              <div className={styles.switchContainer}>
                <div>
                  <h3 className={styles.switchLabel}>Show Email</h3>
                  <p className={styles.switchDescription}>Show your email address on your profile</p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    className={styles.switchInput}
                    checked={privacySettings.showEmail}
                    onChange={() => handlePrivacyToggle('showEmail')}
                  />
                  <span className={styles.switchSlider}></span>
                </label>
              </div>

              <div className={styles.switchContainer}>
                <div>
                  <h3 className={styles.switchLabel}>Show Courses</h3>
                  <p className={styles.switchDescription}>Show your enrolled courses on your profile</p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    className={styles.switchInput}
                    checked={privacySettings.showCourses}
                    onChange={() => handlePrivacyToggle('showCourses')}
                  />
                  <span className={styles.switchSlider}></span>
                </label>
              </div>

              <div className={styles.switchContainer}>
                <div>
                  <h3 className={styles.switchLabel}>Direct Messages</h3>
                  <p className={styles.switchDescription}>Allow other users to send you messages</p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    className={styles.switchInput}
                    checked={privacySettings.allowMessages}
                    onChange={() => handlePrivacyToggle('allowMessages')}
                  />
                  <span className={styles.switchSlider}></span>
                </label>
              </div>

              <button 
                onClick={handleSavePrivacy} 
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        );
      case 'appearance':
        return (
          <div className={styles.settingsCard}>
            <div className={styles.settingsCardHeader}>
              <h2 className={styles.settingsCardTitle}>Appearance Settings</h2>
            </div>
            <div className={styles.settingsCardBody}>
              <div className={styles.switchContainer}>
                <div>
                  <h3 className={styles.switchLabel}>Dark Mode</h3>
                  <p className={styles.switchDescription}>Switch between light and dark mode</p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    className={styles.switchInput}
                    checked={appearanceSettings.darkMode}
                    onChange={() => handleAppearanceChange('darkMode', !appearanceSettings.darkMode)}
                  />
                  <span className={styles.switchSlider}></span>
                </label>
              </div>

              <div className={styles.formGroup} style={{ marginTop: '1.5rem' }}>
                <label className={styles.formLabel}>Font Size</label>
                <select
                  className={styles.formInput}
                  value={appearanceSettings.fontSize}
                  onChange={(e) => handleAppearanceChange('fontSize', e.target.value)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Color Scheme</label>
                <div className={styles.colorOptions}>
                  <div
                    className={`${styles.colorOption} ${appearanceSettings.colorScheme === 'blue' ? styles.colorOptionActive : ''}`}
                    style={{ backgroundColor: '#4a6fe9' }}
                    onClick={() => handleAppearanceChange('colorScheme', 'blue')}
                  ></div>
                  <div
                    className={`${styles.colorOption} ${appearanceSettings.colorScheme === 'green' ? styles.colorOptionActive : ''}`}
                    style={{ backgroundColor: '#2e7d32' }}
                    onClick={() => handleAppearanceChange('colorScheme', 'green')}
                  ></div>
                  <div
                    className={`${styles.colorOption} ${appearanceSettings.colorScheme === 'purple' ? styles.colorOptionActive : ''}`}
                    style={{ backgroundColor: '#7b1fa2' }}
                    onClick={() => handleAppearanceChange('colorScheme', 'purple')}
                  ></div>
                  <div
                    className={`${styles.colorOption} ${appearanceSettings.colorScheme === 'orange' ? styles.colorOptionActive : ''}`}
                    style={{ backgroundColor: '#e65100' }}
                    onClick={() => handleAppearanceChange('colorScheme', 'orange')}
                  ></div>
                </div>
              </div>

              <button 
                onClick={handleSaveAppearance} 
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        );
      case 'subscription':
        return (
          <div className={styles.settingsCard}>
            <div className={styles.settingsCardHeader}>
              <h2 className={styles.settingsCardTitle}>Subscription</h2>
            </div>
            <div className={styles.settingsCardBody}>
              <div className={styles.formGroup}>
                <p>Current Plan: <strong>Basic</strong></p>
                <p>Billing Cycle: <strong>Monthly</strong></p>
                <p>Next Billing Date: <strong>June 15, 2023</strong></p>
              </div>
              <button className={styles.submitButton}>Upgrade Plan</button>
            </div>
          </div>
        );
      case 'password':
        return (
          <div className={styles.settingsCard}>
            <div className={styles.settingsCardHeader}>
              <h2 className={styles.settingsCardTitle}>Change Password</h2>
            </div>
            <div className={styles.settingsCardBody}>
              <form onSubmit={handlePasswordSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Current Password</label>
                  <input
                    type="password"
                    className={styles.formInput}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>New Password</label>
                  <input
                    type="password"
                    className={styles.formInput}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Confirm New Password</label>
                  <input
                    type="password"
                    className={styles.formInput}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <h1 className={styles.settingsTitle}>Account Settings</h1>
        <p className={styles.settingsSubtitle}>
          Manage your account settings and preferences
        </p>
      </div>

      <div className={styles.settingsLayout}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.profileSection}>
            {profileImage ? (
              <img src={profileImage} alt="Profile" className={styles.profileImage} />
            ) : (
              <div className={styles.profileImage}>
                <FaUserCircle size={60} />
              </div>
            )}
            <h3 className={styles.profileName}>{profileData.name || 'User Name'}</h3>
            <p className={styles.profileEmail}>{profileData.email || 'user@example.com'}</p>
            <button className={styles.editProfileBtn} onClick={() => handleTabChange('profile')}>
              Edit Profile
            </button>
          </div>

          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <button 
                className={`${styles.navLink} ${activeTab === 'profile' ? styles.navLinkActive : ''}`} 
                onClick={() => handleTabChange('profile')}
              >
                <span className={styles.navIcon}><FaUser /></span>
                Profile
              </button>
            </li>
            <li className={styles.navItem}>
              <button 
                className={`${styles.navLink} ${activeTab === 'notifications' ? styles.navLinkActive : ''}`} 
                onClick={() => handleTabChange('notifications')}
              >
                <span className={styles.navIcon}><FaBell /></span>
                Notifications
              </button>
            </li>
            <li className={styles.navItem}>
              <button 
                className={`${styles.navLink} ${activeTab === 'privacy' ? styles.navLinkActive : ''}`} 
                onClick={() => handleTabChange('privacy')}
              >
                <span className={styles.navIcon}><FaLock /></span>
                Privacy
              </button>
            </li>
            <li className={styles.navItem}>
              <button 
                className={`${styles.navLink} ${activeTab === 'appearance' ? styles.navLinkActive : ''}`} 
                onClick={() => handleTabChange('appearance')}
              >
                <span className={styles.navIcon}><FaPalette /></span>
                Appearance
              </button>
            </li>
            <li className={styles.navItem}>
              <button 
                className={`${styles.navLink} ${activeTab === 'subscription' ? styles.navLinkActive : ''}`} 
                onClick={() => handleTabChange('subscription')}
              >
                <span className={styles.navIcon}><FaCreditCard /></span>
                Subscription
              </button>
            </li>
            <li className={styles.navItem}>
              <button 
                className={`${styles.navLink} ${activeTab === 'password' ? styles.navLinkActive : ''}`} 
                onClick={() => handleTabChange('password')}
              >
                <span className={styles.navIcon}><FaKey /></span>
                Password
              </button>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Status messages */}
          {error && <div className={styles.errorMessage}>{error}</div>}
          {success && <div className={styles.successMessage}>{success}</div>}

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;