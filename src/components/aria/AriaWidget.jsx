import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import AriaAvatar from './AriaAvatar'
import AriaChatWindow from './AriaChatWindow'

export default function AriaWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="fixed bottom-0 right-2 z-50 flex flex-col items-end">
      {isOpen && (
        <AriaChatWindow
          onClose={() => setIsOpen(false)}
          currentPage={location.pathname}
        />
      )}

      <div className="relative group mt-4">
        {!isOpen && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs font-medium px-3 py-1.5 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
            Chat with Aria ✨
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45"></div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 block border-0 bg-transparent p-0 transition-transform duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-4"
          aria-label={isOpen ? 'Close Aria chat' : 'Open Aria chat'}
        >
          <AriaAvatar expression={isOpen ? 'happy' : 'idle'} size={170} />
        </button>
      </div>
    </div>
  )
}
