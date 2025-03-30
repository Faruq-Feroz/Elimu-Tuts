// src/components/PracticeTests.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PracticeTests.module.css';

const SAMPLE_TESTS = [
  {
    id: 'sample-quiz-1',
    title: 'Introduction to Computer Science',
    subject: 'Computer Science',
    questions: 5,
    duration: 10,
    difficulty: 'Beginner',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: 'sample-quiz-2',
    title: 'Mathematics Fundamentals',
    subject: 'Mathematics',
    questions: 8,
    duration: 15,
    difficulty: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: 'sample-quiz-3',
    title: 'Introduction to Biology',
    subject: 'Biology',
    questions: 10,
    duration: 20,
    difficulty: 'Beginner',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: 'sample-quiz-4',
    title: 'Chemistry Concepts',
    subject: 'Chemistry',
    questions: 12,
    duration: 25,
    difficulty: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: 'sample-quiz-5',
    title: 'Basic Physics',
    subject: 'Physics',
    questions: 10,
    duration: 20,
    difficulty: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: 'sample-quiz-6',
    title: 'World History Overview',
    subject: 'History',
    questions: 15,
    duration: 30,
    difficulty: 'Beginner',
    imageUrl: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=874&q=80'
  },
];

const PracticeTests = () => {
  return (
    <div className={styles.practiceTestsContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Practice Tests</h1>
        <p className={styles.subtitle}>Improve your skills with these practice quizzes and prepare for your exams.</p>
      </div>
      
      <div className={styles.filtersSection}>
        <div className={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Search tests..." 
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>Search</button>
        </div>
        
        <div className={styles.filterControls}>
          <select className={styles.filterSelect}>
            <option value="">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Social Studies">Social Studies</option>
          </select>
          
          <select className={styles.filterSelect}>
            <option value="">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          
          <select className={styles.filterSelect}>
            <option value="">All Durations</option>
            <option value="short">Short (&lt; 15 min)</option>
            <option value="medium">Medium (15-30 min)</option>
            <option value="long">Long (&gt; 30 min)</option>
          </select>
        </div>
      </div>
      
      <div className={styles.quizGrid}>
        {SAMPLE_TESTS.map((test) => (
          <div key={test.id} className={styles.quizCard}>
            <div className={styles.quizImageContainer}>
              <img src={test.imageUrl} alt={test.title} className={styles.quizImage} />
              <div className={styles.quizSubject}>{test.subject}</div>
            </div>
            
            <div className={styles.quizContent}>
              <h3 className={styles.quizTitle}>{test.title}</h3>
              
              <div className={styles.quizDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}>🕒</span>
                  <span>{test.duration} min</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}>❓</span>
                  <span>{test.questions} questions</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}>📊</span>
                  <span>{test.difficulty}</span>
                </div>
              </div>
              
              {/* All quizzes link to our sample quiz for demo purposes */}
              <Link to="/sample-quiz" className={styles.startButton}>
                Start Quiz
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeTests;