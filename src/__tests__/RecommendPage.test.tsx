import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecommendPage from '../pages/RecommendPage';
import * as api from '../utils/api';

// API 모킹
jest.mock('../utils/api');
const mockApi = api as jest.Mocked<typeof api>;

const mockMovies = [
  {
    id: 1,
    title: '추천 영화 1',
    poster_path: '/poster1.jpg',
    vote_average: 8.5,
    overview: '추천 영화 1의 설명입니다.',
  },
  {
    id: 2,
    title: '추천 영화 2',
    poster_path: '/poster2.jpg',
    vote_average: 7.8,
    overview: '추천 영화 2의 설명입니다.',
  },
];

describe('RecommendPage 컴포넌트', () => {
  beforeEach(() => {
    // API 모의 구현 초기화
    mockApi.fetchTopRatedMovies.mockClear();
  });

  const renderRecommendPage = () => {
    render(
      <BrowserRouter>
        <RecommendPage />
      </BrowserRouter>
    );
  };

  it('추천 영화 목록이 렌더링되어야 합니다', async () => {
    // API 응답 모의 구현
    mockApi.fetchTopRatedMovies.mockResolvedValueOnce(mockMovies);

    renderRecommendPage();

    // 로딩 상태 확인
    expect(screen.getByText(/로딩 중/i)).toBeInTheDocument();

    // 영화 목록이 렌더링되는지 확인
    await waitFor(() => {
      expect(screen.getByText('추천 영화 1')).toBeInTheDocument();
      expect(screen.getByText('추천 영화 2')).toBeInTheDocument();
    });
  });

  it('영화 평점이 표시되어야 합니다', async () => {
    mockApi.fetchTopRatedMovies.mockResolvedValueOnce(mockMovies);

    renderRecommendPage();

    await waitFor(() => {
      expect(screen.getByText('8.5')).toBeInTheDocument();
      expect(screen.getByText('7.8')).toBeInTheDocument();
    });
  });

  it('API 에러가 발생했을 때 에러 메시지가 표시되어야 합니다', async () => {
    // API 에러 모의 구현
    mockApi.fetchTopRatedMovies.mockRejectedValueOnce(new Error('API 에러'));

    renderRecommendPage();

    await waitFor(() => {
      expect(screen.getByText(/에러가 발생했습니다/i)).toBeInTheDocument();
    });
  });

  it('영화 설명이 표시되어야 합니다', async () => {
    mockApi.fetchTopRatedMovies.mockResolvedValueOnce(mockMovies);

    renderRecommendPage();

    await waitFor(() => {
      expect(screen.getByText('추천 영화 1의 설명입니다.')).toBeInTheDocument();
      expect(screen.getByText('추천 영화 2의 설명입니다.')).toBeInTheDocument();
    });
  });
}); 