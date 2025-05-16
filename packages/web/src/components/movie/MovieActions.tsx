import React from 'react';
import ActionButton from './ActionButton';

const MovieActions = ({ poster, title }: { poster: string, title: string }) => (
  <div className="movie-poster-actions">
    <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt={title} className="movie-poster-large" />
    <div className="movie-actions">
      <ActionButton>보고싶어요</ActionButton>
      <ActionButton>평가하기</ActionButton>
      <ActionButton>왓챠파티</ActionButton>
      <ActionButton>더보기</ActionButton>
    </div>
  </div>
);

export default MovieActions; 