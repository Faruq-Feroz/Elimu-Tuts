import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiClock, 
  FiCheckCircle, 
  FiX, 
  FiArrowLeft, 
  FiArrowRight, 
  FiFlag,
  FiBarChart2,
  FiAlertTriangle,
  FiHome
} from 'react-icons/fi';
import styles from './Quiz.module.css';

const Quiz = () => {
  // Get the quiz ID from the URL
  const location = useLocation();
  const navigate = useNavigate();
  const quizPath = location.pathname ? location.pathname.split('/').pop() : '';
  
  // Quiz state
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showConfirmExit, setShowConfirmExit] = useState(false);

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        console.log("Fetching quiz with ID:", quizPath);
        const mockQuiz = getMockQuizData(quizPath);
        
        if (!mockQuiz) {
          throw new Error('Quiz not found');
        }
        
        setQuizData(mockQuiz);
        // Initialize timer
        setTimeRemaining(mockQuiz.timeLimit * 60);
        // Initialize empty answers
        const initialAnswers = {};
        mockQuiz.questions.forEach((question, index) => {
          initialAnswers[index] = null;
        });
        setUserAnswers(initialAnswers);
        
        setLoading(false);
      } catch (err) {
        console.error("Error loading quiz:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (quizPath) {
      fetchQuiz();
    }
  }, [quizPath]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining === null || !quizStarted || quizSubmitted) return;
    
    const timerInterval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, [timeRemaining, quizStarted, quizSubmitted]);

  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    if (seconds === null || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle when time is up
  const handleTimeUp = () => {
    if (quizSubmitted) return;
    
    submitQuiz();
  };

  // Handle answer selection
  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  // Navigation functions
  const goToNextQuestion = () => {
    if (quizData && currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index) => {
    if (quizData && index >= 0 && index < quizData.questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    if (!quizData) return 0;
    
    const answeredCount = Object.values(userAnswers).filter(answer => answer !== null).length;
    return (answeredCount / quizData.questions.length) * 100;
  };

  // Submit quiz
  const submitQuiz = () => {
    if (!quizData || quizSubmitted) return;
    
    // Calculate results
    let correctCount = 0;
    const questionResults = {};
    
    quizData.questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctCount++;
      }
      
      questionResults[index] = {
        userAnswer,
        isCorrect,
        correctAnswer: question.correctAnswer
      };
    });
    
    const score = Math.round((correctCount / quizData.questions.length) * 100);
    const hasPassed = score >= quizData.passingScore;
    
    const results = {
      score,
      correctCount,
      totalQuestions: quizData.questions.length,
      hasPassed,
      questionResults,
      timeSpent: (quizData.timeLimit * 60) - (timeRemaining || 0)
    };
    
    setQuizResults(results);
    setQuizSubmitted(true);
    setShowConfirmSubmit(false);
  };

  // Check if user is running out of time (less than 20% of time remaining)
  const isTimeRunningOut = () => {
    if (!quizData || timeRemaining === null) return false;
    return timeRemaining < (quizData.timeLimit * 60 * 0.2);
  };

  // Handle starting the quiz
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  // Go back to quizzes dashboard
  const handleExit = () => {
    navigate('/dashboard/quizzes');
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <FiAlertTriangle size={48} />
        <h2>Error Loading Quiz</h2>
        <p>{error}</p>
        <button 
          className={styles.actionButton}
          onClick={() => navigate('/dashboard/quizzes')}
        >
          Return to Quizzes
        </button>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className={styles.errorContainer}>
        <h2>Quiz Not Found</h2>
        <button 
          className={styles.actionButton}
          onClick={() => navigate('/dashboard/quizzes')}
        >
          Return to Quizzes
        </button>
      </div>
    );
  }

  // Welcome screen before starting the quiz
  if (!quizStarted && !quizSubmitted) {
    return (
      <div className={styles.quizWelcomeContainer}>
        <div className={styles.quizCard}>
          <div className={styles.quizCardHeader}>
            <h2>{quizData.title}</h2>
            <div className={styles.quizBadge}>{quizData.questions.length} Questions</div>
          </div>
          
          <div className={styles.quizCardBody}>
            <p className={styles.quizDescription}>{quizData.description}</p>
            
            <div className={styles.quizInfoGrid}>
              <div className={styles.quizInfoItem}>
                <div className={styles.infoIcon}>⏱️</div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Duration</span>
                  <span className={styles.infoValue}>{quizData.timeLimit} minutes</span>
                </div>
              </div>
              
              <div className={styles.quizInfoItem}>
                <div className={styles.infoIcon}>🎯</div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Passing Score</span>
                  <span className={styles.infoValue}>{quizData.passingScore}%</span>
                </div>
              </div>
              
              <div className={styles.quizInfoItem}>
                <div className={styles.infoIcon}>🔄</div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Max Attempts</span>
                  <span className={styles.infoValue}>{quizData.maxAttempts || 'Unlimited'}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.quizInfoNote}>
              <p>You will have {quizData.timeLimit} minutes to complete this quiz. Once started, you must complete the quiz in one session.</p>
            </div>
            
            <div className={styles.welcomeActions}>
              <button className={styles.exitButton} onClick={handleExit}>
                Exit
              </button>
              <button className={styles.startButton} onClick={handleStartQuiz}>
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If the quiz is submitted, show results
  if (quizSubmitted && quizResults) {
    return (
      <div className={styles.quizContainer}>
        <div className={styles.quizResultsHeader}>
          <h2>{quizData.title} - Results</h2>
          <div className={styles.resultActions}>
            <button 
              className={styles.homeButton}
              onClick={() => navigate('/dashboard/quizzes')}
            >
              <FiHome /> Back to Quizzes
            </button>
          </div>
        </div>
        
        <div className={styles.resultsContainer}>
          <div className={styles.resultsSummary}>
            <div className={styles.resultScore}>
              <div className={`${styles.scoreCircle} ${quizResults.hasPassed ? styles.passed : styles.failed}`}>
                {quizResults.score}%
              </div>
              <div className={styles.passStatus}>
                {quizResults.hasPassed ? (
                  <span className={styles.passed}><FiCheckCircle /> Passed</span>
                ) : (
                  <span className={styles.failed}><FiX /> Failed</span>
                )}
              </div>
            </div>
            
            <div className={styles.resultsStats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Correct Answers</span>
                <span className={styles.statValue}>{quizResults.correctCount}/{quizResults.totalQuestions}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Time Taken</span>
                <span className={styles.statValue}>{formatTime(quizResults.timeSpent)}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Passing Score</span>
                <span className={styles.statValue}>{quizData.passingScore}%</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Completion Rate</span>
                <span className={styles.statValue}>
                  {Math.round((Object.keys(quizResults.questionResults).length / quizResults.totalQuestions) * 100)}%
                </span>
              </div>
            </div>
          </div>
          
          <div className={styles.questionReview}>
            <h3>Question Review</h3>
            
            {quizData.questions.map((question, index) => {
              const result = quizResults.questionResults[index];
              if (!result) return null;
              
              return (
                <div 
                  key={index} 
                  className={`${styles.reviewQuestion} ${result.isCorrect ? styles.correct : styles.incorrect}`}
                >
                  <div className={styles.reviewHeader}>
                    <h4>Question {index + 1}</h4>
                    {result.isCorrect ? (
                      <span className={styles.correctBadge}>
                        <FiCheckCircle /> Correct
                      </span>
                    ) : (
                      <span className={styles.incorrectBadge}>
                        <FiX /> Incorrect
                      </span>
                    )}
                  </div>
                  
                  <p>{question.question}</p>
                  
                  <div className={styles.reviewOptions}>
                    {question.options.map((option, optIndex) => (
                      <div 
                        key={optIndex}
                        className={`${styles.reviewOption} 
                          ${result.userAnswer === optIndex ? styles.userSelected : ''} 
                          ${question.correctAnswer === optIndex ? styles.correctAnswer : ''}`}
                      >
                        <span className={styles.optionLetter}>
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span className={styles.optionText}>{option}</span>
                      </div>
                    ))}
                  </div>
                  
                  {!result.isCorrect && (
                    <div className={styles.explanation}>
                      <h5>Explanation:</h5>
                      <p className={styles.answerExplanation}>
                        {question.explanation || 'The correct answer is ' + 
                          String.fromCharCode(65 + question.correctAnswer) + 
                          ': ' + question.options[question.correctAnswer]}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Current question being displayed
  const currentQuestion = quizData.questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error: Question not found</h2>
        <button 
          className={styles.actionButton}
          onClick={() => navigate('/dashboard/quizzes')}
        >
          Return to Quizzes
        </button>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <div className={styles.quizInfo}>
          <h2>{quizData.title}</h2>
          <div className={styles.quizMeta}>
            <span>{quizData.subject}</span>
            <span>•</span>
            <span>{quizData.questions.length} Questions</span>
            <span>•</span>
            <span>Pass Score: {quizData.passingScore}%</span>
          </div>
        </div>
        
        <div className={styles.timerContainer}>
          <div className={`${styles.timer} ${isTimeRunningOut() ? styles.timeRunningOut : ''}`}>
            <FiClock />
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </div>

      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>

      <div className={styles.quizContent}>
        <div className={styles.questionContainer}>
          <div className={styles.questionHeader}>
            <h3>Question {currentQuestionIndex + 1} of {quizData.questions.length}</h3>
            <span className={userAnswers[currentQuestionIndex] !== null ? styles.answered : styles.unanswered}>
              {userAnswers[currentQuestionIndex] !== null ? "Answered" : "Unanswered"}
            </span>
          </div>
          
          <div className={styles.questionContent}>
            <p>{currentQuestion.question}</p>
            
            <div className={styles.options}>
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`${styles.option} ${userAnswers[currentQuestionIndex] === index ? styles.selected : ''}`}
                  onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                >
                  <div className={styles.optionIndicator}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className={styles.optionText}>
                    {option}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.questionNavigation}>
            <button
              className={styles.navButton}
              onClick={goToPrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <FiArrowLeft /> Previous
            </button>
            
            <button
              className={styles.navButton}
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex === quizData.questions.length - 1}
            >
              Next <FiArrowRight />
            </button>
          </div>
        </div>
        
        <div className={styles.quizSidebar}>
          <div className={styles.questionPalette}>
            <h4>Question palette</h4>
            <div className={styles.paletteGrid}>
              {quizData.questions.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.paletteItem} 
                    ${index === currentQuestionIndex ? styles.currentQuestion : ''} 
                    ${userAnswers[index] !== null ? styles.answeredQuestion : ''}`}
                  onClick={() => goToQuestion(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          
          <div className={styles.quizLegend}>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.current}`}></div>
              <span>Current</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.answered}`}></div>
              <span>Answered</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.unanswered}`}></div>
              <span>Unanswered</span>
            </div>
          </div>
          
          <div className={styles.quizActions}>
            <button
              className={styles.submitButton}
              onClick={() => setShowConfirmSubmit(true)}
              disabled={Object.values(userAnswers).some(answer => answer === null)}
            >
              <FiFlag /> Submit Quiz
            </button>
            
            <button
              className={styles.exitButton}
              onClick={() => setShowConfirmExit(true)}
            >
              <FiX /> Exit Quiz
            </button>
          </div>
        </div>
      </div>
      
      {showConfirmSubmit && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmDialog}>
            <h3>Submit Quiz</h3>
            <p className={styles.warningText}>
              Are you sure you want to submit this quiz? You won't be able to change your answers after submission.
            </p>
            <div className={styles.dialogActions}>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowConfirmSubmit(false)}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmButton}
                onClick={submitQuiz}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showConfirmExit && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmDialog}>
            <h3>Exit Quiz</h3>
            <p className={styles.warningText}>
              Are you sure you want to exit? Your progress will be lost.
            </p>
            <div className={styles.dialogActions}>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowConfirmExit(false)}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmButton}
                onClick={handleExit}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock quiz data based on quiz ID
