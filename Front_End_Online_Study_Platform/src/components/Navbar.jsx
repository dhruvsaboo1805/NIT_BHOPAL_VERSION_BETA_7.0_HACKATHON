import React from 'react';
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = (props) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <img src={logo} alt="" className='navbar_logo'/>
        </div>
        <nav>
          <a href="/">Problems</a>
          <a href="/contest">Contest</a>
          <a href="#discuss">Discuss</a>
          <a href="/article">Articles</a>
        </nav>
      </div>
      <div className="navbar-right">
        <div className="icon">🔔</div>
        <div className="flame">🔥 {props.streak} 0</div>  
        <div className="profile"><a href="/profile">👤</a></div>
      </div>
    </div>
  );
};

export default Navbar;
