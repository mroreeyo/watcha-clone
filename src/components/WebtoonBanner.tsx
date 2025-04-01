import React from "react";
import "../styles/WebtoonBanner.css";
import webtoonImg from "../assets/webtoon.png";


const WebtoonBanner = () => {
  return (
    <section className="webtoon-section">
      <ul>
        <li>
          <a
            href="https://watcha.com/notices/2032"
            target="_blank"
            rel="noopener noreferrer"
            className="webtoon-link"
          >
            <div className="webtoon-wrapper">
              <div className="webtoon-image-container">
                <img
                  className="webtoon-image"
                  src={webtoonImg}
                  alt="왓챠 웹툰 배너 small"
                />
              </div>
            </div>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default WebtoonBanner;