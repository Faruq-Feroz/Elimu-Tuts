import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../Student/Sidebar.module.css';
import logo from '../../../../assets/Logo.png';

// Import icons from a library like react-icons
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
  FiTrendingUp,
  FiFileText,
  FiHelpCircle,
  FiFolder,
  FiPieChart,
  FiDollarSign,
  FiUsers,
  FiTarget
} from 'react-icons/fi';

const Sidebar = ({ menuItems, activeItem, onMenuItemClick }) => {
  // Use provided menuItems from props, or fall back to default if not provided
  const sidebarMenuItems = menuItems || [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'children', label: 'My Children', icon: 'profile' },
    { id: 'progress', label: 'Progress Reports', icon: 'chart' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar' },
    { id: 'messages', label: 'Messages', icon: 'messages' },
    { id: 'tutors', label: 'Tutors', icon: 'book' },
    { id: 'payments', label: 'Payments', icon: 'file' },
    { id: 'resources', label: 'Resources', icon: 'folder' },
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

  // Get icon component based on icon name
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'home':
      case 'dashboard': return <FiHome />;
      case 'courses':
      case 'book': return <FiBook />;
      case 'calendar': return <FiCalendar />;
      case 'messages': return <FiMessageSquare />;
      case 'settings': return <FiSettings />;
      case 'profile': return <FiUser />;
      case 'chart': return <FiPieChart />;
      case 'file':
      case 'payment': return <FiFileText />;
      case 'help': return <FiHelpCircle />;
      case 'folder': return <FiFolder />;
      case 'stats': return <FiTrendingUp />;
      case 'dollar': return <FiDollarSign />;
      case 'children': return <FiUsers />;
      case 'targets': return <FiTarget />;
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
          {(!isCollapsed || isMobile) && <h2>Elimu Tuts</h2>}
        </div>
        
        <div className={styles.sidebarMenu}>
          <ul>
            {sidebarMenuItems.map((item) => (
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
                <p className={styles.userRole}>Parent</p>
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

export default Sidebar;