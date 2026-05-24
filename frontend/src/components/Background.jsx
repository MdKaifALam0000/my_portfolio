import React, { useEffect, useState } from 'react';

const Background = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Pre-generated coordinates to prevent re-render jumps
  const [particles] = useState(() => {
    const rain = Array.from({ length: 30 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * -20}%`,
      delay: `${Math.random() * 2.5}s`,
      duration: `${1.2 + Math.random() * 0.8}s`,
    }));

    const bokeh = Array.from({ length: 12 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      size: `${40 + Math.random() * 80}px`,
      delay: `${Math.random() * -20}s`,
      duration: `${20 + Math.random() * 20}s`,
      color: Math.random() > 0.45 ? 'rgba(232, 168, 56, 0.06)' : 'rgba(224, 70, 70, 0.06)'
    }));

    return { rain, bokeh };
  });

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-carBg pointer-events-none">
      
      {/* Styles for complex custom animations */}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100px) rotate(12deg); opacity: 0; }
          15% { opacity: 0.35; }
          85% { opacity: 0.35; }
          100% { transform: translateY(110vh) rotate(12deg); opacity: 0; }
        }
        @keyframes float-bokeh {
          0% { transform: translateY(105vh) translateX(0) scale(0.9); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(-15vh) translateX(60px) scale(1.1); opacity: 0; }
        }
        @keyframes pulse-lion {
          0%, 100% { filter: drop-shadow(0 0 12px rgba(224, 70, 70, 0.15)); opacity: 0.08; }
          50% { filter: drop-shadow(0 0 25px rgba(224, 70, 70, 0.35)); opacity: 0.16; }
        }
        .rain-drop {
          position: absolute;
          width: 1px;
          height: 90px;
          background: linear-gradient(transparent, rgba(100, 156, 196, 0.3));
          animation: fall linear infinite;
        }
        .bokeh-light {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          animation: float-bokeh linear infinite;
        }
      `}</style>

      {/* Dynamic luxury gradient glow blobs */}
      <div className="absolute top-[-25%] left-[-15%] w-[65vw] h-[65vw] blur-[150px] bg-carRed/12 rounded-full animate-blob pointer-events-none"></div>
      <div className="absolute top-[35%] right-[-15%] w-[55vw] h-[55vw] blur-[130px] bg-carRose/12 rounded-full animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[-25%] left-[20%] w-[70vw] h-[70vw] blur-[165px] bg-[#1a2333]/15 rounded-full animate-blob pointer-events-none" style={{ animationDelay: '4.5s' }}></div>
      
      {/* Interactive mouse tracking radial spotlight */}
      {isHovered && (
        <div 
          className="absolute inset-0 transition-opacity duration-700 opacity-40 z-0 pointer-events-none"
          style={{
            background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(232, 168, 56, 0.08), rgba(224, 70, 70, 0.04), transparent 65%)`
          }}
        />
      )}

      {/* Pulsing Lion Geometric Neon Outline (matches background poster of the M5 showcase) */}
      <div 
        className="absolute left-[3%] top-[12%] w-[45vw] max-w-[480px] h-auto pointer-events-none select-none z-0 hidden lg:block"
        style={{
          animation: 'pulse-lion 7s ease-in-out infinite',
          color: '#e04646'
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          {/* Mane Outline */}
          <path d="M 50 12 L 30 28 L 40 33 L 50 20 L 60 33 L 70 28 Z" />
          <path d="M 30 28 L 15 48 L 26 53 L 40 33" />
          <path d="M 70 28 L 85 48 L 74 53 L 60 33" />
          <path d="M 15 48 L 10 70 L 24 70 L 26 53" />
          <path d="M 85 48 L 90 70 L 76 70 L 74 53" />
          {/* Face Details */}
          <path d="M 50 48 L 42 60 L 50 68 L 58 60 Z" />
          <path d="M 40 33 L 42 48 L 50 48 L 58 48 L 60 33" />
          <path d="M 36 44 L 44 44" strokeWidth="1.2" />
          <path d="M 64 44 L 56 44" strokeWidth="1.2" />
          <path d="M 42 60 L 32 72 L 50 88 L 68 72 L 58 60" />
          <path d="M 50 68 L 50 78" />
          <path d="M 44 78 C 47 80, 53 80, 56 78" />
        </svg>
      </div>

      {/* Bokeh lights */}
      {particles.bokeh.map((b, i) => (
        <div 
          key={`bokeh-${i}`}
          className="bokeh-light"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            backgroundColor: b.color,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        />
      ))}

      {/* Falling Rain drops */}
      {particles.rain.map((r, i) => (
        <div 
          key={`rain-${i}`}
          className="rain-drop"
          style={{
            left: r.left,
            top: r.top,
            animationDelay: r.delay,
            animationDuration: r.duration,
          }}
        />
      ))}

      {/* SaaS structural grid overlay */}
      <div className="absolute inset-0 saas-grid opacity-40 z-0"></div>
      
      {/* Subtle radial overlay to focus light on center */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 20%, #07080b 98%) z-0 opacity-50"></div>
    </div>
  );
};

export default Background;
