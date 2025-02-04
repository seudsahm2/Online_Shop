import React from 'react';
import './Header.css'; // Styles for the header

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/Restaurant4.jpg" alt="Restaurant Logo" className="logo" />
        <h1 className="site-title">E-Shop Directory</h1>
      </div>
      <nav className="nav">
        <a href="/" className="nav-link">
          Home
        </a>
        <a href="/about" className="nav-link">
          About
        </a>
        <a href="/contact" className="nav-link">
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;