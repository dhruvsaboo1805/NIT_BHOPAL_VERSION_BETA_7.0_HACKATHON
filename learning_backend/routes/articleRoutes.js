const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Add a new article
router.post('/add', articleController.addArticle);

// Get all articles (with filters and pagination)
router.get('/', articleController.getAllArticles);

// Get articles by topic tags (with pagination)
router.get('/topic', articleController.getArticlesByTopic);

// Update an article
router.put('/update/:id', articleController.updateArticle);

// Delete an article
router.delete('/delete/:id', articleController.deleteArticle);

// Like an article
router.post('/like/:id', articleController.likeArticle);

// Dislike an article
router.post('/dislike/:id', articleController.dislikeArticle);

module.exports = router;
