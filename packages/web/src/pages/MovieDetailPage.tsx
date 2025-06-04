import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MovieMainInfo from '../components/movie/MovieMainInfo';
import MovieBanner from '../components/movie/MovieBanner';
import MovieActions from '../components/movie/MovieActions';
import PeopleList from '../components/movie/PeopleList';
import ReviewList from '../components/movie/ReviewList';
import RelatedVideos from '../components/movie/RelatedVideos';
import '../styles/MovieDetailPage.css';

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const fetchMovieDetail = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=ko-KR&append_to_response=credits,videos`
  );
  if (!res.ok) throw new Error('영화 정보를 불러올 수 없습니다.');
  return res.json();
};

const fetchTvDetail = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}&language=ko-KR&append_to_response=credits,videos`
  );
  if (!res.ok) throw new Error('TV 정보를 불러올 수 없습니다.');
  return res.json();
};

const fetchMovieReviews = async (id: string) => {
  // 한글 리뷰
  const resKo = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${TMDB_API_KEY}&language=ko-KR&page=1`
  );
  // 영어 리뷰
  const resEn = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${TMDB_API_KEY}&language=en-US&page=1`
  );
  if (!resKo.ok && !resEn.ok) throw new Error('리뷰 정보를 불러올 수 없습니다.');
  const dataKo = resKo.ok ? await resKo.json() : { results: [] };
  const dataEn = resEn.ok ? await resEn.json() : { results: [] };
  const allReviews = [...dataKo.results, ...dataEn.results.filter((en: any) => !dataKo.results.some((ko: any) => ko.id === en.id))];
  return { results: allReviews, total_results: allReviews.length };
};

const fetchTvReviews = async (id: string) => {
  const resKo = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${TMDB_API_KEY}&language=ko-KR&page=1`
  );
  const resEn = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${TMDB_API_KEY}&language=en-US&page=1`
  );
  if (!resKo.ok && !resEn.ok) throw new Error('리뷰 정보를 불러올 수 없습니다.');
  const dataKo = resKo.ok ? await resKo.json() : { results: [] };
  const dataEn = resEn.ok ? await resEn.json() : { results: [] };
  const allReviews = [...dataKo.results, ...dataEn.results.filter((en: any) => !dataKo.results.some((ko: any) => ko.id === en.id))];
  return { results: allReviews, total_results: allReviews.length };
};

const MovieDetailPage = () => {
  const { id, media_type } = useParams<{ id: string; media_type?: string }>();
  const isTv = media_type === 'tv';

  const { data: movie, isLoading, error } = useQuery({
    queryKey: [isTv ? 'tvDetail' : 'movieDetail', id],
    queryFn: () => isTv ? fetchTvDetail(id!) : fetchMovieDetail(id!),
    enabled: !!id,
  });
  const { data: reviewsData, isLoading: reviewsLoading } = useQuery({
    queryKey: [isTv ? 'tvReviews' : 'movieReviews', id],
    queryFn: () => isTv ? fetchTvReviews(id!) : fetchMovieReviews(id!),
    enabled: !!id,
  });
  const reviews = reviewsData?.results || [];

  // 라우팅 파라미터 id와 API로 받아온 movie.id를 콘솔에 출력
  console.log('라우팅 파라미터 id:', id);
  console.log('API로 받아온 movie.id:', movie?.id);

  if (isLoading) return <div>로딩 중...</div>;
  if (error || !movie) return <div>영화 정보를 불러올 수 없습니다.</div>;

  const directors = movie.credits?.crew?.filter((person: any) => person.job === 'Director') || [];
  const mainCast = movie.credits?.cast?.slice(0, 6) || [];
  const relatedVideos = movie.videos?.results?.filter((v: any) => v.site === 'YouTube') || [];

  return (
    <div className="movie-detail-page">
      <div className="movie-top-section">
        <MovieMainInfo movie={movie} />
        <MovieActions poster={movie.poster_path} title={movie.title || movie.name} />
      </div>
      <MovieBanner src={movie.backdrop_path} />
      <RelatedVideos videos={relatedVideos} />
      <PeopleList directors={directors} cast={mainCast} />
      <ReviewList reviews={reviews} loading={reviewsLoading} />
    </div>
  );
};

export default MovieDetailPage; 