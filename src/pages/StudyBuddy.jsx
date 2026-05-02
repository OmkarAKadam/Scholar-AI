import { useState, useEffect } from 'react'
import FileUpload from '../components/ui/FileUpload'
import TabBar from '../components/ui/TabBar'
import Button from '../components/ui/Button'
import FlashCard from '../components/ui/FlashCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { extractTextFromPDF } from '../utils/parsePdf'
import { askQuestion, generateFlashcards, generateQuiz, explainSimply, generateSummary } from '../services/gemini'

export default function StudyBuddy() {
  const [file, setFile] = useState(null)
  const [documentText, setDocumentText] = useState('')
  const [isProcessingFile, setIsProcessingFile] = useState(false)
  const [activeTab, setActiveTab] = useState('Q&A')
  const [isLoading, setIsLoading] = useState(false)

  // Q&A State
  const [question, setQuestion] = useState('')
  const [chatHistory, setChatHistory] = useState([])

  // Flashcards State
  const [flashcards, setFlashcards] = useState([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  // Quiz State
  const [difficulty, setDifficulty] = useState('medium')
  const [quiz, setQuiz] = useState([])
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)

  // ELI5 State
  const [eli5Concept, setEli5Concept] = useState('')
  const [eli5Result, setEli5Result] = useState('')

  // Summary State
  const [summaryResult, setSummaryResult] = useState('')

  useEffect(() => {
    document.title = "Study Buddy — ScholarAI"
  }, [])

  const handleFileUpload = async (uploadedFile) => {
    setFile(uploadedFile)
    if (!uploadedFile) {
      setDocumentText('')
      return
    }

    setIsProcessingFile(true)
    try {
      if (uploadedFile.type === 'application/pdf') {
        const text = await extractTextFromPDF(uploadedFile)
        setDocumentText(text)
      } else if (uploadedFile.type === 'text/plain') {
        const text = await uploadedFile.text()
        setDocumentText(text)
      }
    } catch (error) {
      console.error("Error reading file:", error)
      alert("Failed to read the file. Please try another.")
    } finally {
      setIsProcessingFile(false)
    }
  }

  const handleAskQuestion = async () => {
    if (!question.trim() || !documentText) return

    const userMsg = { role: 'user', content: question }
    setChatHistory(prev => [...prev, userMsg])
    setQuestion('')
    setIsLoading(true)

    try {
      const answer = await askQuestion(documentText, userMsg.content)
      setChatHistory(prev => [...prev, { role: 'ai', content: answer }])
    } catch (error) {
      console.error(error)
      setChatHistory(prev => [...prev, { role: 'ai', content: "Sorry, I ran into an error processing your question." }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateFlashcards = async () => {
    if (!documentText) return
    setIsLoading(true)
    try {
      const cards = await generateFlashcards(documentText)
      setFlashcards(cards.map(c => ({ ...c, isLearnt: false })))
      setCurrentCardIndex(0)
    } catch (error) {
      console.error(error)
      alert("Failed to generate flashcards.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkLearnt = () => {
    const newCards = [...flashcards]
    newCards[currentCardIndex].isLearnt = true
    setFlashcards(newCards)
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  const handleGenerateQuiz = async () => {
    if (!documentText) return
    setIsLoading(true)
    try {
      const q = await generateQuiz(documentText, difficulty)
      setQuiz(q)
      setCurrentQuizIndex(0)
      setSelectedOption(null)
      setQuizScore(0)
      setQuizFinished(false)
    } catch (error) {
      console.error(error)
      alert("Failed to generate quiz.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuizSubmit = () => {
    if (!selectedOption) return
    const currentQ = quiz[currentQuizIndex]
    
    // Check if correct
    // Just display correct/wrong state and explanation
    // The UI handles showing explanation if selectedOption is not null
  }

  const handleNextQuizQuestion = () => {
    const currentQ = quiz[currentQuizIndex]
    if (selectedOption === currentQ.correct) {
      setQuizScore(prev => prev + 1)
    }
    
    if (currentQuizIndex < quiz.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1)
      setSelectedOption(null)
    } else {
      setQuizFinished(true)
    }
  }

  const handleExplainSimply = async () => {
    if (!eli5Concept.trim()) return
    setIsLoading(true)
    try {
      const result = await explainSimply(eli5Concept)
      setEli5Result(result)
    } catch (error) {
      console.error(error)
      alert("Failed to explain.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateSummary = async () => {
    if (!documentText) return
    setIsLoading(true)
    try {
      const result = await generateSummary(documentText)
      setSummaryResult(result)
    } catch (error) {
      console.error(error)
      alert("Failed to generate summary.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <div className="bg-study text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Study Buddy</h1>
        <p className="text-study-light text-lg">Upload your notes — AI handles the rest</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Controls */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
              <h2 className="text-xl font-semibold mb-4 text-neutral-800">1. Upload Document</h2>
              <FileUpload 
                accept=".pdf,.txt" 
                onFileSelect={handleFileUpload} 
                accentColor="border-study text-study" 
              />
              {isProcessingFile && (
                <div className="mt-4 text-sm text-study flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Extracting text...
                </div>
              )}
            </div>

            {documentText && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                <h2 className="text-xl font-semibold mb-4 text-neutral-800">2. Choose Mode</h2>
                <TabBar 
                  tabs={['Q&A', 'Flashcards', 'Quiz', 'ELI5', 'Summary']} 
                  activeTab={activeTab} 
                  onChange={setActiveTab} 
                  accentColor="bg-study text-study" 
                />
                
                <div className="mt-6">
                  {activeTab === 'Q&A' && (
                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-neutral-600">Ask any question based on your uploaded document.</p>
                      <textarea 
                        className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-study outline-none resize-none"
                        rows="3"
                        placeholder="Ask a question about your document..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                      <Button color="study" onClick={handleAskQuestion} disabled={isLoading || !question.trim()}>
                        Ask Question
                      </Button>
                    </div>
                  )}

                  {activeTab === 'Flashcards' && (
                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-neutral-600">Generate 10 key flashcards to memorize the material.</p>
                      <Button color="study" onClick={handleGenerateFlashcards} disabled={isLoading}>
                        Generate Flashcards
                      </Button>
                    </div>
                  )}

                  {activeTab === 'Quiz' && (
                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-neutral-600">Test your knowledge with a generated quiz.</p>
                      <div className="flex gap-2">
                        {['easy', 'medium', 'hard'].map(level => (
                          <button
                            key={level}
                            onClick={() => setDifficulty(level)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${difficulty === level ? 'bg-study text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                      <Button color="study" onClick={handleGenerateQuiz} disabled={isLoading}>
                        Generate Quiz
                      </Button>
                    </div>
                  )}

                  {activeTab === 'ELI5' && (
                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-neutral-600">Paste any confusing concept for a simple explanation.</p>
                      <textarea 
                        className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-study outline-none resize-none"
                        rows="4"
                        placeholder="Paste any concept or confusing paragraph..."
                        value={eli5Concept}
                        onChange={(e) => setEli5Concept(e.target.value)}
                      />
                      <Button color="study" onClick={handleExplainSimply} disabled={isLoading || !eli5Concept.trim()}>
                        Explain Simply
                      </Button>
                    </div>
                  )}

                  {activeTab === 'Summary' && (
                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-neutral-600">Get a structured summary with TLDR and key terms.</p>
                      <Button color="study" onClick={handleGenerateSummary} disabled={isLoading}>
                        Generate Summary
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Output */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 h-full min-h-[500px] p-6">
              {!documentText && !isLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-400">
                  <svg className="w-24 h-24 mb-4 text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  <p className="text-xl font-medium text-neutral-500">Upload a document to get started</p>
                </div>
              ) : isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <LoadingSpinner message="AI is processing..." colorClass="text-study" />
                </div>
              ) : (
                <div className="h-full">
                  {activeTab === 'Q&A' && (
                    <div className="flex flex-col gap-4 h-full max-h-[600px] overflow-y-auto pr-2">
                      {chatHistory.length === 0 ? (
                        <p className="text-neutral-500 italic text-center mt-10">Ask a question to start the conversation.</p>
                      ) : (
                        chatHistory.map((msg, idx) => (
                          <div key={idx} className={`p-4 rounded-xl max-w-[85%] ${msg.role === 'user' ? 'bg-study-light text-study-dark self-end ml-auto' : 'bg-neutral-100 text-neutral-800 self-start mr-auto'}`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {activeTab === 'Flashcards' && flashcards.length > 0 && (
                    <div className="flex flex-col items-center justify-center h-full gap-8">
                      <FlashCard 
                        front={flashcards[currentCardIndex].front} 
                        back={flashcards[currentCardIndex].back} 
                        isLearnt={flashcards[currentCardIndex].isLearnt}
                        onMarkLearnt={handleMarkLearnt}
                      />
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => setCurrentCardIndex(Math.max(0, currentCardIndex - 1))}
                          disabled={currentCardIndex === 0}
                          className="p-2 text-study disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <span className="text-sm font-medium text-neutral-600">Card {currentCardIndex + 1} of {flashcards.length}</span>
                        <button 
                          onClick={() => setCurrentCardIndex(Math.min(flashcards.length - 1, currentCardIndex + 1))}
                          disabled={currentCardIndex === flashcards.length - 1}
                          className="p-2 text-study disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Quiz' && quiz.length > 0 && (
                    <div className="flex flex-col h-full max-w-2xl mx-auto">
                      {!quizFinished ? (
                        <>
                          <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-medium text-neutral-500">Question {currentQuizIndex + 1} of {quiz.length}</span>
                            <div className="w-48 bg-neutral-200 rounded-full h-2">
                              <div className="bg-study h-2 rounded-full" style={{ width: `${((currentQuizIndex) / quiz.length) * 100}%` }}></div>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-neutral-900 mb-6">{quiz[currentQuizIndex].question}</h3>
                          <div className="space-y-3 mb-8">
                            {quiz[currentQuizIndex].options.map((opt, idx) => {
                              const isSelected = selectedOption === opt;
                              const isCorrect = opt === quiz[currentQuizIndex].correct;
                              const showCorrect = selectedOption && isCorrect;
                              const showWrong = selectedOption && isSelected && !isCorrect;
                              
                              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
                              if (!selectedOption) {
                                btnClass += isSelected ? "border-study bg-study-light text-study-dark" : "border-neutral-200 hover:border-study text-neutral-700 hover:bg-neutral-50";
                              } else {
                                if (showCorrect) btnClass += "border-green-500 bg-green-50 text-green-800";
                                else if (showWrong) btnClass += "border-red-500 bg-red-50 text-red-800";
                                else btnClass += "border-neutral-200 text-neutral-400 opacity-50";
                              }

                              return (
                                <button
                                  key={idx}
                                  onClick={() => !selectedOption && setSelectedOption(opt)}
                                  disabled={!!selectedOption}
                                  className={btnClass}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          
                          {selectedOption && (
                            <div className={`p-4 rounded-xl mb-6 ${selectedOption === quiz[currentQuizIndex].correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              <p className="font-semibold mb-1">{selectedOption === quiz[currentQuizIndex].correct ? 'Correct!' : 'Incorrect!'}</p>
                              <p className="text-sm">{quiz[currentQuizIndex].explanation}</p>
                            </div>
                          )}

                          <div className="mt-auto flex justify-end">
                            <Button color="study" disabled={!selectedOption} onClick={handleNextQuizQuestion}>
                              {currentQuizIndex < quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <div className="w-24 h-24 bg-study-light rounded-full flex items-center justify-center mb-6">
                            <span className="text-3xl font-bold text-study">{quizScore}/{quiz.length}</span>
                          </div>
                          <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
                          <p className="text-neutral-600 mb-8">You got {Math.round((quizScore / quiz.length) * 100)}% correct.</p>
                          <Button color="study" onClick={handleGenerateQuiz}>Retake Quiz</Button>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'ELI5' && eli5Result && (
                    <div className="bg-study-light border border-study border-opacity-20 rounded-2xl p-8 relative">
                      <div className="absolute -top-6 -left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span className="text-2xl">💡</span>
                      </div>
                      <p className="text-study-dark text-lg leading-relaxed">{eli5Result}</p>
                    </div>
                  )}

                  {activeTab === 'Summary' && summaryResult && (
                    <div className="prose prose-study max-w-none text-neutral-800">
                      {summaryResult.split('\n').map((line, idx) => {
                        if (line.startsWith('**')) {
                          return <h3 key={idx} className="text-lg font-bold text-study mt-6 mb-2">{line.replace(/\*\*/g, '')}</h3>
                        }
                        if (line.startsWith('•')) {
                          return <li key={idx} className="ml-4 mb-1">{line.substring(1).trim()}</li>
                        }
                        return <p key={idx} className="mb-2">{line}</p>
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
