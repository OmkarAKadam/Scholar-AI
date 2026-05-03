import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('scholar-theme')
  if (saved === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(
    () => typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  )
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const nowDark = !isDark
    setIsDark(nowDark)
    if (nowDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('scholar-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('scholar-theme', 'light')
    }
  }

  const navLinks = [
    { name: 'Study Buddy', path: '/study-buddy', hoverClass: 'hover:text-study', activeClass: 'text-study nav-active-study' },
    { name: 'Resume Roaster', path: '/resume-roaster', hoverClass: 'hover:text-resume', activeClass: 'text-resume nav-active-resume' },
    { name: 'Code Reviewer', path: '/code-reviewer', hoverClass: 'hover:text-code', activeClass: 'text-code nav-active-code' },
  ]

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/70 dark:bg-[#161B22]/70 backdrop-blur-lg border-neutral-200/50 dark:border-[#30363D]/50' : 'bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-brand-primary">ScholarAI</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-300 border-b-2 ${
                      isActive ? link.activeClass : `border-transparent text-neutral-500 dark:text-[#8B949E] dark:hover:text-[#E6EDF3] ${link.hoverClass}`
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="-mr-2 flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 dark:text-[#8B949E] hover:text-neutral-500 dark:hover:text-[#E6EDF3] hover:bg-neutral-100 dark:hover:bg-[#0D1117] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary transition-colors duration-300"
              >
                <span className="sr-only">Open main menu</span>
                <svg className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-neutral-200 dark:border-[#30363D] flex items-center justify-center text-neutral-700 dark:text-[#E6EDF3] hover:bg-neutral-100 dark:hover:bg-[#30363D] transition-all duration-200"
              aria-label="Toggle theme"
              type="button"
            >
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden bg-white/70 dark:bg-[#161B22]/70 backdrop-blur-lg border-t border-neutral-200/50 dark:border-[#30363D]/50 transition-colors duration-300`}>
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 text-base font-medium border-l-4 transition-colors duration-300 ${
                  isActive ? link.activeClass : `border-transparent text-neutral-500 dark:text-[#8B949E] dark:hover:text-[#E6EDF3] ${link.hoverClass}`
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
