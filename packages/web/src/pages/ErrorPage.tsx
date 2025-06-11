// packages/web/src/pages/ErrorPage.tsx
import React from "react";
import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const message = location.state?.message || "페이지를 찾을 수 없거나, 알 수 없는 오류가 발생했습니다.";

  return (
    <div style={{ textAlign: "center", marginTop: "100px", color: "white" }}>
      <h1>😢 에러가 발생했습니다</h1>
      <p>{message}</p>
      <a href="/" className="custom-link">홈으로 돌아가기</a>
    </div>
  );
};

export default ErrorPage;