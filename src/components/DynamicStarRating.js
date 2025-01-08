import React, { useState } from 'react';
import './DynamicStarRating.css';

function Star({ fillPercentage }) {
  const clamped = Math.max(0, Math.min(1, fillPercentage));
  const offset = (clamped * 100).toFixed(0) + '%';

  return (
  
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className="star-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`grad${offset}`}>
          {/* partie dorée */}
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset={offset} stopColor="#FFD700" />
          {/* Partie grise */}
          <stop offset={offset} stopColor="#ccc" />
          <stop offset="100%" stopColor="#ccc" />
        </linearGradient>
      </defs>
      <polygon
        fill={`url(#grad${offset})`}
        points="12,2 15.09,8.26 
                22,9.27 17,14.14 
                18.18,21.02 12,17.77 
                5.82,21.02 7,14.14 
                2,9.27 8.91,8.26"
      />
    </svg>
  );
}

export default function DynamicStarRating({ rating, onChange, readOnly = false }) {
  const [hoverRating, setHoverRating] = useState(null);

  const handleMouseMove = (starIndex, e) => {
    if (readOnly) return;
    const { width, left } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    setHoverRating(x < width / 2 ? starIndex - 0.5 : starIndex);
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(null);
    }
  };

  const handleClick = () => {
    if (!readOnly && hoverRating && onChange) {
      onChange(hoverRating);
    }
  };

  const displayRating = hoverRating ?? rating;
  const stars = [1, 2, 3, 4, 5].map((starIndex) => {
    const starValue = displayRating - (starIndex - 1);
  
    const fillPercentage = Math.max(0, Math.min(1, starValue));

    return (
      <div
        key={starIndex}
        className="star-container"
        onMouseMove={(e) => handleMouseMove(starIndex, e)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ cursor: readOnly ? 'default' : 'pointer' }}
      >
        <Star fillPercentage={fillPercentage} />
      </div>
    );
  });

  return <div className="star-rating">{stars}</div>;
}
