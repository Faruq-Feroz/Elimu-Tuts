const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/firebaseAuth');

// Import course controllers
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

// Validation middleware for course creation/update
const courseValidation = [
  body('title')
    .not().isEmpty().withMessage('Title is required')
    .trim()
    .escape()
    .isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  
  body('description')
    .not().isEmpty().withMessage('Description is required')
    .trim()
    .escape()
    .isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
  
  body('subject').isIn([
    'Mathematics', 'English', 'Kiswahili', 'Science', 
    'Social Studies', 'ICT', 'Religious Education', 
    'Creative Arts', 'Music', 'Home Science', 
    'Agriculture', 'Physical Education', 'Health Education',
    'Life Skills', 'Indigenous Languages', 'Foreign Languages',
    'Business Studies', 'Pre-Technical Studies'
  ]).withMessage('Invalid subject'),
  
  body('level').isIn([
    'Pre-Primary', 'Lower Primary', 'Upper Primary',
    'Junior Secondary', 'Senior Secondary'
  ]).withMessage('Invalid education level'),
  
  body('difficulty').optional().isIn([
    'Beginner', 'Intermediate', 'Advanced'
  ]).withMessage('Invalid difficulty level'),
  
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a non-negative number')
];

// Protected routes (require authentication)
router.post('/', auth, courseValidation, createCourse);
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.put('/:id', auth, courseValidation, updateCourse);
router.delete('/:id', auth, deleteCourse);

module.exports = router;