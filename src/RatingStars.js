import React from 'react';

const RatingStars = ({ rating }) => {
 
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i} className="star">&#9733;</span>);
    } else {
      stars.push(<span key={i} className="star">&#9734;</span>);
    }
  }

  return <div className="rating-stars">{stars}</div>;
};

export default RatingStars;
