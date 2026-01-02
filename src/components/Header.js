import React from 'react';
import './Header.css';
import logo from "../assets/my fintrack logo.webp";

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="app-header">
      {/* Left: Logo + App Name */}
      <div className="app-logo">
        <img src={logo} alt="FinTrack Logo" className="logo" />
        <h1>FinTrack</h1>
      </div>

      {/* Right: Dark / Light Toggle */}
      <div className="theme-switch-wrapper">
        <label className="theme-switch">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </header>
  );
};

export default Header;
