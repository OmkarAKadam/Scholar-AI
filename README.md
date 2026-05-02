# ScholarAI 🎓

> AI-powered study toolkit for every learner. Built with Google Gemini.

![ScholarAI Banner](public/favicon.svg)

[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-purple)](https://vitejs.dev)
[![Gemini](https://img.shields.io/badge/Powered%20by-Google%20Gemini-green)](https://ai.google.dev)
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
- Resume score (0–100) with honest feedback
- Job description matching with keyword gap analysis
- AI-powered bullet point rewrites (before/after)
- Works for any field — not just tech

### 💻 Code Reviewer
- Plain English explanation of what your code does
- Bug detection with explanations of WHY it's a bug
- Code quality score + 3 actionable improvement tips
- Supports any programming language

### 🤖 Aria — AI Assistant
- Persistent anime girl avatar across all pages
- Page-aware contextual greeting messages
- Full conversational AI powered by Gemini
- Glassmorphism chat window with typing indicator

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Gemini API key from [aistudio.google.com](https://aistudio.google.com)

### Installation

\`\`\`bash
git clone https://github.com/yourusername/scholar-ai.git
cd scholar-ai
npm install
\`\`\`

### Environment Setup

\`\`\`bash
cp .env.example .env
# Add your Gemini API key to .env
\`\`\`

### Run Locally

\`\`\`bash
npm run dev
\`\`\`

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| AI | Google Gemini 1.5 Flash |
| PDF Parsing | pdf.js |
| Deployment | Google Cloud Run |

## 📁 Project Structure

\`\`\`
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
\`\`\`

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss what you'd like to change.

## 📄 License

MIT — see [LICENSE](LICENSE)

---

Built with ❤️ for the **Google Build with AI Workshop** · #GoogleWithGFG #AntiGravity #GoogleForDevelopers
