import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/RecommendPage.css';
import MovieCard from '../components/MovieCard';
import { fetchTrendingMovies } from '../utils/api';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
}

const RecommendPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchTrendingMovies();
      // overview가 비어있지 않은 영화만 필터링
      const filteredMovies = data.filter((movie: Movie) => movie.overview && movie.overview.trim() !== '');
      setMovies(filteredMovies);
    };
    loadMovies();
  }, []);

  return (
    <div className="recommended-container">
      <div className="swiper-navigation-wrapper">
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={15}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecommendPage;