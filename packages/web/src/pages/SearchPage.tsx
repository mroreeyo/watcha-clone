import React from "react";
import "../styles/SearchPage.css";

const SearchPage: React.FC = () => {
  return (
    <div className="search-page">
      <h2 className="search-title">인기 검색어 TOP 10</h2>
      <ul className="search-rank">
    
      </ul>

      {/* 인기 카테고리 */}
      <div className="category-container">
        <h3>인기</h3>
        <div className="category-list">
   
        </div>
      </div>
    </div>
  );
};

export default SearchPage;