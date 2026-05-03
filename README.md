# ScholarAI 🎓

> AI-powered study toolkit for every learner. Built with Google Gemini.

<img src="public/favicon.svg" width="80" alt="ScholarAI Logo" />
<br />

[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-purple)](https://vitejs.dev)
[![Gemini](https://img.shields.io/badge/Powered%20by-Google%20Gemini-green)](https://ai.google.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## ✨ Features

### 📚 Study Buddy
- Upload any PDF or notes → instant Q&A
- Auto-generate flashcards with flip animation
- Quiz mode with difficulty selector (Easy / Medium / Hard)
- ELI5 — explain any concept in simple terms
- Smart summary with TLDR, key points, and important terms
- Conversational follow-up mode

### 💼 Resume Roaster
- Resume score (0–100) with honest, constructive feedback
- Job description matching with keyword gap analysis
- AI-powered bullet point rewrites (before/after)
- Works for any industry or field

### 💻 Code Reviewer
- Plain English explanation of what your code does
- Bug detection with explanations of underlying causes
- Code quality score + actionable improvement tips
- Supports any programming language

### 🤖 Aria — AI Assistant
- Persistent, context-aware avatar across all pages
- Page-aware contextual greeting messages
- Full conversational AI powered by Google Gemini
- Sleek glassmorphism chat interface with typing indicators

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com)

### Installation
```bash
git clone https://github.com/OmkarAKadam/Scholar-AI.git
cd Scholar-AI
npm install
```

### Environment Setup

```bash
cp .env.example .env
# Add your Gemini API key to .env
```

### Run Locally

```bash
npm run dev
```

## 🐳 Deploy to Google Cloud Run

```bash
# Build and deploy
gcloud run deploy scholar-ai \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars VITE_GEMINI_API_KEY=your_key_here
```

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| AI | Google Gemini 2.5 Flash |
| PDF Parsing | pdf.js |
| Deployment | Google Cloud Run |

## 📁 Project Structure

```
src/
├── components/
│   ├── aria/        ← Aria avatar + chat window
│   ├── layout/      ← Navbar + Footer
│   ├── ui/          ← Reusable components
│   └── shared/      ← Shared across pages
├── pages/           ← Route-level components
├── services/        ← Gemini API calls
├── hooks/           ← Custom React hooks
└── utils/           ← PDF parser + helpers
```

## 🤝 Contributing

Pull requests welcome! Open an issue first to discuss changes.

## 📄 License

MIT — see LICENSE

---
Built with ❤️ for the **Google Build with AI Workshop**
#GoogleWithGFG #GoogleForDevelopers

Powered by [Google Gemini](https://ai.google.dev) · 
Built by [Omkar Kadam](https://github.com/OmkarAKadam)

*(© 2026 ScholarAI)*
