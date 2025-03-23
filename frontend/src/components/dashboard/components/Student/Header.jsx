// src/components/dashboard/components/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
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
  FiGrid,
  FiBook,
  FiThumbsUp,
  FiMessageSquare
} from 'react-icons/fi';

const Header = ({ userName = "John Doe", userRole = "Student", notifications = 5 }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);

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

  // Mock notification data
  const notificationItems = [
    { id: 1, type: 'message', text: 'New message from instructor', time: '10 min ago', icon: <FiMail /> },
    { id: 2, type: 'assignment', text: 'Assignment deadline reminder', time: '1 hour ago', icon: <FiFileText /> },
    { id: 3, type: 'event', text: 'Upcoming webinar: Advanced Python', time: '2 hours ago', icon: <FiCalendar /> },
    { id: 4, type: 'course', text: 'New course materials available', time: 'Yesterday', icon: <FiBook /> },
    { id: 5, type: 'feedback', text: 'You received feedback on your project', time: 'Yesterday', icon: <FiThumbsUp /> }
  ];

  return (
    <header className={`${styles.dashboardHeader} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.headerLeft}>
        <h1>Student Dashboard</h1>
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
          {/* Dark Mode Toggle */}
          <button 
            className={styles.iconButton} 
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          {/* Grid View Toggle */}
          <button className={styles.iconButton} aria-label="Toggle view">
            <FiGrid />
          </button>

          {/* Notifications */}
          <div 
            ref={notificationRef}
            className={styles.notificationBell}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <button className={styles.iconButton} aria-label="Notifications">
              <FiBell />
              {notifications > 0 && (
                <span className={styles.notificationBadge}>{notifications}</span>
              )}
            </button>

            {showNotifications && (
              <div className={styles.notificationsDropdown}>
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

          {/* Help Icon */}
          <button className={styles.iconButton} aria-label="Help">
            <FiHelpCircle />
          </button>

          {/* Messages */}
          <button className={styles.iconButton} aria-label="Messages">
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
            <div className={styles.userInfo}>
              <span className={styles.userName}>{userName}</span>
              <span className={styles.userRole}>{userRole}</span>
            </div>
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
                  <li className={styles.logoutOption}>
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