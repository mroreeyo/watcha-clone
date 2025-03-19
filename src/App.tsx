import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import "./styles/Header.css";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main style={{ marginTop: "60px", padding: "20px" }}>  {/* ✅ 여백 추가 */}
        <Routes>
      
        </Routes>
      </main>
    </Router>
  );
};

export default App;