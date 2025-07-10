// MatchHeader.jsx
import React, { useState } from 'react';
import { Settings, Share2, Square, Play, Pause, ChevronLeft } from 'lucide-react';
import './MatchHeader.css';

const MatchHeader = ({ matchData, gameState, onEndInnings, onStartSecondInnings }) => {
  const [isLive, setIsLive] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const handleShare = () => {
    const matchUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: matchData.title,
        text: `Watch live: ${matchData.title}`,
        url: matchUrl
      });
    } else {
      navigator.clipboard.writeText(matchUrl);
      alert('Match link copied to clipboard!');
    }
  };

  const getMatchStatus = () => {
    if (gameState.isMatchComplete) return 'Completed';
    if (gameState.isInningsComplete && gameState.currentInnings === 1) return 'Innings Break';
    if (!isLive) return 'Paused';
    return 'Live';
  };

  const getStatusColor = () => {
    const status = getMatchStatus();
    switch (status) {
      case 'Live': return '#10b981';
      case 'Paused': return '#f59e0b';
      case 'Completed': return '#6b7280';
      case 'Innings Break': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  return (
    <header className="match-header">
      <div className="header-content">
        <div className="header-left">
          <button className="back-btn">
            <ChevronLeft size={20} />
          </button>
          <div className="match-info">
            <h1 className="match-title">{matchData.title}</h1>
            <p className="match-location">{matchData.location}</p>
          </div>
        </div>

        <div className="header-center">
          <div className="status-indicator">
            <div 
              className="status-dot"
              style={{ backgroundColor: getStatusColor() }}
            />
            <span className="status-text">{getMatchStatus()}</span>
          </div>
        </div>

        <div className="header-right">
          <button 
            className="header-btn"
            onClick={() => setIsLive(!isLive)}
            title={isLive ? 'Pause Match' : 'Resume Match'}
          >
            {isLive ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button 
            className="header-btn"
            onClick={handleShare}
            title="Share Match"
          >
            <Share2 size={18} />
          </button>

          <button 
            className="header-btn"
            onClick={() => setShowSettings(!showSettings)}
            title="Settings"
          >
            <Settings size={18} />
          </button>

          {gameState.isInningsComplete && gameState.currentInnings === 1 && (
            <button 
              className="header-btn primary"
              onClick={onStartSecondInnings}
              title="Start Second Innings"
            >
              Next Innings
            </button>
          )}

          {!gameState.isInningsComplete && (
            <button 
              className="header-btn danger"
              onClick={onEndInnings}
              title="End Current Innings"
            >
              <Square size={18} />
              End Innings
            </button>
          )}
        </div>
      </div>

      {showSettings && (
        <div className="settings-dropdown">
          <div className="settings-content">
            <h3>Match Settings</h3>
            <div className="setting-item">
              <label>
                <input type="checkbox" defaultChecked />
                Auto-commentary
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input type="checkbox" defaultChecked />
                Sound effects
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input type="checkbox" />
                Dark mode
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input type="checkbox" defaultChecked />
                Live sync
              </label>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MatchHeader;