import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CustomMovieSlider.css';

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

const CustomMovieSlider: React.FC<Props> = ({
  title,
  showRank = false,
  showPrice = false,
  movies,
  isLoading,
  error
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex < 0 ? movies.length - 1 : newIndex);
      updateSliderPosition();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex >= movies.length ? 0 : newIndex);
      updateSliderPosition();
    }
  };

  const updateSliderPosition = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth / 6; // 6개의 슬라이드 표시
      const offset = -currentIndex * slideWidth;
      sliderRef.current.style.transform = `translateX(${offset}px)`;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    updateSliderPosition();
  }, [currentIndex]);

  if (isLoading) {
    return <div className="movie-section">
      <h3 className="section-title">{title}</h3>
      <div className="loading">로딩 중...</div>
    </div>;
  }

  if (error) {
    return <div className="movie-section">
      <h3 className="section-title">{title}</h3>
      <div className="error">데이터를 불러오는데 실패했습니다.</div>
    </div>;
  }

  return (
    <div className="movie-section">
      <h3 className="section-title">{title}</h3>
      <div className="custom-slider-container">
        <button className="slider-nav prev" onClick={handlePrev}>❮</button>
        <div 
          className="custom-slider"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {movies.map((movie, index) => (
            <div key={movie.id} className="movie-item">
              {showRank && (
                <div className="rank">{index + 1}</div>
              )}
              <div 
                className="movie-poster"
                onClick={() => navigate(`/movies/${movie.id}`)}
                style={{ cursor: 'pointer' }}
              >
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
            </div>
          ))}
        </div>
        <button className="slider-nav next" onClick={handleNext}>❯</button>
      </div>
    </div>
  );
};

export default CustomMovieSlider; 