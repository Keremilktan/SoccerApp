import React from 'react';
import Navbar from '../Navbar/navbar.js';
import Logo from '../../assets/img/logo.png';
import '../../assets/css/my-css/header.css';

const Header = () => {
  return (
    <header className="site-navbar py-4" role="banner">
      <div className="container">
        <div className="d-flex align-items-center">
          <div className="site-logo">
            <a href="index.html">
              <img src={Logo} alt="Logo" />
            </a>
          </div>
          <div className="ml-auto">
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