const getMockQuizData = (quizId) => {
  if (!quizId) return null;
  
  const quizzes = {
    'math-g3-1': {
      id: 'math-g3-1',
      title: 'Number Operations',
      subject: 'Mathematics',
      grade: 'Grade 3',
      description: 'This quiz tests your understanding of basic number operations including addition, subtraction, multiplication and division.',
      timeLimit: 20, // minutes
      passingScore: 60,
      maxAttempts: 3,
      questions: [
        {
          question: 'What is 37 + 45?',
          options: ['72', '82', '73', '92'],
          correctAnswer: 1,
          explanation: '37 + 45 = 82'
        },
        {
          question: 'What is 85 - 29?',
          options: ['46', '56', '54', '66'],
          correctAnswer: 2,
          explanation: '85 - 29 = 56'
        },
        {
          question: 'If you have 8 groups of 7 objects, how many objects do you have in total?',
          options: ['15', '48', '56', '63'],
          correctAnswer: 2,
          explanation: '8 × 7 = 56'
        },
        {
          question: 'What is 36 ÷ 4?',
          options: ['9', '8', '7', '6'],
          correctAnswer: 0,
          explanation: '36 ÷ 4 = 9'
        },
        {
          question: 'What is the value of the digit 7 in the number 275?',
          options: ['7', '70', '700', '7000'],
          correctAnswer: 1,
          explanation: 'In 275, the 7 is in the tens place, so its value is 7 × 10 = 70.'
        },
        {
          question: 'If you add 389 + 475, what digit will be in the hundreds place?',
          options: ['7', '8', '6', '9'],
          correctAnswer: 2,
          explanation: '389 + 475 = 864, so 8 is in the hundreds place.'
        },
        {
          question: 'What is 7 × 8?',
          options: ['54', '56', '48', '64'],
          correctAnswer: 1,
          explanation: '7 × 8 = 56'
        },
        {
          question: 'What number comes next in the pattern: 5, 10, 15, 20, ?',
          options: ['30', '25', '24', '22'],
          correctAnswer: 1,
          explanation: 'The pattern is adding 5 each time, so after 20 comes 25.'
        },
        {
          question: 'If you have 15 sweets and share them equally among 3 friends, how many sweets does each friend get?',
          options: ['3', '5', '6', '4'],
          correctAnswer: 1,
          explanation: '15 ÷ 3 = 5'
        },
        {
          question: 'Round 37 to the nearest ten.',
          options: ['30', '35', '37', '40'],
          correctAnswer: 3,
          explanation: 'When rounding to the nearest ten, 37 rounds up to 40 because it is closer to 40 than to 30.'
        }
      ]
    },
    'eng-g3-1': {
      id: 'eng-g3-1',
      title: 'Reading Comprehension',
      subject: 'English',
      grade: 'Grade 3',
      description: 'This quiz tests your understanding of short passages and ability to answer questions about what you have read.',
      timeLimit: 25,
      passingScore: 65,
      maxAttempts: 2,
      questions: [
        // Questions would go here
        {
          question: 'What is the main idea of this story?',
          options: [
            'The cat is afraid of the mouse.',
            'The cat and mouse become friends.',
            'The mouse is afraid of the cat.',
            'The cat wants to eat the mouse.'
          ],
          correctAnswer: 1,
          explanation: 'The main idea of the story is that the cat and mouse overcome their natural instincts and become friends.'
        },
        {
          question: 'Which word best describes the cat in the story?',
          options: ['Angry', 'Friendly', 'Sleepy', 'Scared'],
          correctAnswer: 1,
          explanation: 'The cat is described as being friendly throughout the story.'
        }
      ]
    },
    'sci-g4-1': {
      id: 'sci-g4-1',
      title: 'Living Things',
      subject: 'Science & Technology',
      grade: 'Grade 4',
      description: 'Test your knowledge about plants, animals, and other living organisms.',
      timeLimit: 15,
      passingScore: 70,
      maxAttempts: 3,
      questions: [
        // Questions would go here
        {
          question: 'Which of the following is NOT a characteristic of living things?',
          options: [
            'They can grow and develop',
            'They can reproduce',
            'They are made of metal',
            'They respond to their environment'
          ],
          correctAnswer: 2,
          explanation: 'Living things are not made of metal. They are made of cells, which are the basic units of life.'
        },
        {
          question: 'Plants make their own food through which process?',
          options: ['Respiration', 'Photosynthesis', 'Digestion', 'Excretion'],
          correctAnswer: 1,
          explanation: 'Plants make their own food through photosynthesis, using sunlight, water, and carbon dioxide.'
        }
      ]
    }
  };
  
  return quizzes[quizId] || null;
};

export default Quiz; 