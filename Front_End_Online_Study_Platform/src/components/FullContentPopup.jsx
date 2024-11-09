import React from "react";
import "../styles/FullContentPopup.css";

const FullContentPopup = ({ content, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default FullContentPopup;
