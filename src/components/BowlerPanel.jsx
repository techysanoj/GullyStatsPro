import React from 'react';
import './BowlerPanel.css';

const BowlerPanel = ({ bowler, previousBowlers = [] }) => {
  const calculateEconomy = (runs, overs) => {
    if (overs === 0) return '0.00';
    return (runs / overs).toFixed(2);
  };

  const formatOvers = (balls) => {
    const completeOvers = Math.floor(balls / 6);
    const remainingBalls = balls % 6;
    return remainingBalls > 0 ? `${completeOvers}.${remainingBalls}` : completeOvers.toString();
  };

  return (
    <div className="bowler-panel">
      <div className="panel-header">
        <h3>Current Bowler</h3>
      </div>
      
      {bowler && (
        <div className="current-bowler-card">
          <div className="bowler-info">
            <div className="bowler-name-section">
              <span className="bowler-name">
                {bowler.name}
                {bowler.isCaptain && <span className="captain-icon">⭐</span>}
                <span className="bowling-indicator">🎳</span>
              </span>
              <span className="bowler-position">Bowling</span>
            </div>
            
            <div className="bowler-stats">
              <div className="stat-item">
                <span className="stat-label">Overs</span>
                <span className="stat-value">{formatOvers(bowler.balls)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Runs</span>
                <span className="stat-value">{bowler.runs}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Wickets</span>
                <span className="stat-value">{bowler.wickets}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Economy</span>
                <span className="stat-value">
                  {calculateEconomy(bowler.runs, bowler.balls / 6)}
                </span>
              </div>
            </div>
            
            <div className="current-over-info">
              <div className="over-header">
                <span>Current Over</span>
                <span className="over-number">Over {Math.floor(bowler.balls / 6) + 1}</span>
              </div>
              <div className="over-stats">
                <span className="over-runs">{bowler.currentOverRuns || 0} runs</span>
                <span className="balls-remaining">
                  {6 - (bowler.balls % 6)} balls remaining
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {previousBowlers.length > 0 && (
        <div className="previous-bowlers-section">
          <div className="section-header">
            <h4>Previous Bowlers</h4>
          </div>
          <div className="previous-bowlers-list">
            {previousBowlers.slice(0, 3).map((prevBowler, index) => (
              <div key={prevBowler.id} className="previous-bowler-card">
                <div className="prev-bowler-name">
                  {prevBowler.name}
                  {prevBowler.isCaptain && <span className="captain-icon">⭐</span>}
                </div>
                <div className="prev-bowler-stats">
                  <span>{formatOvers(prevBowler.balls)}</span>
                  <span>{prevBowler.runs}R</span>
                  <span>{prevBowler.wickets}W</span>
                  <span>{calculateEconomy(prevBowler.runs, prevBowler.balls / 6)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BowlerPanel;