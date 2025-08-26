import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ This is the wrapped version with BrowserRouter
import './index.css';     // Optional: global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);