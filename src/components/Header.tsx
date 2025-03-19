import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");  // 🔹 검색어 상태
  const inputRef = useRef<HTMLInputElement>(null);   // 🔹 입력창 포커스 조정

  // 🔹 검색 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 🔹 Enter 키 이벤트 (검색 실행)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      console.log("검색 실행:", searchTerm);  // 🔥 여기에 API 호출 가능
    }
  };

  // 🔹 검색어 지우기
  const clearSearch = () => {
    setSearchTerm("");
    inputRef.current?.focus();
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

      {/* 🔍 검색 영역 */}
      <div className="search-container">
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="왓챠에서 검색하세요..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="search-icon" onClick={() => inputRef.current?.focus()}>🔍</button>
        {searchTerm && <button className="clear-btn" onClick={clearSearch}>❌</button>}
      </div>

      {/* 로그인 & 회원가입 */}
      <div className="header-right">
        <Link to="/sign_in" className="login-button">로그인</Link>
        <Link to="/sign_up" className="signup-button">회원가입</Link>
      </div>
    </nav>
  );
};

export default Header;