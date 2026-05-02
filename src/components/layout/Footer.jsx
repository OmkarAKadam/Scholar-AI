import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-white">ScholarAI</span>
            </div>
            <p className="text-sm text-neutral-400">
              AI-powered study toolkit for every learner. Flashcards, quizzes, resume feedback, and code reviews in one place.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/study-buddy" className="text-sm hover:text-study transition-colors">Study Buddy</Link>
              </li>
              <li>
                <Link to="/resume-roaster" className="text-sm hover:text-resume transition-colors">Resume Roaster</Link>
              </li>
              <li>
                <Link to="/code-reviewer" className="text-sm hover:text-code transition-colors">Code Reviewer</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Built With</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Google Gemini API</li>
              <li>React + Vite</li>
              <li>Tailwind CSS</li>
              <li>Made for Google Build with AI Workshop</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-800 text-sm text-center text-neutral-500">
          <p>© 2026 ScholarAI · Built for Google Build with AI Workshop</p>
        </div>
      </div>
    </footer>
  )
}
