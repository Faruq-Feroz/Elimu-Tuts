// src/components/quiz/QuizSubjectSelection.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './QuizSubjectSelection.module.css';
import { FiBook, FiCheckCircle, FiClock, FiAward, FiBarChart2 } from 'react-icons/fi';

const QuizSubjectSelection = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  
  // CBC subjects data with relevant details
  const subjects = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: <FiBarChart2 size={24} />,
      color: '#4361ee',
      quizCount: 12,
      completedCount: 5,
      difficulty: 'Various',
      description: 'Number sense, measurement, geometry, and mathematical reasoning'
    },
    {
      id: 'english',
      name: 'English',
      icon: <FiBook size={24} />,
      color: '#3a86ff',
      quizCount: 10,
      completedCount: 3,
      difficulty: 'Various',
      description: 'Reading comprehension, grammar, vocabulary, and writing skills'
    },
    {
      id: 'kiswahili',
      name: 'Kiswahili',
      icon: <FiBook size={24} />,
      color: '#7209b7',
      quizCount: 8,
      completedCount: 2,
      difficulty: 'Various',
      description: 'Sarufi, insha, ufahamu, na msamiati wa Kiswahili'
    },
    {
      id: 'science',
      name: 'Science',
      icon: <FiAward size={24} />,
      color: '#06d6a0',
      quizCount: 15,
      completedCount: 7,
      difficulty: 'Various',
      description: 'Living things, environment, energy, forces and machines'
    },
    {
      id: 'social_studies',
      name: 'Social Studies',
      icon: <FiBook size={24} />,
      color: '#fb8500',
      quizCount: 9,
      completedCount: 4,
      difficulty: 'Various',
      description: 'Geography, history, citizenship, and cultural studies'
    },
    {
      id: 'cre',
      name: 'CRE',
      icon: <FiBook size={24} />,
      color: '#8338ec',
      quizCount: 7,
      completedCount: 3,
      difficulty: 'Various',
      description: 'Bible stories, values, Christian living, and moral lessons'
    },
    {
      id: 'agriculture',
      name: 'Agriculture',
      icon: <FiAward size={24} />,
      color: '#2b9348',
      quizCount: 6,
      completedCount: 2,
      difficulty: 'Various',
      description: 'Crop farming, animal husbandry, and agricultural practices'
    },
    {
      id: 'ict',
      name: 'ICT',
      icon: <FiClock size={24} />,
      color: '#ef476f',
      quizCount: 8,
      completedCount: 3,
      difficulty: 'Various',
      description: 'Computer skills, digital literacy, and information technology'
    }
  ];

  const handleSubjectSelect = (subjectId) => {
    setSelectedSubject(subjectId);
    // You could redirect to the quiz page here
    // history.push(`/quizzes/${subjectId}`);
  };

  const calculateProgress = (completed, total) => {
    return (completed / total) * 100;
  };

  return (
    <div className={styles.quizSelectionContainer}>
      <div className={styles.quizHeader}>
        <h1>CBC Subject Quizzes</h1>
        <p>Select a subject to practice and test your knowledge with CBC-aligned quizzes</p>
      </div>

      <div className={styles.subjectGrid}>
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className={`${styles.subjectCard} ${selectedSubject === subject.id ? styles.selected : ''}`}
            onClick={() => handleSubjectSelect(subject.id)}
            style={{ borderTopColor: subject.color }}
          >
            <div className={styles.subjectIconWrapper} style={{ backgroundColor: subject.color }}>
              {subject.icon}
            </div>
            
            <h3 className={styles.subjectName}>{subject.name}</h3>
            <p className={styles.subjectDescription}>{subject.description}</p>
            
            <div className={styles.subjectStats}>
              <div className={styles.statItem}>
                <FiClock />
                <span>{subject.quizCount} Quizzes</span>
              </div>
              <div className={styles.statItem}>
                <FiCheckCircle />
                <span>{subject.completedCount} Completed</span>
              </div>
            </div>
            
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${calculateProgress(subject.completedCount, subject.quizCount)}%`,
                  backgroundColor: subject.color
                }}
              ></div>
            </div>
            
            <div className={styles.cardFooter}>
              <Link to={`/quizzes/${subject.id}`} className={styles.startButton}>
                Start Quiz
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizSubjectSelection;