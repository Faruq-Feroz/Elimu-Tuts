// src/components/dashboard/student/DashboardHome.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import styles from './Home.module.css';

// Sample data for the dashboard - in a real app, this would come from an API
const SAMPLE_DATA = {
  student: {
    grade: 'Grade 5',
    avatar: 'https://i.pravatar.cc/150?img=11',
    streak: 12, // days of continuous learning
    points: 2450,
    level: 8,
    nextLevel: 3000,
    badges: [
      { id: 'b1', name: 'Math Whiz', icon: '🧮', earned: true },
      { id: 'b2', name: 'Science Explorer', icon: '🔬', earned: true },
      { id: 'b3', name: 'Literary Master', icon: '📚', earned: true },
      { id: 'b4', name: 'History Buff', icon: '🏛️', earned: false },
      { id: 'b5', name: 'Art Creator', icon: '🎨', earned: false },
    ],
  },
  courses: [
    {
      id: 'c1',
      title: 'Mathematics: Fractions',
      progress: 85,
      image: 'https://img.freepik.com/free-vector/hand-drawn-mathematics-background_23-2148157516.jpg',
      nextLesson: 'Comparing Fractions',
      dueDate: null,
    },
    {
      id: 'c2',
      title: 'English Grammar',
      progress: 62,
      image: 'https://img.freepik.com/free-vector/hand-drawn-english-book-background_23-2149483336.jpg',
      nextLesson: 'Adjectives and Adverbs',
      dueDate: '2023-09-25',
    },
    {
      id: 'c3',
      title: 'Science: Plants and Animals',
      progress: 40,
      image: 'https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148499325.jpg',
      nextLesson: 'Plant Reproduction',
      dueDate: '2023-09-28',
    },
    {
      id: 'c4',
      title: 'Kiswahili Basics',
      progress: 25,
      image: 'https://media.istockphoto.com/id/1337232523/vector/kenyan-flag-textured-background.jpg?s=612x612&w=0&k=20&c=NEk8wtM0tL6UJA1p2Bc_3_Rdn-LSJ8a-xCFv9f4TDKM=',
      nextLesson: 'Common Phrases',
      dueDate: null,
    },
  ],
  todaySchedule: [
    { time: '09:00 AM', activity: 'Mathematics Class', type: 'class', completed: true },
    { time: '10:30 AM', activity: 'Science Experiment: Plant Growth', type: 'lab', completed: true },
    { time: '01:00 PM', activity: 'English Essay Review', type: 'assignment', completed: false },
    { time: '03:30 PM', activity: 'Kiswahili Vocabulary Quiz', type: 'quiz', completed: false },
  ],
  upcomingAssignments: [
    { 
      id: 'a1', 
      title: 'Mathematics Problem Set',
      course: 'Mathematics: Fractions', 
      dueDate: '2023-09-25',
      difficulty: 'Medium'
    },
    { 
      id: 'a2', 
      title: 'English Essay',
      course: 'English Grammar', 
      dueDate: '2023-09-27',
      difficulty: 'Hard'
    },
    { 
      id: 'a3', 
      title: 'Science Lab Report',
      course: 'Science: Plants and Animals', 
      dueDate: '2023-09-28',
      difficulty: 'Medium'
    },
  ],
  recentActivities: [
    { id: 'ra1', time: '1 hour ago', text: 'Completed "Fractions Quiz" with score 90%', icon: '📝' },
    { id: 'ra2', time: '3 hours ago', text: 'Watched "English Grammar" video lesson', icon: '▶️' },
    { id: 'ra3', time: 'Yesterday', text: 'Completed "Plant Cells" assignment', icon: '✅' },
    { id: 'ra4', time: '2 days ago', text: 'Earned "Math Whiz" badge', icon: '🏆' },
  ],
  recommendedCourses: [
    { 
      id: 'rc1', 
      title: 'Social Studies: Kenyan Geography',
      description: 'Learn about Kenya\'s diverse geographical features',
      level: 'Beginner',
      duration: '8 weeks',
      image: 'https://img.freepik.com/free-vector/watercolor-abstract-map_23-2149194638.jpg'
    },
    { 
      id: 'rc2', 
      title: 'Introduction to Agriculture',
      description: 'Explore sustainable farming practices and food production',
      level: 'Beginner',
      duration: '6 weeks',
      image: 'https://img.freepik.com/free-vector/hand-drawn-agriculture-concept_23-2148970273.jpg'
    },
    { 
      id: 'rc3', 
      title: 'Creative Arts: Drawing Basics',
      description: 'Develop your artistic skills with fundamental drawing techniques',
      level: 'Beginner',
      duration: '4 weeks',
      image: 'https://img.freepik.com/free-vector/artists-painting-concept-illustration_114360-6551.jpg'
    },
  ],
  news: [
    {
      id: 'n1',
      title: 'CBC Competition Coming Soon',
      summary: 'Participate in the upcoming CBC national competition and represent your school.',
      date: '2023-09-20'
    },
    {
      id: 'n2',
      title: 'New Science Videos Added',
      summary: 'Check out the latest video lessons on plant and animal classification.',
      date: '2023-09-18'
    }
  ],
  learningTips: [
    'Study in short bursts with breaks in between to improve retention.',
    'Teaching concepts to others helps solidify your understanding.',
    'Use flashcards for memorizing vocabulary and formulas.',
    'Create mind maps to connect related concepts.',
    'Set specific goals for each study session.',
  ]
};

