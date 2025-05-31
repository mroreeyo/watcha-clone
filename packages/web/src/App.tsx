import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import "./styles/Header.css";
import "./styles/SearchPage.css";
import WebtoonPage from "./pages/WebtoonPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MovieDetailPage from "./pages/MovieDetailPage";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <main style={{ marginTop: "90px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/browse/theater" replace />} />
            <Route path="/browse/theater" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/sign_in" element={<LoginPage />} />
            <Route path="/sign_up" element={<SignUpPage />} />
            <Route path="/browse/webtoon" element={<WebtoonPage />} />
            <Route path="/movies/:id" element={<MovieDetailPage />} />
            <Route path="/detail/:media_type/:id" element={<MovieDetailPage />} />
          </Routes>
        </main>
      </Router>
    </QueryClientProvider>
  );
};

export default App;