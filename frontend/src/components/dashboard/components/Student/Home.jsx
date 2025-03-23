// src/components/dashboard/student/DashboardHome.jsx
import React from 'react';
import styles from './Home.module.css';

const StudentDashboardHome = () => {
  return (
    <div className={styles.dashboardHome}>
      <h2>Welcome to Elimu Tuts</h2>
      <div className={styles.statsCards}>
        <div className={styles.statCard}>
          <h3>Courses</h3>
          <p className={styles.statNumber}>5</p>
          <p className={styles.statLabel}>Enrolled</p>
        </div>
        <div className={styles.statCard}>
          <h3>Upcoming</h3>
          <p className={styles.statNumber}>3</p>
          <p className={styles.statLabel}>Assignments</p>
        </div>
        <div className={styles.statCard}>
          <h3>Progress</h3>
          <p className={styles.statNumber}>68%</p>
          <p className={styles.statLabel}>Course Completion</p>
        </div>
      </div>
      <div className={styles.recentActivity}>
        <h3>Recent Activity</h3>
        <ul className={styles.activityList}>
          <li>
            <span className={styles.activityTime}>2 hours ago</span>
            <span className={styles.activityText}>Completed "Introduction to Mathematics" lesson</span>
          </li>
          <li>
            <span className={styles.activityTime}>Yesterday</span>
            <span className={styles.activityText}>Submitted assignment for "Kiswahili Grammar"</span>
          </li>
          <li>
            <span className={styles.activityTime}>2 days ago</span>
            <span className={styles.activityText}>Started "Science: Plants and Animals" course</span>
          </li>
        </ul>
      </div>
      <div className={styles.recommendedCourses}>
        <h3>Recommended For You</h3>
        <div className={styles.courseCards}>
          {/* Course cards would go here */}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardHome;