import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="landing-container">
        <h1 className="landing-title">Code Explainer IDE</h1>
        <p className="landing-subtitle">
          Paste your code → Understand instantly → Learn faster
        </p>

        <div className="landing-buttons">
          <Link to="/login" className="btn primary">Login</Link>
          <Link to="/signup" className="btn secondary">Sign Up</Link>
        </div>


      </div>
    </>
  );
}

export default LandingPage;
