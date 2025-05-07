import React, { useEffect, useState } from "react";
import "../../styles/Top20Section.css";

interface Webtoon {
  id: string;
  title: string;
  provider: string;
  thumbnail: string[];
}

function getRandomItems<T>(arr: T[], n: number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result.slice(0, n);
}

const Top20Section = () => {
  const [webtoons, setWebtoons] = useState<Webtoon[]>([]);

  useEffect(() => {
    fetch("https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons")
      .then(res => res.json())
      .then(data => setWebtoons(data.webtoons || []));
  }, []);

  const randomWebtoons = getRandomItems(webtoons, 10);

  return (
    <section className="top20-section">
      <h2>왓챠웹툰 TOP 10</h2>
      <div className="top20-list">
        {randomWebtoons.map((webtoon, idx) => (
          <div className="top20-item" key={webtoon.id}>
            <span className="rank">{idx + 1}</span>
            <img src={webtoon.thumbnail[0]} alt={webtoon.title} />
            <div>{webtoon.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Top20Section; 