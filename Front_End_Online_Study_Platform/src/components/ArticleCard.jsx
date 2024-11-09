// ArticleCard.js
import React from "react";
import "../styles/ArticleCard.css"; // Create this CSS file for styling

const ArticleCard = ({
  img,
  title,
  content,
  topicTags,
  author,
  likes,
  dislikes,
}) => {
  return (
    <div className="article-card">
      <img src={img} alt={title} className="article-image" />
      <div className="article-content">
        <h2>{title}</h2>
        <p>{content.substring(0, 150)}...</p>
        <div className="tags">
          {topicTags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="footer">
          <span>Author: {author}</span>
          <div className="likes-dislikes">
            <span>👍 {likes}</span>
            <span>👎 {dislikes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
