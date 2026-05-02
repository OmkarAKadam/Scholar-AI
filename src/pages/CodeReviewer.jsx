import { useState, useEffect } from 'react'
import Button from '../components/ui/Button'
import TabBar from '../components/ui/TabBar'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { reviewCode } from '../services/gemini'

export default function CodeReviewer() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('Explanation')

  useEffect(() => {
    document.title = "Code Reviewer — ScholarAI"
  }, [])

  const handleReview = async () => {
    if (!code.trim()) return
    setIsLoading(true)
    try {
      const data = await reviewCode(code)
      setResult(data)
      setActiveTab('Explanation')
    } catch (error) {
      console.error(error)
      alert("Failed to review code.")
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500 border-green-500'
    if (score >= 60) return 'text-code border-code' // purple
    return 'text-amber-500 border-amber-500'
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <div className="bg-code text-white py-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Code Reviewer</h1>
        <p className="text-code-light text-lg">A mentor in your browser — paste your code and let's learn.</p>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-250px)] min-h-[600px]">
          
          {/* Left - Input */}
          <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden h-full">
            <div className="bg-neutral-900 px-4 py-3 border-b border-neutral-800 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                {result?.language ? result.language : 'source_code'}
              </span>
            </div>
            
            <textarea
              className="flex-grow w-full p-4 bg-[#1E1E1E] text-neutral-200 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-code"
              placeholder="// Paste your code here — any language works"
              spellCheck="false"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            
            <div className="p-4 border-t border-neutral-200 bg-white flex justify-end">
              <Button 
                color="code" 
                size="lg" 
                className="w-full sm:w-auto px-8"
                onClick={handleReview}
                disabled={!code.trim() || isLoading}
              >
                Review My Code
              </Button>
            </div>
          </div>

          {/* Right - Output */}
          <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-neutral-200 h-full overflow-hidden">
            {!result && !isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-neutral-400 p-8 text-center">
                <svg className="w-24 h-24 mb-6 text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                <h3 className="text-xl font-medium text-neutral-800 mb-2">Awaiting your code</h3>
                <p className="text-neutral-500 max-w-sm">Paste some code on the left and I'll explain it, find bugs, and give you tips to improve.</p>
              </div>
            ) : isLoading ? (
              <div className="h-full flex items-center justify-center">
                <LoadingSpinner message="Reading every line..." colorClass="text-code" />
              </div>
            ) : result && (
              <div className="flex flex-col h-full">
                <div className="px-6 pt-6">
                  <TabBar 
                    tabs={['Explanation', 'Bugs Found', 'Quality Score']} 
                    activeTab={activeTab} 
                    onChange={setActiveTab} 
                    accentColor="bg-code text-code" 
                  />
                </div>
                
                <div className="p-6 flex-grow overflow-y-auto">
                  {activeTab === 'Explanation' && (
                    <div className="prose prose-sm max-w-none prose-p:text-neutral-700 prose-code:text-code prose-code:bg-code-light prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded">
                      <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{result.explanation}</p>
                    </div>
                  )}

                  {activeTab === 'Bugs Found' && (
                    <div className="space-y-6">
                      {(!result.bugs || result.bugs.length === 0) ? (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <h3 className="text-lg font-bold text-green-800 mb-1">✓ No bugs found!</h3>
                          <p className="text-green-600 text-sm">Your code looks solid. Check the Quality Score tab for ways to make it even better.</p>
                        </div>
                      ) : (
                        result.bugs.map((bug, idx) => (
                          <div key={idx} className="border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="bg-red-50 px-4 py-3 border-b border-red-100">
                              <h4 className="font-bold text-red-800 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                Issue
                              </h4>
                              <p className="text-sm text-red-700 mt-1">{bug.issue}</p>
                            </div>
                            <div className="p-4 bg-neutral-900 overflow-x-auto">
                              <code className="text-red-400 font-mono text-sm whitespace-pre">{bug.line}</code>
                            </div>
                            <div className="bg-green-50 px-4 py-3 border-t border-green-100">
                              <h4 className="font-bold text-green-800 flex items-center gap-2 mb-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                How to fix it
                              </h4>
                              <p className="text-sm text-green-700">{bug.fix}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {activeTab === 'Quality Score' && (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-6 mb-10 bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                        <div className={`w-32 h-32 rounded-full border-8 flex flex-col items-center justify-center flex-shrink-0 ${getScoreColor(result.qualityScore)}`}>
                          <span className="text-4xl font-black">{result.qualityScore}</span>
                          <span className="text-xs font-semibold uppercase">Score</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-neutral-900 mb-1">{result.qualityLabel}</h3>
                          <p className="text-neutral-600 text-sm">Based on readability, efficiency, and best practices.</p>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold text-neutral-900 mb-4">Top 3 Tips for Improvement</h4>
                      <div className="space-y-4">
                        {result.tips.map((tip, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-code border-opacity-20 hover:border-opacity-50 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-code-light text-code flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <div>
                              <h5 className="font-bold text-neutral-900 text-base mb-1">{tip.title}</h5>
                              <p className="text-sm text-neutral-600 leading-relaxed">{tip.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  )
}
