const Course = require('../models/Course');
const mongoose = require('mongoose');

// Helper function for standardized error response
const sendErrorResponse = (res, statusCode, error) => {
  console.error('Error:', error);
  res.status(statusCode).json({
    success: false,
    error: error.message,
    details: error.errors || error
  });
};

// Create a new course
const createCourse = async (req, res) => {
  try {
    // Validate user authentication
    if (!req.user || !req.user.uid) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    // Create course with tutor ID from authenticated user
    const courseData = {
      ...req.body,
      tutor: req.user.uid
    };

    const course = new Course(courseData);
    await course.save();

    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Mongoose validation error
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Failed',
        details: errors
      });
    }
    sendErrorResponse(res, 500, error);
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    const { 
      subject, 
      level, 
      difficulty, 
      minPrice, 
      maxPrice 
    } = req.query;

    // Build query dynamically
    const query = {};
    if (subject) query.subject = subject;
    if (level) query.level = level;
    if (difficulty) query.difficulty = difficulty;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const courses = await Course.find(query)
      .sort({ createdAt: -1 })
      .select('-lessons -reviews'); // Exclude detailed lesson and review data

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid course ID'
      });
    }

    const course = await Course.findById(req.params.id)
      .populate('tutor', 'fullName email'); // Optional: populate tutor details

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    // Validate user authentication and course ownership
    if (!req.user || !req.user.uid) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid course ID'
      });
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Check course ownership
    if (course.tutor.toString() !== req.user.uid) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this course'
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

    res.status(200).json({
      success: true,
      data: updatedCourse
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Failed',
        details: errors
      });
    }
    sendErrorResponse(res, 500, error);
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    // Validate user authentication
    if (!req.user || !req.user.uid) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid course ID'
      });
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Check course ownership
    if (course.tutor.toString() !== req.user.uid) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this course'
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Course successfully deleted'
    });
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};