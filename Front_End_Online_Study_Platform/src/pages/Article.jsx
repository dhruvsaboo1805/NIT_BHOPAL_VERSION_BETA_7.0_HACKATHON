import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Article.css";
import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";

const apiUrl = "https://version-app-lac.vercel.app/article-list";

const Article = () => {
  // State to store articles
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(apiUrl); 
        console.log("after fetching");
        setArticles(response.data.articles); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="article_hero-section">
        <h1>Latest Articles on Technology</h1>
        <p>
          Explore our curated list of articles on cutting-edge technology topics, including AI, Blockchain, Quantum Computing, and more.
        </p>
      </div>

      {/* Article Cards */}
      <div className="articles-container">
        {loading ? (
          <p>Loading articles...</p>
        ) : error ? (
          <p>Error loading articles: {error}</p>
        ) : (
          articles.map((article) => (
            <ArticleCard
              key={article._id}
              img="sdhkh.png" // Replace with actual image URL if available
              title={article.title}
              content={article.content}
              topicTags={article.topicTags}
              author={article.author}
              likes={article.likes}
              dislikes={article.dislikes}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Article;
