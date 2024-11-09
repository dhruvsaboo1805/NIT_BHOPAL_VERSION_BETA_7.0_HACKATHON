const express = require('express');
const mongoose = require('mongoose');
const questionRoutes = require('./routes/questionRoutes');  
const articleRoutes = require('./routes/articleRoutes');    
const userRepoRoutes = require('./routes/userRepoRoutes');  
require('dotenv').config();  

const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
app.use(cors({ origin: true })); 

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
app.use('/user', userRepoRoutes);  
app.use('/question-list', questionRoutes);  
app.use('/article-list', articleRoutes);  

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
