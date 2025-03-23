import React, { useState } from 'react';
import Sidebar from '../components/Parent/Sidebar';
import Header from '../components/Student/Header';
import ChildProgress from './ChildProgress';
import ParentsReports from './Reports';
import PaymentHistory from '../components/Parent/PaymentHistory';
import HelpSupport from '../components/Parent/HelpSupport';
import ParentDashboardHome from '../components/Parent/Home';
import ChildrenManagement from '../components/Parent/ChildrenManagement';
import MessagesComponent from '../components/Parent/MessagesComponent';
import CalendarComponent from '../components/Parent/CalendarComponent';
import TutorCommunication from '../components/Parent/TutorCommunication';
import ResourcesComponent from '../components/Parent/ResourcesComponent';
import SettingsComponent from '../components/Parent/SettingsComponent';
import styles from '../students/Dashboard.module.css';

const ParentDashboard = () => {
  // State to track which content component to display
  const [activeComponent, setActiveComponent] = useState('dashboard');

  // Sidebar menu items specific to parents - fewer and more focused than student sidebar
  const sidebarMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
    },
    {
      id: 'children',
      label: 'My Children',
      icon: 'profile',
    },
    {
      id: 'progress',
      label: 'Progress Reports',
      icon: 'chart',
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: 'calendar',
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: 'messages',
    },
    {
      id: 'tutors',
      label: 'Tutors',
      icon: 'book',
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: 'file',
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: 'folder',
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: 'help',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
    },
  ];

  // Function to render the appropriate component based on activeComponent state
  const renderContent = () => {
    switch (activeComponent) {
      case 'children':
        return <ChildrenManagement />;
      case 'progress':
        return <ChildProgress />;
      case 'calendar':
        return <CalendarComponent />;
      case 'messages':
        return <MessagesComponent />;
      case 'tutors':
        return <TutorCommunication />;
      case 'payments':
        return <PaymentHistory />;
      case 'resources':
        return <ResourcesComponent />;
      case 'reports':
        return <ParentsReports />;
      case 'help':
        return <HelpSupport />;
      case 'settings':
        return <SettingsComponent />;
      default:
        return <ParentDashboardHome />;
    }
  };

  // Handle menu item clicks
  const handleMenuItemClick = (itemId) => {
    setActiveComponent(itemId);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar 
        menuItems={sidebarMenuItems} 
        activeItem={activeComponent}
        onMenuItemClick={handleMenuItemClick}
      />
      <div className={styles.mainContent}>
        <Header 
          userName="Jane Smith" 
          userRole="Parent"
          notifications={3}
        />
        <div className={styles.contentArea}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;