import { Link } from 'react-router-dom'

export default function ToolCard({ title, description, features, icon, accentColor, href }) {
  // accentColor could be a specific string that maps to the colors defined in tailwind.config.js
  // For simplicity, assuming accentColor maps to classes, or we just pass the hex/bg-class directly.
  // We'll use a dynamic style if it's hex, or string matching. The prompt says "Top colored strip in tool accent color".
  
  const colors = {
    study: { bg: 'bg-study', text: 'text-study', hover: 'hover:bg-study-light' },
    resume: { bg: 'bg-resume', text: 'text-resume', hover: 'hover:bg-resume-light' },
    code: { bg: 'bg-code', text: 'text-code', hover: 'hover:bg-code-light' }
  }
  
  const theme = colors[accentColor] || colors.study;

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-neutral-100 h-full">
      <div className={`h-2 w-full ${theme.bg}`}></div>
      <div className="p-6 flex flex-col flex-grow">
        <div className={`w-12 h-12 rounded-lg ${theme.bg} bg-opacity-10 flex items-center justify-center mb-4 ${theme.text}`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
        <p className="text-neutral-600 mb-6 text-sm flex-grow">{description}</p>
        
        <ul className="space-y-2 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm text-neutral-700">
              <svg className={`w-5 h-5 mr-2 flex-shrink-0 ${theme.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link 
          to={href}
          className={`mt-auto inline-flex items-center justify-center w-full py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium ${theme.text} bg-white hover:bg-neutral-50 border-neutral-200 transition-colors group`}
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
