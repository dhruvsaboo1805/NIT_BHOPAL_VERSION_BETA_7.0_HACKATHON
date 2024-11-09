const express = require('express');
const mongoose = require('mongoose');
const questionRoutes = require('./routes/questionRoutes'); // Import question routes
const articleRoutes = require('./routes/articleRoutes'); 
require('dotenv').config(); // Load environment variables from .env file

// Initialize the Express app
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection using environment variable for the URL
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Version App API! Use /question-list to manage questions and /article-list to manage articles.');
});

// Use routes for the /question-list endpoint
app.use('/question-list', questionRoutes);

// Use routes for the /article-list endpoint
app.use('/article-list', articleRoutes);  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
