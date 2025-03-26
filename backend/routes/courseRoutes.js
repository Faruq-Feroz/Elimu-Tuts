// routes/users.js

const express = require('express');
const router = express.Router();

const {getCourse,getCourseId,addCourse,updateCourse,deleteCourse} = require('../controllers/courseController');

// Protected routes (require authentication)
router.post('/add',addCourse);
router.get('/', getCourse);
router.get('/:id', getCourseId);
router.put('/update/:id', updateCourse);
router.delete('/delete/:id', deleteCourse);

module.exports = router;