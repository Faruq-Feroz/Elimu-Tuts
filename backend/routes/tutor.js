const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Course = require('../models/Course');

// Get tutor's courses
router.get('/courses', async (req, res) => {
  try {
    // If a tutor ID is provided in the query, filter by it
    const tutorId = req.query.tutorId;
    let query = {};
    
    if (tutorId) {
      query.tutor = tutorId;
    }

    // Get courses for the requested tutor or all courses if no tutor specified
    const tutorCourses = await Course.find(query)
      .sort({ createdAt: -1 });

    res.status(200).json(tutorCourses);
  } catch (error) {
    console.error('Error fetching tutor courses:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch tutor courses'
    });
  }
});

// Create a new course as a tutor
router.post('/courses', async (req, res) => {
  try {
    // Create course with tutor ID from request body
    const courseData = {
      ...req.body,
      tutor: req.body.tutor
    };

    const course = new Course(courseData);
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Failed',
        details: errors
      });
    }
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create course'
    });
  }
});

// Update course as a tutor
router.put('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Update course
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Failed',
        details: errors
      });
    }
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update course'
    });
  }
});

// Delete course as a tutor
router.delete('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete course'
    });
  }
});

module.exports = router; 