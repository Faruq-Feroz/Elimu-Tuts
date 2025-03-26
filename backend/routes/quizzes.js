const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { verifyToken } = require('../middleware/firebaseAuth');
const {
  createQuiz,
  getCourseQuizzes,
  getQuiz,
  submitQuiz,
  updateQuiz,
  deleteQuiz
} = require('../controllers/quizController');

// Validation middleware
const quizValidation = [
  body('title').not().isEmpty().trim().escape(),
  body('description').not().isEmpty().trim().escape(),
  body('duration').isInt({ min: 1 }),
  body('passingScore').isInt({ min: 0, max: 100 }),
  body('maxAttempts').isInt({ min: 1 }),
  body('questions').isArray().notEmpty(),
  body('questions.*.question').not().isEmpty().trim().escape(),
  body('questions.*.options').isArray().notEmpty(),
  body('questions.*.options.*').not().isEmpty().trim().escape(),
  body('questions.*.correctAnswer').isInt({ min: 0 }),
  body('questions.*.explanation').not().isEmpty().trim().escape()
];

// Routes
router.post('/courses/:courseId', 
  verifyToken,
  quizValidation,
  createQuiz
);

router.get('/courses/:courseId', getCourseQuizzes);
router.get('/:quizId', getQuiz);
router.post('/:quizId/submit', submitQuiz);

// Protected routes (tutor only)
router.put('/:quizId', 
  verifyToken,
  quizValidation,
  updateQuiz
);

router.delete('/:quizId', 
  verifyToken,
  deleteQuiz
);

module.exports = router; 