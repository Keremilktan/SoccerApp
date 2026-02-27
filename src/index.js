import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './pages/Admin/admin';
import reportWebVitals from './reportWebVitals';

// CSS
import './assets/fonts/icomoon/style.css';
import './assets/css/bootstrap/bootstrap.css';
import './assets/css/owl.theme.default.min.css';
import './assets/css/jquery.fancybox.min.css';
import './assets/css/bootstrap-datepicker.css';
import './assets/fonts/flaticon/font/flaticon.css';
import './assets/css/aos.css';
import './assets/css/style.css';
import './assets/css/myCss.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
