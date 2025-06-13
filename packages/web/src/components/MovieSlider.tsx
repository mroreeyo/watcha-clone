import React from "react";
import CustomMovieSlider from "./CustomMovieSlider";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  price?: number;
  vote_average?: number;
}

interface Props {
  title: string;
  showRank?: boolean;
  showPrice?: boolean;
  movies: Movie[];
  isLoading: boolean;
  error: Error | null;
}

const MovieSlider: React.FC<Props> = ({ 
  title, 
  showRank = false, 
  showPrice = false,
  movies,
  isLoading,
  error
}) => {
  return (
    <CustomMovieSlider
      title={title}
      showRank={showRank}
      showPrice={showPrice}
      movies={movies}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default MovieSlider;