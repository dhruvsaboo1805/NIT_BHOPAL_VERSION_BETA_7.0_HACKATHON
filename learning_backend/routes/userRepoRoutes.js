const express = require('express');
const router = express.Router();

// Import the necessary controller
const { createUser } = require('../controllers/userRepoController');

// Define the route to create a new user
router.post('/create', createUser);

// Define the route to update solved questions
router.post('/update-solved-question');

// Export the router so it can be used in the main app
module.exports = router;
