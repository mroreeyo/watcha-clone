import React from "react";
import BannerSection from "../components/webtoon/BannerSection";
import CategorySection from "../components/webtoon/CategorySection";
// import OriginalSection from "../components/webtoon/OriginalSection";
import Top20Section from "../components/webtoon/Top20Section";
import "../styles/WebtoonPage.css";

const WebtoonPage = () => (
  <div className="webtoon-page">
    <BannerSection />
    <CategorySection />
    <Top20Section />
  </div>
);

export default WebtoonPage; 