import axios from "axios";

// 🔥 환경 변수에서 API 키 가져오기
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: { api_key: API_KEY, language: "ko-KR" },
    });
    return response.data.results;
  } catch (error) {
    console.error("🔥 TMDB API 요청 실패:", error);
    return [];
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY, language: "ko-KR" },
    });
    return response.data.results;
  } catch (error) {
    console.error("🔥 TMDB API 요청 실패:", error);
    return [];
  }
};

/**
 * 특정 영화의 추천 영화를 가져오는 함수
 * @param movieId 추천 영화를 가져올 기준이 되는 영화의 ID
 * @returns 추천 영화 배열
 */
export const fetchRecommendedMovies = async (movieId: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}/recommendations`, {
        params: {
          api_key: API_KEY,
          language: 'ko-KR',
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('🔥 추천 영화 가져오기 실패:', error);
      return [];
    }
  };


export const fetchRandomMovies = async () => {
    const randomPage = Math.floor(Math.random() * 500) + 1;
  
    try {
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          language: 'ko-KR',
          page: randomPage,
        },
      });
  
      const movies = response.data.results;
      return movies.slice(0, 10); // 최대 10개만 반환
    } catch (error) {
      console.error('🔥 TMDB 무작위 영화 요청 실패:', error);
      return [];
    }
  };

export const fetchMoviesByPrice = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchTopRatedMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`
  );
  const data = await response.json();
  return data.results;
};

export const fetchLatestMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`
  );
  const data = await response.json();
  return data.results;
};

export const fetchPopularAnime = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&language=ko-KR&sort_by=popularity.desc`
  );
  const data = await response.json();
  return data.results;
};

// 가격대별 영화 목록을 위한 헬퍼 함수
export const getMoviesByPriceRange = (movies: any[], maxPrice: number) => {
  return movies
    .sort(() => Math.random() - 0.5)
    .slice(0, 8)
    .map(movie => ({
      ...movie,
      price: Math.floor(Math.random() * maxPrice)
    }));
};

export const fetchMovieDetail = async (id: string) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR&append_to_response=credits`
  );
  if (!res.ok) throw new Error('영화 정보를 불러올 수 없습니다.');
  return res.json();
};