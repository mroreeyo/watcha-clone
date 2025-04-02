import { render, screen } from '@testing-library/react';
import MovieSlider from '../components/MovieSlider';

const mockMovies = [
  {
    id: 1,
    title: '테스트 영화 1',
    poster_path: '/test1.jpg',
    vote_average: 8.5,
  },
  {
    id: 2,
    title: '테스트 영화 2',
    poster_path: '/test2.jpg',
    vote_average: 7.5,
  },
];

describe('MovieSlider 컴포넌트', () => {
  it('영화 목록이 렌더링되어야 합니다', () => {
    render(<MovieSlider movies={mockMovies} title={''} />);
    
    expect(screen.getByText('테스트 영화 1')).toBeInTheDocument();
    expect(screen.getByText('테스트 영화 2')).toBeInTheDocument();
  });

  it('평점이 표시되어야 합니다', () => {
    render(<MovieSlider movies={mockMovies} title={''} />);
    
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('7.5')).toBeInTheDocument();
  });
}); 