import React from "react";
import hotNewImg from "../../assets/webtoon/hot-new.png";
import familyImg from "../../assets/webtoon/family.png";
import earthImg from "../../assets/webtoon/earth.png";
import "../../styles/BannerSection.css";

const BannerSection = () => (
  <section className="banner-section">
    <div className="banner-list">
      <div className="banner-item">
        <img src={hotNewImg} alt="HOT & NEW" />
        <div className="banner-info">
          <h3>HOT & NEW</h3>
          <p>설레는 만화들, 유쾌한 모험, 귀여움이 부드럽게 둥둥~~</p>
        </div>
      </div>
      <div className="banner-item">
        <img src={familyImg} alt="가족, 가장 작지만 가장 큰 이야기" />
        <div className="banner-info">
          <h3>가족, 가장 작지만 가장 큰 이야기</h3>
          <p>내가 나인 것만으로 사랑을 주는 사람들</p>
        </div>
      </div>
      <div className="banner-item">
        <img src={earthImg} alt="원고로 지구 6바퀴도 거뜬해요" />
        <div className="banner-info">
          <h3>원고로 지구 6바퀴도 거뜬해요</h3>
          <p>끊임없는 열정과 함께 하루가 순삭되는 창작들</p>
        </div>
      </div>
    </div>
  </section>
);

export default BannerSection; 