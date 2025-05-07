import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import { AuthService } from '@watcha-clone/shared';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await AuthService.signIn(email, password);
      if (response.success) {
        navigate('/');
      } else {
        setError(response.error?.message || '로그인 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    try {
      const response = await AuthService.resetPassword(email);
      if (response.success) {
        setMessage(response.message || '비밀번호 재설정 이메일이 발송되었습니다.');
      } else {
        setError(response.error?.message || '비밀번호 재설정 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setError('비밀번호 재설정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>로그인</h1>
        {!isResetting ? (
          <>
            <p className="login-subtitle">
              비밀번호를 잊어버리셨나요?{' '}
              <button 
                onClick={() => setIsResetting(true)}
                className="text-button"
              >
                비밀번호 재설정
              </button>
            </p>
            <form onSubmit={handleLogin} className="login-form">
              <input
                type="text"
                placeholder="이메일 (example@gmail.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-form-input"
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-form-input"
              />
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="login-form-button">로그인</button>
            </form>
          </>
        ) : (
          <>
            <p className="login-subtitle">
              <button 
                onClick={() => setIsResetting(false)}
                className="text-button"
              >
                로그인으로 돌아가기
              </button>
            </p>
            <form onSubmit={handleResetPassword} className="login-form">
              <p className="reset-description">
                가입한 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.
              </p>
              <input
                type="text"
                placeholder="이메일 (example@gmail.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-form-input"
              />
              {error && <p className="error-message">{error}</p>}
              {message && <p className="success-message">{message}</p>}
              <button type="submit" className="login-form-button">비밀번호 재설정 이메일 보내기</button>
            </form>
          </>
        )}

        <div className="social-login">
          <p>다른 방법으로 로그인하기</p>
          <div className="social-buttons">
            <button className="social-button kakao">
              <img src="/icons/kakao.png" alt="카카오 로그인" />
            </button>
            <button className="social-button google">
              <img src="/icons/google.png" alt="구글 로그인" />
            </button>
            <button className="social-button twitter">
              <img src="/icons/twitter.png" alt="트위터 로그인" />
            </button>
            <button className="social-button apple">
              <img src="/icons/apple.png" alt="애플 로그인" />
            </button>
            <button className="social-button naver">
              <img src="/icons/naver.png" alt="네이버 로그인" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 