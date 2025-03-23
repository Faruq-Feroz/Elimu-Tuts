import React from 'react';
import styles from './Home.module.css';
import { FiUsers, FiPieChart, FiCalendar, FiMessageSquare } from 'react-icons/fi';

const ParentDashboardHome = () => {
  // Sample data - in a real app, this would come from props or context
  const children = [
    { id: 1, name: 'David Smith', grade: '7th Grade', lastActive: '2 hours ago', progress: 78 },
    { id: 2, name: 'Sarah Smith', grade: '5th Grade', lastActive: 'Yesterday', progress: 65 }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Parent-Teacher Meeting', date: 'March 28, 2025', time: '4:00 PM' },
    { id: 2, title: 'End of Term Exams', date: 'April 5-12, 2025', time: 'All Day' }
  ];

  const recentMessages = [
    { id: 1, from: 'Mr. Johnson (Math)', time: '1 hour ago', preview: 'Davids progress in algebra has been...' },
    { id: 2, from: 'Ms. Wanjiku (English)', time: 'Yesterday', preview: 'Sarah did well on her last essay...' }
  ];

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.welcomeTitle}>Welcome, Jane</h1>
      <p className={styles.welcomeSubtitle}>Monitor your children's educational journey</p>
      
      {/* Stats overview */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><FiUsers /></div>
          <div className={styles.statInfo}>
            <h3>Children</h3>
            <p className={styles.statValue}>2</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><FiPieChart /></div>
          <div className={styles.statInfo}>
            <h3>Avg. Progress</h3>
            <p className={styles.statValue}>72%</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><FiCalendar /></div>
          <div className={styles.statInfo}>
            <h3>Upcoming</h3>
            <p className={styles.statValue}>2 Events</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><FiMessageSquare /></div>
          <div className={styles.statInfo}>
            <h3>Messages</h3>
            <p className={styles.statValue}>3 New</p>
          </div>
        </div>
      </div>
      
      {/* Children overview */}
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h2>My Children</h2>
          <button className={styles.viewAllBtn}>View All</button>
        </div>
        <div className={styles.childrenList}>
          {children.map(child => (
            <div key={child.id} className={styles.childCard}>
              <div className={styles.childAvatar}>{child.name.charAt(0)}</div>
              <div className={styles.childInfo}>
                <h3>{child.name}</h3>
                <p>{child.grade}</p>
                <small>Last active: {child.lastActive}</small>
              </div>
              <div className={styles.progressIndicator}>
                <div className={styles.progressLabel}>Progress</div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${child.progress}%` }}
                  ></div>
                </div>
                <div className={styles.progressValue}>{child.progress}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Upcoming events */}
      <div className={styles.dashboardColumns}>
        <div className={styles.column}>
          <div className={styles.sectionHeader}>
            <h2>Upcoming Events</h2>
            <button className={styles.viewAllBtn}>Calendar</button>
          </div>
          <div className={styles.eventsList}>
            {upcomingEvents.map(event => (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventDate}>
                  <div className={styles.eventMonth}>
                    {event.date.split(' ')[0]}
                  </div>
                  <div className={styles.eventDay}>
                    {event.date.split(' ')[1].replace(',', '')}
                  </div>
                </div>
                <div className={styles.eventInfo}>
                  <h3>{event.title}</h3>
                  <p>{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent messages */}
        <div className={styles.column}>
          <div className={styles.sectionHeader}>
            <h2>Recent Messages</h2>
            <button className={styles.viewAllBtn}>Inbox</button>
          </div>
          <div className={styles.messagesList}>
            {recentMessages.map(message => (
              <div key={message.id} className={styles.messageCard}>
                <div className={styles.messageHeader}>
                  <h3>{message.from}</h3>
                  <span className={styles.messageTime}>{message.time}</span>
                </div>
                <p className={styles.messagePreview}>{message.preview}</p>
                <button className={styles.readBtn}>Read</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboardHome;