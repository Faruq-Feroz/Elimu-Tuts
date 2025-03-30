import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaUsers, FaStar, FaMoneyBillWave, FaPlus, FaBell, FaBook, FaCalendarAlt, FaClock, FaUserGraduate } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../../components/dashboard/tutor/TutorHome.module.css';
import { useAuth } from '../../../../context/AuthContext';

const Home = ({ onSetActiveComponent }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    rating: 0,
    earnings: 0
  });
  const [courses, setCourses] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    fetchData();
    setWelcomeMessage(getWelcomeMessage());
  }, []);

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch courses from API
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tutor/courses?tutorId=${currentUser?.uid}`);

      // If courses data exists and is an array
      if (response.data && Array.isArray(response.data)) {
        setCourses(response.data.slice(0, 3)); // Show only 3 most recent courses
        
        // Calculate stats based on courses
        const totalStudents = response.data.reduce((sum, course) => sum + (course.enrolledStudents || 0), 0);
        const totalRatings = response.data.reduce((sum, course) => sum + (course.averageRating || 0), 0);
        const avgRating = response.data.length > 0 ? (totalRatings / response.data.length).toFixed(1) : 0;
        const totalEarnings = response.data.reduce((sum, course) => sum + (course.earnings || 0), 0);
        
        setStats({
          courses: response.data.length,
          students: totalStudents,
          rating: avgRating,
          earnings: totalEarnings.toFixed(2)
        });

        // Generate mock upcoming events (in a real app, you would fetch this from an API)
        const mockEvents = [
          {
            id: 1,
            title: 'Live Webinar: Advanced JavaScript',
            date: '2023-11-15',
            time: '10:00 AM',
            type: 'webinar',
            attendees: 12
          },
          {
            id: 2,
            title: 'Submission Deadline: Final Projects',
            date: '2023-11-18',
            time: '11:59 PM',
            type: 'task'
          },
          {
            id: 3,
            title: 'Student Consultation Hour',
            date: '2023-11-20',
            time: '2:00 PM',
            type: 'meeting',
            attendees: 5
          }
        ];
        setUpcomingEvents(mockEvents);

        // Generate mock recent activities (in a real app, you would fetch this from an API)
        const mockActivities = [
          {
            id: 1,
            action: 'New student enrolled in Web Development Bootcamp',
            time: '2 hours ago'
          },
          {
            id: 2,
            action: 'You received a 5-star rating on JavaScript Mastery course',
            time: '5 hours ago'
          },
          {
            id: 3,
            action: 'Course content update for React Fundamentals approved',
            time: '1 day ago'
          },
          {
            id: 4,
            action: 'New comment on your Python for Data Science lecture',
            time: '2 days ago'
          }
        ];
        setRecentActivities(mockActivities);
      }
    } catch (error) {
      console.error('Error fetching tutor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleCreateCourse = () => {
    if (onSetActiveComponent) {
      onSetActiveComponent('courses');
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
      <div className={styles.welcome}>
        <div>
          <h1>{welcomeMessage}, Tutor!</h1>
          <p className={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className={styles.quickActions}>
          <button onClick={handleCreateCourse} className={styles.createCourseBtn}>
            <FaPlus /> Create Course
          </button>
          <button className={styles.notificationBtn}>
            <FaBell />
            <span className={styles.notificationBadge}>3</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(74, 108, 247, 0.1)', color: '#4a6cf7' }}>
            <FaGraduationCap />
          </div>
          <div className={styles.statContent}>
            <h3>{stats.courses}</h3>
            <p>Active Courses</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(255, 159, 67, 0.1)', color: '#ff9f43' }}>
            <FaUsers />
          </div>
          <div className={styles.statContent}>
            <h3>{stats.students}</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(254, 176, 25, 0.1)', color: '#feb019' }}>
            <FaStar />
          </div>
          <div className={styles.statContent}>
            <h3>{stats.rating}</h3>
            <p>Average Rating</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(0, 194, 146, 0.1)', color: '#00c292' }}>
            <FaMoneyBillWave />
          </div>
          <div className={styles.statContent}>
            <h3>${stats.earnings}</h3>
            <p>Total Earnings</p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className={styles.dashboardContent}>
        {/* Left Column - Course Overview */}
        <div className={styles.courseSection}>
          <div className={styles.sectionHeader}>
            <h2><FaBook /> Your Courses</h2>
            <Link to="/dashboard/courses" className={styles.viewAllLink}>View All</Link>
          </div>

          {courses.length > 0 ? (
            <div className={styles.coursesList}>
              {courses.map(course => (
                <div key={course._id} className={styles.courseListItem}>
                  <div className={styles.courseImage}>
                    <img src={course.imageUrl || 'https://via.placeholder.com/60x60'} alt={course.title} />
                  </div>
                  <div className={styles.courseInfo}>
                    <h3>{course.title}</h3>
                    <div className={styles.courseStats}>
                      <span><FaUserGraduate /> {course.enrolledStudents || 0} Students</span>
                      <span className={styles.starIcon}><FaStar /> {course.averageRating || 0}</span>
                    </div>
                  </div>
                  <Link to={`/dashboard/courses/${course._id}`} className={styles.viewCourseBtn}>View</Link>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}><FaBook /></div>
              <p>You haven't created any courses yet.</p>
              <button onClick={handleCreateCourse} className={styles.createCourseLink}>Create Your First Course</button>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* Upcoming Events */}
          <div className={styles.eventsSection}>
            <div className={styles.sectionHeader}>
              <h2><FaCalendarAlt /> Upcoming Events</h2>
              <Link to="/dashboard/schedule" className={styles.viewAllLink}>View Calendar</Link>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className={styles.eventsList}>
                {upcomingEvents.map(event => (
                  <div key={event.id} className={styles.eventCard}>
                    <div className={styles.eventDate}>
                      <div className={styles.eventDay}>{formatDate(event.date)}</div>
                      <div className={styles.eventTime}>{event.time}</div>
                    </div>
                    <div className={styles.eventContent}>
                      <h3>{event.title}</h3>
                      {event.type === 'task' ? (
                        <div className={styles.taskBadge}>Task Deadline</div>
                      ) : (
                        <div className={styles.eventAttendees}>
                          <FaUsers /> {event.attendees} Attendees
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateIcon}><FaCalendarAlt /></div>
                <p>No upcoming events scheduled.</p>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className={styles.activitySection}>
            <div className={styles.sectionHeader}>
              <h2><FaClock /> Recent Activity</h2>
            </div>

            {recentActivities.length > 0 ? (
              <div className={styles.activityFeed}>
                {recentActivities.map(activity => (
                  <div key={activity.id} className={styles.activityItem}>
                    <div className={styles.activityIcon}>
                      <FaGraduationCap />
                    </div>
                    <div className={styles.activityContent}>
                      <p>{activity.action}</p>
                      <div className={styles.activityTime}>
                        <FaClock /> {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateIcon}><FaClock /></div>
                <p>No recent activity to display.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;