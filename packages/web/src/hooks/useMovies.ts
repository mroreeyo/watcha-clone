import { useQuery } from '@tanstack/react-query';
import { 
  fetchPopularMovies, 
  fetchTopRatedMovies, 
  fetchLatestMovies,
  fetchTrendingMovies,
  fetchRandomMovies,
  fetchPopularAnime,
  fetchRecommendedMovies,
  fetchMoviesByPrice,
  getMoviesByPriceRange
} from '../utils/api';

// 공통 쿼리 설정
const createMovieQuery = (queryKey: (string | number)[], queryFn: () => Promise<any>) => ({
  queryKey,
  queryFn,
  staleTime: 1000 * 60 * 60 * 12, // 12시간
  retry: 1,
});

export const usePopularMovies = () => {
  return useQuery(createMovieQuery(['movies', 'popular'], fetchPopularMovies));
};

export const usePopularAnime = () => {
    return useQuery(createMovieQuery(['movies', 'anime'], fetchPopularAnime));
  };

export const useTopRatedMovies = () => {
  return useQuery(createMovieQuery(['movies', 'top-rated'], fetchTopRatedMovies));
};

export const useLatestMovies = () => {
  return useQuery(createMovieQuery(['movies', 'latest'], fetchLatestMovies));
};

export const useTrendingMovies = () => {
  return useQuery(createMovieQuery(['movies', 'trending'], fetchTrendingMovies));
};

export const useRandomMovies = () => {
  return useQuery(createMovieQuery(['movies', 'random'], fetchRandomMovies));
};

export const useRecommendedMovies = (movieId: number) => {
  return useQuery({
    ...createMovieQuery(['movies', 'recommended', movieId], () => fetchRecommendedMovies(movieId)),
    enabled: !!movieId,
  });
};

export const useMoviesByPriceRange = (maxPrice: number) => {
  return useQuery({
    ...createMovieQuery(['movies', 'price-range', maxPrice], async () => {
      const allMovies = await fetchMoviesByPrice();
      return getMoviesByPriceRange(allMovies, maxPrice);
    }),
  });
}; 