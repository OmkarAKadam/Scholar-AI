import { useEffect, useState } from 'react'

const loadingMessages = [
  'Asking Gemini...',
  'Processing your content...',
  'Almost ready...',
  'Thinking hard...',
  'Reading carefully...',
]

export default function LoadingSpinner({ message, colorClass = 'text-brand-primary' }) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((currentIndex) => (currentIndex + 1) % loadingMessages.length)
    }, 2000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`flex items-end gap-2 ${colorClass}`}>
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-3 w-3 rounded-full bg-current"
            style={{
              animation: 'dotBounce 0.8s ease-in-out infinite',
              animationDelay: `${delay}ms`,
            }}
          />
        ))}
      </div>
      <p className="mt-4 text-sm font-semibold text-neutral-700 dark:text-[#E6EDF3]">
        {loadingMessages[messageIndex]}
      </p>
      {message && <p className="mt-2 text-sm font-medium text-neutral-600 dark:text-[#8B949E] animate-pulse">{message}</p>}
    </div>
  )
}
