import React, { useState } from 'react';
import Sidebar from '../components/Student/Sidebar';
import Header from '../components/Student/Header';
import MyCourses from '../students/MyCourses';
import Assignments from '../students/Assignments';
import Progress from '../students/Progress';
import NotesComponent from '../components/Student/Notes';
import HelpSupport from '../components/Student/HelpSupport';
import StudentDashboardHome from '../components/Student/Home';
import QuizSubjectSelection from '../../quiz/QuizContainer';
import ResourcesComponent from '../components/Student/Resources'; // Assuming you'll create this component
import CalendarComponent from '../components/Student/Calendar'; // Assuming you'll create this component
import MessagesComponent from '../components/Student/Messages'; // Assuming you'll create this component
import VideoLessons from '../components/Student/VideoLessons'; // Assuming you'll create this component
import PracticeTests from '../components/Student/PracticeTests'; // Assuming you'll create this component
import CBCResources from '../components/Student/CBCResources'; // Assuming you'll create this component
import SettingsComponent from '../components/Student/SettingsComponent'; // Assuming you'll create this component
import styles from './Dashboard.module.css';

const StudentDashboard = () => {
  // State to track which content component to display
  const [activeComponent, setActiveComponent] = useState('dashboard');

  // Sidebar menu items specific to students - expanded to include all required items
  const sidebarMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
    },
    {
      id: 'videos',
      label: 'Video Lessons',
      icon: 'video',
    },
    {
      id: 'courses',
      label: 'My Courses',
      icon: 'book',
    },
    {
      id: 'quizzes',
      label: 'Quizzes',
      icon: 'quiz',
    },
    {
      id: 'assignments',
      label: 'Assignments',
      icon: 'assignment',
    },
    {
      id: 'practice',
      label: 'Practice Tests',
      icon: 'test',
    },
    {
      id: 'progress',
      label: 'My Progress',
      icon: 'chart',
    },
    {
      id: 'notes',
      label: 'My Notes',
      icon: 'notes',
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: 'folder',
    },
    {
      id: 'cbc',
      label: 'CBC Resources',
      icon: 'curriculum',
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
      case 'videos':
        return <VideoLessons />;
      case 'courses':
        return <MyCourses />;
      case 'quizzes':
        return <QuizSubjectSelection />;
      case 'assignments':
        return <Assignments />;
      case 'practice':
        return <PracticeTests />;
      case 'progress':
        return <Progress />;
      case 'notes':
        return <NotesComponent />;
      case 'resources':
        return <ResourcesComponent />;
      case 'cbc':
        return <CBCResources />;
      case 'calendar':
        return <CalendarComponent />;
      case 'messages':
        return <MessagesComponent />;
      case 'help':
        return <HelpSupport />;
      case 'settings':
        return <SettingsComponent />;
      default:
        return <StudentDashboardHome />;
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
          userName="John Doe" 
          userRole="Student"
          notifications={5}
        />
        <div className={styles.contentArea}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;