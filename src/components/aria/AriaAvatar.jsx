export default function AriaAvatar({ expression = 'idle' }) {
  // expressions: idle, happy, thinking
  
  return (
    <div className={`aria-avatar-container expression-${expression}`}>
      <svg width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        
        {/* Hair Back */}
        <path d="M25 25C25 15 55 15 55 25C55 45 60 55 60 65C60 70 20 70 20 65C20 55 25 45 25 25Z" fill="#60A5FA"/>
        
        {/* Neck */}
        <path d="M37 60H43V68H37V60Z" fill="#FFE0BD"/>

        {/* Face */}
        <path d="M28 35C28 25 52 25 52 35C52 48 46 60 40 60C34 60 28 48 28 35Z" fill="#FFF0DB"/>
        
        {/* Eyes based on expression */}
        {expression === 'happy' && (
          <g className="eyes">
            <path d="M32 42C32 38 38 38 38 42" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <path d="M42 42C42 38 48 38 48 42" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </g>
        )}
        
        {expression === 'thinking' && (
          <g className="eyes">
            {/* Left Eye normal */}
            <ellipse cx="35" cy="42" rx="3.5" ry="5" fill="#0F172A"/>
            <circle cx="34" cy="40" r="1.5" fill="white"/>
            {/* Right Eye squinted */}
            <path d="M42 42L48 42" stroke="#1E293B" strokeWidth="2" strokeLinecap="round"/>
          </g>
        )}

        {expression === 'idle' && (
          <g className="eyes">
            {/* Left Eye */}
            <ellipse cx="35" cy="42" rx="3.5" ry="5" fill="#0F172A"/>
            <circle cx="34" cy="40" r="1.5" fill="white"/>
            {/* Right Eye */}
            <ellipse cx="45" cy="42" rx="3.5" ry="5" fill="#0F172A"/>
            <circle cx="44" cy="40" r="1.5" fill="white"/>
          </g>
        )}
        
        {/* Mouth */}
        {expression === 'happy' ? (
           <path d="M37 52C37 52 40 55 43 52" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        ) : expression === 'thinking' ? (
           <circle cx="39" cy="53" r="1.5" fill="#EF4444"/>
        ) : (
           <path d="M38 52C38 52 40 53 42 52" stroke="#EF4444" strokeWidth="1" strokeLinecap="round" fill="none"/>
        )}

        {/* Blush */}
        <ellipse cx="32" cy="48" rx="2.5" ry="1.5" fill="#FDA4AF" opacity="0.6"/>
        <ellipse cx="48" cy="48" rx="2.5" ry="1.5" fill="#FDA4AF" opacity="0.6"/>

        {/* Hair Bangs Front */}
        <path d="M25 25C30 15 50 15 55 25C50 25 45 28 42 35C40 28 35 25 25 25Z" fill="#3B82F6"/>
        <path d="M50 20C45 30 46 45 46 45C50 35 55 35 55 25C53 22 50 20 50 20Z" fill="#3B82F6"/>
        
        {/* Collar & Body */}
        <path d="M35 65L40 70L45 65V68L40 73L35 68V65Z" fill="white"/>
        <path d="M25 90C25 75 30 70 40 70C50 70 55 75 55 90H25Z" fill="#2F8D46"/>
        
        {/* Arms/Hands */}
        {expression === 'thinking' ? (
          <g className="hand-thinking">
            <path d="M45 90C45 80 50 75 52 80C52 82 45 85 45 90Z" fill="#FFE0BD"/>
            <path d="M40 70C42 75 42 80 40 85L38 75L40 70Z" fill="#1A6B32"/>
            {/* Hand to chin */}
            <ellipse cx="42" cy="58" rx="3" ry="4" fill="#FFE0BD" transform="rotate(-15 42 58)"/>
          </g>
        ) : (
          <g className="hand-idle">
            {/* Subtle wave in idle */}
            <path d="M25 90C25 80 20 75 18 80C18 82 25 85 25 90Z" fill="#FFE0BD"/>
            <path d="M55 90C55 80 60 75 62 80C62 82 55 85 55 90Z" fill="#FFE0BD"/>
          </g>
        )}
      </svg>
      
      <style>{`
        .aria-avatar-container {
          width: 80px;
          height: 90px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        
        /* Animations */
        @keyframes floatIdle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        @keyframes bounceHappy {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes swayThinking {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          25% { transform: translateX(-2px) rotate(-1deg); }
          75% { transform: translateX(2px) rotate(1deg); }
        }
        
        .expression-idle svg {
          animation: floatIdle 3s infinite ease-in-out;
        }
        
        .expression-happy svg {
          animation: bounceHappy 1.5s infinite ease-in-out;
        }
        
        .expression-thinking svg {
          animation: swayThinking 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}
