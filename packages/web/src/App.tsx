import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import "./styles/Header.css";
import "./styles/SearchPage.css";
import RecommendPage from "./pages/RecommendPage";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main style={{ marginTop: "90px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/sign_in" element={<LoginPage />} />
          <Route path="/sign_up" element={<SignUpPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;