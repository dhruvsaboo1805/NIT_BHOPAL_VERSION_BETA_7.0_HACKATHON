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

async function updateSolvedQuestion(req, res) {
  const { email, questionName } = req.body;  // Expected fields: email, questionName

  try {
    // Find the user by email
    const user = await UserRepo.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the question has already been solved
    if (user.solvedQuestions.includes(questionName)) {
      return res.status(400).json({ message: 'Question already solved' });
    }

    // Update the solved questions array and increment the counters
    user.solvedQuestions.push(questionName);
    user.numQuestionsSolved += 1;
    
    // Update the streak and lastSolvedDate fields
    const today = new Date();
    const lastSolvedDate = user.lastSolvedDate ? new Date(user.lastSolvedDate) : null;

    // Check if the last solved date was yesterday for streak continuity
    if (lastSolvedDate && (today - lastSolvedDate) / (1000 * 60 * 60 * 24) <= 1) {
      user.streak += 1;  // Increment streak
    } else {
      user.streak = 1;  // Reset streak to 1 if it's a new streak
    }
    user.lastSolvedDate = today;

    // Save the updated user data
    await user.save();

    return res.status(200).json({
      message: 'Solved question updated successfully',
      user,
    });
  } catch (error) {
    console.error('Error updating solved question:', error);
    return res.status(500).json({ message: 'Error updating solved question', error: error.message });
  }
}

  // Controller to get a user by email
async function getUserByEmail(req, res) {
  const { email } = req.body;  // Expected field: email
  
  try {
    // Find the user by email, excluding sensitive fields like password
    const user = await UserRepo.findOne({ email }, { password: 0 });

    // If the user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data in the response
    return res.status(200).json({
      message: 'User retrieved successfully',
      user,
    });
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
}


module.exports = { createUser, updateSolvedQuestion ,getUserByEmail};