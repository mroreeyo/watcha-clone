import React from 'react';
import ActionButton from './ActionButton';

const MovieMainInfo = ({ movie }: { movie: any }) => {
  const runtime =
    movie.runtime !== undefined && movie.runtime !== null
      ? movie.runtime
      : Array.isArray(movie.episode_run_time) && movie.episode_run_time.length > 0
        ? movie.episode_run_time[0]
        : undefined;

  return (
    <div className="movie-main-info">
      <div className="movie-title-row">
        <span className="movie-age-badge">ALL</span>
        <h1>{movie.title || movie.name}</h1>
      </div>
      <div className="movie-meta">
        <span>평균 {movie.vote_average?.toFixed(1)}</span>
        <span>
          {runtime !== undefined && runtime !== null
            ? `${Math.floor(runtime / 60)}시간 ${runtime % 60}분`
            : <span className="runtime-missing">상영시간 정보 없음</span>}
        </span>
        <span>{movie.genres?.map((g: any) => g.name).join(', ')}</span>
        <span>{movie.production_countries?.[0]?.name}</span>
      </div>
      <div className="movie-summary">{movie.overview}</div>
      <div className="movie-buttons">
        <ActionButton className="primary">구매하기</ActionButton>
        <ActionButton className="secondary">선물하기</ActionButton>
      </div>
      <div className="movie-alerts">
        <div>개별 구매로 감상할 수 있는 콘텐츠예요</div>
        <div>5/21(수)까지 대여, 소장 20% 할인!</div>
      </div>
    </div>
  );
};

export default MovieMainInfo; 