import { useState, useEffect } from 'react'
import FileUpload from '../components/ui/FileUpload'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { extractTextFromPDF } from '../utils/parsePdf'
import { analyseResume } from '../services/gemini'

export default function ResumeRoaster() {
  const [file, setFile] = useState(null)
  const [resumeText, setResumeText] = useState('')
  const [isProcessingFile, setIsProcessingFile] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [showTextPreview, setShowTextPreview] = useState(false)
  const [displayedScore, setDisplayedScore] = useState(0)
  const [scoreDashOffset, setScoreDashOffset] = useState(2 * Math.PI * 58)

  useEffect(() => {
    document.title = "Resume Roaster — ScholarAI"
  }, [])

  const handleFileUpload = async (uploadedFile) => {
    setFile(uploadedFile)
    if (!uploadedFile) {
      setResumeText('')
      return
    }

    setIsProcessingFile(true)
    try {
      if (uploadedFile.type === 'application/pdf') {
        const text = await extractTextFromPDF(uploadedFile)
        setResumeText(text)
      } else if (uploadedFile.type === 'text/plain') {
        const text = await uploadedFile.text()
        setResumeText(text)
      }
    } catch (error) {
      console.error("Error reading file:", error)
      alert("Failed to read the file. Please try another.")
    } finally {
      setIsProcessingFile(false)
    }
  }

  const handleAnalyse = async () => {
    if (!resumeText) return
    setIsLoading(true)
    try {
      const data = await analyseResume(resumeText, jobDescription)
      setResult(data)
    } catch (error) {
      console.error(error)
      alert("Failed to analyse resume.")
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 71) return 'text-green-500 border-green-500'
    if (score >= 41) return 'text-amber-500 border-amber-500'
    return 'text-red-500 border-red-500'
  }

  const getScoreStroke = (score) => {
    if (score >= 71) return '#22C55E'
    if (score >= 41) return '#F59E0B'
    return '#EF4444'
  }

  useEffect(() => {
    if (!result) {
      setDisplayedScore(0)
      setScoreDashOffset(2 * Math.PI * 58)
      return
    }

    const radius = 58
    const circumference = 2 * Math.PI * radius
    const targetDashOffset = circumference - (result.score / 100) * circumference
    const duration = 1500
    let animationFrameId
    let startTime

    const easeOut = (t) => 1 - Math.pow(1 - t, 3)

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easedProgress = easeOut(progress)

      setDisplayedScore(Math.round(result.score * easedProgress))
      setScoreDashOffset(circumference - (circumference - targetDashOffset) * easedProgress)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    setScoreDashOffset(circumference)
    setDisplayedScore(0)
    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [result])

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0D1117] flex flex-col items-center">
      <div className="w-full animated-header text-white py-12 px-4 text-center" style={{ background: 'linear-gradient(135deg, #F59E0B, #B45309, #D97706)' }}>
        <h1 className="text-4xl font-bold mb-4">Resume Roaster</h1>
        <p className="text-resume-light text-lg">Get brutally honest feedback that actually gets you hired</p>
      </div>

      <div className="w-full max-w-4xl px-4 py-8">
        {!result && !isLoading ? (
          <div className="space-y-8">
            <div className="bg-white dark:bg-[#161B22] p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-[#30363D]">
              <h2 className="text-xl font-semibold dark:text-[#E6EDF3] mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-resume-light text-resume flex items-center justify-center font-bold">1</span>
                Upload Your Resume
              </h2>
              <FileUpload 
                accept=".pdf,.txt" 
                onFileSelect={handleFileUpload} 
                accentColor="border-resume text-resume" 
              />
              
              {isProcessingFile && (
                <div className="mt-4 text-sm text-resume flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Extracting text...
                </div>
              )}

              {resumeText && (
                <div className="mt-4">
                  <button 
                    onClick={() => setShowTextPreview(!showTextPreview)}
                    className="text-sm text-resume font-medium hover:underline flex items-center gap-1"
                  >
                    {showTextPreview ? 'Hide Text Preview' : 'Show Text Preview'}
                  </button>
                  {showTextPreview && (
                    <div className="mt-2 p-4 bg-neutral-50 dark:bg-[#0D1117] rounded-lg text-xs text-neutral-600 dark:text-[#8B949E] font-mono max-h-48 overflow-y-auto border border-neutral-200 dark:border-[#30363D]">
                      {resumeText}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-[#161B22] p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-[#30363D]">
              <h2 className="text-xl font-semibold dark:text-[#E6EDF3] mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-resume-light text-resume flex items-center justify-center font-bold">2</span>
                Job Description (Optional)
              </h2>
              <p className="text-sm text-neutral-500 dark:text-[#8B949E] mb-4 ml-10">Adding a JD unlocks keyword matching and a compatibility score.</p>
              <div className="ml-10">
                <textarea 
                  className="w-full p-4 border border-neutral-300 dark:border-[#30363D] dark:bg-[#0D1117] dark:text-[#E6EDF3] rounded-xl focus:ring-2 focus:ring-resume outline-none resize-none"
                  rows="4"
                  placeholder="Paste the job description you're applying for..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                color="resume" 
                size="lg" 
                className="w-full max-w-md py-4 text-lg font-bold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
                disabled={!resumeText || isProcessingFile}
                onClick={handleAnalyse}
              >
                Roast My Resume 🔥
              </Button>
            </div>
          </div>
        ) : isLoading ? (
          <div className="bg-white dark:bg-[#161B22] p-16 rounded-2xl shadow-sm border border-neutral-200 dark:border-[#30363D] h-[600px] flex items-center justify-center">
            <LoadingSpinner message="Aria is reviewing your resume..." colorClass="text-resume" />
          </div>
        ) : result && (
          <div className="space-y-8 animate-fade-in">
            {/* Score Header */}
            <div className="bg-white dark:bg-[#161B22] p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-[#30363D] flex flex-col md:flex-row items-center gap-8">
              <div className={`relative w-40 h-40 rounded-full flex flex-col items-center justify-center flex-shrink-0 ${getScoreColor(result.score)}`}>
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 140 140" aria-hidden="true">
                  <circle
                    cx="70"
                    cy="70"
                    r="58"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="opacity-15"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="58"
                    fill="none"
                    stroke={getScoreStroke(result.score)}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 58}
                    strokeDashoffset={scoreDashOffset}
                    style={{ transition: 'stroke-dashoffset 80ms linear' }}
                  />
                </svg>
                <span className="text-5xl font-black">{displayedScore}</span>
                <span className="text-sm font-semibold uppercase">Score</span>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-[#E6EDF3] mb-2">{result.scoreLabel}</h2>
                {jobDescription && (
                  <div className="inline-flex items-center gap-2 bg-neutral-100 dark:bg-[#0D1117] px-3 py-1.5 rounded-lg mb-4">
                    <svg className="w-5 h-5 text-neutral-500 dark:text-[#8B949E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span className="text-sm font-medium text-neutral-700 dark:text-[#E6EDF3]">JD Match: {result.matchPercent}%</span>
                  </div>
                )}
                
                {/* Top Tip */}
                <div className="bg-resume-light dark:bg-[#0D1117] border border-resume dark:border-[#30363D] border-opacity-30 rounded-xl p-4 mt-2">
                  <div className="flex items-start gap-3">
                    <span className="text-resume text-xl mt-0.5">⭐</span>
                    <div>
                      <h4 className="text-sm font-bold text-resume-dark mb-1">Top Priority Fix</h4>
                      <p className="text-sm text-neutral-800 dark:text-[#E6EDF3]">{result.topTip}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-[#161B22] p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-[#30363D]">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-[#E6EDF3] mb-4 flex items-center gap-2">
                  <span className="text-green-500">✓</span> Strengths
                </h3>
                <ul className="space-y-3">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-neutral-700 dark:text-[#8B949E] flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-[#161B22] p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-[#30363D]">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-[#E6EDF3] mb-4 flex items-center gap-2">
                  <span className="text-red-500">✕</span> Weaknesses
                </h3>
                <ul className="space-y-3">
                  {result.weaknesses.map((w, i) => (
                    <li key={i} className="text-sm text-neutral-700 dark:text-[#8B949E] flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Missing Keywords */}
            {result.missingKeywords && result.missingKeywords.length > 0 && (
              <div className="bg-white dark:bg-[#161B22] p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-[#30363D]">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-[#E6EDF3] mb-4">Missing Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full text-sm font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bullet Rewrites */}
            <div className="bg-white dark:bg-[#161B22] p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-[#30363D]">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-[#E6EDF3] mb-6">Bullet Point Upgrades</h3>
              <div className="space-y-6">
                {result.bulletRewrites.map((rewrite, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-50 dark:bg-[#2A1111] border border-red-100 dark:border-[#30363D] p-4 rounded-xl relative">
                      <span className="absolute -top-3 left-4 bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">Before</span>
                      <p className="text-sm text-neutral-700 dark:text-[#8B949E] mt-2 line-through opacity-70">{rewrite.original}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-[#102A19] border border-green-100 dark:border-[#30363D] p-4 rounded-xl relative">
                      <span className="absolute -top-3 left-4 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">After</span>
                      <p className="text-sm text-neutral-800 dark:text-[#E6EDF3] mt-2 font-medium">{rewrite.improved}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button color="resume" variant="outline" onClick={() => setResult(null)}>
                Roast Another Resume
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
