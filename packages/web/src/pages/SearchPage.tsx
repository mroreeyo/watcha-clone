import React, { useEffect, useState } from "react";
import "../styles/SearchPage.css";
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const fetchTrending = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}&language=ko-KR`
  );
  if (!res.ok) throw new Error('트렌딩 정보를 불러올 수 없습니다.');
  return res.json();
};

const fetchSearchResults = async (query: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=ko-KR`
  );
  if (!res.ok) throw new Error('검색 결과를 불러올 수 없습니다.');
  return res.json();
};

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const { data: trendingData, isLoading: trendingLoading, error: trendingError } = useQuery({
    queryKey: ['trending'],
    queryFn: fetchTrending,
    enabled: !query,
  });
  const trending = trendingData?.results?.slice(0, 10) || [];

  const { data: searchData, isLoading: searchLoading, error: searchError } = useQuery({
    queryKey: ['search', query],
    queryFn: () => fetchSearchResults(query),
    enabled: !!query,
  });
  const searchResults = searchData?.results || [];

  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (trending.length === 0 || isHovering) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % trending.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [trending.length, isHovering]);

  const activePoster = hoveredIdx !== null 
    ? trending[hoveredIdx]?.backdrop_path || trending[hoveredIdx]?.poster_path
    : trending[activeIdx]?.backdrop_path || trending[activeIdx]?.poster_path;

  const handleTitleClick = (item: any) => {
    const mediaType = item.media_type || 'movie';
    navigate(`/detail/${mediaType}/${item.id}`);
  };

  const movies = searchResults.filter((item: any) => item.media_type === 'movie');
  const tvs = searchResults.filter((item: any) => item.media_type === 'tv');
  const persons = searchResults.filter((item: any) => item.media_type === 'person');

  return (
    <div className="search-page">
      {query ? (
        <section className="search-result-section">
          <h2 className="search-title">'{query}' 검색 결과</h2>
          {searchLoading ? (
            <div>검색 중...</div>
          ) : searchError ? (
            <div>검색 결과를 불러올 수 없습니다.</div>
          ) : searchResults.length === 0 ? (
            <div>검색 결과가 없습니다.</div>
          ) : (
            <div className="search-result-group">
              {movies.length > 0 && (
                <div className="search-result-category">
                  <h3>영화</h3>
                  <ul className="search-result-list">
                    {movies.map((item: any) => (
                      <li key={item.id} className="search-result-item" onClick={() => handleTitleClick(item)}>
                        <img
                          src={item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : '/default-poster.png'}
                          alt={item.title}
                          className="search-result-poster"
                        />
                        <div className="search-result-info">
                          <div className="search-result-title">{item.title}</div>
                          <div className="search-result-meta">
                            영화 · {item.release_date ? item.release_date.slice(0, 4) : '연도 정보 없음'}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tvs.length > 0 && (
                <div className="search-result-category">
                  <h3>시리즈</h3>
                  <ul className="search-result-list">
                    {tvs.map((item: any) => (
                      <li key={item.id} className="search-result-item" onClick={() => handleTitleClick(item)}>
                        <img
                          src={item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : '/default-poster.png'}
                          alt={item.name}
                          className="search-result-poster"
                        />
                        <div className="search-result-info">
                          <div className="search-result-title">{item.name}</div>
                          <div className="search-result-meta">
                            시리즈 · {item.first_air_date ? item.first_air_date.slice(0, 4) : '연도 정보 없음'}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {persons.length > 0 && (
                <div className="search-result-category">
                  <h3>인물</h3>
                  <ul className="search-result-list">
                    {persons.map((item: any) => (
                      <li key={item.id} className="search-result-item">
                        <img
                          src={item.profile_path ? `https://image.tmdb.org/t/p/w92${item.profile_path}` : '/default-profile.png'}
                          alt={item.name}
                          className="search-result-poster person"
                        />
                        <div className="search-result-info">
                          <div className="search-result-title">{item.name}</div>
                          <div className="search-result-meta">{item.known_for_department || '인물'}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>
      ) : (
        <section className="trending-section">
          <div className="trending-main-row">
            <div className="trending-left">
              <h2 className="trending-title">인기 검색어 TOP 10</h2>
              <div className="trending-tabs">
                <button className="trending-tab active">전체</button>
                <button className="trending-tab">스릴러</button>
                <button className="trending-tab">로맨스</button>
                <button className="trending-tab">범죄</button>
                <button className="trending-tab">다른 장르 ▼</button>
              </div>
              <div className="trending-list vertical">
                {trendingLoading ? (
                  <div>로딩 중...</div>
                ) : trendingError ? (
                  <div>데이터를 불러올 수 없습니다.</div>
                ) : (
                  <>
                    <div className="trending-list-column">
                      {trending.slice(0, 5).map((item: any, idx: number) => (
                        <li
                          key={item.id}
                          className={`trending-item vertical rank-${idx + 1}${idx === 4 ? ' bold' : ''}${!isHovering && activeIdx === idx ? ' active' : ''}`}
                          onMouseEnter={() => {
                            setHoveredIdx(idx);
                            setIsHovering(true);
                          }}
                          onMouseLeave={() => {
                            setHoveredIdx(null);
                            setIsHovering(false);
                          }}
                        >
                          <span className="trending-rank">{idx + 1}</span>
                          <span 
                            className="trending-title-text"
                            onClick={() => handleTitleClick(item)}
                          >
                            {item.title || item.name}
                          </span>
                        </li>
                      ))}
                    </div>
                    <div className="trending-list-column">
                      {trending.slice(5, 10).map((item: any, idx: number) => (
                        <li
                          key={item.id}
                          className={`trending-item vertical rank-${idx + 6}${idx === 4 ? ' bold' : ''}${!isHovering && activeIdx === idx + 5 ? ' active' : ''}`}
                          onMouseEnter={() => {
                            setHoveredIdx(idx + 5);
                            setIsHovering(true);
                          }}
                          onMouseLeave={() => {
                            setHoveredIdx(null);
                            setIsHovering(false);
                          }}
                        >
                          <span className="trending-rank">{idx + 6}</span>
                          <span 
                            className="trending-title-text"
                            onClick={() => handleTitleClick(item)}
                          >
                            {item.title || item.name}
                          </span>
                        </li>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="trending-date">{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })} 기준</div>
            </div>
            <div className="trending-poster-bg">
              {activePoster && (
                <>
                  <img
                    src={`https://image.tmdb.org/t/p/original${activePoster}`}
                    alt="포스터"
                    className="trending-main-poster"
                  />
                  <div className="trending-main-poster-blur-mask" />
                </>
              )}
            </div>
          </div>
        </section>
      )}
      <div className="category-container">
        <h3>인기</h3>
        <div className="category-list">
   
        </div>
      </div>
    </div>
  );
};

export default SearchPage;