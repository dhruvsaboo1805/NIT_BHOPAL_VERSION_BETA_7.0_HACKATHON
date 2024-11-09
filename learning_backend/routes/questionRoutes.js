// routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// POST request to add a new question
router.post('/', questionController.addQuestion);

// GET request to get all questions with search query
router.get('/', questionController.getAllQuestions);

// PUT request to update a question by ID
router.put('/:id', questionController.updateQuestion);

module.exports = router;
