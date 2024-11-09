// models/questionModel.js
const mongoose = require('mongoose');

// Validator to make sure options array contains exactly 4 elements
function arrayLimit(val) {
  return val.length === 4;
}

// Define the schema
const questionSchema = new mongoose.Schema(
  {
    questionName: { type: String, required: true },
    questionNumber: { type: Number, required: true, unique: true },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    options: {
      type: [String],
      validate: [arrayLimit, '{PATH} must contain 4 options'],
      required: true,
      minlength: 4,
      maxlength: 4,
    },
    correctOption: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    solved: {
      type: Boolean,
      default: false,
    },
    topicTags: {
      type: [String], // An array to store multiple tags for categorizing
      required: true,
    },
  },
  {
    collection: 'mcq_questions', // Custom collection name
  }
);

// Create the model
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
