import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css';
import { AuthService } from '@watcha-clone/shared';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    checkboxes: '',
  });
  const [checkboxes, setCheckboxes] = useState({
    all: false,
    age: false,
    service: false,
    watchapedia: false,
    privacy: false,
    marketing: false,
  });
  
  // 비밀번호 유효성 검사
    // 비밀번호는 다음과 같은 경우에만 유효.
    // "abc12345678" (영문 + 숫자, 10자 이상)
    // "abcd!@#$123" (영문 + 특수문자 + 숫자, 10자 이상)
    // "ABCD1234567" (영문 + 숫자, 10자 이상)
    // "abc!@#$%^&(" (영문 + 특수문자, 10자 이상)

    // 유효하지 않은 경우:
    // "abcdefghij" (영문만 사용, 조합 부족)
    // "1234567890" (숫자만 사용, 조합 부족)
    // "abc123" (길이 부족)
    // "!@#$%^&()" (특수문자만 사용, 조합 부족)
    
  const isPasswordValid = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // 영문, 숫자, 특수문자 중 몇 개의 조합이 있는지 확인
    const combinationCount = [
      hasUpperCase || hasLowerCase, // 영문
      hasNumbers, // 숫자
      hasSpecialChar // 특수문자
    ].filter(Boolean).length;

    return password.length >= 10 && combinationCount >= 2;
  };
  
  // 버튼 활성화 조건 체크
  const isButtonActive = useMemo(() => {
    const requiredFieldsFilled = 
      name.length >= 2 && 
      email.includes('@') && 
      isPasswordValid(password);

    const requiredCheckboxesChecked = 
      checkboxes.age && 
      checkboxes.service && 
      checkboxes.watchapedia && 
      checkboxes.privacy;

    return requiredFieldsFilled && requiredCheckboxesChecked;
  }, [name, email, password, checkboxes]);

  // 입력값 변경 시 에러 메시지 초기화
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value.length < 2) {
      setErrors(prev => ({ ...prev, name: '이름은 2자 이상이어야 합니다.' }));
    } else {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(value)) {
      setErrors(prev => ({ ...prev, email: '올바른 이메일 형식이 아닙니다.' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (!isPasswordValid(value)) {
      setErrors(prev => ({ 
        ...prev, 
        password: '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 10자 이상이어야 합니다.' 
      }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: '',
      email: '',
      password: '',
      checkboxes: '',
    };
    let hasError = false;

    if (name.length < 2) {
      newErrors.name = '이름은 2자 이상이어야 합니다.';
      hasError = true;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
      hasError = true;
    }

    if (!isPasswordValid(password)) {
      newErrors.password = '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 10자 이상이어야 합니다.';
      hasError = true;
    }

    if (!checkboxes.age || !checkboxes.service || !checkboxes.watchapedia || !checkboxes.privacy) {
      newErrors.checkboxes = '필수 약관에 모두 동의해주세요.';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      try {
        const response = await AuthService.signUp(email, password, name);
        if (response.success) {
          alert('회원가입이 완료되었습니다. 이메일을 확인해주세요.');
          navigate('/sign_in');
        } else {
          setErrors(prev => ({
            ...prev,
            email: response.error?.message || '회원가입 중 오류가 발생했습니다.'
          }));
        }
      } catch (error) {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setCheckboxes({
      all: checked,
      age: checked,
      service: checked,
      watchapedia: checked,
      privacy: checked,
      marketing: checked,
    });
  };

  const handleSingleCheck = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setCheckboxes(prev => {
      const newCheckboxes = {
        ...prev,
        [name]: checked
      };
      
      // 모든 체크박스가 체크되었는지 확인
      const allChecked = Object.entries(newCheckboxes)
        .filter(([key]) => key !== 'all')
        .every(([_, value]) => value);
      
      return {
        ...newCheckboxes,
        all: allChecked
      };
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1>회원가입</h1>
        <form onSubmit={handleSignUp} className="signup-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="이름 (2자 이상)"
              value={name}
              onChange={handleNameChange}
              className={`signup-form-input ${errors.name ? 'error' : ''}`}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          
          <div className="input-group">
            <input
              type="email"
              placeholder="이메일 (example@gmail.com)"
              value={email}
              onChange={handleEmailChange}
              className={`signup-form-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="비밀번호 (영문, 숫자, 특수 중 2개 조합 10자 이상)"
              value={password}
              onChange={handlePasswordChange}
              className={`signup-form-input ${errors.password ? 'error' : ''}`}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="signup-checkboxes">
            <label className="signup-checkbox-label">
              <input 
                type="checkbox" 
                className="signup-checkbox"
                checked={checkboxes.all}
                onChange={handleAllCheck}
              />
              <span>전체 약관에 동의합니다</span>
            </label>
            <label className="signup-checkbox-label">
              <input 
                type="checkbox" 
                className="signup-checkbox"
                checked={checkboxes.age}
                onChange={handleSingleCheck('age')}
              />
              <span>만 14세 이상입니다</span>
            </label>
            <label className="signup-checkbox-label">
              <input 
                type="checkbox" 
                className="signup-checkbox"
                checked={checkboxes.service}
                onChange={handleSingleCheck('service')}
              />
              <span>(필수) 왓챠 서비스 이용 약관 <a href="#terms">보기</a></span>
            </label>
            <label className="signup-checkbox-label">
              <input 
                type="checkbox" 
                className="signup-checkbox"
                checked={checkboxes.watchapedia}
                onChange={handleSingleCheck('watchapedia')}
              />
              <span>(필수) 왓챠피디아 서비스 이용 약관 <a href="#terms">보기</a></span>
            </label>
            <label className="signup-checkbox-label">
              <input 
                type="checkbox" 
                className="signup-checkbox"
                checked={checkboxes.privacy}
                onChange={handleSingleCheck('privacy')}
              />
              <span>(필수) 개인정보 수집 및 이용 동의 <a href="#privacy">보기</a></span>
            </label>
            <label className="signup-checkbox-label">
              <input 
                type="checkbox" 
                className="signup-checkbox"
                checked={checkboxes.marketing}
                onChange={handleSingleCheck('marketing')}
              />
              <span>(선택) 신작 알림 이메일 정보 수신 <a href="#email">보기</a></span>
            </label>
          </div>
          {errors.checkboxes && <p className="error-message checkbox-error">{errors.checkboxes}</p>}
          
          <button 
            type="submit" 
            className={`signup-form-button ${isButtonActive ? 'active' : ''}`}
          >
            가입하기
          </button>
          <p className="signup-notice">결제 정보요? 충분히 둘러보시고 입력해도 늦지 않아요</p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage; 