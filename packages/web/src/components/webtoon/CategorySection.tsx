import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../../styles/CategorySection.css";

interface Webtoon {
  id: string;
  title: string;
  provider: string;
  thumbnail: string[];
}

const CategorySection = () => {
  const [webtoons, setWebtoons] = useState<Webtoon[]>([]);

  useEffect(() => {
    fetch("https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons")
      .then(res => res.json())
      .then(data => setWebtoons(data.webtoons || []));
  }, []);

  const kakaoPageWebtoons = webtoons.filter(w => w.provider === "KAKAO_PAGE");
  const kakaoWebtoons = webtoons.filter(w => w.provider === "KAKAO");
  const naverWebtoons = webtoons.filter(w => w.provider === "NAVER");

  const preloadWebtoons = [
    ...kakaoPageWebtoons.slice(0, 4),
    ...kakaoWebtoons.slice(0, 3),
    ...naverWebtoons.slice(0, 3)
  ].slice(0, 10);

  return (
    <>
      <Helmet>
        {preloadWebtoons.map((webtoon) => (
          <link
            key={webtoon.id}
            rel="preload"
            as="image"
            href={webtoon.thumbnail[0]}
          />
        ))}
      </Helmet>
      <section className="category-section">
        <h2>카카오 페이지 웹툰</h2>
        <div className="webtoon-list">
          {kakaoPageWebtoons.slice(0, 10).map((webtoon) => (
            <div className="webtoon-item" key={webtoon.id}>
              <img src={webtoon.thumbnail[0]} alt={webtoon.title} loading="lazy" />
              <div>{webtoon.title}</div>
            </div>
          ))}
        </div>
        <h2>카카오 웹툰</h2>
        <div className="webtoon-list">
          {kakaoWebtoons.slice(0, 10).map((webtoon) => (
            <div className="webtoon-item" key={webtoon.id}>
              <img src={webtoon.thumbnail[0]} alt={webtoon.title} loading="lazy" />
              <div>{webtoon.title}</div>
            </div>
          ))}
        </div>
        <h2>네이버 웹툰</h2>
        <div className="webtoon-list">
          {naverWebtoons.slice(0, 5).map((webtoon) => (
            <div className="webtoon-item" key={webtoon.id}>
              <img src={webtoon.thumbnail[0]} alt={webtoon.title} loading="lazy" />
              <div>{webtoon.title}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CategorySection; 