import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../components/dashboard/students/Quiz.module.css';

// Sample quiz data
const SAMPLE_QUIZ = {
  _id: 'sample-quiz-1',
  title: 'Introduction to Computer Science',
  description: 'Test your knowledge of basic computer science concepts with this quiz. This quiz covers fundamental concepts in computing, programming, and algorithms.',
  duration: 10, // minutes
  passingScore: 70,
  maxAttempts: 3,
  questions: [
    {
      _id: 'q1',
      text: 'What does CPU stand for?',
      options: [
        'Central Processing Unit',
        'Computer Personal Unit',
        'Central Process Utility',
        'Central Processor Underlying'
      ],
      correctAnswer: 0,
      explanation: 'CPU stands for Central Processing Unit. It is the primary component of a computer that performs most of the processing inside a computer.'
    },
    {
      _id: 'q2',
      text: 'Which of the following is NOT a programming language?',
      options: [
        'Java',
        'Python',
        'Microsoft Excel',
        'JavaScript'
      ],
      correctAnswer: 2,
      explanation: 'Microsoft Excel is a spreadsheet program, not a programming language. Java, Python, and JavaScript are all programming languages used to create software and applications.'
    },
    {
      _id: 'q3',
      text: 'What is an algorithm?',
      options: [
        'A specific brand of computer',
        'A step-by-step procedure for solving a problem',
        'A type of computer virus',
        'The name for computer hardware'
      ],
      correctAnswer: 1,
      explanation: 'An algorithm is a step-by-step procedure for calculations, data processing, and automated reasoning tasks. It is a sequence of instructions where each step can be performed with a finite amount of effort and time.'
    },
    {
      _id: 'q4',
      text: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High Tech Multi Language',
        'Hyper Transfer Markup Language',
        'Hyper Text Modern Language'
      ],
      correctAnswer: 0,
      explanation: 'HTML stands for Hyper Text Markup Language. It is the standard markup language for creating web pages and web applications.'
    },
    {
      _id: 'q5',
      text: 'What is the binary representation of the decimal number 10?',
      options: [
        '0010',
        '1010',
        '1000',
        '0101'
      ],
      correctAnswer: 1,
      explanation: 'The decimal number 10 is represented as 1010 in binary. This is calculated as: 1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8 + 0 + 2 + 0 = 10.'
    }
  ]
};

