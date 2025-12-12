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

        {/* Dummy Features Section */}
        <div className="landing-features">
          <div className="feature-card">
            <h3>Instant Explanations</h3>
            <p>Get real-time AI-powered explanations of your code, no waiting required.</p>
          </div>
          <div className="feature-card">
            <h3>Supports Multiple Languages</h3>
            <p>Python, JavaScript, Java, C++, and more. Learn without switching tools.</p>
          </div>
          <div className="feature-card">
            <h3>Learn Faster</h3>
            <p>Understand code concepts instantly and improve your programming skills quickly.</p>
          </div>
          <div className="feature-card">
            <h3>Dark Mode IDE</h3>
            <p>Enjoy a modern, compact, and distraction-free coding environment.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
