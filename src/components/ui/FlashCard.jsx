import { useState } from 'react'

export default function FlashCard({ front, back, isLearnt, onMarkLearnt }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/2] perspective-1000">
      <div 
        className={`w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-study text-white rounded-xl shadow-lg flex flex-col items-center justify-center p-8 text-center">
          <p className="text-xl font-semibold">{front}</p>
          <span className="absolute bottom-4 text-xs opacity-75">Click to flip</span>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-white text-study rounded-xl shadow-lg border-2 border-study flex flex-col items-center justify-center p-8 text-center rotate-y-180">
          <p className="text-lg overflow-y-auto">{back}</p>
          {!isLearnt && onMarkLearnt && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkLearnt();
              }}
              className="absolute bottom-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-green-200 transition-colors"
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
