import React from 'react';
import '../../assets/css/my-css/navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        SoccerApp
      </div>

      <div className="nav-links">
        <a href="#" className="nav-link">Home</a>
        <a href="#calendar" className="nav-link">Calendar</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#contact" className="nav-link">Contact</a>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search for fields..." />
      </div>
    </div>
  );
};

export default Navbar;
