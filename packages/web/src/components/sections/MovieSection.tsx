import React from 'react';
import MovieSlider from '../MovieSlider';
import { UseQueryResult } from '@tanstack/react-query';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  price?: number;
  vote_average?: number;
}

interface Props {
  title: string;
  queryResult: UseQueryResult<Movie[]>;
  showRank?: boolean;
  showPrice?: boolean;
}

const MovieSection: React.FC<Props> = ({ 
  title, 
  queryResult: { data: movies = [], isLoading, error },
  showRank = false,
  showPrice = false 
}) => {
  return (
    <MovieSlider
      title={title}
      movies={movies}
      isLoading={isLoading}
      error={error}
      showRank={showRank}
      showPrice={showPrice}
    />
  );
};

export default MovieSection; 