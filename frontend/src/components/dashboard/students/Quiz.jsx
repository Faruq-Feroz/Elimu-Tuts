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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (quizId) {
      fetchQuiz(quizId);
    }
  }, [quizId, fetchQuiz]);

  useEffect(() => {
    if (currentQuiz) {
      setTimeLeft(currentQuiz.duration * 60); // Convert minutes to seconds
    }
  }, [currentQuiz]);

  useEffect(() => {
    if (timeLeft === null || isSubmitted) return;

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
  }, [timeLeft, isSubmitted]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
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

  if (loading) {
    return <div className={styles.loading}>Loading quiz...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!currentQuiz) {
    return <div className={styles.error}>Quiz not found</div>;
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <h1>{currentQuiz.title}</h1>
        <div className={styles.quizInfo}>
          <p>Duration: {formatTime(timeLeft)}</p>
          <p>Questions: {currentQuiz.questions.length}</p>
          <p>Passing Score: {currentQuiz.passingScore}%</p>
        </div>
      </div>

      {!isSubmitted ? (
        <div className={styles.questionsContainer}>
          {currentQuiz.questions.map((question, index) => (
            <div key={question._id} className={styles.questionCard}>
              <h3>Question {index + 1}</h3>
              <p>{question.text}</p>
              <div className={styles.options}>
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex} className={styles.option}>
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={optionIndex}
                      checked={answers[question._id] === optionIndex}
                      onChange={() => handleAnswerChange(question._id, optionIndex)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button 
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={isSubmitted}
          >
            Submit Quiz
          </button>
        </div>
      ) : (
        <div className={styles.resultCard}>
          <h2>Quiz Results</h2>
          <div className={styles.resultDetails}>
            <p>Score: {result.score}%</p>
            <p>Status: {result.passed ? 'Passed' : 'Failed'}</p>
            <p>Correct Answers: {result.correctAnswers}</p>
            <p>Total Questions: {result.totalQuestions}</p>
          </div>
          <button 
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            Back to Course
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz; 