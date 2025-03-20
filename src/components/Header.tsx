import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import NotificationBox from "./NotificationBox";
import "../styles/Header.css";

const Header: React.FC = () => {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const iconRef = useRef<HTMLButtonElement>(null);

  // 🔔 아이콘 클릭 시 정확히 토글되도록 설정
  const toggleNotification = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    setNotificationOpen((prev) => !prev);
  };

  return (
    <nav className="header">
      {/* 로고 및 네비게이션 */}
      <div className="header-left">
        <Link to="/" className="logo">WATCHA</Link>
        <ul className="nav-menu">
          <li><Link to="/browse/video">구독</Link></li>
          <li className="active"><Link to="/browse/theater">개별 구매</Link></li>
          <li><Link to="/browse/webtoon">웹툰</Link></li>
          <li><Link to="/parties">왓챠파티</Link></li>
        </ul>
      </div>

      {/* 🔍 검색창 */}
      <div className="search-container">
        <input type="text" className="search-input" placeholder="코미디부터 모험까지!" />
        <button className="search-icon">🔍</button>
      </div>

      {/* 🔔 알림 아이콘 */}
      <div className="header-right">
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