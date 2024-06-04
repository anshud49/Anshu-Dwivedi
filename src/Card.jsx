import React from 'react';
import './Card.css';

const Card = ({ title, editionCount, isAdded, onAdd }) => {
  return (
    <div className="card">
      <div className="card-item"><strong>Book Title:</strong> {title}</div>
      <div className="card-item"><strong>Edition Count:</strong> {editionCount}</div>
      {!isAdded && (
        <div className="card-item card-button">
          <button onClick={onAdd}>Add to Bookshelf</button>
        </div>
      )}
    </div>
  );
}

export default Card;
