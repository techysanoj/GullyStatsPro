import React from 'react';
import './BatsmanPanel.css';

const BatsmanPanel = ({ batsmen, currentStriker }) => {
  return (
    <div className="batsman-panel">
      <div className="panel-header">
        <h3>Current Batsmen</h3>
      </div>
      
      <div className="batsmen-container">
        {batsmen.map((batsman, index) => (
          <div 
            key={batsman.id} 
            className={`batsman-card ${currentStriker === batsman.id ? 'striker' : 'non-striker'}`}
          >
            <div className="batsman-info">
              <div className="batsman-name-section">
                <span className="batsman-name">
                  {batsman.name}
                  {batsman.isCaptain && <span className="captain-icon">⭐</span>}
                  {currentStriker === batsman.id && <span className="striker-icon">🎯</span>}
                </span>
                <span className="batsman-position">
                  {currentStriker === batsman.id ? 'On Strike' : 'Non-Striker'}
                </span>
              </div>
              
              <div className="batsman-stats">
                <div className="stat-item">
                  <span className="stat-label">Runs</span>
                  <span className="stat-value">{batsman.runs}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Balls</span>
                  <span className="stat-value">{batsman.balls}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">SR</span>
                  <span className="stat-value">
                    {batsman.balls > 0 ? ((batsman.runs / batsman.balls) * 100).toFixed(1) : '0.0'}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">4s</span>
                  <span className="stat-value">{batsman.fours}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">6s</span>
                  <span className="stat-value">{batsman.sixes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="partnership-info">
        <div className="partnership-header">
          <span>Partnership</span>
        </div>
        <div className="partnership-stats">
          <span className="partnership-runs">
            {batsmen.reduce((total, batsman) => total + batsman.runs, 0)} runs
          </span>
          <span className="partnership-balls">
            {batsmen.reduce((total, batsman) => total + batsman.balls, 0)} balls
          </span>
        </div>
      </div>
    </div>
  );
};

export default BatsmanPanel;