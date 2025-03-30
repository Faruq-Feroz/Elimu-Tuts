import React, { useState } from 'react';
import Sidebar from './TutorSidebar';
import Header from '../Tutor/Header';

const TutorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  
  // Sidebar menu items
  const menuItems = [
    { name: "Dashboard", icon: "dashboard", path: "/tutor/dashboard" },
    { name: "My Students", icon: "people", path: "/tutor/students" },
    { name: "Schedule", icon: "calendar_today", path: "/tutor/schedule" },
    { name: "Courses", icon: "book", path: "/tutor/courses" },
    { name: "Materials", icon: "library_books", path: "/tutor/materials" },
    { name: "Assignments", icon: "assignment", path: "/tutor/assignments" },
    { name: "Messages", icon: "message", path: "/tutor/messages" },
    { name: "Analytics", icon: "insights", path: "/tutor/analytics" },
    { name: "Payments", icon: "payments", path: "/tutor/payments" },
    { name: "Help & Support", icon: "help", path: "/tutor/support" },
    { name: "Settings", icon: "settings", path: "/tutor/settings" },
  ];
  
  // Render content based on active component
  const renderContent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <div>Tutor Dashboard Overview</div>;
      case 'students':
        return <div>My Students</div>;
      case 'schedule':
        return <div>Schedule</div>;
      case 'courses':
        return <div>Courses</div>;
      case 'materials':
        return <div>Materials</div>;
      case 'assignments':
        return <div>Assignments</div>;
      case 'messages':
        return <div>Messages</div>;
      case 'analytics':
        return <div>Analytics</div>;
      case 'payments':
        return <div>Payments</div>;
      case 'support':
        return <div>Help & Support</div>;
      case 'settings':
        return <div>Settings</div>;
      default:
        return <div>Tutor Dashboard Overview</div>;
    }
  };
  
  return (
    <div className="dashboard-container">
      <Sidebar 
        menuItems={menuItems}
        activeItem={activeComponent}
        setActiveItem={setActiveComponent}
        userRole="Tutor"
      />
      <div className="dashboard-content">
        <Header 
          userName="Tutor Name" 
          userRole="Tutor"
        />
        <main className="dashboard-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default TutorDashboard; 