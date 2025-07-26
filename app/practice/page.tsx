'use client'

import { useState, useEffect } from 'react'
import { CodeEditor } from '../../components/CodeEditor'
import { ProblemStatement } from '../../components/ProblemStatement'
import { sampleProblems, type ProblemData } from '../../data/sampleProblemsClean'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Menu, Sun, Globe, Video, PenTool, Bell, AlertTriangle, RotateCcw, Play } from 'lucide-react'

export default function PracticePage() {
  const [selectedProblem, setSelectedProblem] = useState<ProblemData>(sampleProblems[1])
  const [code, setCode] = useState('')
  const [currentLanguage, setCurrentLanguage] = useState('sql')
  const [isLightMode, setIsLightMode] = useState(false)
  const [activeTab, setActiveTab] = useState('query result')
  const [dailyXP, setDailyXP] = useState(0)
  const [isResizing, setIsResizing] = useState(false)
  const [leftWidth, setLeftWidth] = useState(50) // Percentage

  // Initialize code when problem or language changes
  useEffect(() => {
    const starterCode = selectedProblem.starterCode[currentLanguage as keyof typeof selectedProblem.starterCode]
    setCode(starterCode)
  }, [selectedProblem, currentLanguage])

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '')
  }

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language)
  }

  // Handle problem change - set appropriate default language
  const handleProblemChange = (problemId: number) => {
    const problem = sampleProblems.find(p => p.id === problemId)
    if (problem) {
      setSelectedProblem(problem)
      if (problem.tables && problem.tables.length > 0) {
        setCurrentLanguage('sql')
      } else {
        setCurrentLanguage('python')
      }
    }
  }

  // Resizing functionality
  const handleMouseDown = () => {
    setIsResizing(true)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return
    
    const containerWidth = window.innerWidth
    const newLeftWidth = (e.clientX / containerWidth) * 100
    
    // Limit the width between 20% and 80%
    if (newLeftWidth >= 20 && newLeftWidth <= 80) {
      setLeftWidth(newLeftWidth)
    }
  }

  const handleMouseUp = () => {
    setIsResizing(false)
  }

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
    }
  }, [isResizing])

  const tabs = ['query result', 'currencies', 'languages', 'countries', 'economies', 'cities']

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/learn" className="text-gray-600 hover:text-gray-900">Learn</Link>
              <span className="text-gray-400">/</span>
              <Link href="/courses" className="text-gray-600 hover:text-gray-900">Courses</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">Joining Data in SQL</span>
            </div>
          </div>

          <button className="flex items-center space-x-2 px-4 py-1.5 border border-gray-200 rounded-md bg-white hover:bg-gray-50">
            <Menu className="w-4 h-4" />
            <span className="text-sm">Course Outline</span>
          </button>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <span>Daily XP</span>
              <span className="font-bold text-red-500">{dailyXP}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Globe className="w-5 h-5" />
              <span>EN</span>
              <Video className="w-5 h-5" />
              <PenTool className="w-5 h-5" />
              <Bell className="w-5 h-5" />
              <AlertTriangle className="w-5 h-5" />
              <button
                onClick={() => setIsLightMode(!isLightMode)}
                className="text-sm flex items-center space-x-1"
              >
                <Sun className="w-5 h-5" />
                <span>{isLightMode ? 'Dark' : 'Light'} mode</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-48px)]">
        {/* Left Panel - Problem Statement */}
        <div 
          className="bg-white border-r border-gray-200 overflow-y-auto"
          style={{ width: `${leftWidth}%` }}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Exercise</h2>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500 font-semibold">35 XP</span>
                <div className="flex space-x-1">
                  {[1, 2, 3].map(step => (
                    <span
                      key={step}
                      className={`w-6 h-6 flex items-center justify-center rounded ${
                        step === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                      }`}
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <ProblemStatement problem={selectedProblem} />
          </div>
        </div>

        {/* Resizer */}
        <div
          className="w-1 bg-gray-300 cursor-col-resize hover:bg-blue-500 transition-colors"
          onMouseDown={handleMouseDown}
        />

        {/* Right Panel - Code Editor and Results */}
        <div 
          className="flex-1 flex flex-col"
          style={{ width: `${100 - leftWidth}%` }}
        >
          {/* Code Editor Header */}
          <div className="bg-[#1e1e1e] border-b border-gray-700 px-4 py-2 flex items-center justify-between">
            <span className="text-gray-300 text-sm">query.sql</span>
            <div className="flex items-center space-x-2">
              <button className="p-1 text-gray-400 hover:text-white">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-white">
                <Play className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleProblemChange(selectedProblem.id)}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Submit Answer
              </button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 bg-[#1e1e1e]">
            <CodeEditor
              defaultLanguage={currentLanguage}
              defaultValue={code}
              onChange={handleCodeChange}
              onLanguageChange={handleLanguageChange}
              height="calc(100vh - 300px)"
              problem={selectedProblem}
              theme={isLightMode ? 'light' : 'vs-dark'}
            />
          </div>

          {/* Bottom Panel - Query Results */}
          <div className="h-48 bg-[#1e1e1e] border-t border-gray-700">
            <div className="flex border-b border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm ${
                    activeTab === tab
                      ? 'bg-[#2d2d2d] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-4 text-white">
              <div className="text-sm">
                {selectedProblem.tables ? (
                  <>
                    <div>💾 Database Ready - PostgreSQL Environment</div>
                    <div className="text-gray-400">Execute your SQL queries to see results here...</div>
                    <div className="mt-2">
                      <span className="text-yellow-400">Tip:</span> Use the Schema tab to view table structures and sample data.
                    </div>
                    <div className="mt-1 text-blue-400">
                      Tables available: {selectedProblem.tables.map(t => t.name).join(', ')}
                    </div>
                  </>
                ) : (
                  <>
                    <div>🚀 Code Environment Ready</div>
                    <div className="text-gray-400">Run your code to see the output here...</div>
                    <div className="mt-2">
                      <span className="text-yellow-400">Tip:</span> Use the language selector to switch between different programming languages.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
