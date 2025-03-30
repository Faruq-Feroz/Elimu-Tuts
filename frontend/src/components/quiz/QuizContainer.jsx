// src/components/quiz/QuizContainer.jsx
import React, { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './QuizContainer.module.css';
import { 
  FiBook, 
  FiCheckCircle, 
  FiClock, 
  FiAward, 
  FiBarChart2, 
  FiFilter, 
  FiChevronRight, 
  FiStar,
  FiFlag,
  FiLayers,
  FiGlobe,
  FiHeart,
  FiTrendingUp,
  FiMonitor,
  FiCpu,
  FiMusic,
  FiActivity,
  FiGitPullRequest,
  FiSearch
} from 'react-icons/fi';

const QuizContainer = () => {
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStrand, setSelectedStrand] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userStats] = useState({
    totalAttempted: 0,
    totalCompleted: 0,
    currentStreak: 3,
    highestScore: 92,
    averageScore: 78
  });
  
  // Reset scroll position when component mounts
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    
    // Reset parent containers if needed
    const resetParentScroll = (element) => {
      if (!element) return;
      
      if (element.scrollHeight > element.clientHeight) {
        element.scrollTop = 0;
      }
      
      if (element.parentElement) {
        resetParentScroll(element.parentElement);
      }
    };
    
    const container = document.querySelector(`.${styles.quizContainer}`);
    if (container) {
      resetParentScroll(container);
    }
  }, []);

  // Kenya CBC levels
  const gradeOptions = [
    { id: 'all', name: 'All Grades' },
    { id: 'pp1', name: 'Pre-Primary 1' },
    { id: 'pp2', name: 'Pre-Primary 2' },
    { id: 'g1', name: 'Grade 1' },
    { id: 'g2', name: 'Grade 2' },
    { id: 'g3', name: 'Grade 3' },
    { id: 'g4', name: 'Grade 4' },
    { id: 'g5', name: 'Grade 5' },
    { id: 'g6', name: 'Grade 6' },
    { id: 'jss1', name: 'Junior Secondary 1' },
    { id: 'jss2', name: 'Junior Secondary 2' },
    { id: 'jss3', name: 'Junior Secondary 3' }
  ];

  // CBC strands (learning areas)
  const strandOptions = [
    { id: 'all', name: 'All Strands' },
    { id: 'numbers', name: 'Numbers' },
    { id: 'measurement', name: 'Measurement' },
    { id: 'geometry', name: 'Geometry' },
    { id: 'language', name: 'Language' },
    { id: 'living_things', name: 'Living Things' },
    { id: 'environment', name: 'Environment' },
    { id: 'citizenship', name: 'Citizenship' },
    { id: 'digital_literacy', name: 'Digital Literacy' },
    { id: 'creative_arts', name: 'Creative Arts' },
    { id: 'health', name: 'Health & Physical Education' }
  ];
  
  // CBC subjects with relevant details
  const subjects = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: <FiBarChart2 size={24} />,
      color: '#4361ee',
      grades: ['pp1', 'pp2', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'jss1', 'jss2', 'jss3'],
      strands: ['numbers', 'measurement', 'geometry'],
      quizCount: 24,
      completedCount: 8,
      passingScore: 60,
      highestScore: 88,
      description: 'Number sense, measurement, geometry, algebra and data handling',
      quizzes: [
        { id: 'math-g3-1', name: 'Number Operations', grade: 'g3', difficulty: 'Medium', questions: 15, timeLimit: 20 },
        { id: 'math-g3-2', name: 'Place Values', grade: 'g3', difficulty: 'Easy', questions: 10, timeLimit: 15 },
        { id: 'math-g3-3', name: 'Shapes & Patterns', grade: 'g3', difficulty: 'Medium', questions: 12, timeLimit: 18 }
      ]
    },
    {
      id: 'english',
      name: 'English',
      icon: <FiBook size={24} />,
      color: '#3a86ff',
      grades: ['pp1', 'pp2', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'jss1', 'jss2', 'jss3'],
      strands: ['language'],
      quizCount: 18,
      completedCount: 6,
      passingScore: 65,
      highestScore: 92,
      description: 'Listening & speaking, reading, writing, grammar and literature',
      quizzes: [
        { id: 'eng-g3-1', name: 'Reading Comprehension', grade: 'g3', difficulty: 'Medium', questions: 12, timeLimit: 20 },
        { id: 'eng-g3-2', name: 'Grammar Basics', grade: 'g3', difficulty: 'Easy', questions: 15, timeLimit: 15 }
      ]
    },
    {
      id: 'kiswahili',
      name: 'Kiswahili',
      icon: <FiGlobe size={24} />,
      color: '#7209b7',
      grades: ['pp1', 'pp2', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'jss1', 'jss2', 'jss3'],
      strands: ['language'],
      quizCount: 16,
      completedCount: 5,
      passingScore: 60,
      highestScore: 85,
      description: 'Kusikiliza & kuzungumza, kusoma, kuandika, sarufi na fasihi',
      quizzes: [
        { id: 'kisw-g3-1', name: 'Sarufi ya Kiswahili', grade: 'g3', difficulty: 'Medium', questions: 15, timeLimit: 20 },
        { id: 'kisw-g3-2', name: 'Kusoma na Kufahamu', grade: 'g3', difficulty: 'Medium', questions: 10, timeLimit: 15 }
      ]
    },
    {
      id: 'science',
      name: 'Science & Technology',
      icon: <FiCpu size={24} />,
      color: '#06d6a0',
      grades: ['g4', 'g5', 'g6', 'jss1', 'jss2', 'jss3'],
      strands: ['living_things', 'environment'],
      quizCount: 20,
      completedCount: 7,
      passingScore: 55,
      highestScore: 79,
      description: 'Living things, environment, energy, forces and machines',
      quizzes: [
        { id: 'sci-g4-1', name: 'Living Things', grade: 'g4', difficulty: 'Medium', questions: 15, timeLimit: 20 },
        { id: 'sci-g4-2', name: 'Materials & States of Matter', grade: 'g4', difficulty: 'Hard', questions: 12, timeLimit: 20 }
      ]
    },
    {
      id: 'social_studies',
      name: 'Social Studies',
      icon: <FiFlag size={24} />,
      color: '#fb8500',
      grades: ['g4', 'g5', 'g6', 'jss1', 'jss2', 'jss3'],
      strands: ['citizenship', 'environment'],
      quizCount: 14,
      completedCount: 4,
      passingScore: 60,
      highestScore: 76,
      description: 'Citizenship, governance, social diversity and cohesion',
      quizzes: [
        { id: 'soc-g4-1', name: 'Our County', grade: 'g4', difficulty: 'Easy', questions: 10, timeLimit: 15 },
        { id: 'soc-g4-2', name: 'Kenya as a Nation', grade: 'g4', difficulty: 'Medium', questions: 15, timeLimit: 20 }
      ]
    },
    {
      id: 'cre',
      name: 'Religious Education',
      icon: <FiHeart size={24} />,
      color: '#8338ec',
      grades: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'jss1', 'jss2', 'jss3'],
      strands: ['citizenship'],
      quizCount: 12,
      completedCount: 3,
      passingScore: 70,
      highestScore: 80,
      description: 'CRE, IRE, HRE - Faith values, traditions and community',
      quizzes: [
        { id: 'cre-g4-1', name: 'Creation Stories', grade: 'g4', difficulty: 'Easy', questions: 10, timeLimit: 15 },
        { id: 'cre-g4-2', name: 'Biblical Teachings', grade: 'g4', difficulty: 'Medium', questions: 12, timeLimit: 18 }
      ]
    },
    {
      id: 'agriculture',
      name: 'Agriculture',
      icon: <FiGitPullRequest size={24} />,
      color: '#2b9348',
      grades: ['g4', 'g5', 'g6', 'jss1', 'jss2', 'jss3'],
      strands: ['environment', 'living_things'],
      quizCount: 10,
      completedCount: 2,
      passingScore: 55,
      highestScore: 72,
      description: 'Crop farming, animal husbandry, and agricultural practices',
      quizzes: [
        { id: 'agri-g5-1', name: 'Crop Production', grade: 'g5', difficulty: 'Medium', questions: 12, timeLimit: 15 },
        { id: 'agri-g5-2', name: 'Livestock Farming', grade: 'g5', difficulty: 'Medium', questions: 10, timeLimit: 15 }
      ]
    },
    {
      id: 'ict',
      name: 'Digital Literacy',
      icon: <FiMonitor size={24} />,
      color: '#ef476f',
      grades: ['pp1', 'pp2', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'jss1', 'jss2', 'jss3'],
      strands: ['digital_literacy'],
      quizCount: 12,
      completedCount: 4,
      passingScore: 50,
      highestScore: 90,
      description: 'Computer skills, coding, digital citizenship and safety',
      quizzes: [
        { id: 'ict-g3-1', name: 'Computer Basics', grade: 'g3', difficulty: 'Easy', questions: 10, timeLimit: 15 },
        { id: 'ict-g3-2', name: 'Digital Safety', grade: 'g3', difficulty: 'Easy', questions: 8, timeLimit: 12 }
      ]
    },
    {
      id: 'phe',
      name: 'Physical Education',
      icon: <FiActivity size={24} />,
      color: '#00b4d8',
      grades: ['pp1', 'pp2', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'jss1', 'jss2', 'jss3'],
      strands: ['health'],
      quizCount: 8,
      completedCount: 2,
      passingScore: 50,
      highestScore: 75,
      description: 'Movement, games, sports, health and fitness',
      quizzes: [
        { id: 'phe-g3-1', name: 'Games & Sports', grade: 'g3', difficulty: 'Easy', questions: 10, timeLimit: 15 },
        { id: 'phe-g3-2', name: 'Health & Nutrition', grade: 'g3', difficulty: 'Easy', questions: 8, timeLimit: 12 }
      ]
    },
    {
      id: 'creative_arts',
      name: 'Creative Arts',
      icon: <FiMusic size={24} />,
      color: '#ff006e',
      grades: ['pp1', 'pp2', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'jss1', 'jss2', 'jss3'],
      strands: ['creative_arts'],
      quizCount: 10,
      completedCount: 3,
      passingScore: 60,
      highestScore: 85,
      description: 'Music, art & craft, dance and drama',
      quizzes: [
        { id: 'art-g3-1', name: 'Elements of Art', grade: 'g3', difficulty: 'Easy', questions: 10, timeLimit: 15 },
        { id: 'art-g3-2', name: 'Musical Instruments', grade: 'g3', difficulty: 'Medium', questions: 8, timeLimit: 12 }
      ]
    },
    {
      id: 'literacy',
      name: 'Literacy Activities',
      icon: <FiLayers size={24} />,
      color: '#3a0ca3',
      grades: ['pp1', 'pp2'],
      strands: ['language'],
      quizCount: 8,
      completedCount: 3,
      passingScore: 60,
      highestScore: 90,
      description: 'Pre-reading, pre-writing, listening and speaking skills',
      quizzes: [
        { id: 'lit-pp2-1', name: 'Alphabet Recognition', grade: 'pp2', difficulty: 'Easy', questions: 8, timeLimit: 10 },
        { id: 'lit-pp2-2', name: 'Word Recognition', grade: 'pp2', difficulty: 'Easy', questions: 8, timeLimit: 10 }
      ]
    },
    {
      id: 'numeracy',
      name: 'Numeracy Activities',
      icon: <FiTrendingUp size={24} />,
      color: '#f72585',
      grades: ['pp1', 'pp2'],
      strands: ['numbers'],
      quizCount: 8,
      completedCount: 2,
      passingScore: 60,
      highestScore: 85,
      description: 'Number recognition, counting, sorting and matching',
      quizzes: [
        { id: 'num-pp2-1', name: 'Number Counting 1-20', grade: 'pp2', difficulty: 'Easy', questions: 8, timeLimit: 10 },
        { id: 'num-pp2-2', name: 'Simple Addition', grade: 'pp2', difficulty: 'Easy', questions: 5, timeLimit: 10 }
      ]
    }
  ];

  // Calculate filtered subjects based on selected grade and strand
  const filteredSubjects = subjects.filter(subject => {
    // Filter by grade
    const matchesGrade = selectedGrade === 'all' || subject.grades.includes(selectedGrade);
    
    // Filter by strand
    const matchesStrand = selectedStrand === 'all' || subject.strands.includes(selectedStrand);
    
    // Filter by search term
    const matchesSearch = searchTerm.trim() === '' || 
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesGrade && matchesStrand && matchesSearch;
  });
  
  // Calculate passing status for each subject
  const getPassingStatus = (subject) => {
    if (subject.completedCount === 0) {
      return { text: 'Not started', color: '#6c757d' };
    }
    
    const completionRate = (subject.completedCount / subject.quizCount) * 100;
    
    if (subject.highestScore >= subject.passingScore) {
      return { text: 'Passed', color: '#2b9348' };
    } else {
      return { text: 'Needs improvement', color: '#e5383b' };
    }
  };

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHubHeader}>
        <h1>CBC Quiz Hub</h1>
        <p>Practice with quizzes aligned to the Competency Based Curriculum of Kenya</p>
      </div>
      
      <div className={styles.filterSection}>
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Grade Level:</label>
            <select 
              className={styles.filterSelect}
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              {gradeOptions.map(grade => (
                <option key={grade.id} value={grade.id}>{grade.name}</option>
              ))}
            </select>
          </div>
          
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Learning Strand:</label>
            <select 
              className={styles.filterSelect}
              value={selectedStrand}
              onChange={(e) => setSelectedStrand(e.target.value)}
            >
              {strandOptions.map(strand => (
                <option key={strand.id} value={strand.id}>{strand.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className={styles.subjectGrid}>
        {filteredSubjects.map(subject => {
          const passingStatus = getPassingStatus(subject);
          
          return (
            <div key={subject.id} className={`${styles.subjectCard} ${styles[subject.id]}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  {subject.icon}
                </div>
                <h3>{subject.name}</h3>
              </div>
              
              <div className={styles.cardContent}>
                <p className={styles.subjectDescription}>{subject.description}</p>
                
                <div className={styles.subjectInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Grade Levels:</span>
                    <span className={styles.infoValue}>
                      {subject.grades.includes('pp1') ? 'Pre-Primary, ' : ''}
                      {subject.grades.includes('g1') ? 'Lower Primary, ' : ''}
                      {subject.grades.includes('g4') ? 'Upper Primary, ' : ''}
                      {subject.grades.includes('jss1') ? 'Junior Secondary' : ''}
                    </span>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Total Quizzes:</span>
                    <span className={styles.infoValue}>{subject.quizCount}</span>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Pass Score:</span>
                    <span className={styles.infoValue}>{subject.passingScore}%</span>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Passing Status:</span>
                    <span className={styles.passingStatus} style={{ color: passingStatus.color }}>
                      {passingStatus.text}
                    </span>
                  </div>
                </div>
                
                <div className={styles.progressLabel}>
                  <span>Progress: {subject.completedCount}/{subject.quizCount}</span>
                  <span>{Math.round((subject.completedCount / subject.quizCount) * 100)}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ 
                      width: `${(subject.completedCount / subject.quizCount) * 100}%`,
                      backgroundColor: subject.color 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className={styles.cardActions}>
                <button 
                  className={styles.viewQuizzesButton}
                  onClick={() => setSelectedSubject(subject.id)}
                >
                  View Quizzes <FiChevronRight />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredSubjects.length === 0 && (
        <div className={styles.noResults}>
          <h3>No matching subjects found</h3>
          <p>Try adjusting your filters or search term</p>
        </div>
      )}
      
      {selectedSubject && (
        <div className={styles.quizListSection}>
          <div className={styles.sectionHeader}>
            <h2>Available Quizzes - {subjects.find(s => s.id === selectedSubject)?.name}</h2>
            <button 
              className={styles.closeButton}
              onClick={() => setSelectedSubject(null)}
            >
              Close
            </button>
          </div>
          
          <div className={styles.quizList}>
            {subjects.find(s => s.id === selectedSubject)?.quizzes.map(quiz => (
              <div key={quiz.id} className={styles.quizItem}>
                <div className={styles.quizInfo}>
                  <h3>{quiz.name}</h3>
                  <div className={styles.quizMeta}>
                    <span className={styles.grade}>
                      {gradeOptions.find(g => g.id === quiz.grade)?.name || quiz.grade}
                    </span>
                    <span className={styles.difficulty}>
                      {quiz.difficulty}
                    </span>
                    <span className={styles.questions}>
                      {quiz.questions} Questions
                    </span>
                    <span className={styles.time}>
                      {quiz.timeLimit} Minutes
                    </span>
                  </div>
                </div>
                <Link to={`/dashboard/quiz/${quiz.id}`} className={styles.startQuizButton}>
                  Start Quiz
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizContainer;