export default function AriaAvatar({ expression = 'idle', size = 150 }) {
  return (
    <>
      <style>{`
        @keyframes ariaFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(0.5deg); }
          66% { transform: translateY(-4px) rotate(-0.5deg); }
        }
        @keyframes ariaBounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          25% { transform: translateY(-12px) scale(1.02); }
          50% { transform: translateY(-6px) scale(1.01); }
          75% { transform: translateY(-10px) scale(1.02); }
        }
        @keyframes ariaSway {
          0%, 100% { transform: rotate(-2deg) translateY(0px); }
          50% { transform: rotate(2deg) translateY(-3px); }
        }
        @keyframes ariaGlow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(96, 200, 240, 0.4)) drop-shadow(0 0 16px rgba(96, 200, 240, 0.2)); }
          50% { filter: drop-shadow(0 0 14px rgba(96, 200, 240, 0.7)) drop-shadow(0 0 28px rgba(96, 200, 240, 0.3)); }
        }
        @keyframes ariaHappyGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(47, 141, 70, 0.5)) drop-shadow(0 0 20px rgba(96, 200, 240, 0.3)); }
          50% { filter: drop-shadow(0 0 18px rgba(47, 141, 70, 0.8)) drop-shadow(0 0 35px rgba(96, 200, 240, 0.4)); }
        }
        @keyframes ariaThinkingGlow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.4)); }
          50% { filter: drop-shadow(0 0 16px rgba(139, 92, 246, 0.7)); }
        }
        .aria-idle {
          animation: ariaFloat 4s ease-in-out infinite, ariaGlow 3s ease-in-out infinite;
        }
        .aria-happy {
          animation: ariaBounce 1.5s ease-in-out infinite, ariaHappyGlow 1.5s ease-in-out infinite;
        }
        .aria-thinking {
          animation: ariaSway 3s ease-in-out infinite, ariaThinkingGlow 2s ease-in-out infinite;
        }
      `}</style>
      
      <img
        src="/aria-avatar.png"
        alt="Aria"
        className={`aria-${expression}`}
        style={{
          width: size,
          height: 'auto',
          objectFit: 'contain',
          cursor: 'pointer',
          userSelect: 'none',
          WebkitUserDrag: 'none',
        }}
      />
    </>
  )
}
