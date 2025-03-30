import React, { useState } from 'react';
import styles from './Progress.module.css';

// Sample data for progress tracking
const SAMPLE_PROGRESS_DATA = {
  courses: [
    {
      id: 'course-001',
      name: 'Mathematics',
      code: 'MATH101',
      completion: 72,
      score: 85,
      modules: [
        { id: 'module-001', name: 'Algebra Basics', completion: 100, score: 92 },
        { id: 'module-002', name: 'Linear Equations', completion: 100, score: 88 },
        { id: 'module-003', name: 'Quadratic Equations', completion: 85, score: 79 },
        { id: 'module-004', name: 'Calculus Introduction', completion: 60, score: 81 },
        { id: 'module-005', name: 'Advanced Calculus', completion: 15, score: 0 }
      ]
    },
    {
      id: 'course-002',
      name: 'Introduction to Physics',
      code: 'PHYS101',
      completion: 65,
      score: 82,
      modules: [
        { id: 'module-006', name: 'Mechanics', completion: 100, score: 85 },
        { id: 'module-007', name: 'Thermodynamics', completion: 90, score: 81 },
        { id: 'module-008', name: 'Waves and Optics', completion: 75, score: 79 },
        { id: 'module-009', name: 'Electricity and Magnetism', completion: 40, score: 0 },
        { id: 'module-010', name: 'Quantum Physics', completion: 20, score: 0 }
      ]
    },
    {
      id: 'course-003',
      name: 'English Literature',
      code: 'ENGL202',
      completion: 88,
      score: 91,
      modules: [
        { id: 'module-011', name: 'Classical Literature', completion: 100, score: 95 },
        { id: 'module-012', name: 'Shakespeare Works', completion: 100, score: 92 },
        { id: 'module-013', name: 'Modern Novels', completion: 100, score: 89 },
        { id: 'module-014', name: 'Poetry Analysis', completion: 90, score: 88 },
        { id: 'module-015', name: 'Academic Writing', completion: 50, score: 0 }
      ]
    },
    {
      id: 'course-004',
      name: 'Introduction to Computer Science',
      code: 'CS101',
      completion: 45,
      score: 94,
      modules: [
        { id: 'module-016', name: 'Programming Basics', completion: 100, score: 98 },
        { id: 'module-017', name: 'Data Structures', completion: 85, score: 92 },
        { id: 'module-018', name: 'Algorithms', completion: 70, score: 90 },
        { id: 'module-019', name: 'Web Development', completion: 30, score: 0 },
        { id: 'module-020', name: 'Databases', completion: 0, score: 0 }
      ]
    }
  ],
  achievements: [
    { id: 'ach-001', title: 'Perfect Score', description: 'Achieved 100% on a quiz or exam', date: '2023-10-15', icon: '🏆' },
    { id: 'ach-002', title: 'Fast Learner', description: 'Completed a module in record time', date: '2023-09-28', icon: '⚡' },
    { id: 'ach-003', title: 'Consistent Learner', description: 'Studied for 5 consecutive days', date: '2023-11-05', icon: '🔥' },
    { id: 'ach-004', title: 'Quiz Master', description: 'Completed 10 quizzes with scores above 90%', date: '2023-10-30', icon: '🧠' },
    { id: 'ach-005', title: 'Early Bird', description: 'Completed an assignment before the deadline', date: '2023-11-10', icon: '🦅' }
  ],
  weeklyActivity: [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.0 },
    { day: 'Fri', hours: 1.5 },
    { day: 'Sat', hours: 0.8 },
    { day: 'Sun', hours: 0.5 }
  ],
  learningStreak: 7,
  totalCoursesCompleted: 2,
  totalHoursSpent: 128,
  overallProgress: 67,
  averageScore: 88
};

const Progress = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [timeRange, setTimeRange] = useState('week');
  const progressData = SAMPLE_PROGRESS_DATA;

  // Get color based on completion percentage
  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return '#4caf50'; // Green
    if (percentage >= 60) return '#8bc34a'; // Light Green
    if (percentage >= 40) return '#ffc107'; // Yellow
    if (percentage >= 20) return '#ff9800'; // Orange
    return '#f44336'; // Red
  };

  // Format date to display in a readable format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle course selection
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  // Close course detail view
  const closeCourseDetail = () => {
    setSelectedCourse(null);
  };

  // Render the progress overview
  const renderProgressOverview = () => {
    return (
      <div className={styles.progressOverview}>
        <div className={styles.overviewHeader}>
          <h2>Learning Progress</h2>
          <div className={styles.timeRangeSelector}>
            <label>Time Range:</label>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className={styles.timeRangeSelect}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
        
        <div className={styles.statsCards}>
          <div className={styles.statsCard}>
            <div className={styles.statsCardHeader}>Overall Progress</div>
            <div className={styles.circularProgress}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12" />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="54" 
                  fill="none" 
                  stroke="#4a6fe9" 
                  strokeWidth="12" 
                  strokeDasharray="339.292"
                  strokeDashoffset={339.292 * (1 - progressData.overallProgress / 100)}
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className={styles.circularProgressText}>{progressData.overallProgress}%</div>
            </div>
          </div>
          
          <div className={styles.statsCard}>
            <div className={styles.statsCardHeader}>Average Score</div>
            <div className={styles.statsCardValue}>{progressData.averageScore}%</div>
            <div className={styles.statsCardSubtext}>across all courses</div>
          </div>
          
          <div className={styles.statsCard}>
            <div className={styles.statsCardHeader}>Learning Streak</div>
            <div className={styles.streakValue}>
              <span className={styles.streakIcon}>🔥</span>
              <span className={styles.streakNumber}>{progressData.learningStreak}</span>
            </div>
            <div className={styles.statsCardSubtext}>consecutive days</div>
          </div>
          
          <div className={styles.statsCard}>
            <div className={styles.statsCardHeader}>Total Time Spent</div>
            <div className={styles.statsCardValue}>{progressData.totalHoursSpent}</div>
            <div className={styles.statsCardSubtext}>hours of learning</div>
          </div>
        </div>
        
        <div className={styles.weeklyActivityContainer}>
          <h3 className={styles.sectionTitle}>Weekly Activity</h3>
          <div className={styles.weeklyActivity}>
            {progressData.weeklyActivity.map(day => (
              <div key={day.day} className={styles.activityDay}>
                <div 
                  className={styles.activityBar} 
                  style={{ 
                    height: `${Math.min(day.hours * 20, 100)}px`,
                    backgroundColor: day.hours > 2 ? '#4caf50' : day.hours > 1 ? '#8bc34a' : '#ffc107'
                  }}
                ></div>
                <div className={styles.activityHours}>{day.hours}h</div>
                <div className={styles.activityDayLabel}>{day.day}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.achievementsContainer}>
          <h3 className={styles.sectionTitle}>Recent Achievements</h3>
          <div className={styles.achievements}>
            {progressData.achievements.slice(0, 4).map(achievement => (
              <div key={achievement.id} className={styles.achievementCard}>
                <div className={styles.achievementIcon}>{achievement.icon}</div>
                <div className={styles.achievementInfo}>
                  <h4 className={styles.achievementTitle}>{achievement.title}</h4>
                  <p className={styles.achievementDesc}>{achievement.description}</p>
                  <div className={styles.achievementDate}>{formatDate(achievement.date)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.coursesProgressContainer}>
          <h3 className={styles.sectionTitle}>Course Progress</h3>
          <div className={styles.coursesProgress}>
            {progressData.courses.map(course => (
              <div 
                key={course.id} 
                className={styles.courseProgressCard}
                onClick={() => handleCourseSelect(course)}
              >
                <div className={styles.courseInfo}>
                  <h4 className={styles.courseName}>{course.name}</h4>
                  <div className={styles.courseCode}>{course.code}</div>
                </div>
                
                <div className={styles.courseProgressBar}>
                  <div 
                    className={styles.progressBarFill}
                    style={{ 
                      width: `${course.completion}%`,
                      backgroundColor: getCompletionColor(course.completion)
                    }}
                  ></div>
                </div>
                
                <div className={styles.courseStats}>
                  <div className={styles.completionPercent}>{course.completion}% Complete</div>
                  {course.score > 0 && (
                    <div className={styles.courseScore}>
                      Score: <span>{course.score}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render the course detail view
  const renderCourseDetail = () => {
    const course = selectedCourse;
    
    return (
      <div className={styles.courseDetail}>
        <button 
          className={styles.backButton}
          onClick={closeCourseDetail}
        >
          ← Back to Progress
        </button>
        
        <div className={styles.courseDetailHeader}>
          <div className={styles.courseDetailInfo}>
            <h2 className={styles.courseDetailName}>{course.name}</h2>
            <div className={styles.courseDetailCode}>{course.code}</div>
          </div>
          
          <div className={styles.courseDetailProgress}>
            <div className={styles.circularProgressSmall}>
              <svg width="80" height="80" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12" />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="54" 
                  fill="none" 
                  stroke={getCompletionColor(course.completion)} 
                  strokeWidth="12" 
                  strokeDasharray="339.292"
                  strokeDashoffset={339.292 * (1 - course.completion / 100)}
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className={styles.circularProgressText}>{course.completion}%</div>
            </div>
            <div className={styles.courseScore}>
              <span className={styles.scoreLabel}>Average Score</span>
              <span className={styles.scoreValue}>{course.score}%</span>
            </div>
          </div>
        </div>
        
        <div className={styles.moduleProgressContainer}>
          <h3 className={styles.sectionTitle}>Module Progress</h3>
          
          {course.modules.map(module => (
            <div key={module.id} className={styles.moduleProgressItem}>
              <div className={styles.moduleInfo}>
                <h4 className={styles.moduleName}>{module.name}</h4>
                <div className={styles.moduleStatus}>
                  {module.completion === 100 ? (
                    <span className={styles.completedBadge}>Completed</span>
                  ) : module.completion > 0 ? (
                    <span className={styles.inProgressBadge}>In Progress</span>
                  ) : (
                    <span className={styles.notStartedBadge}>Not Started</span>
                  )}
                </div>
              </div>
              
              <div className={styles.moduleProgressBar}>
                <div 
                  className={styles.progressBarFill}
                  style={{ 
                    width: `${module.completion}%`,
                    backgroundColor: getCompletionColor(module.completion)
                  }}
                ></div>
              </div>
              
              <div className={styles.moduleStats}>
                <div className={styles.completionPercent}>{module.completion}%</div>
                {module.score > 0 && (
                  <div className={styles.moduleScore}>
                    Score: <span>{module.score}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.suggestionsContainer}>
          <h3 className={styles.sectionTitle}>Suggestions for Improvement</h3>
          <div className={styles.suggestionsList}>
            <div className={styles.suggestionItem}>
              <div className={styles.suggestionIcon}>📚</div>
              <div className={styles.suggestionText}>
                <h4>Complete remaining modules</h4>
                <p>You're making good progress. Focus on completing the remaining modules to improve your overall course score.</p>
              </div>
            </div>
            <div className={styles.suggestionItem}>
              <div className={styles.suggestionIcon}>⏱️</div>
              <div className={styles.suggestionText}>
                <h4>Dedicate more study time</h4>
                <p>Consider allocating more time to this course to improve your understanding and completion rate.</p>
              </div>
            </div>
            <div className={styles.suggestionItem}>
              <div className={styles.suggestionIcon}>🏆</div>
              <div className={styles.suggestionText}>
                <h4>Review low-scoring modules</h4>
                <p>Review content from modules where your score was lower to strengthen your understanding.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressHeader}>
        <h1 className={styles.progressTitle}>Learning Analytics</h1>
        <p className={styles.progressSubtitle}>Track your learning progress, achievements, and areas for improvement</p>
      </div>
      
      {selectedCourse ? renderCourseDetail() : renderProgressOverview()}
    </div>
  );
};

export default Progress;