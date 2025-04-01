import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import "./styles/Header.css";
import "./styles/SearchPage.css";
import RecommendPage from "./pages/RecommendPage";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main style={{ marginTop: "60px", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="/search" element={<SearchPage />} />

        </Routes>
      </main>
    </Router>
  );
};

export default App;