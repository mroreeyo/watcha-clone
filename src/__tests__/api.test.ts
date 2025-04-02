import { fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies } from '../utils/api';

// API 응답을 모킹
global.fetch = jest.fn();

describe('API 함수 테스트', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('인기 영화를 가져올 수 있어야 합니다', async () => {
    const mockResponse = {
      results: [
        { id: 1, title: '인기 영화 1' },
        { id: 2, title: '인기 영화 2' },
      ],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const movies = await fetchPopularMovies();
    expect(movies).toEqual(mockResponse.results);
  });

  it('에러 처리가 되어야 합니다', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('API 에러'));

    await expect(fetchPopularMovies()).rejects.toThrow('API 에러');
  });
}); 