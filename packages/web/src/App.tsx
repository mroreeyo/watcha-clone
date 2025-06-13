import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import "./styles/Header.css";
import "./styles/SearchPage.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const WebtoonPage = lazy(() => import("./pages/WebtoonPage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <main style={{ marginTop: "90px" }}>
          <Suspense fallback={<div>로딩 중...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/browse/theater" replace />} />
              <Route path="/browse/theater" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/sign_in" element={<LoginPage />} />
              <Route path="/sign_up" element={<SignUpPage />} />
              <Route path="/browse/webtoon" element={<WebtoonPage />} />
              <Route path="/movies/:id" element={<MovieDetailPage />} />
              <Route path="/detail/:media_type/:id" element={<MovieDetailPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Suspense>
        </main>
      </Router>
    </QueryClientProvider>
  );
};

export default App;