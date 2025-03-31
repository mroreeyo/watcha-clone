// src/pages/HomePage.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import MovieSlider from "../components/MovieSlider";
import {
  fetchMoviesByPrice,
  fetchTopRatedMovies,
  fetchLatestMovies,
  fetchPopularAnime,
  getMoviesByPriceRange
} from "../utils/api";
import RecommendPage from "./RecommendPage";
import WebtoonBanner from "../components/WebtoonBanner";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  price?: number;
  vote_average?: number;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [under5000Movies, setUnder5000Movies] = useState<Movie[]>([]);
  const [under2500Movies, setUnder2500Movies] = useState<Movie[]>([]);
  const [under1650Movies, setUnder1650Movies] = useState<Movie[]>([]);
  const [animeMovies, setAnimeMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        // Top 20 영화
        const topRated = await fetchTopRatedMovies();
        setTopMovies(topRated.slice(0, 20));

        // 가격대별 영화
        const priceMovies = await fetchMoviesByPrice();
        setUnder5000Movies(getMoviesByPriceRange(priceMovies, 5000));
        setUnder2500Movies(getMoviesByPriceRange(priceMovies, 2500));
        setUnder1650Movies(getMoviesByPriceRange(priceMovies, 1650));

        // 애니메이션
        const anime = await fetchPopularAnime();
        setAnimeMovies(anime.slice(0, 8));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchAllMovies();
  }, []);

  return (
    <div className="homepage">
      {/* 추천 탭 버튼 영역 */}
      <div className="recommend-tabs">
        <button className="tab active" onClick={() => navigate("/recommend")}>추천</button>
        <button className="tab">#왓챠의 발견</button>
        <button className="tab">#한국</button>
        <button className="tab">#애니메이션</button>
        <button className="tab">성인+</button>
      </div>
      <RecommendPage />
      <WebtoonBanner />
      <MovieSlider 
        title="개별 구매 Top 20" 
        movies={topMovies} 
        showRank={true} 
      />
      
      <MovieSlider 
        title="핫한 웹툰" 
        movies={animeMovies} 
      />

      <MovieSlider 
        title="5,000원 이하" 
        movies={under5000Movies} 
        showPrice={true} 
      />

      <MovieSlider 
        title="2,500원 이하" 
        movies={under2500Movies} 
        showPrice={true} 
      />

      <MovieSlider 
        title="1,650원 이하" 
        movies={under1650Movies} 
        showPrice={true} 
      />
    </div>
  );
};

export default HomePage;