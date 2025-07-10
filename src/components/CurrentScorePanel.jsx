// CurrentScorePanel.jsx
import React from 'react';
import { Trophy, Target, TrendingUp } from 'lucide-react';
import './CurrentScorePanel.css';

const CurrentScorePanel = ({ gameState, matchData }) => {
  const getCurrentRunRate = () => {
    const totalOvers = gameState.overs + (gameState.balls / 6);
    return totalOvers > 0 ? (gameState.score / totalOvers).toFixed(2) : '0.00';
  };

  const getRequiredRunRate = () => {
    if (!gameState.target) return null;
    
    const remainingRuns = gameState.target - gameState.score;
    const remainingOvers = (matchData.overs - gameState.overs) - (gameState.balls / 6);
    
    if (remainingOvers <= 0) return '0.00';
    return (remainingRuns / remainingOvers).toFixed(2);
  };

  const getOversDisplay = () => {
    return `${gameState.overs}.${gameState.balls}`;
  };

  const getOversRemaining = () => {
    const totalBalls = (matchData.overs * 6);
    const playedBalls = (gameState.overs * 6) + gameState.balls;
    const remainingBalls = totalBalls - playedBalls;
    const remainingOvers = Math.floor(remainingBalls / 6);
    const remainingExtraBalls = remainingBalls % 6;
    
    if (remainingExtraBalls > 0) {
      return `${remainingOvers}.${remainingExtraBalls}`;
    }
    return remainingOvers.toString();
  };

  const getMatchStatus = () => {
    if (gameState.isMatchComplete) return 'Match Completed';
    if (gameState.isInningsComplete && gameState.currentInnings === 1) return 'First Innings Complete';
    if (gameState.currentInnings === 1) return 'First Innings';
    return 'Second Innings';
  };

  return (
    <div className="current-score-panel glass-card">
      <div className="score-header">
        <div className="team-info">
          <div className="team-logo">
            {gameState.battingTeam.logo ? (
              <img src={gameState.battingTeam.logo} alt={gameState.battingTeam.name} />
            ) : (
              <div className="team-initial">
                {gameState.battingTeam.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="team-details">
            <h2 className="team-name">{gameState.battingTeam.name}</h2>
            <p className="match-status">{getMatchStatus()}</p>
          </div>
        </div>

        <div className="innings-indicator">
          <span className="innings-text">
            {gameState.currentInnings === 1 ? '1st' : '2nd'} Innings
          </span>
        </div>
      </div>

      <div className="main-score">
        <div className="score-display">
          <span className="score-runs">{gameState.score}</span>
          <span className="score-separator">/</span>
          <span className="score-wickets">{gameState.wickets}</span>
        </div>
        <div className="overs-display">
          <span className="overs-text">({getOversDisplay()} overs)</span>
        </div>
      </div>

      <div className="score-stats">
        <div className="stat-item">
          <div className="stat-icon">
            <TrendingUp size={16} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Run Rate</span>
            <span className="stat-value">{getCurrentRunRate()}</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">
            <Trophy size={16} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Overs Left</span>
            <span className="stat-value">{getOversRemaining()}</span>
          </div>
        </div>

        {gameState.target && (
          <div className="stat-item">
            <div className="stat-icon">
              <Target size={16} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Need</span>
              <span className="stat-value">
                {gameState.target - gameState.score} @ {getRequiredRunRate()}
              </span>
            </div>
          </div>
        )}
      </div>

      {gameState.target && (
        <div className="target-info">
          <div className="target-text">
            Target: {gameState.target} runs
          </div>
          <div className="target-progress">
            <div 
              className="progress-bar"
              style={{ 
                width: `${Math.min((gameState.score / gameState.target) * 100, 100)}%` 
              }}
            />
          </div>
          <div className="target-details">
            <span>Need {gameState.target - gameState.score} more runs</span>
            <span>{10 - gameState.wickets} wickets remaining</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentScorePanel;