import React, { useState } from 'react';
import styles from './Grades.module.css';

// Sample data for grades
const SAMPLE_COURSES = [
  {
    id: 'course-001',
    name: 'Mathematics',
    instructor: 'Dr. Sarah Johnson',
    code: 'MATH101',
    term: 'Fall 2023',
    grades: [
      { id: 'grade-001', title: 'Quiz 1', score: 85, totalPoints: 100, weight: 10, date: '2023-09-05' },
      { id: 'grade-002', title: 'Midterm Exam', score: 78, totalPoints: 100, weight: 25, date: '2023-10-15' },
      { id: 'grade-003', title: 'Assignment 1', score: 92, totalPoints: 100, weight: 15, date: '2023-09-20' },
      { id: 'grade-004', title: 'Assignment 2', score: 88, totalPoints: 100, weight: 15, date: '2023-11-05' },
      { id: 'grade-005', title: 'Final Project', score: 91, totalPoints: 100, weight: 35, date: '2023-12-01' }
    ]
  },
  {
    id: 'course-002',
    name: 'Introduction to Physics',
    instructor: 'Prof. James Wilson',
    code: 'PHYS101',
    term: 'Fall 2023',
    grades: [
      { id: 'grade-006', title: 'Lab 1', score: 95, totalPoints: 100, weight: 10, date: '2023-09-12' },
      { id: 'grade-007', title: 'Lab 2', score: 88, totalPoints: 100, weight: 10, date: '2023-10-03' },
      { id: 'grade-008', title: 'Midterm', score: 76, totalPoints: 100, weight: 30, date: '2023-10-20' },
      { id: 'grade-009', title: 'Research Paper', score: 82, totalPoints: 100, weight: 20, date: '2023-11-15' },
      { id: 'grade-010', title: 'Final Exam', score: 79, totalPoints: 100, weight: 30, date: '2023-12-10' }
    ]
  },
  {
    id: 'course-003',
    name: 'English Literature',
    instructor: 'Dr. Emily Parker',
    code: 'ENGL202',
    term: 'Fall 2023',
    grades: [
      { id: 'grade-011', title: 'Essay 1', score: 88, totalPoints: 100, weight: 20, date: '2023-09-18' },
      { id: 'grade-012', title: 'Presentation', score: 92, totalPoints: 100, weight: 15, date: '2023-10-08' },
      { id: 'grade-013', title: 'Midterm', score: 85, totalPoints: 100, weight: 25, date: '2023-10-25' },
      { id: 'grade-014', title: 'Essay 2', score: 90, totalPoints: 100, weight: 20, date: '2023-11-15' },
      { id: 'grade-015', title: 'Final Exam', score: 87, totalPoints: 100, weight: 20, date: '2023-12-05' }
    ]
  },
  {
    id: 'course-004',
    name: 'Introduction to Computer Science',
    instructor: 'Prof. Michael Chen',
    code: 'CS101',
    term: 'Fall 2023',
    grades: [
      { id: 'grade-016', title: 'Programming Assignment 1', score: 95, totalPoints: 100, weight: 15, date: '2023-09-10' },
      { id: 'grade-017', title: 'Quiz 1', score: 92, totalPoints: 100, weight: 10, date: '2023-09-25' },
      { id: 'grade-018', title: 'Programming Assignment 2', score: 88, totalPoints: 100, weight: 15, date: '2023-10-15' },
      { id: 'grade-019', title: 'Midterm Exam', score: 90, totalPoints: 100, weight: 25, date: '2023-10-30' },
      { id: 'grade-020', title: 'Final Project', score: 94, totalPoints: 100, weight: 35, date: '2023-11-28' }
    ]
  }
];

