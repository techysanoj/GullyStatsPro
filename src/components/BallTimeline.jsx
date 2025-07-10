import React, { useEffect, useRef } from 'react';
import './BallTimeline.css';

const BallTimeline = ({ balls = [], currentOver = 1 }) => {
  const timelineRef = useRef(null);

  // Auto-scroll to the latest ball
  useEffect(() => {
    if (timelineRef.current && balls.length > 0) {
      timelineRef.current.scrollLeft = timelineRef.current.scrollWidth;
    }
  }, [balls]);

  const getBallClass = (ball) => {
    if (ball.isWicket) return 'ball-wicket';
    if (ball.isExtra) return 'ball-extra';
    if (ball.runs > 0) return 'ball-runs';
    return 'ball-dot';
  };

  const getBallDisplay = (ball) => {
    if (ball.isWicket) return 'W';
    if (ball.type === 'wide') return 'WD';
    if (ball.type === 'noBall') return 'NB';
    if (ball.type === 'legBye') return 'LB';
    if (ball.type === 'bye') return 'B';
    if (ball.runs === 0) return '•';
    return ball.runs.toString();
  };

  const getBallTooltip = (ball) => {
    let tooltip = '';
    if (ball.isWicket) {
      tooltip = `Wicket - ${ball.dismissalType || 'Out'}`;
    } else if (ball.isExtra) {
      tooltip = `${ball.type} - ${ball.runs} run${ball.runs !== 1 ? 's' : ''}`;
    } else {
      tooltip = `${ball.runs} run${ball.runs !== 1 ? 's' : ''}`;
    }
    
    if (ball.batsman) {
      tooltip += ` (${ball.batsman})`;
    }
    
    return tooltip;
  };

  // Group balls by over (6 balls per over)
  const groupedBalls = [];
  for (let i = 0; i < balls.length; i += 6) {
    groupedBalls.push(balls.slice(i, i + 6));
  }

  // Add current incomplete over if exists
  const lastOver = groupedBalls[groupedBalls.length - 1];
  if (!lastOver || lastOver.length === 6) {
    groupedBalls.push([]);
  }

  return (
    <div className="ball-timeline">
      <div className="timeline-header">
        <h3>Ball Timeline</h3>
        <div className="timeline-legend">
          <div className="legend-item">
            <span className="legend-dot ball-runs"></span>
            <span>Runs</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot ball-wicket"></span>
            <span>Wicket</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot ball-extra"></span>
            <span>Extra</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot ball-dot"></span>
            <span>Dot</span>
          </div>
        </div>
      </div>
      
      <div className="timeline-container" ref={timelineRef}>
        <div className="timeline-track">
          {groupedBalls.map((over, overIndex) => (
            <div key={overIndex} className="over-group">
              <div className="over-header">
                <span className="over-number">Over {overIndex + 1}</span>
                <span className="over-runs">
                  {over.reduce((sum, ball) => sum + (ball.runs || 0), 0)} runs
                </span>
              </div>
              <div className="balls-container">
                {Array.from({ length: 6 }, (_, ballIndex) => {
                  const ball = over[ballIndex];
                  return (
                    <div
                      key={ballIndex}
                      className={`ball-chip ${ball ? getBallClass(ball) : 'ball-upcoming'}`}
                      title={ball ? getBallTooltip(ball) : 'Upcoming ball'}
                    >
                      <span className="ball-display">
                        {ball ? getBallDisplay(ball) : '−'}
                      </span>
                      {ball && ball.isWicket && (
                        <div className="wicket-indicator">⚡</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="timeline-summary">
        <div className="summary-item">
          <span className="summary-label">Total Balls</span>
          <span className="summary-value">{balls.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Dots</span>
          <span className="summary-value">
            {balls.filter(ball => ball.runs === 0 && !ball.isWicket && !ball.isExtra).length}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Boundaries</span>
          <span className="summary-value">
            {balls.filter(ball => ball.runs === 4 || ball.runs === 6).length}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Wickets</span>
          <span className="summary-value">
            {balls.filter(ball => ball.isWicket).length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BallTimeline;