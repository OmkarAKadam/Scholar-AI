import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import ToolCard from '../components/shared/ToolCard'

const heroSubheading = 'Flashcards, quizzes, resume feedback, and code reviews — built for every kind of learner. Powered by Google Gemini.'
export default function Home() {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isHowItWorksVisible, setIsHowItWorksVisible] = useState(false)
  const howItWorksRef = useRef(null)

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    let mouseX = -999
    let mouseY = -999
    let animFrame

    const DOT_SPACING = 28
    const GLOW_RADIUS = 130

    // Draw a 4-pointed Gemini-style star
    const drawStar = (ctx, cx, cy, size) => {
      ctx.beginPath()
      const outer = size
      const inner = size * 0.2
      // 4 points at top, right, bottom, left
      // Between each point, curve inward with bezier
      ctx.moveTo(cx, cy - outer)
      ctx.bezierCurveTo(cx + inner, cy - inner, cx + inner, cy - inner, cx + outer, cy)
      ctx.bezierCurveTo(cx + inner, cy + inner, cx + inner, cy + inner, cx, cy + outer)
      ctx.bezierCurveTo(cx - inner, cy + inner, cx - inner, cy + inner, cx - outer, cy)
      ctx.bezierCurveTo(cx - inner, cy - inner, cx - inner, cy - inner, cx, cy - outer)
      ctx.closePath()
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const isDark = document.documentElement.classList.contains('dark')
      const scrollY = window.scrollY

      const cols = Math.ceil(canvas.width / DOT_SPACING) + 1
      const rows = Math.ceil(canvas.height / DOT_SPACING) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * DOT_SPACING
          const y = j * DOT_SPACING

          const dx = x - mouseX
          const dy = y - (mouseY + scrollY)
          const dist = Math.sqrt(dx * dx + dy * dy)

          const glowFactor = Math.max(0, 1 - dist / GLOW_RADIUS)
          
          // Base star size — small like dots, grows on hover
          const baseSize = 1.2
          const starSize = baseSize + glowFactor * 3.5

          // Base opacity
          const baseOpacity = isDark ? 0.2 : 0.1
          const opacity = Math.min(baseOpacity + glowFactor * 0.8, 1)

          // Color: white normally, teal/green when glowing
          let r, g, b
          if (glowFactor > 0.05) {
            if (isDark) { r = 96; g = 200; b = 240 }
            else { r = 47; g = 141; b = 70 }
          } else {
            if (isDark) { r = 255; g = 255; b = 255 }
            else { r = 100; g = 100; b = 100 }
          }

          ctx.save()
          
          // Add glow shadow for highlighted stars
          if (glowFactor > 0.3) {
            ctx.shadowColor = isDark 
              ? `rgba(96,200,240,${glowFactor * 0.8})` 
              : `rgba(47,141,70,${glowFactor * 0.6})`
            ctx.shadowBlur = glowFactor * 12
          }

          drawStar(ctx, x, y, starSize)
          ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`
          ctx.fill()
          
          ctx.restore()
        }
      }

      animFrame = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseLeave = () => {
      mouseX = -999
      mouseY = -999
    }

    resize()
    draw()

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', resize)
    }
  }, [])
  useEffect(() => {
    let index = 0
    const intervalId = setInterval(() => {
      index += 1
      setDisplayText(heroSubheading.slice(0, index))

      if (index >= heroSubheading.length) {
        clearInterval(intervalId)
        setTimeout(() => setShowCursor(false), 3000)
      }
    }, 35)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHowItWorksVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (howItWorksRef.current) {
      observer.observe(howItWorksRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative overflow-hidden min-h-screen bg-[#FAFAFA] dark:bg-[#000000]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary opacity-[0.03] blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-study opacity-[0.03] blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-transparent pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-neutral-900 dark:text-[#E6EDF3] tracking-tight mb-6">
            Your AI-Powered <span className="text-brand-primary">Study Toolkit</span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-neutral-600 dark:text-[#8B949E] mx-auto mb-10 min-h-[84px] md:min-h-[56px]">
            {displayText}
            {showCursor && <span className="cursor-blink">|</span>}
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
        </div>
      </section>

      {/* Tools Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-transparent">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ToolCard
            title="Study Buddy"
            description="Upload your notes and let AI do the heavy lifting"
            features={[
              'Q&A from your documents',
              'Auto flashcards & quizzes',
              'Smart summaries & ELI5 mode',
            ]}
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            accentColor="study"
            href="/study-buddy"
          />
          <ToolCard
            title="Resume Roaster"
            description="Get brutally honest feedback that actually gets you hired"
            features={[
              'Scores your resume 0-100',
              'Matches against job descriptions',
              'Rewrites weak bullet points',
            ]}
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
            accentColor="resume"
            href="/resume-roaster"
          />
          <ToolCard
            title="Code Reviewer"
            description="A mentor in your browser — not just a linter"
            features={[
              'Explains what your code does',
              'Finds bugs with reasons',
              'Rates quality & gives 3 tips',
            ]}
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
            accentColor="code"
            href="/code-reviewer"
          />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" ref={howItWorksRef} className="relative z-10 py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-[#E6EDF3] mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 z-0">
              <div className={`h-full border-t-2 border-dashed border-neutral-200 dark:border-[#30363D] ${isHowItWorksVisible ? 'draw-line' : 'w-0'}`}></div>
            </div>

            <div
              className={`relative z-10 flex flex-col items-center transition-all duration-700 ${isHowItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '0ms' }}
            >
              <div className="w-24 h-24 rounded-full bg-brand-light dark:bg-[#0D1117] flex items-center justify-center mb-6 shadow-sm border-4 border-white dark:border-[#30363D]">
                <span className="text-3xl font-bold text-brand-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold dark:text-[#E6EDF3] mb-2">Upload or Paste</h3>
              <p className="text-neutral-600 dark:text-[#8B949E]">Add your file, resume, or code directly into the tool.</p>
            </div>

            <div
              className={`relative z-10 flex flex-col items-center transition-all duration-700 ${isHowItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="w-24 h-24 rounded-full bg-study-light dark:bg-[#0D1117] flex items-center justify-center mb-6 shadow-sm border-4 border-white dark:border-[#30363D]">
                <span className="text-3xl font-bold text-study">2</span>
              </div>
              <h3 className="text-xl font-semibold dark:text-[#E6EDF3] mb-2">AI Analyses</h3>
              <p className="text-neutral-600 dark:text-[#8B949E]">Gemini processes and understands your content contextually.</p>
            </div>

            <div
              className={`relative z-10 flex flex-col items-center transition-all duration-700 ${isHowItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="w-24 h-24 rounded-full bg-resume-light dark:bg-[#0D1117] flex items-center justify-center mb-6 shadow-sm border-4 border-white dark:border-[#30363D]">
                <span className="text-3xl font-bold text-resume">3</span>
              </div>
              <h3 className="text-xl font-semibold dark:text-[#E6EDF3] mb-2">Get Results</h3>
              <p className="text-neutral-600 dark:text-[#8B949E]">Instant feedback, flashcards, quizzes, or detailed reviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Strip */}
      <div className="relative z-10 bg-transparent py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-brand-dark dark:text-[#E6EDF3] font-medium">
          Built with Google Gemini · Made for the Google Build with AI Workshop · #GoogleWithGFG #AntiGravity
        </div>
      </div>
    </div>
  )
}
