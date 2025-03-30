const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/auth');

// Import course controllers
const courseController = require('../controllers/courseController');

// Validation middleware for course creation and update
const validateCourseInput = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
  
  body('subject')
    .isIn([
      'Mathematics', 'English', 'Kiswahili', 'Science', 
      'Social Studies', 'ICT', 'Religious Education', 
      'Creative Arts', 'Music', 'Home Science', 
      'Agriculture', 'Physical Education', 'Health Education',
      'Life Skills', 'Indigenous Languages', 'Foreign Languages',
      'Business Studies', 'Pre-Technical Studies'
    ]).withMessage('Invalid subject'),
  
  body('level')
    .isIn([
      'Pre-Primary', 'Lower Primary', 'Upper Primary',
      'Junior Secondary', 'Senior Secondary'
    ]).withMessage('Invalid education level'),
  
  body('difficulty')
    .optional()
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('Invalid difficulty level'),
  
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
  
  body('coverImage')
    .optional()
    .isURL().withMessage('Must be a valid URL')
    .optional({ checkFalsy: true }),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }
    next();
  }
];

// Routes
router.post('/', 
  auth,  // Authentication middleware
  validateCourseInput, 
  courseController.createCourse
);

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);

router.put('/:id', 
  auth,  // Authentication middleware
  validateCourseInput, 
  courseController.updateCourse
);

router.delete('/:id', auth, courseController.deleteCourse);

module.exports = router;