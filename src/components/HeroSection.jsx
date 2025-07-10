import React from 'react';
import { Menu, X, Play, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      
      {/* Cricket Animation */}
      <div className="cricket-animation">
        <div className="cricket-ball"></div>
        <div className="cricket-bat"></div>
      </div>
      
      <div className="hero-content">
        {/* Main Heading */}
        <h1 className="hero-title">
          Score Your Gully Matches
          <span className="text-gradient"> Like a Pro!</span>
        </h1>
        
        {/* Subheading */}
        <p className="hero-subtitle">
          Create teams, toss, record every run & relive every match — all in one place.
        </p>
        
        {/* CTA Buttons */}
        <div className="hero-buttons">
          <button className="btn-cta primary">
            <Play size={20} />
            Start a Match Now
          </button>
          <button className="btn-cta secondary">
            <ArrowRight size={20} />
            How It Works
          </button>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-card card-1">
          <div className="score-display">
            <span className="team">Team A</span>
            <span className="score">124/3</span>
          </div>
        </div>
        
        <div className="floating-card card-2">
          <div className="score-display">
            <span className="team">Team B</span>
            <span className="score">89/2</span>
          </div>
        </div>
        
        <div className="floating-card card-3">
          <div className="match-event">
            <span className="event">🏏 SIX!</span>
            <span className="player">Rohit hits it out!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;