import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AriaWidget from './components/aria/AriaWidget'
import Home from './pages/Home'
import StudyBuddy from './pages/StudyBuddy'
import ResumeRoaster from './pages/ResumeRoaster'
import CodeReviewer from './pages/CodeReviewer'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-50 font-inter flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/study-buddy" element={<StudyBuddy />} />
            <Route path="/resume-roaster" element={<ResumeRoaster />} />
            <Route path="/code-reviewer" element={<CodeReviewer />} />
          </Routes>
        </main>
        <Footer />
        <AriaWidget />
      </div>
    </BrowserRouter>
  )
}
