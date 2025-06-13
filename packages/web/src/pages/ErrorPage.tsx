// packages/web/src/pages/ErrorPage.tsx
import React from "react";

const ErrorPage = () => (
  <div style={{ textAlign: "center", marginTop: "100px" }}>
    <h1>😢 에러가 발생했습니다</h1>
    <p>페이지를 찾을 수 없거나, 알 수 없는 오류가 발생했습니다.</p>
    <a href="/">홈으로 돌아가기</a>
  </div>
);

export default ErrorPage;