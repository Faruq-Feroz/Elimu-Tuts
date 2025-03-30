import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ChildProgress.module.css';
import { 
  FiBarChart2, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiTarget, 
  FiStar, 
  FiAward,
  FiAlertCircle,
  FiUserCheck,
  FiCalendar,
  FiClock,
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const ChildProgress = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const childIdFromUrl = searchParams.get('child');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [allChildren, setAllChildren] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('term');
  const [termData, setTermData] = useState(null);
  
  // Mock children data
  const mockChildren = [
    { 
      id: '1', 
      name: 'Wanjiku Kamau', 
      grade: '3rd Grade',
      age: 8,
      avatar: 'https://ui-avatars.com/api/?name=Wanjiku+Kamau&background=random&color=fff',
      teacher: 'Mrs. Mutua',
      overallProgress: 78,
      attendance: {
        present: 45,
        absent: 3,
        late: 2,
        total: 50
      },
      subjects: [
        { 
          id: 'math',
          name: 'Mathematics', 
          progress: 82, 
          grade: 'A', 
          teacher: 'Mr. Omondi',
          strengths: ['Algebra', 'Problem-solving'],
          areasForImprovement: ['Geometry', 'Word problems'],
          recentScores: [85, 78, 90, 82, 88],
          trend: 'up',
          chartData: { 
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            data: [75, 70, 82, 79, 85, 82]
          }
        },
        { 
          id: 'eng',
          name: 'English', 
          progress: 75, 
          grade: 'B+', 
          teacher: 'Mrs. Mutua',
          strengths: ['Reading comprehension', 'Vocabulary'],
          areasForImprovement: ['Writing essays', 'Grammar'],
          recentScores: [76, 82, 75, 72, 79],
          trend: 'steady',
          chartData: { 
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            data: [68, 75, 72, 77, 80, 75]
          }
        },
        { 
          id: 'sci',
          name: 'Science', 
          progress: 88, 
          grade: 'A-', 
          teacher: 'Mr. Kimani',
          strengths: ['Scientific concepts', 'Lab work'],
          areasForImprovement: ['Detailed explanations', 'Test preparation'],
          recentScores: [85, 92, 88, 86, 90],
          trend: 'up',
          chartData: { 
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            data: [80, 84, 82, 88, 86, 90]
          }
        },
        { 
          id: 'sst',
          name: 'Social Studies', 
          progress: 70, 
          grade: 'B', 
          teacher: 'Ms. Akinyi',
          strengths: ['Historical knowledge', 'Group discussions'],
          areasForImprovement: ['Geography', 'Current events'],
          recentScores: [72, 68, 75, 70, 72],
          trend: 'down',
          chartData: { 
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            data: [75, 78, 72, 70, 68, 70]
          }
        }
      ],
      evaluations: [
        {
          id: '1',
          date: 'February 15, 2023',
          type: 'Mid-term Assessment',
          teacher: 'Mr. Omondi (Mathematics)',
          comments: 'Wanjiku continues to show strong aptitude in mathematics and science. She participates actively in class discussions and demonstrates good critical thinking skills. She should focus on improving her writing skills in English and work on time management for assignments.',
          overallRating: 4, // out of 5
        },
        {
          id: '2',
          date: 'December 10, 2022',
          type: 'End of Term Evaluation',
          teacher: 'Ms. Wangari (Principal)',
          comments: 'Wanjiku has had a good term overall. Her performance in science has been exceptional, and her mathematics continues to be strong. She needs to put more effort into social studies and improve her attendance record. Wanjiku works well with her peers and demonstrates leadership qualities.',
          overallRating: 3.5, // out of 5
        }
      ],
      recentAssignments: [
        {
          id: 'a1',
          title: 'Mathematics Quiz - Algebraic Equations',
          subject: 'Mathematics',
          dueDate: '2023-03-05',
          status: 'completed',
          score: '90%',
          feedback: 'Excellent work understanding complex equations.'
        },
        {
          id: 'a2',
          title: 'Science Lab Report - Plant Biology',
          subject: 'Science',
          dueDate: '2023-03-10',
          status: 'completed',
          score: '85%',
          feedback: 'Good observations, could include more detailed analysis.'
        },
        {
          id: 'a3',
          title: 'English Essay - Character Analysis',
          subject: 'English',
          dueDate: '2023-03-15',
          status: 'pending',
          score: null,
          feedback: null
        }
      ],
      termReports: [
        {
          term: 'Term 1 2022-2023',
          overallGrade: 'A-',
          position: '5th out of 35',
          teacherComments: 'Wanjiku has had an excellent start to the academic year. She shows great potential in STEM subjects.',
          attendance: '95%',
          subjects: [
            { name: 'Mathematics', grade: 'A', remarks: 'Excellent' },
            { name: 'English', grade: 'B+', remarks: 'Good' },
            { name: 'Science', grade: 'A', remarks: 'Excellent' },
            { name: 'Social Studies', grade: 'B', remarks: 'Satisfactory' },
            { name: 'Physical Education', grade: 'A-', remarks: 'Very Good' },
            { name: 'Art', grade: 'B+', remarks: 'Good' }
          ]
        },
        {
          term: 'Term 3 2021-2022',
          overallGrade: 'B+',
          position: '8th out of 35',
          teacherComments: 'Wanjiku has shown consistent improvement through the year. Her participation in class has increased significantly.',
          attendance: '92%',
          subjects: [
            { name: 'Mathematics', grade: 'A-', remarks: 'Very Good' },
            { name: 'English', grade: 'B', remarks: 'Good' },
            { name: 'Science', grade: 'A-', remarks: 'Very Good' },
            { name: 'Social Studies', grade: 'B-', remarks: 'Satisfactory' },
            { name: 'Physical Education', grade: 'B+', remarks: 'Good' },
            { name: 'Art', grade: 'A-', remarks: 'Very Good' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Njoroge Kariuki',
      grade: '1st Grade',
      age: 6,
      avatar: 'https://ui-avatars.com/api/?name=Njoroge+Kariuki&background=random&color=fff',
      teacher: 'Mrs. Wanjiru',
      overallProgress: 65,
      attendance: {
        present: 47,
        absent: 2,
        late: 1,
        total: 50
      },
      subjects: [
        { 
          id: 'math',
          name: 'Mathematics', 
          progress: 60, 
          grade: 'B+', 
          teacher: 'Mrs. Wanjiru',
          strengths: ['Basic arithmetic', 'Patterns'],
          areasForImprovement: ['Fractions', 'Problem-solving'],
          recentScores: [65, 60, 70, 58, 62],
          trend: 'steady',
          chartData: { 
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            data: [58, 62, 60, 65, 63, 61]
          }
        },
        { 
          id: 'eng',
          name: 'English', 
          progress: 80, 
          grade: 'A', 
          teacher: 'Mr. Otieno',
          strengths: ['Writing stories', 'Vocabulary', 'Reading'],
          areasForImprovement: ['Grammar', 'Punctuation'],
          recentScores: [82, 85, 78, 84, 80],
          trend: 'up',
          chartData: { 
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            data: [75, 78, 80, 82, 85, 80]
          }
        },
        { 
          id: 'art',
          name: 'Art', 
          progress: 90, 
          grade: 'A+', 
          teacher: 'Ms. Akinyi',
          strengths: ['Creativity', 'Color use', 'Imagination'],
          areasForImprovement: ['Technical skills', 'Following instructions'],
          recentScores: [90, 85, 92, 88, 94],
          trend: 'up',
          chartData: { 
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            data: [85, 88, 90, 87, 92, 94]
          }
        }
      ],
      evaluations: [
        {
          id: '1',
          date: 'February 10, 2023',
          type: 'Mid-term Assessment',
          teacher: 'Ms. Wanjiru (Homeroom)',
          comments: 'Njoroge excels in creative writing and reading. He has an excellent vocabulary for his age. He needs additional support in mathematics to build confidence and mastery of fundamental concepts.',
          overallRating: 3.5,
        }
      ],
      recentAssignments: [
        {
          id: 'a1',
          title: 'English Book Report',
          subject: 'English',
          dueDate: '2023-03-02',
          status: 'completed',
          score: '95%',
          feedback: 'Excellent analysis and creative presentation!'
        },
        {
          id: 'a2',
          title: 'Mathematics Homework - Fractions',
          subject: 'Mathematics',
          dueDate: '2023-03-08',
          status: 'completed',
          score: '68%',
          feedback: 'Njoroge needs more practice with equivalent fractions.'
        }
      ],
      termReports: [
        {
          term: 'Term 1 2022-2023',
          overallGrade: 'B+',
          position: '10th out of 42',
          teacherComments: 'Njoroge is a diligent student who excels in language arts. He needs additional support in mathematics.',
          attendance: '96%',
          subjects: [
            { name: 'Mathematics', grade: 'C+', remarks: 'Needs improvement' },
            { name: 'English', grade: 'A', remarks: 'Excellent' },
            { name: 'Science', grade: 'B', remarks: 'Good' },
            { name: 'Social Studies', grade: 'B+', remarks: 'Very good' },
            { name: 'Physical Education', grade: 'B+', remarks: 'Very good' },
            { name: 'Art', grade: 'A', remarks: 'Excellent' }
          ]
        }
      ]
    }
  ];

  // Initialize data on component mount
  useEffect(() => {
    setLoading(true);
    try {
      // Set all children data
      setAllChildren(mockChildren);
      
      // Determine which child to show
      let childToShow;
      
      if (childIdFromUrl) {
        // If a specific child is requested via URL, show that child
        childToShow = mockChildren.find(child => child.id === childIdFromUrl);
      } else if (mockChildren.length > 0) {
        // Otherwise show the first child
        childToShow = mockChildren[0];
      }
      
      if (childToShow) {
        setSelectedChild(childToShow);
        
        // Set initial selected subject
        if (childToShow.subjects && childToShow.subjects.length > 0) {
          setSelectedSubject(childToShow.subjects[0]);
        }
        
        // Set initial term data
        if (childToShow.termReports && childToShow.termReports.length > 0) {
          setTermData(childToShow.termReports[0]);
        }
      } else {
        setError('No child data found');
      }
    } catch (err) {
      console.error('Error initializing child progress data:', err);
      setError('Failed to load child progress data');
    } finally {
      setLoading(false);
    }
  }, [childIdFromUrl]);

  // Handle child selection change
  const handleChildChange = (childId) => {
    const child = allChildren.find(c => c.id === childId);
    setSelectedChild(child);
    
    // Reset selected subject when changing child
    if (child && child.subjects && child.subjects.length > 0) {
      setSelectedSubject(child.subjects[0]);
    } else {
      setSelectedSubject(null);
    }
    
    // Reset term data when changing child
    if (child && child.termReports && child.termReports.length > 0) {
      setTermData(child.termReports[0]);
    } else {
      setTermData(null);
    }
  };

  // Handle subject selection
  const handleSubjectChange = (subjectId) => {
    const subject = selectedChild.subjects.find(sub => sub.id === subjectId);
    setSelectedSubject(subject);
  };

  // Handle timeframe change
  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
    // In a real app, this would fetch different data based on timeframe
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading progress data...</p>
      </div>
    );
  }

  // Error state
  if (error || !selectedChild) {
    return (
      <div className={styles.errorContainer}>
        <FiAlertCircle size={48} />
        <h2>Oops! Something went wrong</h2>
        <p>{error || 'Child data not found'}</p>
      </div>
    );
  }

  return (
    <div className={styles.progressContainer}>
      {/* Children selector */}
      {allChildren.length > 1 && (
        <div className={styles.childSelector}>
          <h3>Select Child:</h3>
          <div className={styles.childrenTabs}>
            {allChildren.map(child => (
              <button
                key={child.id}
                className={selectedChild?.id === child.id ? styles.activeChild : ''}
                onClick={() => handleChildChange(child.id)}
              >
                <img 
                  src={child.avatar} 
                  alt={child.name} 
                  className={styles.childAvatar}
                />
                <span>{child.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Student info card */}
      <div className={styles.studentCard}>
        <div className={styles.studentAvatar}>
          <img src={selectedChild.avatar} alt={selectedChild.name} />
        </div>
        <div className={styles.studentInfo}>
          <h2>{selectedChild.name}</h2>
          <div className={styles.studentMeta}>
            <span><FiUserCheck /> {selectedChild.grade}</span>
            <span><FiBookOpen /> Platform: Elimu-Tuts</span>
          </div>
        </div>
        <div className={styles.overallProgress}>
          <div className={styles.progressCircle}>
            <svg viewBox="0 0 36 36" className={styles.progressCircleSvg}>
              <path
                className={styles.progressCircleBg}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={styles.progressCircleFill}
                strokeDasharray={`${selectedChild.overallProgress}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className={styles.progressCircleText}>
                {selectedChild.overallProgress}%
              </text>
            </svg>
          </div>
          <p>Overall Progress</p>
        </div>
        <div className={styles.attendanceStats}>
          <h3>Course Engagement</h3>
          <div className={styles.attendanceBars}>
            <div className={styles.attendanceBar}>
              <span className={styles.attendanceLabel}>Completed</span>
              <div className={styles.attendanceBarContainer}>
                <div 
                  className={`${styles.attendanceBarFill} ${styles.presentBar}`} 
                  style={{ width: `${selectedChild.attendance.present}%` }}
                ></div>
              </div>
              <span className={styles.attendanceValue}>{selectedChild.attendance.present}%</span>
            </div>
            <div className={styles.attendanceBar}>
              <span className={styles.attendanceLabel}>Missed</span>
              <div className={styles.attendanceBarContainer}>
                <div 
                  className={`${styles.attendanceBarFill} ${styles.absentBar}`} 
                  style={{ width: `${selectedChild.attendance.absent}%` }}
                ></div>
              </div>
              <span className={styles.attendanceValue}>{selectedChild.attendance.absent}%</span>
            </div>
            <div className={styles.attendanceBar}>
              <span className={styles.attendanceLabel}>Incomplete</span>
              <div className={styles.attendanceBarContainer}>
                <div 
                  className={`${styles.attendanceBarFill} ${styles.lateBar}`} 
                  style={{ width: `${selectedChild.attendance.late}%` }}
                ></div>
              </div>
              <span className={styles.attendanceValue}>{selectedChild.attendance.late}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Time period selector */}
      <div className={styles.timeframeSelector}>
        <h3>View Progress For:</h3>
        <div className={styles.timeframeButtons}>
          <button 
            className={selectedTimeframe === 'term' ? styles.activeTimeframe : ''}
            onClick={() => handleTimeframeChange('term')}
          >
            Current Module
          </button>
          <button 
            className={selectedTimeframe === 'semester' ? styles.activeTimeframe : ''}
            onClick={() => handleTimeframeChange('semester')}
          >
            Course
          </button>
          <button 
            className={selectedTimeframe === 'year' ? styles.activeTimeframe : ''}
            onClick={() => handleTimeframeChange('year')}
          >
            Full Program
          </button>
        </div>
      </div>
      
      {/* Subjects progress */}
      <div className={styles.subjectsSection}>
        <h2>Learning Progress by Subject</h2>
        
        <div className={styles.subjectTabs}>
          {selectedChild.subjects.map(subject => (
            <button
              key={subject.id}
              className={selectedSubject?.id === subject.id ? styles.activeSubject : ''}
              onClick={() => handleSubjectChange(subject.id)}
            >
              {subject.name}
              <span className={
                subject.trend === 'up' ? styles.trendUp : 
                subject.trend === 'down' ? styles.trendDown : 
                styles.trendSteady
              }>
                {subject.trend === 'up' && <FiTrendingUp />}
                {subject.trend === 'down' && <FiTrendingDown />}
                {subject.trend === 'steady' && <FiTarget />}
              </span>
            </button>
          ))}
        </div>
        
        {selectedSubject && (
          <div className={styles.subjectDetail}>
            <div className={styles.subjectHeader}>
              <div>
                <h3>{selectedSubject.name}</h3>
                <p>Instructor: {selectedSubject.teacher}</p>
              </div>
              <div className={styles.subjectGrade}>
                <span className={styles.gradeLabel}>Current Level:</span>
                <span className={styles.gradeValue}>{selectedSubject.grade}</span>
              </div>
            </div>
            
            <div className={styles.subjectProgress}>
              <h4>Progress: {selectedSubject.progress}%</h4>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${selectedSubject.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className={styles.subjectStats}>
              <div className={styles.strengthsWeaknesses}>
                <div className={styles.strengths}>
                  <h4><FiStar /> Strengths</h4>
                  <ul>
                    {selectedSubject.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.weaknesses}>
                  <h4><FiTarget /> Areas for Growth</h4>
                  <ul>
                    {selectedSubject.areasForImprovement.map((area, index) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className={styles.recentScores}>
                <h4>Recent Scores</h4>
                <div className={styles.scoresList}>
                  {selectedSubject.recentScores.map((score, index) => (
                    <div key={index} className={styles.scoreItem}>
                      <div className={styles.scoreBar}>
                        <div 
                          className={styles.scoreBarFill} 
                          style={{ height: `${score}%` }}
                        ></div>
                      </div>
                      <span className={styles.scoreValue}>{score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={styles.chartContainer}>
              <h4><FiBarChart2 /> Performance Trend</h4>
              <div className={styles.chart}>
                <div className={styles.chartBars}>
                  {selectedSubject.chartData.data.map((value, index) => (
                    <div key={index} className={styles.chartBarContainer}>
                      <div className={styles.chartBar}>
                        <div 
                          className={styles.chartBarFill} 
                          style={{ height: `${value}%` }}
                        ></div>
                      </div>
                      <span className={styles.chartLabel}>
                        {selectedSubject.chartData.labels[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Teacher evaluations */}
      <div className={styles.evaluationsSection}>
        <h2><FiAward /> Instructor Feedback</h2>
        
        <div className={styles.evaluationsList}>
          {selectedChild.evaluations.map(evaluation => (
            <div key={evaluation.id} className={styles.evaluationCard}>
              <div className={styles.evaluationHeader}>
                <div className={styles.evaluationMeta}>
                  <h3>{evaluation.type}</h3>
                  <div className={styles.evaluationInfo}>
                    <span><FiCalendar /> {evaluation.date}</span>
                    <span><FiUserCheck /> {evaluation.teacher}</span>
                  </div>
                </div>
                <div className={styles.ratingContainer}>
                  <div className={styles.starRating}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span 
                        key={star} 
                        className={star <= Math.round(evaluation.overallRating) ? styles.filledStar : styles.emptyStar}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className={styles.ratingValue}>{evaluation.overallRating}/5</span>
                </div>
              </div>
              
              <div className={styles.evaluationComments}>
                <p>{evaluation.comments}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent assignments */}
      <div className={styles.assignmentsSection}>
        <h2><FiBookOpen /> Recent Activities</h2>
        
        <div className={styles.assignmentsList}>
          {selectedChild.recentAssignments.map(assignment => (
            <div key={assignment.id} className={styles.assignmentCard}>
              <div className={styles.assignmentHeader}>
                <h3>{assignment.title}</h3>
                <div className={
                  assignment.status === 'completed' ? styles.statusCompleted : 
                  assignment.status === 'pending' ? styles.statusPending : 
                  styles.statusLate
                }>
                  {assignment.status}
                </div>
              </div>
              
              <div className={styles.assignmentDetails}>
                <div className={styles.assignmentInfo}>
                  <span><FiBookOpen /> {assignment.subject}</span>
                  <span><FiCalendar /> Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                </div>
                
                {assignment.status === 'completed' && (
                  <div className={styles.assignmentScore}>
                    <div className={styles.scoreLabel}>Score</div>
                    <div className={styles.scoreValue}>{assignment.score}</div>
                  </div>
                )}
              </div>
              
              {assignment.feedback && (
                <div className={styles.assignmentFeedback}>
                  <h4>Feedback:</h4>
                  <p>{assignment.feedback}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Term report */}
      {termData && (
        <div className={styles.termReportSection}>
          <h2><FiClock /> Progress Report: {termData.term}</h2>
          
          <div className={styles.termReportCard}>
            <div className={styles.termReportHeader}>
              <div className={styles.termReportOverall}>
                <div className={styles.termReportGrade}>
                  <h3>Overall Level</h3>
                  <div className={styles.gradeCircle}>{termData.overallGrade}</div>
                </div>
                <div className={styles.termReportPosition}>
                  <h3>Ranking</h3>
                  <p>{termData.position}</p>
                </div>
                <div className={styles.termReportAttendance}>
                  <h3>Completion</h3>
                  <p>{termData.attendance}</p>
                </div>
              </div>
              
              <div className={styles.termReportComments}>
                <h3>Instructor's Comments</h3>
                <p>{termData.teacherComments}</p>
              </div>
            </div>
            
            <div className={styles.termReportSubjects}>
              <h3>Subject Performance</h3>
              <div className={styles.termReportSubjectsList}>
                {termData.subjects.map((subject, index) => (
                  <div key={index} className={styles.termReportSubjectItem}>
                    <div className={styles.subjectName}>{subject.name}</div>
                    <div className={styles.subjectGrade}>{subject.grade}</div>
                    <div className={styles.subjectRemarks}>{subject.remarks}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildProgress;