import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ToolCard({ title, description, features, icon, accentColor, href }) {
  // accentColor could be a specific string that maps to the colors defined in tailwind.config.js
  // For simplicity, assuming accentColor maps to classes, or we just pass the hex/bg-class directly.
  // We'll use a dynamic style if it's hex, or string matching. The prompt says "Top colored strip in tool accent color".
  
  const colors = {
    study: { bg: 'bg-study', text: 'text-study', hover: 'hover:bg-study-light', hex: '#3B82F6' },
    resume: { bg: 'bg-resume', text: 'text-resume', hover: 'hover:bg-resume-light', hex: '#F59E0B' },
    code: { bg: 'bg-code', text: 'text-code', hover: 'hover:bg-code-light', hex: '#8B5CF6' }
  }
  
  const theme = colors[accentColor] || colors.study;
  const [isHovered, setIsHovered] = useState(false)

  const renderToolIcon = () => {
    if (title.includes('Study')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      )
    }

    if (title.includes('Resume')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <polyline points="9 15 11 17 15 13"/>
        </svg>
      )
    }

    if (title.includes('Code')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      )
    }

    return icon
  }

  return (
    <div
      className="flex flex-col bg-white dark:bg-[#161B22] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-neutral-100 dark:border-[#30363D] h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--glow-color': theme.hex,
        boxShadow: isHovered ? `0 0 20px ${theme.hex}33, 0 4px 20px ${theme.hex}22` : undefined,
        transition: 'all 0.3s ease',
      }}
    >
      <div className={`h-2 w-full ${theme.bg}`}></div>
      <div className="p-6 flex flex-col flex-grow">
        <div className={`mb-4 ${theme.text}`}>
          {renderToolIcon()}
        </div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-[#E6EDF3] mb-2">{title}</h3>
        <p className="text-neutral-600 dark:text-[#8B949E] mb-6 text-sm flex-grow">{description}</p>
        
        <ul className="space-y-2 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm text-neutral-700 dark:text-[#8B949E]">
              <svg className={`w-5 h-5 mr-2 flex-shrink-0 ${theme.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link 
          to={href}
          className={`mt-auto inline-flex items-center justify-center w-full py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium ${theme.text} bg-white dark:bg-[#161B22] hover:bg-neutral-50 dark:hover:bg-[#0D1117] border-neutral-200 dark:border-[#30363D] transition-colors group`}
        >
          Open Tool
          <svg className={`ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
