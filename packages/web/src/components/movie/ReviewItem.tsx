import React from 'react';

const ReviewItem = ({ review }: { review: any }) => (
  <li className="review-item">
    <img
      className="review-avatar"
      src={
        review.author_details.avatar_path
          ? review.author_details.avatar_path.startsWith('/https')
            ? review.author_details.avatar_path.slice(1)
            : `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`
          : '/default-profile.png'
      }
      alt={review.author}
    />
    <div>
      <div className="review-author">
        {review.author}
        {review.author_details.rating && (
          <span className="review-rating">★ {review.author_details.rating}</span>
        )}
      </div>
      <div className="review-content">{review.content}</div>
    </div>
  </li>
);

export default ReviewItem; 