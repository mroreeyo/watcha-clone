import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App 컴포넌트', () => {
  it('렌더링이 정상적으로 되어야 합니다',  () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
}); 