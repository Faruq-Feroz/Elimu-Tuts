import React, { useState, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Student/Sidebar';
import Header from './Header';
import ChildProgress from './ChildProgress';
import ParentsReports from './Reports';
import HelpSupport from './HelpSupport';
import Messages from './Messages';
import Calendar from './Calendar';
import Tutors from './Tutors';
import Payments from './Payments';
import Resources from './Resources';
import Settings from './Settings';
import ParentHome from './Home';
import MyChildren from './MyChildren';
import styles from '../students/Dashboard.module.css';
import { useAuth } from '../../../context/AuthContext';

const ParentDashboard = () => {
  // State to track which content component to display
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const location = useLocation();
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
  }, [activeComponent, location.pathname]);
  
  // Check if we're viewing a progress report
  const isProgressReport = location.pathname === '/dashboard/progress-report';

  // Get user's display name or use fallback
  const getUserName = () => {
    if (currentUser && currentUser.displayName) {
      return currentUser.displayName;
    }
    return "Parent User";
  };

  // Sidebar menu items
  const menuItems = [
    { id: 'dashboard', label: "Dashboard", icon: "dashboard", path: "/parent/dashboard" },
    { id: 'children', label: "My Children", icon: "children", path: "/parent/children" },
    { id: 'progress', label: "Progress Reports", icon: "chart", path: "/parent/reports" },
    { id: 'calendar', label: "Calendar", icon: "calendar", path: "/parent/calendar" },
    { id: 'messages', label: "Messages", icon: "messages", path: "/parent/messages" },
    { id: 'tutors', label: "Tutors", icon: "book", path: "/parent/tutors" },
    { id: 'payments', label: "Payments", icon: "payment", path: "/parent/payments" },
    { id: 'resources', label: "Resources", icon: "folder", path: "/parent/resources" },
    { id: 'help', label: "Help & Support", icon: "help", path: "/parent/support" },
    { id: 'settings', label: "Settings", icon: "settings", path: "/parent/settings" },
  ];

  // Function to render the appropriate component based on activeComponent state
  const renderContent = () => {
    // If we're on the progress report route, show the ProgressReport component
    if (isProgressReport) {
      return <ChildProgress />;
    }
    
    switch (activeComponent) {
      case 'children':
        return <MyChildren />;
      case 'progress':
        return <ChildProgress />;
      case 'calendar':
        return <Calendar />;
      case 'messages':
        return <Messages />;
      case 'tutors':
        return <Tutors />;
      case 'payments':
        return <Payments />;
      case 'resources':
        return <Resources />;
      case 'reports':
        return <ParentsReports />;
      case 'help':
        return <HelpSupport />;
      case 'settings':
        return <Settings />;
      default:
        return <ParentHome />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar 
        menuItems={menuItems}
        activeItem={activeComponent}
        onMenuItemClick={setActiveComponent}
        userRole="Parent"
      />
      <div className={styles.mainContent}>
        <Header 
          userName={getUserName()} 
          userRole="Parent"
          onNavigate={setActiveComponent}
        />
        <div className={styles.contentArea} ref={contentAreaRef}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;