const Grades = () => {
  const [selectedTerm, setSelectedTerm] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showGradeDistribution] = useState(true);
  
  // Get unique terms from courses
  const terms = ['All', ...new Set(SAMPLE_COURSES.map(course => course.term))];
  
  // Filter courses based on selected term and search query
  const filteredCourses = SAMPLE_COURSES.filter(course => {
    // Filter by term
    if (selectedTerm !== 'All' && course.term !== selectedTerm) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && 
        !course.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !course.code.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !course.instructor.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Calculate overall GPA and grade statistics
  const calculateOverallStats = () => {
    if (filteredCourses.length === 0) return { gpa: 0, totalCredits: 0, letterGrades: {} };
    
    let totalPoints = 0;
    let totalWeightedScore = 0;
    const letterGrades = { A: 0, B: 0, C: 0, D: 0, F: 0 };
    
    filteredCourses.forEach(course => {
      // Calculate weighted score for the course
      const courseScore = calculateCourseScore(course);
      
      // Add to total weighted score (assuming all courses have equal credit)
      totalWeightedScore += courseScore;
      totalPoints += 1; // Assuming 1 credit per course for simplicity
      
      // Increment letter grade count
      if (courseScore >= 90) letterGrades.A++;
      else if (courseScore >= 80) letterGrades.B++;
      else if (courseScore >= 70) letterGrades.C++;
      else if (courseScore >= 60) letterGrades.D++;
      else letterGrades.F++;
    });
    
    // Calculate GPA (on a 4.0 scale)
    const gpa = totalPoints > 0 ? Math.min(4.0, (totalWeightedScore / totalPoints) * 0.04) : 0;
    
    return {
      gpa: gpa.toFixed(2),
      totalCredits: totalPoints,
      letterGrades
    };
  };
  
  // Calculate total score for a course based on weighted grades
  const calculateCourseScore = (course) => {
    if (!course || !course.grades || course.grades.length === 0) return 0;
    
    let totalWeight = 0;
    let weightedSum = 0;
    
    course.grades.forEach(grade => {
      const percentage = (grade.score / grade.totalPoints) * 100;
      weightedSum += percentage * (grade.weight / 100);
      totalWeight += grade.weight / 100;
    });
    
    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  };
  
  // Convert numerical score to letter grade
  const getLetterGrade = (score) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
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
  
  // Generate bar chart styles for course grades
  const getBarWidth = (score) => {
    return `${score}%`;
  };
  
  // Get color based on grade
  const getGradeColor = (score) => {
    if (score >= 90) return '#4caf50'; // A - Green
    if (score >= 80) return '#8bc34a'; // B - Light Green
    if (score >= 70) return '#ffc107'; // C - Yellow
    if (score >= 60) return '#ff9800'; // D - Orange
    return '#f44336'; // F - Red
  };
  
  // Calculate stats for specific course
  const getCourseStats = (course) => {
    if (!course || !course.grades || course.grades.length === 0) {
      return { highest: 0, lowest: 0, average: 0 };
    }
    
    const scores = course.grades.map(grade => (grade.score / grade.totalPoints) * 100);
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const average = scores.reduce((acc, score) => acc + score, 0) / scores.length;
    
    return { highest, lowest, average };
  };
  
  // Render the grades overview
  const renderGradesOverview = () => {
    const stats = calculateOverallStats();
    
    // Generate data for doughnut chart
    const { letterGrades } = stats;
    const totalCourses = Object.values(letterGrades).reduce((sum, count) => sum + count, 0);
    
    // Simple custom doughnut chart with percentage segments
    const doughnutSegments = [
      { grade: 'A', color: '#4caf50', percentage: (letterGrades.A / totalCourses) * 100 || 0 },
      { grade: 'B', color: '#8bc34a', percentage: (letterGrades.B / totalCourses) * 100 || 0 },
      { grade: 'C', color: '#ffc107', percentage: (letterGrades.C / totalCourses) * 100 || 0 },
      { grade: 'D', color: '#ff9800', percentage: (letterGrades.D / totalCourses) * 100 || 0 },
      { grade: 'F', color: '#f44336', percentage: (letterGrades.F / totalCourses) * 100 || 0 }
    ];
    
    return (
      <div className={styles.gradesOverview}>
        <div className={styles.overviewHeader}>
          <h2>Grades Overview</h2>
          <div className={styles.termSelector}>
            <label>Term:</label>
            <select 
              value={selectedTerm} 
              onChange={(e) => setSelectedTerm(e.target.value)}
              className={styles.termSelect}
            >
              {terms.map(term => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className={styles.statsCards}>
          <div className={styles.statsCard}>
            <div className={styles.statsCardHeader}>GPA</div>
            <div className={styles.statsCardValue}>{stats.gpa}</div>
            <div className={styles.statsCardSubtext}>out of 4.0</div>
          </div>
          
          <div className={styles.statsCard}>
            <div className={styles.statsCardHeader}>Courses</div>
            <div className={styles.statsCardValue}>{filteredCourses.length}</div>
            <div className={styles.statsCardSubtext}>{`${stats.totalCredits} credit${stats.totalCredits !== 1 ? 's' : ''}`}</div>
          </div>
          
          {showGradeDistribution && (
            <div className={`${styles.statsCard} ${styles.distributionCard}`}>
              <div className={styles.statsCardHeader}>Grade Distribution</div>
              <div className={styles.gradeDistribution}>
                <div className={styles.doughnutChart}>
                  {doughnutSegments.filter(segment => segment.percentage > 0).map((segment, index) => (
                    <div 
                      key={segment.grade}
                      className={styles.doughnutSegment}
                      style={{
                        backgroundColor: segment.color,
                        transform: `rotate(${index === 0 ? 0 : doughnutSegments
                          .slice(0, index)
                          .reduce((acc, curr) => acc + curr.percentage, 0) * 3.6}deg)`,
                        clip: index === 0 ? 'auto' : 'rect(0px, 100px, 100px, 50px)'
                      }}
                      data-percentage={Math.round(segment.percentage)}
                    />
                  ))}
                  <div className={styles.doughnutCenter}></div>
                </div>
                <div className={styles.gradeLegend}>
                  {doughnutSegments.map(segment => (
                    <div key={segment.grade} className={styles.legendItem}>
                      <span 
                        className={styles.legendColor} 
                        style={{ backgroundColor: segment.color }}
                      ></span>
                      <span className={styles.legendGrade}>{segment.grade}</span>
                      <span className={styles.legendCount}>{`${Math.round(segment.percentage)}%`}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.courseSearch}>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.coursesList}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => {
              const courseScore = calculateCourseScore(course);
              const letterGrade = getLetterGrade(courseScore);
              
              return (
                <div 
                  key={course.id} 
                  className={styles.courseCard}
                  onClick={() => handleCourseSelect(course)}
                >
                  <div className={styles.courseInfo}>
                    <h3 className={styles.courseName}>{course.name}</h3>
                    <div className={styles.courseSubInfo}>
                      <span className={styles.courseCode}>{course.code}</span>
                      <span className={styles.courseInstructor}>{course.instructor}</span>
                    </div>
                  </div>
                  
                  <div className={styles.courseGrade}>
                    <div 
                      className={styles.gradeCircle}
                      style={{ backgroundColor: getGradeColor(courseScore) }}
                    >
                      {letterGrade}
                    </div>
                    <div className={styles.scoreText}>{Math.round(courseScore)}%</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.noCourses}>
              <div className={styles.noCoursesIcon}>📚</div>
              <h3>No courses found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Render the course detail view
  const renderCourseDetail = () => {
    const course = selectedCourse;
    const courseScore = calculateCourseScore(course);
    const letterGrade = getLetterGrade(courseScore);
    const courseStats = getCourseStats(course);
    
    return (
      <div className={styles.courseDetail}>
        <button 
          className={styles.backButton}
          onClick={closeCourseDetail}
        >
          ← Back to Grades
        </button>
        
        <div className={styles.courseDetailHeader}>
          <div className={styles.courseDetailInfo}>
            <h2 className={styles.courseDetailName}>{course.name}</h2>
            <div className={styles.courseDetailMeta}>
              <span className={styles.courseDetailCode}>{course.code}</span>
              <span className={styles.courseDetailTerm}>{course.term}</span>
              <span className={styles.courseDetailInstructor}>{course.instructor}</span>
            </div>
          </div>
          
          <div className={styles.courseDetailGrade}>
            <div 
              className={styles.gradeCircleLarge}
              style={{ backgroundColor: getGradeColor(courseScore) }}
            >
              {letterGrade}
            </div>
            <div className={styles.scoreTextLarge}>{Math.round(courseScore)}%</div>
          </div>
        </div>
        
        <div className={styles.gradeStats}>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Highest</div>
            <div className={styles.statValue}>{Math.round(courseStats.highest)}%</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Average</div>
            <div className={styles.statValue}>{Math.round(courseStats.average)}%</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Lowest</div>
            <div className={styles.statValue}>{Math.round(courseStats.lowest)}%</div>
          </div>
        </div>
        
        <div className={styles.gradeAssignments}>
          <h3 className={styles.sectionTitle}>Assignments & Exams</h3>
          
          {course.grades.map(grade => {
            const scorePercentage = (grade.score / grade.totalPoints) * 100;
            
            return (
              <div key={grade.id} className={styles.gradeItem}>
                <div className={styles.gradeItemHeader}>
                  <div className={styles.gradeItemTitle}>
                    <h4>{grade.title}</h4>
                    <span className={styles.gradeItemDate}>{formatDate(grade.date)}</span>
                  </div>
                  <div className={styles.gradeItemScore}>
                    <span className={styles.scoreValue}>{grade.score}/{grade.totalPoints}</span>
                    <span className={styles.scorePercentage}>{Math.round(scorePercentage)}%</span>
                  </div>
                </div>
                
                <div className={styles.gradeBar}>
                  <div 
                    className={styles.gradeBarFill}
                    style={{ 
                      width: getBarWidth(scorePercentage),
                      backgroundColor: getGradeColor(scorePercentage)
                    }}
                  ></div>
                </div>
                
                <div className={styles.gradeItemFooter}>
                  <span className={styles.gradeWeight}>Weight: {grade.weight}%</span>
                  <span 
                    className={styles.gradeLetterSmall}
                    style={{ backgroundColor: getGradeColor(scorePercentage) }}
                  >
                    {getLetterGrade(scorePercentage)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className={styles.gradesContainer}>
      <div className={styles.gradesHeader}>
        <h1 className={styles.gradesTitle}>Academic Performance</h1>
        <p className={styles.gradesSubtitle}>Track your grades and academic progress across all your courses</p>
      </div>
      
      {selectedCourse ? renderCourseDetail() : renderGradesOverview()}
    </div>
  );
};

export default Grades; 