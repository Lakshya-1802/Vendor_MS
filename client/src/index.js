import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from './App';
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      limit={2}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      theme="light"
      pauseOnHover={false}
    />
    <App />
  </React.StrictMode>
);