const StudentDashboardHome = () => {
  const { currentUser } = useAuth();
  const studentName = currentUser?.displayName || 'Student';
  
  const [data] = useState(SAMPLE_DATA);
  const [currentTip, setCurrentTip] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  // Check if user is new (in a real app, this would come from the database)
  useEffect(() => {
    // This is a simplified example; in a real app you would:
    // 1. Check user metadata from Firebase or your backend
    // 2. Look for account creation date or a "first login" flag
    // For demo purposes, we'll check if the user was created in the last 24 hours
    if (currentUser && currentUser.metadata) {
      const creationTime = new Date(currentUser.metadata.creationTime);
      const now = new Date();
      const isUserNew = (now - creationTime) < (24 * 60 * 60 * 1000); // Less than 24 hours
      setIsNewUser(isUserNew);
    }
  }, [currentUser]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Rotate learning tips every 10 seconds
  useEffect(() => {
    const tipTimer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % data.learningTips.length);
    }, 10000);
    
    return () => clearInterval(tipTimer);
  }, [data.learningTips.length]);

  // Calculate percentage for progress bar
  const calculateLevelProgress = () => {
    return (data.student.points / data.student.nextLevel) * 100;
  };

  // Calculate current time period
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Format date
  const formatDate = () => {
    return currentTime.toLocaleDateString('en-KE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.dashboardHome}>
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className={styles.welcomeModal}>
          <div className={styles.welcomeModalContent}>
            {isNewUser ? (
              <>
                <h2>Welcome to Elimu-Tuts, {studentName}!</h2>
                <p>We're excited to have you join our learning platform. Let's start your educational journey together!</p>
                <div className={styles.welcomeStats}>
                  <div className={styles.welcomeStat}>
                    <span className={styles.welcomeStatNumber}>{data.courses.length}</span>
                    <span className={styles.welcomeStatLabel}>Available Courses</span>
                  </div>
                  <div className={styles.welcomeStat}>
                    <span className={styles.welcomeStatNumber}>{data.student.badges.filter(b => b.earned).length}</span>
                    <span className={styles.welcomeStatLabel}>Badges to Earn</span>
                  </div>
                  <div className={styles.welcomeStat}>
                    <span className={styles.welcomeStatNumber}>1</span>
                    <span className={styles.welcomeStatLabel}>Adventure Begins</span>
                  </div>
                </div>
                <button 
                  className={styles.welcomeButton}
                  onClick={() => setShowWelcomeModal(false)}
                >
                  Start Your Journey
                </button>
              </>
            ) : (
              <>
                <h2>Welcome Back, {studentName}!</h2>
                <p>You're making great progress. Continue your learning journey today.</p>
                <div className={styles.welcomeStats}>
                  <div className={styles.welcomeStat}>
                    <span className={styles.welcomeStatNumber}>{data.student.streak}</span>
                    <span className={styles.welcomeStatLabel}>Day Streak</span>
                  </div>
                  <div className={styles.welcomeStat}>
                    <span className={styles.welcomeStatNumber}>{data.courses.length}</span>
                    <span className={styles.welcomeStatLabel}>Active Courses</span>
                  </div>
                  <div className={styles.welcomeStat}>
                    <span className={styles.welcomeStatNumber}>{data.upcomingAssignments.length}</span>
                    <span className={styles.welcomeStatLabel}>Pending Tasks</span>
                  </div>
                </div>
                <button 
                  className={styles.welcomeButton}
                  onClick={() => setShowWelcomeModal(false)}
                >
                  Start Learning
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className={styles.dashboardHeader}>
        <div className={styles.headerLeft}>
          <h2>{getGreeting()}, {studentName}!</h2>
          <p className={styles.currentDate}>{formatDate()}</p>
          <p className={styles.motivationalText}>
            {isNewUser 
              ? "Welcome to your learning journey! Explore your courses and start learning today." 
              : "Ready for another day of learning? Your CBC courses await!"}
          </p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.studentProfile}>
            <div className={styles.studentInfo}>
              <div className={styles.studentNameGrade}>
                <h3>{studentName}</h3>
                <span className={styles.studentGrade}>{data.student.grade}</span>
              </div>
              <div className={styles.studentLevel}>
                <div className={styles.levelInfo}>
                  <span>Level {data.student.level}</span>
                  <span className={styles.levelPoints}>{data.student.points}/{data.student.nextLevel} points</span>
                </div>
                <div className={styles.levelProgressBar}>
                  <div 
                    className={styles.levelProgressFill} 
                    style={{width: `${calculateLevelProgress()}%`}}
                  ></div>
                </div>
              </div>
            </div>
            <div className={styles.studentAvatar}>
              <img src={data.student.avatar} alt={studentName} />
              <span className={styles.streakBadge}>🔥 {data.student.streak}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className={styles.dashboardContent}>
        {/* Left Column */}
        <div className={styles.dashboardLeftColumn}>
          {/* In Progress Courses */}
          <section className={styles.inProgressCourses}>
            <div className={styles.sectionHeader}>
              <h3>Your Learning Progress</h3>
              <button className={styles.viewAllButton}>View All</button>
            </div>
            <div className={styles.courseProgressCards}>
              {data.courses.map(course => (
                <div key={course.id} className={styles.courseProgressCard}>
                  <div 
                    className={styles.courseCardImage} 
                    style={{ backgroundImage: `url(${course.image})` }}
                  >
                    <div className={styles.courseProgressOverlay}>
                      <div className={styles.courseProgressCircle}>
                        <svg width="60" height="60" viewBox="0 0 60 60">
                          <circle cx="30" cy="30" r="25" className={styles.progressBackground} />
                          <circle 
                            cx="30" 
                            cy="30" 
                            r="25" 
                            className={styles.progressFill}
                            strokeDasharray={2 * Math.PI * 25}
                            strokeDashoffset={2 * Math.PI * 25 * (1 - course.progress / 100)}
                          />
                        </svg>
                        <span className={styles.progressPercentage}>{course.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.courseCardContent}>
                    <h4>{course.title}</h4>
                    <p>Next: {course.nextLesson}</p>
                    {course.dueDate && (
                      <p className={styles.courseDueDate}>Due: {new Date(course.dueDate).toLocaleDateString('en-KE')}</p>
                    )}
                    <button className={styles.continueButton}>Continue</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended Courses */}
          <section className={styles.recommendedCourses}>
            <div className={styles.sectionHeader}>
              <h3>Recommended for You</h3>
              <button className={styles.viewAllButton}>View All</button>
            </div>
            <div className={styles.recommendedCoursesGrid}>
              {data.recommendedCourses.map(course => (
                <div key={course.id} className={styles.recommendedCourseCard}>
                  <div 
                    className={styles.recommendedCourseImage} 
                    style={{ backgroundImage: `url(${course.image})` }}
                  ></div>
                  <div className={styles.recommendedCourseContent}>
                    <h4>{course.title}</h4>
                    <p>{course.description}</p>
                    <div className={styles.courseCardFooter}>
                      <span className={styles.courseLevel}>{course.level}</span>
                      <span className={styles.courseDuration}>{course.duration}</span>
                    </div>
                    <button className={styles.enrollButton}>Enroll Now</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className={styles.dashboardRightColumn}>
          {/* Today's Schedule */}
          <section className={styles.todaySchedule}>
            <h3>Today's Schedule</h3>
            <ul className={styles.scheduleList}>
              {data.todaySchedule.map((item, index) => (
                <li key={index} className={`${styles.scheduleItem} ${item.completed ? styles.completed : ''}`}>
                  <div className={styles.scheduleTime}>{item.time}</div>
                  <div className={styles.scheduleContent}>
                    <span className={`${styles.scheduleTag} ${styles[item.type]}`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                    <p className={styles.scheduleActivity}>{item.activity}</p>
                  </div>
                  <div className={styles.scheduleStatus}>
                    {item.completed ? '✓' : '○'}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Upcoming Assignments */}
          <section className={styles.upcomingAssignments}>
            <h3>Upcoming Assignments</h3>
            <ul className={styles.assignmentList}>
              {data.upcomingAssignments.map(assignment => (
                <li key={assignment.id} className={styles.assignmentItem}>
                  <div className={styles.assignmentHeader}>
                    <h4>{assignment.title}</h4>
                    <span className={`${styles.difficultyBadge} ${styles[assignment.difficulty.toLowerCase()]}`}>
                      {assignment.difficulty}
                    </span>
                  </div>
                  <p className={styles.assignmentCourse}>{assignment.course}</p>
                  <div className={styles.assignmentFooter}>
                    <span className={styles.assignmentDue}>
                      Due: {new Date(assignment.dueDate).toLocaleDateString('en-KE')}
                    </span>
                    <button className={styles.startButton}>Start</button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Learning Tip */}
          <section className={styles.learningTipSection}>
            <div className={styles.learningTip}>
              <div className={styles.tipIcon}>💡</div>
              <p className={styles.tipText}>{data.learningTips[currentTip]}</p>
            </div>
          </section>

          {/* Recent Activity */}
          <section className={styles.recentActivity}>
            <h3>Recent Activity</h3>
            <ul className={styles.activityList}>
              {data.recentActivities.map(activity => (
                <li key={activity.id} className={styles.activityItem}>
                  <div className={styles.activityIcon}>{activity.icon}</div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>{activity.text}</p>
                    <span className={styles.activityTime}>{activity.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Badges */}
          <section className={styles.badgesSection}>
            <h3>Your Badges</h3>
            <div className={styles.badgesGrid}>
              {data.student.badges.map(badge => (
                <div key={badge.id} className={`${styles.badge} ${!badge.earned ? styles.lockedBadge : ''}`}>
                  <div className={styles.badgeIcon}>{badge.icon}</div>
                  <span className={styles.badgeName}>{badge.name}</span>
                  {!badge.earned && <div className={styles.badgeLock}>🔒</div>}
                </div>
              ))}
            </div>
          </section>

          {/* News & Announcements */}
          <section className={styles.newsSection}>
            <h3>News & Announcements</h3>
            <div className={styles.newsList}>
              {data.news.map(item => (
                <div key={item.id} className={styles.newsItem}>
                  <h4>{item.title}</h4>
                  <p>{item.summary}</p>
                  <span className={styles.newsDate}>{new Date(item.date).toLocaleDateString('en-KE')}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardHome;