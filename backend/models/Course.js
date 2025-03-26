// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
    enum: [
      'Mathematics', 'English', 'Kiswahili', 'Science', 
      'Social Studies', 'ICT', 'Religious Education', 
      'Creative Arts', 'Music', 'Home Science', 
      'Agriculture', 'Physical Education', 'Health Education',
      'Life Skills', 'Indigenous Languages', 'Foreign Languages',
      'Business Studies', 'Pre-Technical Studies'
    ]
  },
  level: {
    type: String,
    required: [true, 'Please add an education level'],
    enum: [
      'Pre-Primary', 'Lower Primary', 'Upper Primary',
      'Junior Secondary', 'Senior Secondary'
    ]
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  coverImage: {
    type: String,
    required: [true, 'Please add a cover image']
  },
  tutor: {
    type: String,
    required: true,
    ref: 'User'
  },
  enrolledStudents: [{
    type: String,
    ref: 'User'
  }],
  lessons: [{
    title: String,
    description: String,
    videoUrl: String,
    duration: Number,
    order: Number
  }],
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  reviews: [{
    user: {
      type: String,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);