const SampleQuiz = () => {
  const navigate = useNavigate();
  
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [timerWarning, setTimerWarning] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted) {
      setTimeLeft(SAMPLE_QUIZ.duration * 60); // Convert minutes to seconds
    }
  }, [quizStarted]);

  useEffect(() => {
    if (timeLeft === null || isSubmitted || !quizStarted) return;

    // Warning when 20% of time is left
    if (timeLeft === Math.floor(SAMPLE_QUIZ.duration * 60 * 0.2)) {
      setTimerWarning(true);
      setTimeout(() => setTimerWarning(false), 5000); // Hide warning after 5 seconds
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted, quizStarted]);

  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < SAMPLE_QUIZ.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const jumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    // Calculate results
    let correctAnswers = 0;
    const questionResults = {};
    
    SAMPLE_QUIZ.questions.forEach(question => {
      const isCorrect = answers[question._id] === question.correctAnswer;
      questionResults[question._id] = { 
        isCorrect,
        selectedAnswer: answers[question._id]
      };
      
      if (isCorrect) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / SAMPLE_QUIZ.questions.length) * 100);
    const passed = score >= SAMPLE_QUIZ.passingScore;
    
    setResult({
      score,
      passed,
      correctAnswers,
      totalQuestions: SAMPLE_QUIZ.questions.length,
      questionResults
    });
    
    setIsSubmitted(true);
  };

  const handleReviewQuiz = () => {
    setReviewMode(true);
    setCurrentQuestionIndex(0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    const answeredQuestions = Object.keys(answers).length;
    return (answeredQuestions / SAMPLE_QUIZ.questions.length) * 100;
  };

  const getQuestionStatus = (index) => {
    const question = SAMPLE_QUIZ.questions[index];
    if (!question) return 'unanswered';
    
    if (answers[question._id] !== undefined) {
      return 'answered';
    }
    
    return 'unanswered';
  };

  // Welcome screen before starting the quiz
  if (!quizStarted && !isSubmitted) {
    return (
      <div className={styles.quizWelcomeContainer}>
        <div className={styles.quizCard}>
          <div className={styles.quizCardHeader}>
            <h2>{SAMPLE_QUIZ.title}</h2>
            <div className={styles.quizBadge}>{SAMPLE_QUIZ.questions.length} Questions</div>
          </div>
          
          <div className={styles.quizCardBody}>
            <p className={styles.quizDescription}>{SAMPLE_QUIZ.description}</p>
            
            <div className={styles.quizInfoGrid}>
              <div className={styles.quizInfoItem}>
                <div className={styles.infoIcon}>⏱️</div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Duration</span>
                  <span className={styles.infoValue}>{SAMPLE_QUIZ.duration} minutes</span>
                </div>
              </div>
              
              <div className={styles.quizInfoItem}>
                <div className={styles.infoIcon}>🎯</div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Passing Score</span>
                  <span className={styles.infoValue}>{SAMPLE_QUIZ.passingScore}%</span>
                </div>
              </div>
              
              <div className={styles.quizInfoItem}>
                <div className={styles.infoIcon}>🔄</div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Max Attempts</span>
                  <span className={styles.infoValue}>{SAMPLE_QUIZ.maxAttempts}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.quizRules}>
              <h3>Quiz Rules:</h3>
              <ul>
                <li>You have {SAMPLE_QUIZ.duration} minutes to complete this quiz.</li>
                <li>You must score at least {SAMPLE_QUIZ.passingScore}% to pass.</li>
                <li>You can navigate between questions during the quiz.</li>
                <li>Your answers are saved as you navigate between questions.</li>
                <li>Once submitted, you cannot change your answers.</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.quizCardFooter}>
            <button 
              className={styles.startQuizButton}
              onClick={handleStartQuiz}
            >
              Start Quiz
            </button>
            <button 
              className={styles.backButton}
              onClick={() => navigate(-1)}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Review mode after quiz submission
  if (reviewMode && isSubmitted) {
    const currentQuestion = SAMPLE_QUIZ.questions[currentQuestionIndex];
    const isCorrect = result.questionResults[currentQuestion._id]?.isCorrect;
    
    return (
      <div className={styles.quizContainer}>
        <div className={styles.quizHeader}>
          <h1>{SAMPLE_QUIZ.title} - Review</h1>
          <div className={styles.reviewNavigation}>
            <button 
              className={styles.navButton}
              onClick={() => setReviewMode(false)}
            >
              Exit Review
            </button>
          </div>
        </div>
        
        <div className={styles.progressTracker}>
          {SAMPLE_QUIZ.questions.map((_, index) => (
            <button
              key={index}
              className={`${styles.questionDot} ${
                index === currentQuestionIndex ? styles.currentQuestion : ''
              } ${
                result.questionResults[SAMPLE_QUIZ.questions[index]._id]?.isCorrect 
                  ? styles.correctAnswer 
                  : styles.incorrectAnswer
              }`}
              onClick={() => jumpToQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        
        <div className={styles.reviewQuestionCard}>
          <div className={styles.questionHeader}>
            <h3>Question {currentQuestionIndex + 1} of {SAMPLE_QUIZ.questions.length}</h3>
            <div className={`${styles.resultBadge} ${
              isCorrect ? styles.correctBadge : styles.incorrectBadge
            }`}>
              {isCorrect ? 'Correct' : 'Incorrect'}
            </div>
          </div>
          
          <p className={styles.questionText}>{currentQuestion.text}</p>
          
          <div className={styles.options}>
            {currentQuestion.options.map((option, optionIndex) => (
              <div 
                key={optionIndex} 
                className={`${styles.reviewOption} ${
                  currentQuestion.correctAnswer === optionIndex ? styles.correctOption : ''
                } ${
                  answers[currentQuestion._id] === optionIndex && currentQuestion.correctAnswer !== optionIndex ? styles.incorrectOption : ''
                }`}
              >
                <span className={styles.optionText}>{option}</span>
                {currentQuestion.correctAnswer === optionIndex && (
                  <span className={styles.correctMark}>✓</span>
                )}
                {answers[currentQuestion._id] === optionIndex && currentQuestion.correctAnswer !== optionIndex && (
                  <span className={styles.incorrectMark}>✗</span>
                )}
              </div>
            ))}
          </div>
          
          <div className={styles.explanationBox}>
            <h4>Explanation:</h4>
            <p>{currentQuestion.explanation}</p>
          </div>
          
          <div className={styles.navigationButtons}>
            <button 
              className={styles.navButton}
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button 
              className={styles.navButton}
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === SAMPLE_QUIZ.questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz results after submission
  if (isSubmitted && !reviewMode) {
    return (
      <div className={styles.quizContainer}>
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <h2>{result.passed ? '🎉 Quiz Passed! 🎉' : '📝 Quiz Results'}</h2>
          </div>
          
          <div className={styles.scoreContainer}>
            <div 
              className={`${styles.scoreCircle} ${
                result.passed ? styles.passingScore : styles.failingScore
              }`}
            >
              <span className={styles.scoreNumber}>{result.score}%</span>
              <span className={styles.scoreLabel}>Score</span>
            </div>
          </div>
          
          <div className={styles.resultStats}>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>✓</div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>Correct Answers</div>
                <div className={styles.statValue}>{result.correctAnswers}</div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>✗</div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>Incorrect Answers</div>
                <div className={styles.statValue}>{result.totalQuestions - result.correctAnswers}</div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>🎯</div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>Passing Score</div>
                <div className={styles.statValue}>{SAMPLE_QUIZ.passingScore}%</div>
              </div>
            </div>
          </div>
          
          <div className={styles.resultFeedback}>
            {result.passed ? (
              <p>Congratulations! You've successfully passed the quiz. Keep up the good work!</p>
            ) : (
              <p>Don't worry! You can review the quiz and try again later. Learning is a journey!</p>
            )}
          </div>
          
          <div className={styles.resultActions}>
            <button 
              className={styles.reviewButton}
              onClick={handleReviewQuiz}
            >
              Review Quiz
            </button>
            <button 
              className={styles.backButton}
              onClick={() => navigate(-1)}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active quiz interface
  const currentQuestion = SAMPLE_QUIZ.questions[currentQuestionIndex];
  
  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <div className={styles.quizHeaderLeft}>
          <h1>{SAMPLE_QUIZ.title}</h1>
          <p className={styles.questionCount}>
            Question {currentQuestionIndex + 1} of {SAMPLE_QUIZ.questions.length}
          </p>
        </div>
        <div className={styles.quizHeaderRight}>
          <div className={`${styles.timer} ${timerWarning ? styles.timerWarning : ''}`}>
            <span className={styles.timerIcon}>⏱️</span>
            <span className={styles.timerText}>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>
      
      <div className={styles.questionTracker}>
        {SAMPLE_QUIZ.questions.map((_, index) => (
          <button
            key={index}
            className={`${styles.questionDot} ${
              index === currentQuestionIndex ? styles.currentQuestion : ''
            } ${styles[getQuestionStatus(index)]}`}
            onClick={() => jumpToQuestion(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      
      <div className={styles.questionContainer}>
        <p className={styles.questionText}>{currentQuestion.text}</p>
        
        <div className={styles.options}>
          {currentQuestion.options.map((option, optionIndex) => (
            <label 
              key={optionIndex} 
              className={`${styles.option} ${
                answers[currentQuestion._id] === optionIndex ? styles.selectedOption : ''
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion._id}`}
                value={optionIndex}
                checked={answers[currentQuestion._id] === optionIndex}
                onChange={() => handleAnswerChange(currentQuestion._id, optionIndex)}
              />
              <span className={styles.optionText}>{option}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className={styles.navigationButtons}>
        <button 
          className={styles.navButton}
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        
        {currentQuestionIndex < SAMPLE_QUIZ.questions.length - 1 ? (
          <button 
            className={styles.navButton}
            onClick={handleNextQuestion}
          >
            Next
          </button>
        ) : (
          <button 
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={isSubmitted}
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default SampleQuiz; 