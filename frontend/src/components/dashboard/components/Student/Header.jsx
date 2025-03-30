// src/components/dashboard/components/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import styles from './Header.module.css';
import { 
  FiSearch, 
  FiBell, 
  FiHelpCircle, 
  FiUser, 
  FiSettings, 
  FiLogOut, 
  FiChevronDown,
  FiMail,
  FiBookmark,
  FiCalendar,
  FiFileText,
  FiHome,
  FiMoon,
  FiSun,
  FiBook,
  FiThumbsUp,
  FiMessageSquare,
  
  // FiMenu - Uncomment when implementing mobile menu
} from 'react-icons/fi';

const Header = ({ userName = "John Doe", userRole = "Student", notifications = 5, onNavigate }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  // const [showMobileMenu, setShowMobileMenu] = useState(false); - Uncomment when implementing mobile menu
  const [isMobile, setIsMobile] = useState(false);
  
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  // const mobileMenuRef = useRef(null); - Uncomment when implementing mobile menu

  // Check if screen is mobile size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle navigation to components
  const navigateToComponent = (component) => {
    if (onNavigate) {
      onNavigate(component);
    }
  };

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

  // Handle clicks outside the dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target) && window.innerWidth <= 768) {
        setSearchExpanded(false);
      }
      /* Uncomment when implementing mobile menu
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
      */
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You would implement your dark mode logic here
    // document.body.classList.toggle('dark-mode');
  };

  // Role-specific notification data
  const getNotificationsByRole = () => {
    switch(userRole) {
      case 'Student':
        return [
          { id: 1, type: 'assignment', text: 'Assignment due: Mathematics', time: '10 min ago', icon: <FiFileText /> },
          { id: 2, type: 'message', text: 'New message from your tutor', time: '1 hour ago', icon: <FiMail /> },
          { id: 3, type: 'event', text: 'Upcoming class: Advanced Algebra', time: '2 hours ago', icon: <FiCalendar /> },
          { id: 4, type: 'course', text: 'New materials for Biology course', time: 'Yesterday', icon: <FiBook /> },
          { id: 5, type: 'feedback', text: 'Received feedback on your quiz', time: 'Yesterday', icon: <FiThumbsUp /> }
        ];
      case 'Tutor':
        return [
          { id: 1, type: 'message', text: 'New question from student Wangari', time: '5 min ago', icon: <FiMail /> },
          { id: 2, type: 'assignment', text: 'New assignment submissions (3)', time: '30 min ago', icon: <FiFileText /> },
          { id: 3, type: 'event', text: 'Your class starts in 1 hour', time: '59 min ago', icon: <FiCalendar /> },
          { id: 4, type: 'feedback', text: 'New ratings on your course', time: 'Yesterday', icon: <FiThumbsUp /> },
          { id: 5, type: 'course', text: 'Update requested on course materials', time: '2 days ago', icon: <FiBook /> }
        ];
      case 'Parent':
        return [
          { id: 1, type: 'message', text: 'Message from Math tutor', time: '20 min ago', icon: <FiMail /> },
          { id: 2, type: 'assignment', text: 'Your child has a pending assignment', time: '2 hours ago', icon: <FiFileText /> },
          { id: 3, type: 'feedback', text: 'Progress report available', time: 'Yesterday', icon: <FiChartLine /> },
          { id: 4, type: 'payment', text: 'Payment receipt for tuition', time: '3 days ago', icon: <FiFileText /> },
          { id: 5, type: 'event', text: 'Parent-teacher meeting next week', time: '4 days ago', icon: <FiCalendar /> }
        ];
      default:
        return [
          { id: 1, type: 'message', text: 'New notification', time: '10 min ago', icon: <FiMail /> },
          { id: 2, type: 'system', text: 'System notification', time: '2 hours ago', icon: <FiFileText /> }
        ];
    }
  };

  const notificationItems = getNotificationsByRole();

  /* Uncomment when implementing mobile menu
  // Dropdown menu items for mobile view
  const mobileMenuItems = [
    { icon: darkMode ? <FiSun /> : <FiMoon />, label: darkMode ? 'Light Mode' : 'Dark Mode', onClick: toggleDarkMode },
    { icon: <FiGrid />, label: 'Toggle View' },
    { icon: <FiHelpCircle />, label: 'Help' },
    { icon: <FiUser />, label: 'Profile' },
    { icon: <FiSettings />, label: 'Settings' },
    { icon: <FiLogOut />, label: 'Logout', onClick: handleLogout, className: styles.logoutOption }
  ];
  */

  return (
    <header className={`${styles.dashboardHeader} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.headerLeft}>
        <h1 className={isMobile ? styles.mobileTitle : ''}>{userRole} Dashboard</h1>
        <div className={styles.breadcrumbs}>
          <FiHome className={styles.breadcrumbIcon} /> 
          <span className={styles.breadcrumbSeparator}>/</span> 
          <span>Dashboard</span>
        </div>
      </div>

      <div className={styles.headerRight}>
        {/* Search Bar */}
        <div 
          ref={searchRef}
          className={`${styles.searchBar} ${searchExpanded ? styles.expanded : ''}`}
        >
          <button 
            className={styles.mobileSearchToggle}
            onClick={() => setSearchExpanded(!searchExpanded)}
            aria-label="Toggle search"
          >
            <FiSearch />
          </button>
          <div className={styles.searchInputWrapper}>
            <input type="text" placeholder="Search courses, topics..." />
            <button className={styles.searchBtn} aria-label="Search">
              <FiSearch />
            </button>
          </div>
        </div>

        <div className={styles.headerActions}>
          {/* Show all icons on desktop, limited on mobile */}
          {!isMobile && (
            <>
              {/* Dark Mode Toggle */}
              <button 
                className={styles.iconButton} 
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>

              {/* Resources Button - Replacing Grid View */}
              <button 
                className={styles.iconButton} 
                aria-label="Resources"
                onClick={() => navigateToComponent('resources')}
              >
                <FiBook />
              </button>
            </>
          )}

          {/* Always show critical notifications */}
          <div 
            ref={notificationRef}
            className={styles.notificationBell}
          >
            <button 
              className={styles.iconButton} 
              aria-label="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FiBell />
              {notifications > 0 && (
                <span className={styles.notificationBadge}>{notifications}</span>
              )}
            </button>

            {showNotifications && (
              <div className={styles.notificationsPopup}>
                <div className={styles.notificationHeader}>
                  <h3>Notifications</h3>
                  <button>Mark all as read</button>
                </div>
                <div className={styles.notificationsList}>
                  {notificationItems.map(item => (
                    <div key={item.id} className={styles.notificationItem}>
                      <div className={styles.notificationIcon}>{item.icon}</div>
                      <div className={styles.notificationContent}>
                        <p>{item.text}</p>
                        <span className={styles.notificationTime}>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.notificationFooter}>
                  <button>View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* Help button with navigation */}
          {!isMobile && (
            <button 
              className={styles.iconButton} 
              aria-label="Help & Support"
              onClick={() => navigateToComponent('help')}
            >
              <FiHelpCircle />
            </button>
          )}

          {/* Messages button with navigation */}
          <button 
            className={styles.iconButton} 
            aria-label="Messages"
            onClick={() => navigateToComponent('messages')}
          >
            <FiMessageSquare />
            <span className={styles.messageBadge}>3</span>
          </button>

          {/* User Menu */}
          <div 
            ref={userMenuRef}
            className={styles.userMenu}
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <div className={styles.avatar}>
              {userName.split(' ').map(name => name[0]).join('')}
            </div>
            {!isMobile && (
              <div className={styles.userInfo}>
                <span className={styles.userName}>{userName}</span>
                <span className={styles.userRole}>{userRole}</span>
              </div>
            )}
            <FiChevronDown className={`${styles.dropdownArrow} ${showUserDropdown ? styles.rotated : ''}`} />

            {showUserDropdown && (
              <div className={styles.userDropdown}>
                <div className={styles.userDropdownHeader}>
                  <div className={styles.avatarLarge}>
                    {userName.split(' ').map(name => name[0]).join('')}
                  </div>
                  <div>
                    <h3>{userName}</h3>
                    <p>{userRole}</p>
                  </div>
                </div>
                <div className={styles.userDropdownDivider}></div>
                <ul className={styles.userDropdownMenu}>
                  <li>
                    <FiUser />
                    <span>My Profile</span>
                  </li>
                  <li>
                    <FiSettings />
                    <span>Account Settings</span>
                  </li>
                  <li>
                    <FiBookmark />
                    <span>My Bookmarks</span>
                  </li>
                  <li className={styles.logoutOption} onClick={handleLogout}>
                    <FiLogOut />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;