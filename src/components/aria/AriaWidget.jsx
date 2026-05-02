import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import AriaAvatar from './AriaAvatar'
import AriaChatWindow from './AriaChatWindow'

export default function AriaWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  // Close chat when navigating to a new page
  // useEffect(() => {
  //   setIsOpen(false)
  // }, [location.pathname])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <AriaChatWindow 
          onClose={() => setIsOpen(false)} 
          currentPage={location.pathname}
        />
      )}
      
      <div className="relative group mt-4">
        {!isOpen && (
          <div className="absolute -inset-2 bg-brand-primary rounded-full opacity-20 animate-ping z-0 pointer-events-none"></div>
        )}
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs font-medium px-3 py-1.5 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
            Chat with Aria ✨
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45"></div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-10 w-20 h-20 rounded-full border-4 shadow-xl transition-all duration-300 flex items-end justify-center overflow-hidden
            ${isOpen ? 'border-brand-primary bg-brand-light scale-90 shadow-md' : 'border-white bg-white hover:border-brand-light'}
          `}
        >
          <AriaAvatar expression={isOpen ? 'happy' : 'idle'} />
        </button>
      </div>
    </div>
  )
}
