import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import ToolCard from '../components/shared/ToolCard'

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-neutral-50 min-h-screen">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary opacity-[0.03] blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-study opacity-[0.03] blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-neutral-900 tracking-tight mb-6">
          Your AI-Powered <span className="text-brand-primary">Study Toolkit</span>
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-neutral-600 mx-auto mb-10">
          Flashcards, quizzes, resume feedback, and code reviews — built for every kind of learner. Powered by Google Gemini.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/study-buddy">
            <Button size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
              Get Started Free
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
              See How It Works
            </Button>
          </a>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ToolCard 
            title="Study Buddy"
            description="Upload your notes and let AI do the heavy lifting"
            features={[
              "Q&A from your documents",
              "Auto flashcards & quizzes",
              "Smart summaries & ELI5 mode"
            ]}
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            accentColor="study"
            href="/study-buddy"
          />
          <ToolCard 
            title="Resume Roaster"
            description="Get brutally honest feedback that actually gets you hired"
            features={[
              "Scores your resume 0–100",
              "Matches against job descriptions",
              "Rewrites weak bullet points"
            ]}
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
            accentColor="resume"
            href="/resume-roaster"
          />
          <ToolCard 
            title="Code Reviewer"
            description="A mentor in your browser — not just a linter"
            features={[
              "Explains what your code does",
              "Finds bugs with reasons",
              "Rates quality & gives 3 tips"
            ]}
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
            accentColor="code"
            href="/code-reviewer"
          />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] border-t-2 border-dashed border-neutral-200 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-brand-light flex items-center justify-center mb-6 shadow-sm border-4 border-white">
                <span className="text-3xl font-bold text-brand-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload or Paste</h3>
              <p className="text-neutral-600">Add your file, resume, or code directly into the tool.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-study-light flex items-center justify-center mb-6 shadow-sm border-4 border-white">
                <span className="text-3xl font-bold text-study">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analyses</h3>
              <p className="text-neutral-600">Gemini processes and understands your content contextually.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-resume-light flex items-center justify-center mb-6 shadow-sm border-4 border-white">
                <span className="text-3xl font-bold text-resume">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-neutral-600">Instant feedback, flashcards, quizzes, or detailed reviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Strip */}
      <div className="bg-brand-light py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-brand-dark font-medium">
          Built with Google Gemini · Made for the Google Build with AI Workshop · #GoogleWithGFG #AntiGravity
        </div>
      </div>
    </div>
  )
}
