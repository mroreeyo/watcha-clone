import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@watcha-clone/shared';
import '../styles/ResetPasswordPage.css';

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const combinationCount = [
      hasUpperCase || hasLowerCase,
      hasNumbers,
      hasSpecialChar
    ].filter(Boolean).length;

    return password.length >= 10 && combinationCount >= 2;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!newPassword || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!validatePassword(newPassword)) {
      setError('비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 10자 이상이어야 합니다.');
      return;
    }

    try {
      const response = await AuthService.updatePassword(newPassword);
      if (response.success) {
        setMessage(response.message || '비밀번호가 성공적으로 변경되었습니다.');
        // 3초 후 로그인 페이지로 이동
        setTimeout(() => {
          navigate('/sign_in');
        }, 3000);
      } else {
        setError(response.error?.message || '비밀번호 변경 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setError('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-content">
        <h1>비밀번호 재설정</h1>
        <form onSubmit={handleSubmit} className="reset-password-form">
          <div className="form-group">
            <input
              type="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="reset-password-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="reset-password-input"
            />
          </div>
          <p className="password-requirements">
            비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 10자 이상이어야 합니다.
          </p>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
          <button type="submit" className="reset-password-button">
            비밀번호 변경
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 