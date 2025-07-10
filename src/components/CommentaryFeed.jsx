import React, { useState, useEffect, useRef } from 'react';
import './CommentaryFeed.css';

const CommentaryFeed = ({ commentary = [], isLive = true, enableEmojis = true }) => {
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const feedRef = useRef(null);

  // Auto-scroll to bottom when new commentary is added
  useEffect(() => {
    if (feedRef.current && !isAutoPaused && commentary.length > 0) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [commentary, isAutoPaused]);

  // Show scroll to top button when scrolled up
  useEffect(() => {
    const handleScroll = () => {
      if (feedRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = feedRef.current;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
        setShowScrollTop(!isAtBottom);
        
        // Auto-pause if user scrolls up
        if (!isAtBottom && !isAutoPaused) {
          setIsAutoPaused(true);
        }
      }
    };

    const feedElement = feedRef.current;
    if (feedElement) {
      feedElement.addEventListener('scroll', handleScroll);
      return () => feedElement.removeEventListener('scroll', handleScroll);
    }
  }, [isAutoPaused]);

  const scrollToTop = () => {
    if (feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  };

  const scrollToBottom = () => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
      setIsAutoPaused(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getCommentaryIcon = (type) => {
    const icons = {
      'runs': '🏃',
      'boundary': '💥',
      'six': '🚀',
      'wicket': '⚡',
      'extra': '🔄',
      'dot': '⚫',
      'milestone': '🎯',
      'over': '🎳'
    };
    return enableEmojis ? icons[type] || '📝' : '';
  };

  const getCommentaryClass = (type) => {
    const classes = {
      'boundary': 'commentary-boundary',
      'six': 'commentary-six',
      'wicket': 'commentary-wicket',
      'milestone': 'commentary-milestone',
      'over': 'commentary-over'
    };
    return classes[type] || 'commentary-regular';
  };

  return (
    <div className="commentary-feed">
      <div className="feed-header">
        <div className="header-left">
          <h3>Live Commentary</h3>
          {isLive && (
            <div className="live-indicator">
              <span className="live-dot"></span>
              <span>LIVE</span>
            </div>
          )}
        </div>
        <div className="header-controls">
          <button 
            className={`control-btn ${isAutoPaused ? 'paused' : 'playing'}`}
            onClick={() => setIsAutoPaused(!isAutoPaused)}
            title={isAutoPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
          >
            {isAutoPaused ? '▶️' : '⏸️'}
          </button>
          <button 
            className="control-btn emoji-toggle"
            onClick={() => {}}
            title="Toggle emojis"
          >
            {enableEmojis ? '😊' : '😐'}
          </button>
        </div>
      </div>

      <div className="feed-container" ref={feedRef}>
        <div className="commentary-list">
          {commentary.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏏</div>
              <h4>Match Commentary</h4>
              <p>Live commentary will appear here as the match progresses</p>
            </div>
          ) : (
            commentary.map((comment, index) => (
              <div 
                key={comment.id || index} 
                className={`commentary-item ${getCommentaryClass(comment.type)}`}
              >
                <div className="comment-header">
                  <div className="comment-over">
                    {comment.over && (
                      <span className="over-badge">
                        {comment.over}
                      </span>
                    )}
                    <span className="comment-icon">
                      {getCommentaryIcon(comment.type)}
                    </span>
                  </div>
                  <div className="comment-time">
                    {formatTime(comment.timestamp)}
                  </div>
                </div>
                <div className="comment-content">
                  <p className="comment-text">{comment.text}</p>
                  {comment.description && (
                    <p className="comment-description">{comment.description}</p>
                  )}
                </div>
                {comment.score && (
                  <div className="comment-score">
                    <span className="score-display">{comment.score}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {showScrollTop && (
        <div className="scroll-controls">
          <button 
            className="scroll-btn scroll-top"
            onClick={scrollToTop}
            title="Scroll to top"
          >
            ⬆️
          </button>
          <button 
            className="scroll-btn scroll-bottom"
            onClick={scrollToBottom}
            title="Back to live"
          >
            ⬇️ Live
          </button>
        </div>
      )}

      <div className="feed-footer">
        <div className="commentary-stats">
          <span className="stat-item">
            {commentary.length} updates
          </span>
          {commentary.filter(c => c.type === 'boundary').length > 0 && (
            <span className="stat-item">
              {commentary.filter(c => c.type === 'boundary' || c.type === 'six').length} boundaries
            </span>
          )}
          {commentary.filter(c => c.type === 'wicket').length > 0 && (
            <span className="stat-item">
              {commentary.filter(c => c.type === 'wicket').length} wickets
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentaryFeed;