import React, { useState, useEffect } from 'react';
import styles from '../Student/Sidebar.module.css';
import logo from '../../../../assets/Logo.png';

// Import icons from react-icons
import { 
  FiMenu, 
  FiX, 
  FiLogOut,
  FiHome,
  FiBook,
  FiCalendar,
  FiMessageSquare,
  FiSettings,
  FiUser,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiHelpCircle,
  FiEdit,
  FiZap,
  FiVideo,
  FiFileText,
  FiCreditCard,
  FiMonitor,
  FiStar
} from 'react-icons/fi';

const TutorSidebar = ({ menuItems, activeItem, onMenuItemClick }) => {
  // Default tutor-specific menu items if none provided
  const tutorMenuItems = menuItems || [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'courses', label: 'My Courses', icon: 'courses' },
    { id: 'students', label: 'My Students', icon: 'students' },
    { id: 'content', label: 'Content Creation', icon: 'content' },
    { id: 'earnings', label: 'Earnings', icon: 'earnings' },
    { id: 'schedule', label: 'Schedule', icon: 'calendar' },
    { id: 'analytics', label: 'Analytics', icon: 'analytics' },
    { id: 'reviews', label: 'Reviews', icon: 'reviews' },
    { id: 'messages', label: 'Messages', icon: 'messages' },
    { id: 'resources', label: 'Resources', icon: 'resources' },
    { id: 'help', label: 'Help & Support', icon: 'help' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Check if screen is mobile size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsCollapsed(true);
        setIsOpen(false);
      } else {
        setIsOpen(true);
        setIsCollapsed(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Get icon component based on icon name - with tutor-specific icons
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'dashboard': return <FiHome />;
      case 'courses': return <FiBook />;
      case 'students': return <FiUsers />;
      case 'content': return <FiEdit />;
      case 'earnings': return <FiDollarSign />;
      case 'calendar': return <FiCalendar />;
      case 'analytics': return <FiTrendingUp />;
      case 'messages': return <FiMessageSquare />;
      case 'settings': return <FiSettings />;
      case 'profile': return <FiUser />;
      case 'reviews': return <FiStar />;
      case 'help': return <FiHelpCircle />;
      case 'resources': return <FiFileText />;
      case 'performance': return <FiZap />;
      case 'videos': return <FiVideo />;
      case 'payments': return <FiCreditCard />;
      case 'webinars': return <FiMonitor />;
      default: return <FiHome />;
    }
  };

  return (
    <>
      {/* Mobile Toggle Button - outside sidebar */}
      {isMobile && (
        <button 
          className={styles.toggleButton} 
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      )}
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}
      
      <div className={`
        ${styles.sidebar} 
        ${isCollapsed && !isMobile ? styles.collapsed : ''} 
        ${isMobile ? styles.mobile : ''} 
        ${isOpen ? styles.open : ''}
      `}>
        <div className={styles.sidebarHeader}>
          {!isMobile && (
            <button 
              className={styles.collapseButton} 
              onClick={toggleSidebar}
              aria-label="Collapse sidebar"
            >
              <FiMenu />
            </button>
          )}
          <img src={logo} alt="Elimu Tuts Logo" className={styles.logo} />
          {(!isCollapsed || isMobile) && <h2>Tutor Portal</h2>}
        </div>
        
        <div className={styles.sidebarMenu}>
          <ul>
            {tutorMenuItems.map((item) => (
              <li
                key={item.id}
                className={`${activeItem === item.id ? styles.active : ''}`}
                onClick={() => {
                  if (onMenuItemClick) onMenuItemClick(item.id);
                  if (isMobile) setIsOpen(false);
                }}
              >
                <div className={styles.menuItem}>
                  <span className={styles.icon}>
                    {getIconComponent(item.icon)}
                  </span>
                  {(!isCollapsed || isMobile) && <span className={styles.label}>{item.label}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>JS</div>
            {(!isCollapsed || isMobile) && (
              <div className={styles.userDetails}>
                <p className={styles.userName}>Jane Smith</p>
                <p className={styles.userRole}>Tutor</p>
              </div>
            )}
          </div>
          <button className={styles.logoutBtn}>
            <FiLogOut className={styles.logoutIcon} />
            {(!isCollapsed || isMobile) && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default TutorSidebar;