const UserRepo = require('../models/userRepoModel');  // Assuming this is the model for user

// Controller to create a new user
async function createUser(req, res) {
  const { name, email } = req.body;  // Expected fields: name, email

  try {
    // Check if the user already exists
    const existingUser = await UserRepo.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new UserRepo({
      name,
      email,
      dateAccCreated: new Date(),
      isActive: true,  // Default is active
      numQuestionsSolved: 0,
      numArticlesContributed: 0,
      streak: 0,
      points: 0,
      activeDays: 0,
      solvedQuestions: [],
      lastSolvedDate: null,
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Error creating user', error: error.message });
  }
}

module.exports = { createUser, updateSolvedQuestion }; 
