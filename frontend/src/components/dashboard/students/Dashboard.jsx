import React, { useState, useLayoutEffect, useRef } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Student/Sidebar';
import Header from '../components/Student/Header';
import MyCourses from '../students/MyCourses';
import Assignments from '../students/Assignments';
import Progress from '../students/Progress';
import NotesComponent from '../components/Student/Notes';
import HelpSupport from '../components/Student/HelpSupport';
import StudentDashboardHome from '../components/Student/Home';
import QuizContainer from '../../quiz/QuizContainer';
import Quiz from '../../quiz/Quiz';
import Resources from '../students/Resources';
import Calendar from '../students/Calendar';
import MessagesComponent from '../components/Student/Messages';
import VideoLessons from '../components/Student/VideoLessons';
import PracticeTests from '../components/Student/PracticeTests';
import CBCResources from '../students/CBCResources';
import SettingsComponent from '../components/Student/SettingsComponent';
import Grades from '../students/Grades';
import { useAuth } from '../../../context/AuthContext';
import styles from './Dashboard.module.css';

const StudentDashboard = () => {
  // State to track which content component to display
  const [activeComponent, setActiveComponent] = useState('dashboard');
  // Reference to the content area
  const contentAreaRef = useRef(null);
  // Get current user from auth context
  const { currentUser } = useAuth();
  const location = useLocation();
  
  // Simple function to reset scroll position
  const resetScroll = () => {
    // Reset window scroll
    window.scrollTo(0, 0);
    
    // Reset contentArea scroll via ref
    if (contentAreaRef.current) {
      contentAreaRef.current.scrollTop = 0;
    }
  };
  
  // Reset scroll when component changes
  useLayoutEffect(() => {
    resetScroll();
  }, [activeComponent]);

  // Handle menu item clicks
  const handleMenuItemClick = (itemId) => {
    // Set the new active component
    setActiveComponent(itemId);
    // Manually reset scroll
    resetScroll();
  };

  // Function to render the appropriate component based on activeComponent state
  const renderContent = () => {
    // Extract the path after /dashboard/
    const path = location.pathname.replace(/^\/dashboard\/?/, '');
    
    // Handle quiz routes
    if (path.startsWith('quiz/')) {
      // Quiz details page
      return <Quiz />;
    }
    
    switch (activeComponent) {
      case 'videos':
        return <VideoLessons />;
      case 'courses':
        return <MyCourses />;
      case 'quizzes':
        return <QuizContainer />;
      case 'assignments':
        return <Assignments />;
      case 'practice':
        return <PracticeTests />;
      case 'grades':
        return <Grades />;
      case 'progress':
        return <Progress />;
      case 'notes':
        return <NotesComponent />;
      case 'resources':
        return <Resources />;
      case 'cbc':
        return <CBCResources />;
      case 'calendar':
        return <Calendar />;
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

  // Sidebar menu items specific to students
  const sidebarMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
    },
    {
      id: 'notes',
      label: 'My Notes',
      icon: 'notes',
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
      id: 'grades',
      label: 'Grades',
      icon: 'chart',
    },
    {
      id: 'progress',
      label: 'My Progress',
      icon: 'chart',
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
      id: 'quizzes',
      label: 'Quizzes',
      icon: 'quiz',
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

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar 
        menuItems={sidebarMenuItems} 
        activeItem={activeComponent}
        onMenuItemClick={handleMenuItemClick}
        userRole="Student"
      />
      <div className={styles.mainContent}>
        <Header 
          userName={currentUser?.displayName || 'Student'} 
          userRole="Student"
          notifications={5}
          onNavigate={handleMenuItemClick}
        />
        <div className={styles.contentArea} ref={contentAreaRef}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;