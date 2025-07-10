import React, { useState, useEffect } from 'react';
import { Menu, X, User, Bell, Search } from 'lucide-react';
import './Header.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
   const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); // navigates to home
  };


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section" onClick={handleClick}>
          <div className="logo-icon">
            <div className="cricket-bat">🏏</div>
          </div>
          <div className="logo-text">
            <span className="logo-main">GullyCricket</span>
            <span className="logo-sub">Pro</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <a href="#home" className="nav-item active">
            <span>Home</span>
            <div className="nav-indicator"></div>
          </a>
          <a href="#live" className="nav-item">
            <span>Live Match</span>
            <div className="nav-indicator"></div>
          </a>
          <Link to="/create-match" className="nav-item" onClick={closeMenu}>
            <span>Create Match</span>
            <div className="nav-indicator"></div>
          </Link>
          <a href="#teams" className="nav-item">
            <span>Teams</span>
            <div className="nav-indicator"></div>
          </a>
          <a href="#history" className="nav-item">
            <span>Score History</span>
            <div className="nav-indicator"></div>
          </a>
          <a href="#about" className="nav-item">
            <span>About</span>
            <div className="nav-indicator"></div>
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="header-actions">
          <button className="action-btn search-btn">
            <Search size={20} />
          </button>
          <button className="action-btn notification-btn">
            <Bell size={20} />
            <span className="notification-badge">2</span>
          </button>
          <button className="auth-btn login-btn">Login</button>
          <button className="auth-btn register-btn">
            <User size={16} />
            Register
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <span className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-logo">
            <div className="logo-icon">
              <div className="cricket-bat">🏏</div>
            </div>
            <span>GullyCricketPro</span>
          </div>
          <button className="mobile-close-btn" onClick={closeMenu}>
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-nav">
          <a href="#home" className="mobile-nav-item active" onClick={closeMenu}>
            <span>🏠</span>
            <div>
              <span className="nav-title">Home</span>
              <span className="nav-subtitle">Dashboard & Overview</span>
            </div>
          </a>
          <a href="#live" className="mobile-nav-item" onClick={closeMenu}>
            <span>🔴</span>
            <div>
              <span className="nav-title">Live Match</span>
              <span className="nav-subtitle">Watch ongoing games</span>
            </div>
          </a>
          <Link to="/create-match" className="mobile-nav-item" onClick={closeMenu}>
            <span>➕</span>
            <div>
              <span className="nav-title">Create Match</span>
              <span className="nav-subtitle">Start a new game</span>
            </div>
          </Link>
          <a href="#teams" className="mobile-nav-item" onClick={closeMenu}>
            <span>👥</span>
            <div>
              <span className="nav-title">Teams</span>
              <span className="nav-subtitle">Manage your squads</span>
            </div>
          </a>
          <a href="#history" className="mobile-nav-item" onClick={closeMenu}>
            <span>📊</span>
            <div>
              <span className="nav-title">Score History</span>
              <span className="nav-subtitle">Past match records</span>
            </div>
          </a>
          <a href="#about" className="mobile-nav-item" onClick={closeMenu}>
            <span>ℹ️</span>
            <div>
              <span className="nav-title">About Us</span>
              <span className="nav-subtitle">Learn more about us</span>
            </div>
          </a>
        </nav>

        <div className="mobile-menu-footer">
          <button className="mobile-auth-btn login" onClick={closeMenu}>
            Login
          </button>
          <button className="mobile-auth-btn register" onClick={closeMenu}>
            <User size={16} />
            Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;