const mongoose = require('mongoose');
const Course = require('../models/Course');

// Sample course data
const sampleCourses = [
  {
    title: "Introduction to Mathematics",
    description: "A comprehensive course covering fundamental mathematical concepts for primary school students.",
    subject: "Mathematics",
    level: "Lower Primary",
    price: 29.99,
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isCBCAligned: true,
    tutor: "65f8a1b2c3d4e5f6g7h8i9j0k" // Replace with actual tutor ID
  },
  {
    title: "English Language Fundamentals",
    description: "Master the basics of English language including grammar, vocabulary, and reading comprehension.",
    subject: "English",
    level: "Upper Primary",
    price: 34.99,
    coverImage: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isCBCAligned: true,
    tutor: "65f8a1b2c3d4e5f6g7h8i9j0k"
  },
  {
    title: "Science Explorer",
    description: "Discover the wonders of science through interactive experiments and engaging lessons.",
    subject: "Science",
    level: "Junior Secondary",
    price: 39.99,
    coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isCBCAligned: true,
    tutor: "65f8a1b2c3d4e5f6g7h8i9j0k"
  },
  {
    title: "Kiswahili Basics",
    description: "Learn the fundamentals of Kiswahili language including greetings, numbers, and basic conversation.",
    subject: "Kiswahili",
    level: "Pre-Primary",
    price: 24.99,
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isCBCAligned: true,
    tutor: "65f8a1b2c3d4e5f6g7h8i9j0k"
  },
  {
    title: "ICT Fundamentals",
    description: "Introduction to Information and Communication Technology for beginners.",
    subject: "ICT",
    level: "Upper Primary",
    price: 44.99,
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isCBCAligned: true,
    tutor: "65f8a1b2c3d4e5f6g7h8i9j0k"
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/elimu-tuts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  // Clear existing courses
  await Course.deleteMany({});
  console.log('Cleared existing courses');
  
  // Insert sample courses
  await Course.insertMany(sampleCourses);
  console.log('Inserted sample courses');
  
  // Close the connection
  mongoose.connection.close();
  console.log('Database connection closed');
})
.catch(error => {
  console.error('Error connecting to MongoDB:', error);
  mongoose.connection.close();
});
