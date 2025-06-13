import React from 'react';
import '../styles/MovieCard.css';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
  };
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const { title, overview, backdrop_path } = movie;
  
  return (
    <div className="movie-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : undefined }}>
      <div className="image-container">
        <img 
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt={title}
        />
      </div>
      <div className="movie-info">
        <h2>{title}</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;