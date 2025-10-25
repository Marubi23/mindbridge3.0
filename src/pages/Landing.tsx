// src/pages/Landing.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="mindbridge-header">
        <div className="container">
          <div className="header-content">
            <h1 className="logo">MindBridge</h1>
            <nav className="navigation">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/services" className="nav-link">Services</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <Link to="/signin" className="nav-link">Sign In</Link>
              <Link to="/get-started" className="nav-link get-started">Get Started</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Divider Line */}
      <div className="divider"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h2 className="subtitle">Professional Mental Health Support</h2>
          <h1 className="main-title">Your Journey to Mental Wellness Starts Here</h1>
          <p className="description">
            Connect with licensed psychiatrists, book appointments seamlessly, and receive personalized care in a secure, supportive environment.
          </p>
          
          <div className="action-buttons">
            <Link to="/book-session" className="btn primary-btn">Book Your First Session</Link>
            <Link to="/learn-more" className="btn secondary-btn">Learn More</Link>
          </div>

          {/* Stats Section */}
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Psychiatrists</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <span className="trust-item">100% Confidential</span>
            <span className="trust-item">HIPAA Compliant</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;