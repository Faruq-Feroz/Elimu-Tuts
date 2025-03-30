const mongoose = require('mongoose');
const validator = require('validator');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a course description'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  subject: {
    type: String,
    required: [true, 'Please specify a subject'],
    enum: {
      values: [
        'Mathematics', 'English', 'Kiswahili', 'Science', 
        'Social Studies', 'ICT', 'Religious Education', 
        'Creative Arts', 'Music', 'Home Science', 
        'Agriculture', 'Physical Education', 'Health Education',
        'Life Skills', 'Indigenous Languages', 'Foreign Languages',
        'Business Studies', 'Pre-Technical Studies'
      ],
      message: '{VALUE} is not a valid subject'
    }
  },
  level: {
    type: String,
    required: [true, 'Please specify an education level'],
    enum: {
      values: [
        'Pre-Primary', 'Lower Primary', 'Upper Primary',
        'Junior Secondary', 'Senior Secondary'
      ],
      message: '{VALUE} is not a valid education level'
    }
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  price: {
    type: Number,
    required: [true, 'Please specify a course price'],
    min: [0, 'Price cannot be negative'],
    validate: {
      validator: Number.isFinite,
      message: '{VALUE} is not a valid price'
    }
  },
  coverImage: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v, {
          protocols: ['http', 'https'],
          require_protocol: true
        });
      },
      message: 'Please provide a valid image URL'
    }
  },
  tutor: {
    type: String,
    required: [true, 'Tutor information is required'],
    ref: 'User'
  },
  enrolledStudents: [{
    type: String,
    ref: 'User'
  }],
  lessons: [{
    title: {
      type: String,
      required: [true, 'Lesson title is required']
    },
    description: String,
    videoUrl: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || validator.isURL(v, {
            protocols: ['http', 'https'],
            require_protocol: true
          });
        },
        message: 'Please provide a valid video URL'
      }
    },
    duration: {
      type: Number,
      min: [0, 'Lesson duration must be positive']
    },
    order: {
      type: Number,
      min: [1, 'Lesson order must start from 1']
    }
  }],
  rating: {
    type: Number,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot exceed 5'],
    default: 0
  },
  reviews: [{
    user: {
      type: String,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: [true, 'Review rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    comment: {
      type: String,
      maxlength: [500, 'Review comment cannot exceed 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound index for performance
courseSchema.index({ subject: 1, level: 1 });

// Virtual to get total enrolled students
courseSchema.virtual('totalEnrolledStudents').get(function() {
  return this.enrolledStudents.length;
});

// Pre-save validation hook
courseSchema.pre('save', function(next) {
  // Ensure lessons are uniquely ordered
  if (this.lessons && this.lessons.length > 0) {
    const orders = this.lessons.map(lesson => lesson.order);
    const uniqueOrders = new Set(orders);
    
    if (uniqueOrders.size !== orders.length) {
      return next(new Error('Lesson orders must be unique'));
    }
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema);