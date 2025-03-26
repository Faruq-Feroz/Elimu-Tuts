import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizzes } from '../../../context/QuizContext';
import styles from './QuizManager.module.css';

const QuizManager = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { quizzes, loading, error, fetchCourseQuizzes, createQuiz, updateQuiz, deleteQuiz } = useQuizzes();
  const [isCreating, setIsCreating] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 30,
    passingScore: 70,
    maxAttempts: 3,
    questions: []
  });

  useEffect(() => {
    if (courseId) {
      fetchCourseQuizzes(courseId);
    }
  }, [courseId, fetchCourseQuizzes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          text: '',
          options: ['', '', '', ''],
          correctAnswer: 0
        }
      ]
    }));
  };

  const removeQuestion = (index) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingQuiz) {
        await updateQuiz(editingQuiz._id, formData);
      } else {
        await createQuiz(courseId, formData);
      }
      setIsCreating(false);
      setEditingQuiz(null);
      setFormData({
        title: '',
        description: '',
        duration: 30,
        passingScore: 70,
        maxAttempts: 3,
        questions: []
      });
    } catch (error) {
      console.error('Failed to save quiz:', error);
    }
  };

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
    setFormData({
      title: quiz.title,
      description: quiz.description,
      duration: quiz.duration,
      passingScore: quiz.passingScore,
      maxAttempts: quiz.maxAttempts,
      questions: quiz.questions
    });
    setIsCreating(true);
  };

  const handleDelete = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await deleteQuiz(quizId);
      } catch (error) {
        console.error('Failed to delete quiz:', error);
      }
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading quizzes...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.quizManager}>
      <div className={styles.header}>
        <h1>Quiz Manager</h1>
        <button 
          className={styles.createButton}
          onClick={() => setIsCreating(true)}
        >
          Create New Quiz
        </button>
      </div>

      {(isCreating || editingQuiz) && (
        <form onSubmit={handleSubmit} className={styles.quizForm}>
          <div className={styles.formGroup}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Passing Score (%)</label>
              <input
                type="number"
                name="passingScore"
                value={formData.passingScore}
                onChange={handleInputChange}
                min="0"
                max="100"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Max Attempts</label>
              <input
                type="number"
                name="maxAttempts"
                value={formData.maxAttempts}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className={styles.questionsSection}>
            <h2>Questions</h2>
            {formData.questions.map((question, index) => (
              <div key={index} className={styles.questionCard}>
                <div className={styles.questionHeader}>
                  <h3>Question {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>

                <div className={styles.formGroup}>
                  <label>Question Text</label>
                  <textarea
                    value={question.text}
                    onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                    required
                  />
                </div>

                <div className={styles.options}>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className={styles.optionGroup}>
                      <label>Option {optionIndex + 1}</label>
                      <div className={styles.optionInput}>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...question.options];
                            newOptions[optionIndex] = e.target.value;
                            handleQuestionChange(index, 'options', newOptions);
                          }}
                          required
                        />
                        <input
                          type="radio"
                          name={`correct-${index}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => handleQuestionChange(index, 'correctAnswer', optionIndex)}
                        />
                        <span>Correct</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addQuestion}
              className={styles.addQuestionButton}
            >
              Add Question
            </button>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {editingQuiz ? 'Update Quiz' : 'Create Quiz'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingQuiz(null);
                setFormData({
                  title: '',
                  description: '',
                  duration: 30,
                  passingScore: 70,
                  maxAttempts: 3,
                  questions: []
                });
              }}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className={styles.quizzesList}>
        {quizzes.map(quiz => (
          <div key={quiz._id} className={styles.quizCard}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <div className={styles.quizInfo}>
              <span>Duration: {quiz.duration} minutes</span>
              <span>Questions: {quiz.questions.length}</span>
              <span>Passing Score: {quiz.passingScore}%</span>
            </div>
            <div className={styles.quizActions}>
              <button
                onClick={() => handleEdit(quiz)}
                className={styles.editButton}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(quiz._id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizManager; 