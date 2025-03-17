import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ `react-dom/client`에서 import
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element not found"); // ✅ Root 있는지 체크

const root = ReactDOM.createRoot(rootElement); // ✅ createRoot 사용
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);