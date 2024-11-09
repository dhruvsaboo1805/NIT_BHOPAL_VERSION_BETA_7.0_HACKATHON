const mongoose = require('mongoose');

const userRepoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateAccCreated: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  numQuestionsSolved: { type: Number, default: 0 },
  numArticlesContributed: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },  // Track current streak
  points: { type: Number, default: 0 },  // Total points
  activeDays: { type: Number, default: 0 },  // Track active days
  solvedQuestions: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      solvedOn: { type: Date }
    }
  ],
  lastSolvedDate: { type: Date },  // New field to track the last solved date
});

module.exports = mongoose.model('UserRepo', userRepoSchema);
