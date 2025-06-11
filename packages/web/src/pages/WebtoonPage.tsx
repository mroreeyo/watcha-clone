import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BannerSection from "../components/webtoon/BannerSection";
import CategorySection from "../components/webtoon/CategorySection";
// import OriginalSection from "../components/webtoon/OriginalSection";
import Top20Section from "../components/webtoon/Top20Section";
import "../styles/WebtoonPage.css";

// const WebtoonPage = () => (
//   <div className="webtoon-page">
//     <BannerSection />
//     <CategorySection />
//     <Top20Section />
//   </div>
// );

const WebtoonPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/error", { state: { message: "웹툰 데이터 API 문제로 인해 웹툰 서비스 점검 중입니다." } });
  }, [navigate]);

  return null;
};

export default WebtoonPage; 