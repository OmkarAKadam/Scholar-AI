import { useState } from 'react'

export default function FlashCard({ front, back, isLearnt, onMarkLearnt }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const handlePress = () => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 100)
  }

  const handleFlip = () => {
    setTimeout(() => setIsFlipped((currentValue) => !currentValue), 100)
  }

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/2] perspective-1000">
      <div 
        className="w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer"
        style={{
          transform: `${isPressed ? 'scale(0.97) ' : ''}${isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}`,
        }}
        onMouseDown={handlePress}
        onClick={handleFlip}
      >
        {/* Front */}
        <div className={`absolute w-full h-full backface-hidden bg-study text-white rounded-xl flex flex-col items-center justify-center p-8 text-center transition-shadow duration-300 ${isFlipped ? 'shadow-2xl' : 'shadow-lg'}`}>
          <p className="text-xl font-semibold">{front}</p>
          <span className="absolute bottom-4 text-xs opacity-75">Click to flip</span>
        </div>

        {/* Back */}
        <div className={`absolute w-full h-full backface-hidden bg-white dark:bg-[#161B22] text-study rounded-xl border-2 border-study dark:border-[#30363D] flex flex-col items-center justify-center p-8 text-center rotate-y-180 transition-shadow duration-300 ${isFlipped ? 'shadow-2xl' : 'shadow-lg'}`}>
          <p className="text-lg overflow-y-auto">{back}</p>
          {!isLearnt && onMarkLearnt && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkLearnt();
              }}
              className="absolute bottom-4 bg-green-100 dark:bg-[#16351F] text-green-700 dark:text-[#E6EDF3] px-3 py-1 rounded-full text-xs font-medium hover:bg-green-200 dark:hover:bg-[#1A6B32] transition-colors"
            >
              ✓ Mark as Learnt
            </button>
          )}
          {isLearnt && (
            <div className="absolute bottom-4 text-green-600 text-xs font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Learnt
            </div>
          )}
        </div>
      </div>
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  )
}
