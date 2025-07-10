import React from 'react';
import { Menu, X, Play, ArrowRight, Search, Bell, User } from 'lucide-react';

const HeroSection = () => {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      padding: '4rem 0'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
        `
      }}></div>
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.2)'
      }}></div>
      
      {/* Cricket Animation */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        textAlign: 'center'
      }}>
        {/* Main Heading */}
        <h1 style={{
          fontFamily: 'Oswald, sans-serif',
          fontSize: '3.5rem',
          fontWeight: '800',
          lineHeight: '1.1',
          marginBottom: '1.5rem',
          color: 'white',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          Score Your Gully Matches&nbsp;
          <span style={{
            fontSize: '4rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            display: 'inline-block'
          }}>
             Like a Pro!
          </span>

        </h1>
        
        {/* Subheading */}
        <p style={{
          fontSize: '1.3rem',
          marginBottom: '2.5rem',
          color: '#cbd5e1',
          lineHeight: '1.6',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Create teams, toss, record every run & relive every match — all in one place.
        </p>
        
        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px 32px',
            border: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            outline: 'none',
            position: 'relative',
            overflow: 'hidden',
            minWidth: '200px',
            gap: '0.5rem',
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: 'white',
            boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
            transform: 'translateY(0)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 12px 35px rgba(37, 99, 235, 0.6)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
          }}>
            <Play size={20} />
            Start a Match Now
          </button>
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px 32px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            outline: 'none',
            position: 'relative',
            overflow: 'hidden',
            minWidth: '200px',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            transform: 'translateY(0)'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            e.target.style.transform = 'translateY(-3px)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            e.target.style.transform = 'translateY(0)';
          }}>
            <ArrowRight size={20} />
            How It Works
          </button>
        </div>
        
        {/* Floating Elements */}
        <div style={{
          position: 'relative',
          height: '200px',
          marginTop: '2rem'
        }}>
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '10%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '1rem 1.5rem',
            color: 'white',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            animation: 'float 6s ease-in-out infinite',
            minWidth: '120px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                fontSize: '0.9rem',
                opacity: 0.8,
                fontWeight: '500',
                color: '#cbd5e1'
              }}>Team A</span>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                fontFamily: 'Oswald, sans-serif',
                color: 'white'
              }}>124/3</span>
            </div>
          </div>
          
          <div style={{
            position: 'absolute',
            top: '80px',
            right: '15%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '1rem 1.5rem',
            color: 'white',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            animation: 'float 6s ease-in-out infinite 2s',
            minWidth: '120px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                fontSize: '0.9rem',
                opacity: 0.8,
                fontWeight: '500',
                color: '#cbd5e1'
              }}>Team B</span>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                fontFamily: 'Oswald, sans-serif',
                color: 'white'
              }}>89/2</span>
            </div>
          </div>
          
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '1rem 1.5rem',
            color: 'white',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            animation: 'float 6s ease-in-out infinite 4s',
            minWidth: '120px',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <span style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color: '#fbbf24'
              }}>🏏 SIX!</span>
              <span style={{
                fontSize: '0.9rem',
                opacity: '0.9',
                color: '#cbd5e1'
              }}>Rohit hits it out!</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-20px) rotate(1deg);
          }
        }

        @keyframes ballBounce {
          0%, 100% { 
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          25% { 
            transform: translateX(50px) translateY(-30px);
            opacity: 0.8;
          }
          50% { 
            transform: translateX(100px) translateY(0);
            opacity: 0.6;
          }
          75% { 
            transform: translateX(150px) translateY(-15px);
            opacity: 0.4;
          }
        }

        @keyframes batSwing {
          0%, 100% { 
            transform: translate(-50%, -50%) rotate(0deg);
          }
          20% { 
            transform: translate(-50%, -50%) rotate(-45deg);
          }
          40% { 
            transform: translate(-50%, -50%) rotate(20deg);
          }
          60% { 
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem !important;
          }
          p {
            font-size: 1.1rem !important;
          }
          button {
            padding: 14px 24px !important;
            font-size: 1rem !important;
          }
          .floating-card {
            display: none !important;
          }
        }
        
        @media (max-width: 480px) {
          h1 {
            font-size: 2rem !important;
          }
          div[style*="gap: 1rem"] {
            flex-direction: column !important;
            align-items: center !important;
          }
          button {
            width: 100% !important;
            max-width: 280px !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
};

const Home = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <HeroSection />
    </div>
  );
};

export default Home;