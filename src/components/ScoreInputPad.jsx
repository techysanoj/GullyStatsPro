// ScoreInputPad.jsx
import React, { useState } from 'react';
import { Undo2, Redo2, Edit3, RotateCcw } from 'lucide-react';
import './ScoreInputPad.css';

const ScoreInputPad = ({ onAddBall, onUndo, onRedo, canUndo, canRedo, disabled }) => {
  const [showWicketOptions, setShowWicketOptions] = useState(false);
  const [lastBallType, setLastBallType] = useState(null);

  const handleBallClick = (type, runs = 0, isExtra = false, isWicket = false, wicketType = null) => {
    if (disabled) return;
    
    onAddBall(type, runs, isExtra, isWicket, wicketType);
    setLastBallType(type);
    setShowWicketOptions(false);
    
    // Add haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const runButtons = [
    { label: '0', runs: 0, type: 'dot' },
    { label: '1', runs: 1, type: 'run' },
    { label: '2', runs: 2, type: 'run' },
    { label: '3', runs: 3, type: 'run' },
    { label: '4', runs: 4, type: 'boundary' },
    { label: '6', runs: 6, type: 'six' }
  ];

  const extraButtons = [
    { label: 'WD', type: 'WD', runs: 1, isExtra: true },
    { label: 'NB', type: 'NB', runs: 1, isExtra: true },
    { label: 'BYE', type: 'BYE', runs: 1, isExtra: true },
    { label: 'LB', type: 'LB', runs: 1, isExtra: true }
  ];

  const wicketTypes = [
    { label: 'Bowled', type: 'bowled' },
    { label: 'Caught', type: 'caught' },
    { label: 'LBW', type: 'lbw' },
    { label: 'Run Out', type: 'runout' },
    { label: 'Stumped', type: 'stumped' },
    { label: 'Hit Wicket', type: 'hitwicket' }
  ];

  const getButtonClass = (type) => {
    let baseClass = 'input-btn btn-ripple';
    
    switch (type) {
      case 'dot':
        return `${baseClass} btn-dot`;
      case 'run':
        return `${baseClass} btn-run`;
      case 'boundary':
        return `${baseClass} btn-boundary`;
      case 'six':
        return `${baseClass} btn-six`;
      case 'extra':
        return `${baseClass} btn-extra`;
      case 'wicket':
        return `${baseClass} btn-wicket`;
      case 'action':
        return `${baseClass} btn-action`;
      default:
        return baseClass;
    }
  };

  return (
    <div className="score-input-pad glass-card">
      <div className="pad-header">
        <h3 className="pad-title">Score Input</h3>
        <div className="pad-actions">
          <button 
            className={`action-btn ${!canUndo ? 'disabled' : ''}`}
            onClick={onUndo}
            disabled={!canUndo || disabled}
            title="Undo last ball"
          >
            <Undo2 size={16} />
          </button>
          <button 
            className={`action-btn ${!canRedo ? 'disabled' : ''}`}
            onClick={onRedo}
            disabled={!canRedo || disabled}
            title="Redo last ball"
          >
            <Redo2 size={16} />
          </button>
        </div>
      </div>

      {disabled && (
        <div className="disabled-overlay">
          <p>Innings Complete</p>
        </div>
      )}

      <div className="input-section">
        <h4 className="section-title">Runs</h4>
        <div className="button-grid runs-grid">
          {runButtons.map((btn) => (
            <button
              key={btn.label}
              className={getButtonClass(btn.type)}
              onClick={() => handleBallClick(btn.type, btn.runs)}
              disabled={disabled}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="input-section">
        <h4 className="section-title">Extras</h4>
        <div className="button-grid extras-grid">
          {extraButtons.map((btn) => (
            <button
              key={btn.label}
              className={getButtonClass('extra')}
              onClick={() => handleBallClick(btn.type, btn.runs, btn.isExtra)}
              disabled={disabled}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="input-section">
        <h4 className="section-title">Wickets</h4>
        <div className="wicket-section">
          <button
            className={getButtonClass('wicket')}
            onClick={() => setShowWicketOptions(!showWicketOptions)}
            disabled={disabled}
          >
            W
          </button>
          
          {showWicketOptions && (
            <div className="wicket-options">
              {wicketTypes.map((wicket) => (
                <button
                  key={wicket.type}
                  className="wicket-option"
                  onClick={() => handleBallClick('wicket', 0, false, true, wicket.type)}
                  disabled={disabled}
                >
                  {wicket.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="input-section">
        <h4 className="section-title">Quick Actions</h4>
        <div className="button-grid actions-grid">
          <button
            className={getButtonClass('action')}
            onClick={() => console.log('Edit last ball')}
            disabled={disabled}
          >
            <Edit3 size={16} />
            Edit
          </button>
          <button
            className={getButtonClass('action')}
            onClick={() => console.log('Reset over')}
            disabled={disabled}
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      {lastBallType && (
        <div className="last-ball-indicator">
          <span>Last: {lastBallType}</span>
        </div>
      )}
    </div>
  );
};

export default ScoreInputPad;