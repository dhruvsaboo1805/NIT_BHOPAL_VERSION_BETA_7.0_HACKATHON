import React, { useState } from "react";
import "../styles/HomeCards.css";
import FullContentPopup from "./FullContentPopup";

const HomeCards = ({ imgSrc, title, description }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleReadMore = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
    <div className="home_card">
      <img src={imgSrc} alt={title} className="home_card-image" />
      <div className="home_card-content">
        <h3 className="home_card-title">{title}</h3>
        <p className="home_card-description">
          {description.split(" ").slice(0, 10).join(" ")}...
        </p>
        <button onClick={handleReadMore} className="read-more-button">
          Read More
        </button>
      </div>

    </div>
      {showPopup && (
        <FullContentPopup content={description} onClose={handleClosePopup} />
      )}
    </>
  );
};

export default HomeCards;
