import React from 'react';

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className={`text-2xl ${
            star <= rating ? 'text-yellow-500' : 'text-gray-300'
          } hover:text-yellow-500 transition-all duration-200`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;