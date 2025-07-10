import React from 'react';
import { MapPin, Clock, Circle } from 'lucide-react';

const MatchInfoStep = ({ matchData, updateMatchData }) => {
  const ballTypes = ['Tennis', 'Leather'];
  
  const locationSuggestions = [
    'Local Park Ground',
    'Community Center',
    'School Ground',
    'Sports Complex',
    'Backyard Cricket'
  ];

  return (
    <div className="match-info-step">
      <div className="step-layout">
        <div className="form-section">
          <h2 className="section-title">Match Details</h2>
          
          <div className="form-group">
            <label className="form-label">Match Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter match title (e.g., Sunday Cricket)"
              value={matchData.title}
              onChange={(e) => updateMatchData('title', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <div className="location-input-container">
              <MapPin className="input-icon" size={18} />
              <input
                type="text"
                className="form-input with-icon"
                placeholder="Enter location"
                value={matchData.location}
                onChange={(e) => updateMatchData('location', e.target.value)}
                list="location-suggestions"
              />
              <datalist id="location-suggestions">
                {locationSuggestions.map((location, index) => (
                  <option key={index} value={location} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Overs per Side</label>
            <div className="overs-input">
              <input
                type="range"
                className="overs-slider"
                min="5"
                max="50"
                value={matchData.overs}
                onChange={(e) => updateMatchData('overs', parseInt(e.target.value))}
              />
              <div className="overs-value">
                <span className="overs-number">{matchData.overs}</span>
                <span className="overs-label">Overs</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Ball Type</label>
            <div className="ball-type-toggle">
              {ballTypes.map((type) => (
                <button
                  key={type}
                  className={`ball-type-option ${matchData.ballType === type ? 'active' : ''}`}
                  onClick={() => updateMatchData('ballType', type)}
                >
                  <Circle className="ball-icon" size={16} />
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="preview-section">
          <h3 className="preview-title">Live Preview</h3>
          <div className="match-preview-card">
            <div className="preview-header">
              <h4 className="preview-match-title">
                {matchData.title || 'Match Title'}
              </h4>
              <div className="preview-badges">
                <span className="badge ball-type">
                  <Circle size={12} />
                  {matchData.ballType}
                </span>
                <span className="badge overs">
                  <Clock size={12} />
                  {matchData.overs} Overs
                </span>
              </div>
            </div>
            
            <div className="preview-location">
              <MapPin size={14} />
              <span>{matchData.location || 'Location'}</span>
            </div>
            
            <div className="preview-teams">
              <div className="preview-team">
                <div className="team-placeholder">A</div>
                <span>Team A</span>
              </div>
              <div className="vs-divider">VS</div>
              <div className="preview-team">
                <div className="team-placeholder">B</div>
                <span>Team B</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchInfoStep;