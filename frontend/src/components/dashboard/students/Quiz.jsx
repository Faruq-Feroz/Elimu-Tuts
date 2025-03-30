import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizzes } from '../../../context/QuizContext';
import styles from './Quiz.module.css';

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { currentQuiz, loading, error, fetchQuiz, submitQuiz } = useQuizzes();
  
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [timerWarning, setTimerWarning] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);

  useEffect(() => {
    if (quizId) {
      fetchQuiz(quizId);
    }
  }, [quizId, fetchQuiz]);

  useEffect(() => {
    if (currentQuiz && quizStarted) {
      setTimeLeft(currentQuiz.duration * 60); // Convert minutes to seconds
      
      // Check if user is taking this quiz for the first time
      // This could be replaced with actual logic from your user data/quiz history
      const hasAttemptedBefore = localStorage.getItem(`quiz_${quizId}_attempted`);
      setIsFirstTimeUser(!hasAttemptedBefore);
      
      if (!hasAttemptedBefore) {
        localStorage.setItem(`quiz_${quizId}_attempted`, 'true');
      }
    }
  }, [currentQuiz, quizStarted, quizId]);

  useEffect(() => {
    if (timeLeft === null || isSubmitted || !quizStarted) return;

    // Warning when 20% of time is left
    if (timeLeft === Math.floor(currentQuiz.duration * 60 * 0.2)) {
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
  }, [timeLeft, isSubmitted, quizStarted, currentQuiz]);

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
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
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

  const handleSubmit = async () => {
    if (isSubmitted) return;

    try {
      const result = await submitQuiz(quizId, answers);
      setResult(result);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  const handleReviewQuiz = () => {
    setReviewMode(true);
    setCurrentQuestionIndex(0);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>❌</div>
        <h3>Error Loading Quiz</h3>
        <p>{error}</p>
        <button 
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!currentQuiz) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>🔍</div>
        <h3>Quiz Not Found</h3>
        <p>The requested quiz could not be found.</p>
        <button 
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    const answeredQuestions = Object.keys(answers).length;
    return (answeredQuestions / currentQuiz.questions.length) * 100;
  };

  const getQuestionStatus = (index) => {
    const question = currentQuiz.questions[index];
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
            <h2>{currentQuiz.title}</h2>
            <div className={styles.quizBadge}>{currentQuiz.questions.length} Questions</div>
          </div>
          
          <div className={styles.quizCardBody}>
            <p className={styles.quizDescription}>{currentQuiz.description}</p>
            
            <div className={styles.quizInfoGrid}>
              <div className={styles.quizInfoItem}>
                <div className={styles.infoIcon}>⏱️</div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Duration</span>
                  <span className={styles.infoValue}>{currentQuiz.duration} minutes</span>
                </div>
              </div>
              
              <div className={styles.quizInfoItem}>
                <div className={styles.infoIcon}>🎯</div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Passing Score</span>
                  <span className={styles.infoValue}>{currentQuiz.passingScore}%</span>
                </div>
              </div>
              
              <div className={styles.quizInfoItem}>
                <div className={styles.infoIcon}>🔄</div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Max Attempts</span>
                  <span className={styles.infoValue}>{currentQuiz.maxAttempts}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.quizRules}>
              <h3>Quiz Rules:</h3>
              <ul>
                <li>You have {currentQuiz.duration} minutes to complete this quiz.</li>
                <li>You must score at least {currentQuiz.passingScore}% to pass.</li>
                <li>You can navigate between questions during the quiz.</li>
                <li>Your answers are saved as you navigate between questions.</li>
                <li>Once submitted, you cannot change your answers.</li>
              </ul>
            </div>
            
            {isFirstTimeUser && (
              <div className={styles.welcomeMessage}>
                <div className={styles.welcomeIcon}>🎉</div>
                <h4>Welcome to your first quiz!</h4>
                <p>We're excited to have you take this quiz for the first time. Good luck on your learning journey!</p>
              </div>
            )}
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
              Back to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Review mode after quiz submission
  if (reviewMode && isSubmitted) {
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const isCorrect = result.questionResults[currentQuestion._id]?.isCorrect;
    
    return (
      <div className={styles.quizContainer}>
        <div className={styles.quizHeader}>
          <h1>{currentQuiz.title} - Review</h1>
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
          {currentQuiz.questions.map((_, index) => (
            <button
              key={index}
              className={`${styles.questionDot} ${
                index === currentQuestionIndex ? styles.currentQuestion : ''
              } ${
                result.questionResults[currentQuiz.questions[index]._id]?.isCorrect 
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
            <h3>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</h3>
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
              disabled={currentQuestionIndex === currentQuiz.questions.length - 1}
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
                <div className={styles.statValue}>{currentQuiz.passingScore}%</div>
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
              Back to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active quiz interface
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  
  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <div className={styles.quizHeaderLeft}>
          <h1>{currentQuiz.title}</h1>
          <p className={styles.questionCount}>
            Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
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
        {currentQuiz.questions.map((_, index) => (
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
        
        {currentQuestionIndex < currentQuiz.questions.length - 1 ? (
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

export default Quiz; 