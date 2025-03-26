const Quiz = require('../models/Quiz');
const { validationResult } = require('express-validator');

// Create a new quiz
exports.createQuiz = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const quiz = new Quiz({
      ...req.body,
      course: req.params.courseId
    });

    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating quiz', 
      error: error.message 
    });
  }
};

// Get all quizzes for a course
exports.getCourseQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ course: req.params.courseId })
      .select('-questions.correctAnswer -questions.explanation');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching quizzes', 
      error: error.message 
    });
  }
};

// Get a specific quiz
exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId)
      .select('-questions.correctAnswer -questions.explanation');

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching quiz', 
      error: error.message 
    });
  }
};

// Submit quiz answers
exports.submitQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const { answers } = req.body;
    let score = 0;
    const results = [];

    // Calculate score and prepare results
    quiz.questions.forEach((question, index) => {
      const isCorrect = answers[index] === question.correctAnswer;
      if (isCorrect) score++;
      
      results.push({
        question: question.question,
        userAnswer: answers[index],
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      });
    });

    const percentageScore = (score / quiz.questions.length) * 100;
    const passed = percentageScore >= quiz.passingScore;

    res.json({
      score: percentageScore,
      passed,
      results
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error submitting quiz', 
      error: error.message 
    });
  }
};

// Update a quiz
exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.quizId,
      req.body,
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating quiz', 
      error: error.message 
    });
  }
};

// Delete a quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting quiz', 
      error: error.message 
    });
  }
}; 