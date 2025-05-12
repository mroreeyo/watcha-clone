// src/pages/HomePage.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import RecommendPage from "./RecommendPage";
import WebtoonBanner from "../components/WebtoonBanner";
import MovieSection from "../components/sections/MovieSection";
import { 
  useTopRatedMovies, 
  usePopularAnime, 
  useMoviesByPriceRange,
  usePopularMovies,
  useLatestMovies,
  useTrendingMovies
} from "../hooks/useMovies";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // 각 섹션별 쿼리
  const popularMoviesQuery = usePopularMovies();
  const latestMoviesQuery = useLatestMovies();
  const trendingMoviesQuery = useTrendingMovies();
  const topRatedQuery = useTopRatedMovies();
  const animeQuery = usePopularAnime();
  const under5000Query = useMoviesByPriceRange(5000);
  const under2500Query = useMoviesByPriceRange(2500);
  const under1650Query = useMoviesByPriceRange(1650);

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
      
      <MovieSection
        title="인기있는 영화"
        queryResult={popularMoviesQuery}
        showRank={true}
      />
      
      <MovieSection
        title="최신 영화"
        queryResult={latestMoviesQuery}
      />
         <MovieSection
        title="유행중인 영화"
        queryResult={trendingMoviesQuery}
      />
         <MovieSection
        title="Top 20"
        queryResult={topRatedQuery}
      />

      <MovieSection
        title="핫한 애니메이션"
        queryResult={animeQuery}
      />
      
      <MovieSection
        title="5,000원 이하"
        queryResult={under5000Query}
        showPrice={true}
      />
      
      <MovieSection
        title="2,500원 이하"
        queryResult={under2500Query}
        showPrice={true}
      />
      
      <MovieSection
        title="1,650원 이하"
        queryResult={under1650Query}
        showPrice={true}
      />
    </div>
  );
};

export default HomePage;