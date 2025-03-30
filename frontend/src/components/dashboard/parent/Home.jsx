import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import styles from './Home.module.css';
import { 
  FiUsers, 
  FiPieChart, 
  FiCalendar, 
  FiMessageSquare, 
  FiBook, 
  FiDollarSign, 
  FiClock,
  FiCheck,
  FiAlertCircle,
  FiChevronRight,
  FiBarChart2,
  FiBookOpen
} from 'react-icons/fi';

const ParentHome = () => {
  const { currentUser } = useAuth();
  
  // State variables
  const [loading, setLoading] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [children, setChildren] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    childrenCount: 0,
    averageProgress: 0,
    upcomingEventsCount: 0,
    unreadMessages: 0,
    pendingPayments: 0,
    completedAssignments: 0
  });

  // Generate welcome message based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    let message = '';
    
    if (hour < 12) {
      message = 'Good morning';
    } else if (hour < 18) {
      message = 'Good afternoon';
    } else {
      message = 'Good evening';
    }
    
    if (currentUser?.displayName) {
      const firstName = currentUser.displayName.split(' ')[0];
      setWelcomeMessage(`${message}, ${firstName}`);
    } else {
      setWelcomeMessage(message);
    }
  }, [currentUser]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Use mock data directly
        const fetchedChildren = mockChildren;
        setChildren(fetchedChildren);
        
        // Calculate stats
        let totalProgress = 0;
        fetchedChildren.forEach(child => {
          totalProgress += child.progress;
        });
        
        // Mock events data
        const mockEvents = generateMockEvents();
        setUpcomingEvents(mockEvents);
        
        // Mock messages data
        const mockMessages = generateMockMessages();
        setRecentMessages(mockMessages);
        
        // Mock notifications
        const mockNotifications = generateMockNotifications();
        setNotifications(mockNotifications);
        
        // Set overall stats
        setStats({
          childrenCount: fetchedChildren.length,
          averageProgress: fetchedChildren.length > 0 
            ? Math.round(totalProgress / fetchedChildren.length) 
            : 0,
          upcomingEventsCount: mockEvents.length,
          unreadMessages: mockMessages.filter(msg => !msg.read).length,
          pendingPayments: 2, // Mock data
          completedAssignments: 15 // Mock data
        });
        
      } catch (error) {
        console.error("Error preparing dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentUser]);

  // Mock children data (would normally come from API)
  const mockChildren = [
    { 
      id: 1, 
      name: 'David Kamau', 
      grade: '7th Grade', 
      lastActive: '2 hours ago', 
      progress: 78,
      avatar: 'https://ui-avatars.com/api/?name=David+Kamau&background=random&color=fff',
      subjects: ['Mathematics', 'Science', 'English'],
      attendance: '95%'
    },
    { 
      id: 2, 
      name: 'Sarah Wanjiku', 
      grade: '5th Grade', 
      lastActive: 'Yesterday', 
      progress: 65,
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wanjiku&background=random&color=fff',
      subjects: ['History', 'Art', 'Music'],
      attendance: '92%'
    }
  ];

  // Generate mock events
  const generateMockEvents = () => {
    return [
      { 
        id: 1, 
        title: 'Parent-Teacher Meeting', 
        date: 'March 28, 2023', 
        time: '4:00 PM',
        location: 'Online - Zoom',
        description: 'Discuss your child\'s academic progress'
      },
      { 
        id: 2, 
        title: 'End of Term Exams', 
        date: 'April 5-12, 2023', 
        time: 'All Day',
        location: 'School',
        description: 'Preparation needed for all subjects'
      },
      {
        id: 3,
        title: 'Science Fair',
        date: 'April 20, 2023',
        time: '10:00 AM',
        location: 'School Auditorium',
        description: 'Students will present their science projects'
      }
    ];
  };

  // Generate mock messages
  const generateMockMessages = () => {
    return [
      { 
        id: 1, 
        from: 'Mr. Johnson (Math)', 
        time: '1 hour ago', 
        preview: 'David\'s progress in algebra has been excellent. He completed all the assignments on time.',
        read: false
      },
      { 
        id: 2, 
        from: 'Ms. Wanjiku (English)', 
        time: 'Yesterday', 
        preview: 'Sarah did well on her last essay, but needs to work on grammar and punctuation.',
        read: true
      },
      {
        id: 3,
        from: 'Principal Odhiambo',
        time: '2 days ago',
        preview: 'I would like to invite you to our upcoming school community day on April 25th.',
        read: false
      }
    ];
  };

  // Generate mock notifications
  const generateMockNotifications = () => {
    return [
      {
        id: 1,
        type: 'payment',
        message: 'Term 2 fee payment due in 5 days',
        time: '2 days ago',
        urgent: true
      },
      {
        id: 2,
        type: 'event',
        message: 'Science Fair registration closes tomorrow',
        time: 'Yesterday',
        urgent: false
      },
      {
        id: 3,
        type: 'assignment',
        message: 'David has 2 pending assignments',
        time: '3 hours ago',
        urgent: true
      },
      {
        id: 4,
        type: 'announcement',
        message: 'School holiday announced for next Friday',
        time: '5 hours ago',
        urgent: false
      }
    ];
  };

  // Get icon for stat card based on type
  const getStatIcon = (type) => {
    switch(type) {
      case 'children': return <FiUsers />;
      case 'progress': return <FiBarChart2 />;
      case 'events': return <FiCalendar />;
      case 'messages': return <FiMessageSquare />;
      case 'payments': return <FiDollarSign />;
      case 'assignments': return <FiCheck />;
      default: return <FiPieChart />;
    }
  };

  // Get icon and color for notification based on type
  const getNotificationDetails = (type) => {
    switch(type) {
      case 'payment':
        return { icon: <FiDollarSign />, color: '#e74c3c' };
      case 'event':
        return { icon: <FiCalendar />, color: '#3498db' };
      case 'assignment':
        return { icon: <FiBook />, color: '#f39c12' };
      case 'announcement':
        return { icon: <FiAlertCircle />, color: '#27ae60' };
      case 'message':
        return { icon: <FiMessageSquare />, color: '#9b59b6' };
      default:
        return { icon: <FiAlertCircle />, color: '#7f8c8d' };
    }
  };

  return (
    <div className={styles.parentDashboard}>
      {loading ? (
        <div className={styles.loading}>Loading dashboard data...</div>
      ) : (
        <>
          <div className={styles.welcomeSection}>
            <h1>{welcomeMessage}</h1>
            <p>Here's an overview of your children's progress and activities.</p>
          </div>

          <div className={styles.statsOverview}>
            <div className={styles.statCard}>
              {getStatIcon('children')}
              <div className={styles.statContent}>
                <h3>Children</h3>
                <p className={styles.statValue}>{stats.childrenCount}</p>
              </div>
            </div>
            
            <div className={styles.statCard}>
              {getStatIcon('progress')}
              <div className={styles.statContent}>
                <h3>Average Progress</h3>
                <p className={styles.statValue}>{stats.averageProgress}%</p>
              </div>
            </div>
            
            <div className={styles.statCard}>
              {getStatIcon('events')}
              <div className={styles.statContent}>
                <h3>Upcoming Events</h3>
                <p className={styles.statValue}>{stats.upcomingEventsCount}</p>
              </div>
            </div>
            
            <div className={styles.statCard}>
              {getStatIcon('messages')}
              <div className={styles.statContent}>
                <h3>Unread Messages</h3>
                <p className={styles.statValue}>{stats.unreadMessages}</p>
              </div>
            </div>
          </div>

          <div className={styles.dashboardSections}>
            <div className={styles.mainSection}>
              <div className={styles.sectionHeader}>
                <h2>My Children</h2>
                <Link to="/parent/children" className={styles.viewAllLink}>
                  View All <FiChevronRight />
                </Link>
              </div>
              
              <div className={styles.childrenCards}>
                {children.map(child => (
                  <div className={styles.childCard} key={child.id}>
                    <div className={styles.childHeader}>
                      <img src={child.avatar} alt={child.name} className={styles.childAvatar} />
                      <div className={styles.childInfo}>
                        <h3>{child.name}</h3>
                        <p>{child.grade}</p>
                      </div>
                    </div>
                    
                    <div className={styles.childProgress}>
                      <div className={styles.progressLabel}>
                        <span>Overall Progress</span>
                        <span>{child.progress}%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progressFill} 
                          style={{ width: `${child.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className={styles.childDetails}>
                      <div className={styles.subjectsList}>
                        <h4>Subjects</h4>
                        <div className={styles.subjects}>
                          {child.subjects.map((subject, idx) => (
                            <span key={idx} className={styles.subject}>{subject}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className={styles.attendanceInfo}>
                        <h4>Attendance</h4>
                        <p>{child.attendance}</p>
                      </div>
                      
                      <div className={styles.lastActive}>
                        <h4>Last Activity</h4>
                        <p>{child.lastActive}</p>
                      </div>
                    </div>
                    
                    <div className={styles.childActions}>
                      <Link to={`/parent/progress?child=${child.id}`} className={styles.viewProgressBtn}>
                        <FiBarChart2 /> View Progress
                      </Link>
                      <Link to={`/parent/resources?child=${child.id}`} className={styles.resourcesBtn}>
                        <FiBookOpen /> Resources
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.sectionHeader}>
                <h2>Upcoming Events</h2>
                <Link to="/parent/calendar" className={styles.viewAllLink}>
                  View All <FiChevronRight />
                </Link>
              </div>
              
              <div className={styles.eventsList}>
                {upcomingEvents.map(event => (
                  <div className={styles.eventCard} key={event.id}>
                    <div className={styles.eventIcon}>
                      <FiCalendar />
                    </div>
                    <div className={styles.eventDetails}>
                      <h3>{event.title}</h3>
                      <div className={styles.eventMeta}>
                        <span><FiClock /> {event.date} at {event.time}</span>
                        <span>{event.location}</span>
                      </div>
                      <p>{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.sideSection}>
              <div className={styles.sectionHeader}>
                <h2>Recent Messages</h2>
                <Link to="/parent/messages" className={styles.viewAllLink}>
                  View All <FiChevronRight />
                </Link>
              </div>
              
              <div className={styles.messagesList}>
                {recentMessages.map(message => (
                  <div 
                    className={`${styles.messageCard} ${!message.read ? styles.unread : ''}`} 
                    key={message.id}
                  >
                    <div className={styles.messageHeader}>
                      <h3>{message.from}</h3>
                      <span className={styles.messageTime}>{message.time}</span>
                    </div>
                    <p className={styles.messagePreview}>{message.preview}</p>
                  </div>
                ))}
              </div>
              
              <div className={styles.sectionHeader}>
                <h2>Notifications</h2>
              </div>
              
              <div className={styles.notificationsList}>
                {notifications.map(notification => {
                  const { icon, color } = getNotificationDetails(notification.type);
                  return (
                    <div 
                      className={`${styles.notificationCard} ${notification.urgent ? styles.urgent : ''}`} 
                      key={notification.id}
                    >
                      <div 
                        className={styles.notificationIcon} 
                        style={{ backgroundColor: `${color}20`, color }}
                      >
                        {icon}
                      </div>
                      <div className={styles.notificationContent}>
                        <p>{notification.message}</p>
                        <span className={styles.notificationTime}>{notification.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ParentHome; 