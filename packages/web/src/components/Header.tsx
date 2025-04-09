import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotificationBox from "./NotificationBox";
import "../styles/Header.css";
import logoImg from "../assets/logo.png";


const Header: React.FC = () => {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const iconRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const placeholders = [
    "범죄 영화, 어떠세요?",
    "오늘 나의 마음을 채워줄 콘텐츠는 바로!",
    "중국 애니메이션을(를) 검색해보세요!",
    "봤고 싶던 감성을 깨울 콘텐츠!",
    "공포 시리즈, 어떠세요?",
    "예상 별점이 높은 콘텐츠, 여기있어요!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔔 아이콘 클릭 시 정확히 토글되도록 설정
  const toggleNotification = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    setNotificationOpen((prev) => !prev);
  };

  const handleSearchClick = () => {
    navigate("/search");
  };


  return (
    <nav className="header">
      {/* 로고 및 네비게이션 */}
      <div className="header-left">
        <Link to="/" className="logo">
            <img
              className="logo-image"
              src={logoImg}
              alt="왓챠 웹툰 배너 small"
            />
        </Link>
        <ul className="nav-menu">
          <li><Link to="/browse/video">구독</Link></li>
          <li className="active"><Link to="/browse/theater">개별 구매</Link></li>
          <li><Link to="/browse/webtoon">웹툰</Link></li>
          <li><Link to="/parties">왓챠파티</Link></li>
        </ul>
      </div>

      <div className="header-right">
     {/* 🔍 검색창 */}
     <div className="search-container" onClick={handleSearchClick}>
        <input 
          type="text" 
          className={`search-input ${isAnimating ? 'fade-out' : 'fade-in'}`}
          placeholder={placeholders[placeholderIndex]} 
          readOnly 
        />
        <button className="search-icon">🔍</button>
      </div>

      {/* 🔔 알림 아이콘 */}
        <button className="notification-icon" onClick={toggleNotification} ref={iconRef}>
          🔔
        </button>
        {isNotificationOpen && (
          <NotificationBox 
            isOpen={isNotificationOpen} 
            onClose={() => setNotificationOpen(false)} 
            iconRef={iconRef} 
          />
        )}
        <Link to="/sign_in" className="login-button">로그인</Link>
        <Link to="/sign_up" className="signup-button">회원가입</Link>
      </div>
    </nav>
  );
};

export default Header;