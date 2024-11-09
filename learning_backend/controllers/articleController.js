const Article = require('../models/articleModel');

// Add a new article
exports.addArticle = async (req, res) => {
  try {
    const { title, content, topicTags, difficulty, author, authorUserId, collaborators } = req.body;
    const newArticle = new Article({ title, content, topicTags, difficulty, author });
    await newArticle.save();
    res.status(201).json({ message: 'Article added successfully!', article: newArticle });
  } catch (err) {
    res.status(400).json({ message: 'Error adding article', error: err.message });
  }
};

// Get all articles with optional filters and pagination
exports.getAllArticles = async (req, res) => {
  const { title, topicTags, difficulty, page = 1, limit = 10 } = req.query;

  let filter = {};

  if (title) {
    filter.title = { $regex: title, $options: 'i' };
  }

  if (topicTags) {
    filter.topicTags = { $in: topicTags.split(',') };
  }

  if (difficulty) {
    filter.difficulty = difficulty;
  }

  try {
    const skip = (page - 1) * limit;
    const articles = await Article.find(filter).skip(skip).limit(parseInt(limit));
    const totalArticles = await Article.countDocuments(filter);

    res.status(200).json({
      articles,
      totalArticles,
      page: parseInt(page),
      totalPages: Math.ceil(totalArticles / limit),
      limit: parseInt(limit),
    });
  } catch (err) {
    res.status(400).json({ message: 'Error retrieving articles', error: err.message });
  }
};

// Get articles by topic
exports.getArticlesByTopic = async (req, res) => {
  const { topicTags, page = 1, limit = 10 } = req.query;
  const filter = { topicTags: { $in: topicTags.split(',') } };

  try {
    const skip = (page - 1) * limit;
    const articles = await Article.find(filter).skip(skip).limit(parseInt(limit));
    const totalArticles = await Article.countDocuments(filter);

    res.status(200).json({
      articles,
      totalArticles,
      page: parseInt(page),
      totalPages: Math.ceil(totalArticles / limit),
      limit: parseInt(limit),
    });
  } catch (err) {
    res.status(400).json({ message: 'Error retrieving articles', error: err.message });
  }
};

// Update an article by ID
exports.updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content, topicTags, difficulty, author, collaborators, status } = req.body;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { title, content, topicTags, difficulty, author, collaborators, status },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json({ message: 'Article updated successfully', updatedArticle });
  } catch (err) {
    res.status(400).json({ message: 'Error updating article', error: err.message });
  }
};

// Delete an article by ID
exports.deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting article', error: err.message });
  }
};

// Like an article
exports.likeArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    article.likes += 1;
    await article.save();

    res.status(200).json({ message: 'Article liked successfully', article });
  } catch (err) {
    res.status(400).json({ message: 'Error liking article', error: err.message });
  }
};

// Dislike an article
exports.dislikeArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    article.dislikes += 1;
    await article.save();

    res.status(200).json({ message: 'Article disliked successfully', article });
  } catch (err) {
    res.status(400).json({ message: 'Error disliking article', error: err.message });
  }
};
