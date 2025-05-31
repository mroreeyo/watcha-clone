import React from 'react';

const MovieBanner = ({ src }: { src: string }) => (
  <div className="movie-banner">
    <img src={src ? `https://image.tmdb.org/t/p/original${src}` : '/default-banner.png'} alt="배너" />
  </div>
);

export default MovieBanner; 