import React, { useState, useEffect } from 'react';
import { 
  FaGraduationCap, 
  FaUsers, 
  FaStar, 
  FaBookOpen, 
  FaCalendarAlt, 
  FaBell, 
  FaChartLine, 
  FaUserGraduate,
  FaCheck,
  FaClock,
  FaCommentDots
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import styles from './TutorHome.module.css';

// API URL from environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TutorHome = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    avgRating: 'N/A',
    earnings: 0
  });
  const [courses, setCourses] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
    setWelcomeTime();
  }, []);

  // Set welcome message based on time of day
  const setWelcomeTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setWelcomeMessage('Good Morning');
    } else if (hour < 18) {
      setWelcomeMessage('Good Afternoon');
    } else {
      setWelcomeMessage('Good Evening');
    }
  };

  // Fetch all required data for the dashboard
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch courses
      const coursesResponse = await axios.get(`${API_URL}/api/courses`);
      
      // Process courses data
      let coursesData = [];
      if (Array.isArray(coursesResponse.data)) {
        coursesData = coursesResponse.data;
      } else if (coursesResponse.data?.data && Array.isArray(coursesResponse.data.data)) {
        coursesData = coursesResponse.data.data;
      }
      
      // Filter courses by tutor ID
      const tutorCourses = coursesData.filter(course => 
        course.tutor === currentUser?.uid
      );
      
      setCourses(tutorCourses);
      
      // Calculate stats
      const totalStudents = tutorCourses.reduce((sum, course) => 
        sum + (Array.isArray(course.enrolledStudents) ? course.enrolledStudents.length : 0), 0
      );
      
      const coursesWithRating = tutorCourses.filter(course => 
        typeof course.rating === 'number' && !isNaN(course.rating)
      );
      
      const avgRating = coursesWithRating.length > 0 
        ? (coursesWithRating.reduce((sum, course) => sum + course.rating, 0) / coursesWithRating.length).toFixed(1)
        : 'N/A';
      
      const totalEarnings = tutorCourses.reduce((sum, course) => {
        const price = typeof course.price === 'number' ? course.price : 0;
        const students = Array.isArray(course.enrolledStudents) ? course.enrolledStudents.length : 0;
        return sum + (price * students);
      }, 0);
      
      setStats({
        courses: tutorCourses.length,
        students: totalStudents,
        avgRating,
        earnings: totalEarnings
      });
      
      // Mock upcoming events (replace with actual API calls in production)
      setUpcomingEvents([
        { 
          id: 1, 
          title: 'Live Session: Mathematics Fundamentals', 
          date: new Date(Date.now() + 86400000), // tomorrow
          time: '10:00 AM - 11:30 AM',
          attendees: 12
        },
        { 
          id: 2, 
          title: 'Grading: End of Week Assessments', 
          date: new Date(Date.now() + 172800000), // day after tomorrow
          time: '2:00 PM',
          type: 'task'
        },
        { 
          id: 3, 
          title: 'Parent-Teacher Meeting: Grade 5 Students', 
          date: new Date(Date.now() + 259200000), // 3 days from now
          time: '3:30 PM - 5:00 PM',
          attendees: 8
        }
      ]);
      
      // Mock recent activities (replace with actual API calls in production)
      setRecentActivities([
        {
          id: 1,
          type: 'enrollment',
          message: 'New student enrolled in "Mathematics: Fractions"',
          time: '2 hours ago'
        },
        {
          id: 2,
          type: 'message',
          message: 'John Doe sent you a message about the homework',
          time: '5 hours ago'
        },
        {
          id: 3,
          type: 'assignment',
          message: '15 students submitted their Science quiz',
          time: 'Yesterday'
        },
        {
          id: 4,
          type: 'rating',
          message: 'Your course "English Grammar" received a 5-star rating',
          time: 'Yesterday'
        },
        {
          id: 5,
          type: 'system',
          message: 'System maintenance scheduled for this weekend',
          time: '2 days ago'
        }
      ]);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format date to display in readable format
  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Welcome Header */}
      <header className={styles.welcome}>
        <div>
          <h1>{welcomeMessage}, {currentUser?.displayName || 'Teacher'}!</h1>
          <p className={styles.date}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className={styles.quickActions}>
          <Link to="/tutor/courses/create" className={styles.createCourseBtn}>
            <FaBookOpen /> Create Course
          </Link>
          <button className={styles.notificationBtn}>
            <FaBell /> <span className={styles.notificationBadge}>5</span>
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(74, 108, 247, 0.1)' }}>
            <FaBookOpen style={{ color: '#4a6cf7' }} />
          </div>
          <div className={styles.statContent}>
            <h3>{stats.courses}</h3>
            <p>Active Courses</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(40, 167, 69, 0.1)' }}>
            <FaUsers style={{ color: '#28a745' }} />
          </div>
          <div className={styles.statContent}>
            <h3>{stats.students}</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)' }}>
            <FaStar style={{ color: '#ffc107' }} />
          </div>
          <div className={styles.statContent}>
            <h3>{stats.avgRating}</h3>
            <p>Average Rating</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>
            <FaChartLine style={{ color: '#dc3545' }} />
          </div>
          <div className={styles.statContent}>
            <h3>KSh {stats.earnings.toLocaleString()}</h3>
            <p>Total Earnings</p>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <div className={styles.dashboardContent}>
        {/* Left Column: Courses Overview */}
        <section className={styles.courseSection}>
          <div className={styles.sectionHeader}>
            <h2>
              <FaGraduationCap /> Your Courses
            </h2>
            <Link to="/tutor/courses" className={styles.viewAllLink}>
              View All
            </Link>
          </div>

          {courses.length === 0 ? (
            <div className={styles.emptyState}>
              <FaBookOpen className={styles.emptyStateIcon} />
              <p>You haven't created any courses yet</p>
              <Link to="/tutor/courses/create" className={styles.createCourseLink}>
                Create Your First Course
              </Link>
            </div>
          ) : (
            <div className={styles.coursesList}>
              {courses.slice(0, 4).map(course => (
                <div key={course._id} className={styles.courseListItem}>
                  <div className={styles.courseImage}>
                    <img 
                      src={course.coverImage || 'https://via.placeholder.com/100x100?text=Course'} 
                      alt={course.title}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/100x100?text=Course' }}
                    />
                  </div>
                  <div className={styles.courseInfo}>
                    <h3>{course.title}</h3>
                    <div className={styles.courseStats}>
                      <span><FaUserGraduate /> {Array.isArray(course.enrolledStudents) ? course.enrolledStudents.length : 0} Students</span>
                      <span><FaStar className={styles.starIcon} /> {typeof course.rating === 'number' ? course.rating.toFixed(1) : 'N/A'}</span>
                    </div>
                  </div>
                  <Link to={`/tutor/courses/${course._id}`} className={styles.viewCourseBtn}>
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Right Column: Schedule & Activity */}
        <div className={styles.rightColumn}>
          {/* Upcoming Events Section */}
          <section className={styles.eventsSection}>
            <div className={styles.sectionHeader}>
              <h2>
                <FaCalendarAlt /> Upcoming Events
              </h2>
              <Link to="/tutor/calendar" className={styles.viewAllLink}>
                View Calendar
              </Link>
            </div>

            {upcomingEvents.length === 0 ? (
              <div className={styles.emptyState}>
                <FaCalendarAlt className={styles.emptyStateIcon} />
                <p>No upcoming events scheduled</p>
              </div>
            ) : (
              <div className={styles.eventsList}>
                {upcomingEvents.map(event => (
                  <div key={event.id} className={styles.eventCard}>
                    <div className={styles.eventDate}>
                      <div className={styles.eventDay}>
                        {formatDate(event.date)}
                      </div>
                      <div className={styles.eventTime}>{event.time}</div>
                    </div>
                    <div className={styles.eventContent}>
                      <h3>{event.title}</h3>
                      {event.type === 'task' ? (
                        <span className={styles.taskBadge}><FaCheck /> Task</span>
                      ) : (
                        <span className={styles.eventAttendees}>
                          <FaUsers /> {event.attendees} attendees
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Recent Activity Feed */}
          <section className={styles.activitySection}>
            <div className={styles.sectionHeader}>
              <h2>
                <FaBell /> Recent Activity
              </h2>
            </div>

            {recentActivities.length === 0 ? (
              <div className={styles.emptyState}>
                <FaBell className={styles.emptyStateIcon} />
                <p>No recent activities to show</p>
              </div>
            ) : (
              <div className={styles.activityFeed}>
                {recentActivities.map(activity => (
                  <div key={activity.id} className={styles.activityItem}>
                    <div className={styles.activityIcon}>
                      {activity.type === 'enrollment' && <FaUserGraduate />}
                      {activity.type === 'message' && <FaCommentDots />}
                      {activity.type === 'assignment' && <FaBookOpen />}
                      {activity.type === 'rating' && <FaStar />}
                      {activity.type === 'system' && <FaBell />}
                    </div>
                    <div className={styles.activityContent}>
                      <p>{activity.message}</p>
                      <span className={styles.activityTime}>
                        <FaClock /> {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TutorHome; 