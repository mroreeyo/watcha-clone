import React from 'react';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews, loading }: { reviews: any[], loading: boolean }) => (
  <div className="movie-review-section">
    <h2>왓챠피디아 사용자 평 <span>{reviews.length ? reviews.length + '+' : ''}</span></h2>
    {loading ? (
      <div>리뷰 로딩 중...</div>
    ) : reviews.length === 0 ? (
      <div className="no-review-msg">아직 등록된 리뷰가 없습니다.</div>
    ) : (
      <ul className="review-list">
        {reviews.map((review: any) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    )}
  </div>
);

export default ReviewList; 