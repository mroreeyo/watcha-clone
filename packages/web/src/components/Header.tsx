import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NotificationBox from "./NotificationBox";
import "../styles/Header.css";
import logoImg from "../assets/logo.png";
import { AuthService } from '@watcha-clone/shared';
import type { UserProfile } from '@watcha-clone/shared';


const Header: React.FC = () => {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const iconRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  useEffect(() => {
    checkUser();

    const { data: authListener } = AuthService.supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const user = session.user;
        setUser({
          id: user.id,
          email: user.email || '',
          name: user.user_metadata?.name || ''
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    const { user } = await AuthService.getCurrentUser();
    if (user) {
      setUser({
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.name || ''
      });
    }
  };

  const handleLogout = async () => {
    const response = await AuthService.signOut();
    if (response.success) {
      setUser(null);
      navigate('/');
    }
  };

  const toggleNotification = (event: React.MouseEvent) => {
    event.stopPropagation();
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
          <li className={location.pathname === "/browse/video" ? "active" : ""}><Link to="/browse/video">구독</Link></li>
          <li className={location.pathname === "/browse/theater" ? "active" : ""}><Link to="/browse/theater">개별 구매</Link></li>
          <li className={location.pathname === "/browse/webtoon" ? "active" : ""}><Link to="/browse/webtoon">웹툰</Link></li>
          <li className={location.pathname === "/parties" ? "active" : ""}><Link to="/parties">왓챠파티</Link></li>
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
        {user ? (
          <div className="user-menu">
            <button className="notification-button">
              <i className="fas fa-bell"></i>
            </button>
            <div 
              className="profile-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img 
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} 
                alt="프로필" 
                className="profile-image"
              />
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <img 
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} 
                      alt="프로필" 
                    />
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                  </div>
                  <div className="dropdown-content">
                    <button onClick={() => navigate('/profile')}>프로필</button>
                    <button onClick={() => navigate('/settings')}>설정</button>
                    <button onClick={handleLogout} className="logout-button">로그아웃</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/sign_in" className="login-button">로그인</Link>
            <Link to="/sign_up" className="signup-button">회원가입</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;