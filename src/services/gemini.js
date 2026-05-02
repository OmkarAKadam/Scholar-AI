import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

// Study Buddy — Q&A from document
export async function askQuestion(documentText, question) {
  const prompt = `You are a helpful study assistant. Based ONLY on the following document content, answer the student's question clearly and concisely. If the answer is not in the document, say so honestly.

DOCUMENT:
${documentText}

QUESTION: ${question}

Give a clear, friendly answer:`
  const result = await model.generateContent(prompt)
  return result.response.text()
}

// Study Buddy — Generate flashcards
export async function generateFlashcards(documentText) {
  const prompt = `You are a study assistant. Create 10 flashcards from the following document. Return ONLY a valid JSON array, no markdown, no explanation. Format:
[{"front": "question or term", "back": "answer or definition"}, ...]

DOCUMENT:
${documentText}`
  const result = await model.generateContent(prompt)
  const text = result.response.text().replace(/```json|```/g, '').trim()
  return JSON.parse(text)
}

// Study Buddy — Generate quiz
export async function generateQuiz(documentText, difficulty = 'medium') {
  const prompt = `Create 5 multiple choice questions from this document at ${difficulty} difficulty. Return ONLY valid JSON, no markdown:
[{
  "question": "...",
  "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
  "correct": "A) ...",
  "explanation": "Brief explanation of why this is correct"
}]

DOCUMENT:
${documentText}`
  const result = await model.generateContent(prompt)
  const text = result.response.text().replace(/```json|```/g, '').trim()
  return JSON.parse(text)
}

// Study Buddy — ELI5
export async function explainSimply(concept) {
  const prompt = `Explain the following concept in the simplest possible way, as if explaining to a 12-year-old who has never heard of it. Use an analogy if helpful. Keep it under 150 words and make it genuinely easy to understand.

CONCEPT: ${concept}`
  const result = await model.generateContent(prompt)
  return result.response.text()
}

// Study Buddy — Smart Summary
export async function generateSummary(documentText) {
  const prompt = `Create a structured study summary of this document. Return it in this exact format:

**TLDR (1-2 sentences):**
[brief summary]

**Key Points:**
• [point 1]
• [point 2]
• [point 3]
• [point 4]
• [point 5]

**Important Terms:**
• [Term]: [definition]
• [Term]: [definition]
• [Term]: [definition]

DOCUMENT:
${documentText}`
  const result = await model.generateContent(prompt)
  return result.response.text()
}

// Resume Roaster — Full analysis
export async function analyseResume(resumeText, jobDescription = '') {
  const jdSection = jobDescription
    ? `JOB DESCRIPTION:\n${jobDescription}\n\n`
    : ''

  const prompt = `You are a brutally honest but constructive career coach reviewing a student's resume. ${jdSection}

RESUME:
${resumeText}

Provide your analysis in this EXACT JSON format, no markdown:
{
  "score": 73,
  "scoreLabel": "Needs Work",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "missingKeywords": ["keyword1", "keyword2"],
  "matchPercent": 68,
  "bulletRewrites": [
    {"original": "original bullet point", "improved": "improved version with action verb and impact"},
    {"original": "original bullet point 2", "improved": "improved version 2"}
  ],
  "topTip": "The single most important thing this person should fix right now"
}`
  const result = await model.generateContent(prompt)
  const text = result.response.text().replace(/```json|```/g, '').trim()
  return JSON.parse(text)
}

// Code Reviewer — Full review
export async function reviewCode(code) {
  const prompt = `You are a friendly senior developer reviewing a beginner's code. Be encouraging but honest. Teach, don't just criticise.

CODE:
\`\`\`
${code}
\`\`\`

Return ONLY this JSON, no markdown:
{
  "language": "detected language",
  "explanation": "Plain English explanation of what this code does, line by line where helpful. Write as if explaining to a complete beginner.",
  "bugs": [
    {"line": "the problematic code", "issue": "what's wrong", "fix": "how to fix it and WHY"}
  ],
  "qualityScore": 72,
  "qualityLabel": "Good start",
  "tips": [
    {"title": "tip title", "description": "detailed explanation of this improvement"},
    {"title": "tip title", "description": "detailed explanation"},
    {"title": "tip title", "description": "detailed explanation"}
  ]
}`
  const result = await model.generateContent(prompt)
  const text = result.response.text().replace(/```json|```/g, '').trim()
  return JSON.parse(text)
}

// Aria chatbot
export async function chatWithAria(messages, currentPage, userMessage) {
  const pageContext = {
    '/': 'the ScholarAI home page',
    '/study-buddy': 'the Study Buddy tool which helps students with notes, flashcards, quizzes, ELI5 explanations, and summaries',
    '/resume-roaster': 'the Resume Roaster tool which analyses resumes, scores them, and rewrites weak bullet points',
    '/code-reviewer': 'the Code Reviewer tool which explains code, finds bugs, and rates code quality'
  }

  const systemPrompt = `You are Aria, ScholarAI's friendly AI assistant. You are warm, playful, and speak like a helpful older student — not a corporate chatbot. You're currently helping a user on ${pageContext[currentPage] || 'ScholarAI'}.

You can help with:
- How to use any ScholarAI tool
- General study tips and advice  
- Answering academic questions
- Career and resume advice
- Coding help and explanations

Keep responses concise (under 150 words usually), friendly, and genuinely helpful. Use the occasional emoji where it feels natural. Never be robotic.`

  const history = messages.map(m => ({
    role: m.role,
    parts: [{ text: m.content }]
  }))

  const chat = model.startChat({
    history: [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: "Got it! I'm Aria, ready to help 😊" }] },
      ...history
    ]
  })

  const result = await chat.sendMessage(userMessage)
  return result.response.text()
}
