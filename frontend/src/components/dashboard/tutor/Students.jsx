import React, { useState, useEffect } from 'react';
import { FaUsers, FaUserGraduate, FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp, 
  FaEnvelope, FaChartLine, FaEye, FaTrashAlt, FaPlus, FaCrown } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import styles from './Students.module.css';

const Students = () => {
  // Add a ref to track viewport width
  const [isMobile, setIsMobile] = useState(false);
  const { currentUser } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [filters, setFilters] = useState({
    course: 'all',
    progress: 'all',
    grade: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [courses, setCourses] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Check if viewport is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch from an API based on the tutor's ID
      const coursesResponse = await axios.get(`${API_URL}/api/courses`);
      let tutorCourses = [];
      
      if (coursesResponse.data) {
        if (Array.isArray(coursesResponse.data)) {
          tutorCourses = coursesResponse.data.filter(course => course.tutor === currentUser?.uid);
        } else if (Array.isArray(coursesResponse.data.data)) {
          tutorCourses = coursesResponse.data.data.filter(course => course.tutor === currentUser?.uid);
        }
        setCourses(tutorCourses);
      }

      // For now, we'll use sample data since we don't have a student API yet
      const sampleStudents = generateSampleStudents(tutorCourses);
      setStudents(sampleStudents);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load student data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Generate sample student data
  const generateSampleStudents = (courses) => {
    // Sample Kenyan names
    const firstNames = ['Wangari', 'Kamau', 'Otieno', 'Akinyi', 'Mwangi', 'Wanjiku', 'Odhiambo', 'Nyambura', 'Kipchoge', 'Njeri', 'Kiptoo', 'Wambui', 'Mbugua', 'Atieno', 'Kariuki', 'Auma', 'Mutua', 'Nyokabi', 'Kiprono', 'Wafula'];
    const lastNames = ['Ngugi', 'Ochieng', 'Wanjiru', 'Kimani', 'Auma', 'Mboya', 'Njoroge', 'Omondi', 'Karanja', 'Adongo', 'Githuku', 'Owino', 'Waiguru', 'Odinga', 'Kamande', 'Wanyama', 'Rotich', 'Onyango', 'Muthoni', 'Kenyatta'];
    
    // Educational levels - Kenyan education system
    const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Class 7', 'Class 8', 'Form 1', 'Form 2', 'Form 3', 'Form 4'];
    
    // Generate 20 sample students
    return Array.from({ length: 20 }, (_, i) => {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      // Create email using Kenyan format - firstname.lastname@example.co.ke
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.co.ke`;
      
      // Assign courses to students
      const enrolledCourses = courses.length > 0 
        ? courses
            .filter(() => Math.random() > 0.5) // Randomly assign courses
            .map(course => {
              const progress = Math.floor(Math.random() * 101); // 0-100%
              const avgScore = Math.floor(Math.random() * 31) + 70; // 70-100
              return {
                ...course,
                progress,
                avgScore,
                lastActive: new Date(Date.now() - Math.floor(Math.random() * 15) * 86400000).toISOString().split('T')[0] // Random date in last 15 days
              };
            })
        : [];
        
      return {
        id: `student-${i + 1}`,
        name: `${firstName} ${lastName}`,
        email: email,
        avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
        grade: grades[Math.floor(Math.random() * grades.length)],
        enrollmentDate: new Date(Date.now() - Math.floor(Math.random() * 180) * 86400000).toISOString().split('T')[0], // Random date in last 180 days
        performance: Math.floor(Math.random() * 31) + 70, // 70-100
        attendance: Math.floor(Math.random() * 21) + 80, // 80-100
        enrolledCourses: enrolledCourses,
        isPremium: Math.random() > 0.7, // 30% chance of being premium
        lastActive: new Date(Date.now() - Math.floor(Math.random() * 10) * 86400000).toISOString().split('T')[0], // Random date in last 10 days
        notes: "Student shows great potential in CBC learning approach."
      };
    });
  };

  // Filter and search students
  const filteredStudents = students.filter(student => {
    // Search term filter
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Course filter
    const matchesCourse = filters.course === 'all' || 
                         student.enrolledCourses.some(course => course._id === filters.course);
    
    // Progress filter
    let matchesProgress = true;
    if (filters.progress !== 'all') {
      const avgProgress = student.enrolledCourses.length > 0 
        ? student.enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / student.enrolledCourses.length 
        : 0;
      
      switch (filters.progress) {
        case 'low':
          matchesProgress = avgProgress < 33;
          break;
        case 'medium':
          matchesProgress = avgProgress >= 33 && avgProgress < 66;
          break;
        case 'high':
          matchesProgress = avgProgress >= 66;
          break;
        default:
          matchesProgress = true;
      }
    }
    
    // Grade filter
    const matchesGrade = filters.grade === 'all' || student.grade === filters.grade;
    
    return matchesSearch && matchesCourse && matchesProgress && matchesGrade;
  });

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortConfig.key === 'name') {
      return sortConfig.direction === 'ascending' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortConfig.key === 'grade') {
      return sortConfig.direction === 'ascending'
        ? a.grade.localeCompare(b.grade)
        : b.grade.localeCompare(a.grade);
    } else if (sortConfig.key === 'performance') {
      return sortConfig.direction === 'ascending'
        ? a.performance - b.performance
        : b.performance - a.performance;
    } else if (sortConfig.key === 'enrollment') {
      return sortConfig.direction === 'ascending'
        ? new Date(a.enrollmentDate) - new Date(b.enrollmentDate)
        : new Date(b.enrollmentDate) - new Date(a.enrollmentDate);
    } else if (sortConfig.key === 'courses') {
      return sortConfig.direction === 'ascending'
        ? a.enrolledCourses.length - b.enrolledCourses.length
        : b.enrolledCourses.length - a.enrolledCourses.length;
    }
    return 0;
  });

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get the sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? <FaSortAmountUp /> : <FaSortAmountDown />;
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      course: 'all',
      progress: 'all',
      grade: 'all'
    });
    setSearchTerm('');
    setSortConfig({ key: 'name', direction: 'ascending' });
  };

  // View student details
  const viewStudentDetails = (student) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };

  // Calculate average course progress
  const calculateAvgProgress = (student) => {
    if (!student.enrolledCourses.length) return 0;
    return student.enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / student.enrolledCourses.length;
  };

  // Get performance class
  const getPerformanceClass = (score) => {
    if (score >= 90) return styles.excellent;
    if (score >= 80) return styles.good;
    if (score >= 70) return styles.average;
    return styles.needsImprovement;
  };

  // Format date for display, especially for mobile
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format: DD/MM/YY
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(2)}`;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading student data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error</h2>
        <p>{error}</p>
        <button className={styles.retryButton} onClick={fetchData}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {showStudentDetails && selectedStudent ? (
        <div className={styles.studentDetailsContainer}>
          <div className={styles.detailsHeader}>
            <button 
              className={styles.backButton} 
              onClick={() => setShowStudentDetails(false)}
            >
              ← Back to All Students
            </button>
            <h2>Student Profile</h2>
          </div>

          <div className={styles.studentProfile}>
            <div className={styles.profileHeader}>
              <div className={styles.profileAvatar}>
                <img src={selectedStudent.avatar} alt={selectedStudent.name} />
                {selectedStudent.isPremium && (
                  <div className={styles.premiumBadge}>
                    <FaCrown /> Premium
                  </div>
                )}
              </div>
              <div className={styles.profileInfo}>
                <h3>{selectedStudent.name}</h3>
                <div className={styles.profileMeta}>
                  <span>{selectedStudent.grade}</span>
                  <span>•</span>
                  <span>Enrolled: {formatDate(selectedStudent.enrollmentDate)}</span>
                  <span>•</span>
                  <span>Last active: {formatDate(selectedStudent.lastActive)}</span>
                </div>
                <div className={styles.contactInfo}>
                  <p><FaEnvelope /> {selectedStudent.email}</p>
                </div>
              </div>
              <div className={styles.profileActions}>
                <button className={styles.actionButton}>
                  <FaEnvelope /> Message
                </button>
                <button className={styles.actionButton}>
                  <FaChartLine /> Performance Report
                </button>
              </div>
            </div>

            <div className={styles.performanceMetrics}>
              <div className={styles.metricsHeader}>
                <h3>Performance Metrics</h3>
              </div>
              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <h4>Overall Performance</h4>
                  <div className={`${styles.metricValue} ${getPerformanceClass(selectedStudent.performance)}`}>
                    {selectedStudent.performance}%
                  </div>
                </div>
                <div className={styles.metricCard}>
                  <h4>Attendance Rate</h4>
                  <div className={`${styles.metricValue} ${getPerformanceClass(selectedStudent.attendance)}`}>
                    {selectedStudent.attendance}%
                  </div>
                </div>
                <div className={styles.metricCard}>
                  <h4>Avg. Course Progress</h4>
                  <div className={styles.metricValue}>
                    {calculateAvgProgress(selectedStudent)}%
                  </div>
                </div>
                <div className={styles.metricCard}>
                  <h4>Enrolled Courses</h4>
                  <div className={styles.metricValue}>
                    {selectedStudent.enrolledCourses.length}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.enrolledCourses}>
              <div className={styles.coursesHeader}>
                <h3>Enrolled Courses</h3>
              </div>
              
              {selectedStudent.enrolledCourses.length > 0 ? (
                <div className={styles.coursesList}>
                  {selectedStudent.enrolledCourses.map(course => (
                    <div key={course._id} className={styles.courseCard}>
                      <div className={styles.courseImage}>
                        <img 
                          src={course.coverImage || 'https://via.placeholder.com/100x60?text=Course'} 
                          alt={course.title} 
                        />
                      </div>
                      <div className={styles.courseInfo}>
                        <h4>{course.title}</h4>
                        <div className={styles.courseProgress}>
                          <div className={styles.progressLabel}>
                            Progress: {course.progress}%
                          </div>
                          <div className={styles.progressBar}>
                            <div 
                              className={styles.progressFill} 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className={styles.courseStats}>
                          <span>Avg. Score: <strong>{course.avgScore}%</strong></span>
                          <span>Last Active: <strong>{course.lastActive}</strong></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noCourses}>
                  <p>This student is not enrolled in any courses yet.</p>
                </div>
              )}
            </div>

            <div className={styles.notesSection}>
              <div className={styles.notesHeader}>
                <h3>Notes & Observations</h3>
              </div>
              <textarea
                className={styles.notesTextarea}
                defaultValue={selectedStudent.notes}
                placeholder="Add notes about this student..."
              />
              <button className={styles.saveNotesButton}>Save Notes</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <div className={styles.titleArea}>
              <h1><FaUsers className={styles.headerIcon} /> My Students</h1>
              <p className={styles.subheader}>Manage and track your students' progress</p>
            </div>
            
            <div className={styles.searchFilter}>
              <div className={styles.searchBar}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search students by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button 
                className={styles.filterButton}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
          </div>

          {showFilters && (
            <div className={styles.filtersContainer}>
              <div className={styles.filterGroup}>
                <label>Course</label>
                <select 
                  name="course" 
                  value={filters.course} 
                  onChange={handleFilterChange}
                >
                  <option value="all">All Courses</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>{course.title}</option>
                  ))}
                </select>
              </div>
              
              <div className={styles.filterGroup}>
                <label>Progress</label>
                <select 
                  name="progress" 
                  value={filters.progress} 
                  onChange={handleFilterChange}
                >
                  <option value="all">All Progress Levels</option>
                  <option value="low">Low Progress (0-33%)</option>
                  <option value="medium">Medium Progress (33-66%)</option>
                  <option value="high">High Progress (66-100%)</option>
                </select>
              </div>
              
              <div className={styles.filterGroup}>
                <label>Grade</label>
                <select 
                  name="grade" 
                  value={filters.grade} 
                  onChange={handleFilterChange}
                >
                  <option value="all">All Grades</option>
                  {Array.from(new Set(students.map(s => s.grade))).sort().map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              
              <button 
                className={styles.resetFiltersButton}
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}

          <div className={styles.studentsCount}>
            Showing {filteredStudents.length} of {students.length} students
          </div>

          {isMobile ? (
            // Mobile view - vertical cards
            <div className={styles.studentCards}>
              {sortedStudents.length > 0 ? (
                sortedStudents.map(student => (
                  <div key={student.id} className={styles.studentCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.studentName}>
                        <img src={student.avatar} alt={student.name} className={styles.avatar} />
                        <div className={styles.nameEmail}>
                          <div className={styles.studentNameText}>
                            {student.name} {student.isPremium && <FaCrown className={styles.crownIcon} />}
                          </div>
                          <div className={styles.email}>{student.email}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.cardBody}>
                      <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>Grade:</span>
                        <span className={styles.cardValue}>{student.grade}</span>
                      </div>
                      
                      <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>Performance:</span>
                        <span className={`${styles.performanceBadge} ${getPerformanceClass(student.performance)}`}>
                          {student.performance}%
                        </span>
                      </div>
                      
                      <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>Enrolled:</span>
                        <span className={styles.cardValue}>{formatDate(student.enrollmentDate)}</span>
                      </div>
                      
                      <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>Last Active:</span>
                        <span className={styles.cardValue}>{formatDate(student.lastActive)}</span>
                      </div>
                      
                      <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>Courses:</span>
                        <div className={styles.cardValue}>
                          {student.enrolledCourses.length > 0 ? (
                            <div className={styles.courseChips}>
                              {student.enrolledCourses.slice(0, 2).map(course => (
                                <span key={course._id} className={styles.courseChip}>
                                  {course.title.length > 15 ? `${course.title.substring(0, 15)}...` : course.title}
                                </span>
                              ))}
                              {student.enrolledCourses.length > 2 && (
                                <span className={styles.moreCourses}>
                                  +{student.enrolledCourses.length - 2}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className={styles.noCourseChip}>No courses</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.cardFooter}>
                      <button 
                        className={styles.viewButton}
                        onClick={() => viewStudentDetails(student)}
                        title="View Details"
                      >
                        <FaEye /> View
                      </button>
                      <button 
                        className={styles.messageButton}
                        title="Send Message"
                      >
                        <FaEnvelope /> Message
                      </button>
                      <button 
                        className={styles.progressButton}
                        title="View Progress"
                      >
                        <FaChartLine /> Progress
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>
                  No students found matching your filters.
                </div>
              )}
            </div>
          ) : (
            // Desktop view - table
            <div className={styles.tableContainer}>
              <table className={styles.studentsTable}>
                <thead>
                  <tr>
                    <th onClick={() => requestSort('name')} className={styles.sortableHeader}>
                      Student Name {getSortIcon('name')}
                    </th>
                    <th onClick={() => requestSort('grade')} className={styles.sortableHeader}>
                      Grade {getSortIcon('grade')}
                    </th>
                    <th onClick={() => requestSort('performance')} className={styles.sortableHeader}>
                      Performance {getSortIcon('performance')}
                    </th>
                    <th onClick={() => requestSort('enrollment')} className={styles.sortableHeader}>
                      Enrollment Date {getSortIcon('enrollment')}
                    </th>
                    <th onClick={() => requestSort('courses')} className={styles.sortableHeader}>
                      Courses {getSortIcon('courses')}
                    </th>
                    <th>Last Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStudents.length > 0 ? (
                    sortedStudents.map(student => (
                      <tr key={student.id}>
                        <td>
                          <div className={styles.studentName}>
                            <img src={student.avatar} alt={student.name} className={styles.avatar} />
                            <div className={styles.nameEmail}>
                              <div>{student.name} {student.isPremium && <FaCrown className={styles.crownIcon} />}</div>
                              <div className={styles.email}>{student.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>{student.grade}</td>
                        <td>
                          <span className={`${styles.performanceBadge} ${getPerformanceClass(student.performance)}`}>
                            {student.performance}%
                          </span>
                        </td>
                        <td>{formatDate(student.enrollmentDate)}</td>
                        <td>
                          {student.enrolledCourses.length > 0 ? (
                            <div className={styles.courseChips}>
                              {student.enrolledCourses.slice(0, 2).map(course => (
                                <span key={course._id} className={styles.courseChip}>
                                  {course.title.length > 15 ? `${course.title.substring(0, 15)}...` : course.title}
                                </span>
                              ))}
                              {student.enrolledCourses.length > 2 && (
                                <span className={styles.moreCourses}>
                                  +{student.enrolledCourses.length - 2}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className={styles.noCourseChip}>No courses</span>
                          )}
                        </td>
                        <td>{formatDate(student.lastActive)}</td>
                        <td>
                          <div className={styles.actionButtons}>
                            <button 
                              className={styles.viewButton}
                              onClick={() => viewStudentDetails(student)}
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button 
                              className={styles.messageButton}
                              title="Send Message"
                            >
                              <FaEnvelope />
                            </button>
                            <button 
                              className={styles.progressButton}
                              title="View Progress"
                            >
                              <FaChartLine />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className={styles.noResults}>
                        No students found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className={styles.pagination}>
            <button className={styles.paginationButton} disabled>Previous</button>
            <span className={styles.pageInfo}>Page 1 of 1</span>
            <button className={styles.paginationButton} disabled>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Students;