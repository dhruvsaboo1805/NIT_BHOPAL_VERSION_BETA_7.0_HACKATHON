const express = require('express');
const mongoose = require('mongoose');
const questionRoutes = require('./routes/questionRoutes');  // Import question routes
const articleRoutes = require('./routes/articleRoutes');    // Import article routes
const userRepoRoutes = require('./routes/userRepoRoutes');  // Import user repository routes
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Version App API!');
});

// Use routes for each API
app.use('/user', userRepoRoutes);  // Correct usage of the route middleware
app.use('/question-list', questionRoutes);  // Correct usage of the route middleware
app.use('/article-list', articleRoutes);  // Correct usage of the route middleware

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
