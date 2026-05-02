import { useState, useEffect, useRef } from 'react'
import { chatWithAria } from '../../services/gemini'
import AriaAvatar from './AriaAvatar'

export default function AriaChatWindow({ onClose, currentPage }) {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Initial greeting based on page
  useEffect(() => {
    let greeting = "Hey there! 👋 I'm Aria, your ScholarAI assistant. Pick a tool above or ask me anything!"
    
    if (currentPage === '/study-buddy') {
      greeting = "Hey! 📚 Drop your notes and I'll help you crush that exam. Or just ask me anything!"
    } else if (currentPage === '/resume-roaster') {
      greeting = "Let's get that resume hired! 💼 Upload it and I'll tear it apart (kindly 😄)"
    } else if (currentPage === '/code-reviewer') {
      greeting = "Paste your code and I'll help you understand every line! 💻 No judgment, I promise."
    }

    setMessages([{ role: 'ai', content: greeting }])
  }, [currentPage])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async (e) => {
    e?.preventDefault()
    if (!inputValue.trim() || isTyping) return

    const userMessage = inputValue.trim()
    setInputValue('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsTyping(true)

    try {
      // Pass previous messages (excluding the first greeting, or keeping it as context is fine too)
      // Actually we'll pass the whole history to Gemini so it remembers context
      const chatHistoryForGemini = messages.map(m => ({
        role: m.role === 'ai' ? 'model' : 'user',
        content: m.content
      }))
      
      const responseText = await chatWithAria(chatHistoryForGemini, currentPage, userMessage)
      
      setMessages(prev => [...prev, { role: 'ai', content: responseText }])
    } catch (error) {
      console.error(error)
      setMessages(prev => [...prev, { role: 'ai', content: "Oops, my brain disconnected for a second. Can you try again? 😅" }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="w-[320px] max-h-[480px] h-[480px] flex flex-col bg-white/85 backdrop-blur-md border border-brand-primary/20 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden animate-fade-in origin-bottom-right transition-all">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-brand-primary/10 bg-white/50 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full bg-brand-light border border-brand-primary/20 overflow-hidden flex items-end justify-center">
            <div className="w-8 h-8 transform scale-[0.8] origin-bottom translate-y-1">
              <AriaAvatar expression={isTyping ? 'thinking' : 'happy'} />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 leading-none text-[15px] flex items-center gap-1.5">
              Aria
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            </h3>
            <p className="text-[11px] text-neutral-500 font-medium mt-0.5">ScholarAI Assistant</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start gap-2'}`}>
            {msg.role === 'ai' && (
              <div className="w-6 h-6 rounded-full bg-brand-light flex items-end justify-center shrink-0 border border-brand-primary/10 overflow-hidden mt-auto mb-1">
                <div className="w-6 h-6 transform scale-[0.7] origin-bottom translate-y-1">
                  <AriaAvatar expression="idle" />
                </div>
              </div>
            )}
            <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${
              msg.role === 'user' 
                ? 'bg-brand-primary text-white rounded-br-sm' 
                : 'bg-white text-neutral-800 rounded-bl-sm border border-neutral-100 shadow-sm'
            }`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start gap-2">
            <div className="w-6 h-6 rounded-full bg-brand-light flex items-end justify-center shrink-0 border border-brand-primary/10 overflow-hidden mt-auto mb-1">
              <div className="w-6 h-6 transform scale-[0.7] origin-bottom translate-y-1">
                 <AriaAvatar expression="thinking" />
              </div>
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white border border-neutral-100 shadow-sm flex gap-1 items-center h-10">
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-neutral-100 shrink-0">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            placeholder="Ask Aria anything..."
            className="w-full bg-neutral-50 border border-neutral-200 text-sm rounded-full pl-4 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-1 w-8 h-8 flex items-center justify-center rounded-full bg-brand-primary text-white disabled:opacity-50 hover:bg-brand-dark transition-colors"
          >
            <svg className="w-4 h-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </form>
      </div>

    </div>
  )
}
