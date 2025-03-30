import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './TutorSidebar.module.css';
import logo from '../../../../assets/Logo.png';
import { useAuth } from '../../../../context/AuthContext';

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
  FiTarget,
  FiEdit,
  FiStar
} from 'react-icons/fi';

const TutorSidebar = ({ menuItems, activeItem, onMenuItemClick, userRole = "Tutor" }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  // Get user's display name or use fallback
  const getUserName = () => {
    if (currentUser && currentUser.displayName) {
      return currentUser.displayName;
    }
    return "User";
  };
  
  // Get user's initials for avatar
  const getUserInitials = () => {
    if (currentUser && currentUser.displayName) {
      return currentUser.displayName.split(' ').map(name => name[0]).join('');
    }
    return "U";
  };

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

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to landing page after logout
    } catch (error) {
      console.error("Failed to logout", error);
      alert("Failed to logout. Please try again.");
    }
  };

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
      case 'dashboard': return <FiHome />;
      case 'courses': return <FiBook />;
      case 'students': return <FiUsers />;
      case 'content': return <FiEdit />;
      case 'earnings': return <FiDollarSign />;
      case 'calendar': return <FiCalendar />;
      case 'reviews': return <FiStar />;
      case 'messages': return <FiMessageSquare />;
      case 'resources': return <FiFolder />;
      case 'settings': return <FiSettings />;
      case 'help': return <FiHelpCircle />;
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
            {menuItems.map((item) => (
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
            <div className={styles.avatar}>{getUserInitials()}</div>
            {(!isCollapsed || isMobile) && (
              <div className={styles.userDetails}>
                <p className={styles.userName}>{getUserName()}</p>
                <p className={styles.userRole}>{userRole}</p>
              </div>
            )}
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <FiLogOut className={styles.logoutIcon} />
            {(!isCollapsed || isMobile) && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default TutorSidebar;