import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/assets/images/logo.svg" alt="Elimu Tuts" />
          <span>Elimu Tuts</span>
        </Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/contact">Contact</Link>
      </div>
      
      <div className="navbar-auth">
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/register" className="register-btn">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;