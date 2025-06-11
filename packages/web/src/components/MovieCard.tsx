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
          src={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
          alt={title}
          srcSet={`https://image.tmdb.org/t/p/w400${backdrop_path} 400w, https://image.tmdb.org/t/p/w780${backdrop_path} 780w`}
          sizes="(max-width: 600px) 400px, 780px"
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