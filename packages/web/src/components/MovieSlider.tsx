import React, { useRef, useEffect } from "react";
import "../styles/MovieSlider.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  price?: number;
  vote_average?: number;
}

interface Props {
  title: string;
  movies: Movie[];
  showRank?: boolean;
  showPrice?: boolean;
}

const MovieSlider: React.FC<Props> = ({ title, movies, showRank = false, showPrice = false }) => {
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (navigationPrevRef.current && navigationNextRef.current && swiperRef.current) {
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className="movie-section">
      <h3 className="section-title">{title}</h3>
      <div className="swiper-navigation-wrapper">
        <div ref={navigationPrevRef} className="movie-slider-prev"></div>
        <div ref={navigationNextRef} className="movie-slider-next"></div>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
            enabled: true
          }}
          loop={true}
          slidesPerView={6}
          centeredSlides={true}
          spaceBetween={15}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={movie.id} className="movie-item">
              {showRank && (
                <div className="rank">{index + 1}</div>
              )}
              <div className="movie-poster">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                />
                <div className="hover-info">
                  <h4>{movie.title}</h4>
                  {showPrice && movie.price && (
                    <span className="price">{formatPrice(movie.price)}원</span>
                  )}
                  {movie.vote_average && (
                    <span className="rating">★ {movie.vote_average.toFixed(1)}</span>
                  )}
                  <button className="play-button">▶ 재생</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieSlider;