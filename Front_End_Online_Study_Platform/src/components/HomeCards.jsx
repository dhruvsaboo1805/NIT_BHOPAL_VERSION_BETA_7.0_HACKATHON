import React from 'react'
import "../styles/HomeCards.css";

const HomeCards = ({ imgSrc, title, description }) => {
    return (
        <div className="home_card">
          <img src={imgSrc} alt={title} className="home_card-image" />
          <div className="home_card-content">
            <h3 className="home_card-title">{title}</h3>
            <p className="home_card-description">{description}</p>
          </div>
        </div>
      );
}

export default HomeCards
