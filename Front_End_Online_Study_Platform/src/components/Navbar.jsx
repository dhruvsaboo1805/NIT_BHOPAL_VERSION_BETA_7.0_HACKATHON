import React from 'react'
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbar-left">
          <div className="logo">⚙️</div>
          <nav>
            {/* <a href="#explore">Explore</a> */}
            <a href="/">Problems</a>
            <a href="#contest">Contest</a>
            <a href="#discuss">Discuss</a>
            <a href="/article">Articles</a>
          </nav>
        </div>
        <div className="navbar-right">
          <div className="icon">🔔</div>
          <div className="flame">🔥 257</div>
          <div className="profile">👤</div>
        </div>
      </div>
  )
}

export default Navbar
