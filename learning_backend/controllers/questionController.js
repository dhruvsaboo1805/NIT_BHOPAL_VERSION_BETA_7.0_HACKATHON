// controllers/questionController.js
const Question = require('../models/questionModel');

// Add a new question
exports.addQuestion = async (req, res) => {
  try {
    const { questionName, questionNumber, difficulty, options, correctOption, status, solved, topicTags } = req.body;
    const newQuestion = new Question({ questionName, questionNumber, difficulty, options, correctOption, status, solved, topicTags });
    await newQuestion.save();
    res.status(201).json({ message: 'Question added successfully!', question: newQuestion });
  } catch (err) {
    res.status(400).json({ message: 'Error adding question', error: err.message });
  }
};

// Get all questions with optional search parameters and pagination
exports.getAllQuestions = async (req, res) => {
  const { questionName, topicTags, difficulty, page = 1, limit = 10 } = req.query; // Get query params with defaults

  let filter = {};

  // If questionName is provided, add it to the filter (case-insensitive)
  if (questionName) {
    filter.questionName = { $regex: questionName, $options: 'i' };
  }

  // If topicTags is provided, add it to the filter (comma-separated values)
  if (topicTags) {
    filter.topicTags = { $in: topicTags.split(',') };
  }

  // If difficulty is provided, add it to the filter
  if (difficulty) {
    filter.difficulty = difficulty;
  }

  try {
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Find questions with filters and pagination
    const questions = await Question.find(filter).skip(skip).limit(parseInt(limit));

    // Count total questions matching the filter for pagination purposes
    const totalQuestions = await Question.countDocuments(filter);

    res.status(200).json({
      questions,
      totalQuestions,
      page: parseInt(page),
      totalPages: Math.ceil(totalQuestions / limit),
      limit: parseInt(limit),
    });
  } catch (err) {
    res.status(400).json({ message: 'Error retrieving questions', error: err.message });
  }
};


// Update a question by ID
exports.updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { questionName, difficulty, options, correctOption, status, solved, topicTags } = req.body;

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { questionName, difficulty, options, correctOption, status, solved, topicTags },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question updated successfully', updatedQuestion });
  } catch (err) {
    res.status(400).json({ message: 'Error updating question', error: err.message });
  }
};
