import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../LoginPage';

const renderLoginPage = () => {
  return render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
};

describe('LoginPage', () => {
  beforeEach(() => {
    renderLoginPage();
  });

  it('로그인 페이지가 정상적으로 렌더링되는지 확인', () => {
    expect(screen.getByText('로그인')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('이메일 (example@gmail.com)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });

  it('이메일 입력 시 에러 메시지 표시', async () => {
    const emailInput = screen.getByPlaceholderText('이메일 (example@gmail.com)');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    await waitFor(() => {
      expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
    });
  });

  it('올바른 이메일 입력 시 에러 메시지 제거', async () => {
    const emailInput = screen.getByPlaceholderText('이메일 (example@gmail.com)');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    await waitFor(() => {
      expect(screen.queryByText('올바른 이메일 형식이 아닙니다.')).not.toBeInTheDocument();
    });
  });

  it('비밀번호 입력 시 에러 메시지 표시', async () => {
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    
    await waitFor(() => {
      expect(screen.getByText('비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 10자 이상이어야 합니다.')).toBeInTheDocument();
    });
  });

  it('올바른 비밀번호 입력 시 에러 메시지 제거', async () => {
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    fireEvent.change(passwordInput, { target: { value: 'Test1234!@#' } });
    
    await waitFor(() => {
      expect(screen.queryByText('비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 10자 이상이어야 합니다.')).not.toBeInTheDocument();
    });
  });

  it('모든 필드가 올바르게 입력되었을 때 로그인 버튼 활성화', async () => {
    const emailInput = screen.getByPlaceholderText('이메일 (example@gmail.com)');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Test1234!@#' } });

    await waitFor(() => {
      expect(loginButton).toHaveClass('active');
    });
  });

  it('회원가입 링크가 정상적으로 렌더링되는지 확인', () => {
    expect(screen.getByText('회원가입')).toBeInTheDocument();
  });
}); 