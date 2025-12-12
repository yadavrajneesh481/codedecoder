import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">
      <h2 className="logo">CodeExplainer</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
