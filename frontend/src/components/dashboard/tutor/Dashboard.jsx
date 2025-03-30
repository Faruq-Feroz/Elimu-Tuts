import React, { useState, useLayoutEffect, useRef } from 'react';
import TutorSidebar from '../components/Tutors/TutorSidebar';
import Header from '../components/Student/Header';
import TutorDashboardHome from '../components/Tutors/Home';
import MyCourses from './MyCourses';
import Students from './Students';
import Earnings from './Earnings';
import ContentCreation from '../components/Tutors/ContentCreation';
import Reviews from '../components/Tutors/Reviews'; // Uncommented
import HelpSupport from '../components/Tutors/HelpSupport';
import ScheduleComponent from '../components/Tutors/ScheduleComponent';
import MessagesComponent from '../components/Tutors/MessagesComponent';
import SettingsComponent from '../components/Tutors/SettingsComponent';
import ResourcesComponent from '../components/Tutors/ResourcesComponent'; // Uncommented
import styles from './Tutor.module.css';
import { useAuth } from '../../../context/AuthContext';

const TutorDashboard = () => {
  // State to track which content component to display
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const { currentUser } = useAuth();
  // Create a ref for the content area
  const contentAreaRef = useRef(null);
  
  // Scroll to top when component changes
  useLayoutEffect(() => {
    // If contentAreaRef exists, scroll it to top
    if (contentAreaRef.current) {
      // Set timeout to ensure DOM has updated
      setTimeout(() => {
        contentAreaRef.current.scrollTop = 0;
      }, 0);
    }
    // Also scroll window to top just to be safe
    window.scrollTo(0, 0);
  }, [activeComponent]);

  // Get user's display name or use fallback
  const getUserName = () => {
    if (currentUser && currentUser.displayName) {
      return currentUser.displayName;
    }
    return "Tutor User";
  };

  // Tutor-specific sidebar menu items
  const tutorMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'courses', label: 'My Courses', icon: 'courses' },
    { id: 'students', label: 'My Students', icon: 'students' },
    { id: 'content', label: 'Content Creation', icon: 'content' },
    { id: 'earnings', label: 'Earnings', icon: 'earnings' },
    { id: 'schedule', label: 'Schedule', icon: 'calendar' },
    { id: 'reviews', label: 'Reviews', icon: 'reviews' },
    { id: 'messages', label: 'Messages', icon: 'messages' },
    { id: 'resources', label: 'Resources', icon: 'resources' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'help', label: 'Help & Support', icon: 'help' }
  ];

  // Function to render the appropriate component based on activeComponent state
  const renderContent = () => {
    switch (activeComponent) {
      case 'courses':
        return <MyCourses />;
      case 'students':
        return <Students />;
      case 'content':
        return <ContentCreation />;
      case 'earnings':
        return <Earnings />;
      case 'schedule':
        return <ScheduleComponent />;
      case 'reviews':
        return <Reviews />;
      case 'messages':
        return <MessagesComponent />;
      case 'resources':
        return <ResourcesComponent />;
      case 'settings':
        return <SettingsComponent />;
      case 'help':
        return <HelpSupport />;
      default:
        return <TutorDashboardHome onSetActiveComponent={setActiveComponent} />;
    }
  };

  // Handle menu item clicks
  const handleMenuItemClick = (itemId) => {
    setActiveComponent(itemId);
  };

  return (
    <div className={styles.dashboardContainer}>
      <TutorSidebar
        menuItems={tutorMenuItems}
        activeItem={activeComponent}
        onMenuItemClick={handleMenuItemClick}
        userRole="Tutor"
      />
      <div className={styles.mainContent}>
        <Header
          userName={getUserName()}
          userRole="Tutor"
          notifications={3}
          onNavigate={handleMenuItemClick}
        />
        <div className={styles.contentArea} ref={contentAreaRef}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;