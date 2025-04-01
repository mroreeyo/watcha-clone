import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Header 컴포넌트', () => {
  const renderHeader = () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  it('로고가 렌더링되어야 합니다', () => {
    renderHeader();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  it('네비게이션 링크들이 렌더링되어야 합니다', () => {
    renderHeader();
    expect(screen.getByText('홈')).toBeInTheDocument();
    expect(screen.getByText('검색')).toBeInTheDocument();
    expect(screen.getByText('추천')).toBeInTheDocument();
  });
}); 