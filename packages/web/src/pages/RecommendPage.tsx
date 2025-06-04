import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/RecommendPage.css';
import MovieCard from '../components/MovieCard';
import { fetchTrendingMovies } from '../utils/api';
import { useNavigate } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
}

const RecommendPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchTrendingMovies();
      // overview가 비어있지 않은 영화만 필터링
      const filteredMovies = data.filter((movie: Movie) => movie.overview && movie.overview.trim() !== '');
      setMovies(filteredMovies);
    };
    loadMovies();
  }, []);

  // Swiper navigation 버튼을 동적으로 연결
  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [movies]);

  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.realIndex);
  };

  const nextMovie = movies.length > 0 ? movies[(currentIndex + 1) % movies.length] : null;

  return (
    <div className="recommended-container">
      <div className="recommend-custom-layout">
        <div className="swiper-button-prev" ref={prevRef}></div>
        <div className="swiper-button-next" ref={nextRef}></div>
        <div className="main-poster-area">
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            centeredSlides={true}
            onSlideChange={handleSlideChange}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard movie={movie} onClick={() => navigate(`/movies/${movie.id}`)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="next-poster-gap" />
        {nextMovie && (
          <div className="next-poster-preview-area" onClick={() => navigate(`/movies/${nextMovie.id}`)} style={{ cursor: 'pointer' }}>
            <img
              src={`https://image.tmdb.org/t/p/original${nextMovie.backdrop_path}`}
              alt={nextMovie.title}
              className="next-poster-img-crop"
            />
            <div className="next-poster-title">{nextMovie.title}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendPage;