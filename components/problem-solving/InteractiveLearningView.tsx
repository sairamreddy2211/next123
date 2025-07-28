"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, Target, Lightbulb } from 'lucide-react';
import { InteractiveLesson } from '@/types';
import CodeEditor from '@/components/shared/CodeEditor';

interface InteractiveLearningViewProps {
  lessons: InteractiveLesson[];
}

interface TestResult {
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  hidden?: boolean;
}

export default function InteractiveLearningView({ lessons }: InteractiveLearningViewProps) {
  const [selectedLesson, setSelectedLesson] = useState(lessons[0]);
  const [code, setCode] = useState(selectedLesson?.problem?.starterCode || '');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [panelWidth, setPanelWidth] = useState(50); // Percentage for left panel

  const handleLessonSelect = (lesson: InteractiveLesson) => {
    setSelectedLesson(lesson);
    setCode(lesson.problem?.starterCode || '');
    setTestResults([]);
    setShowHints(false);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRunCode = async (codeToRun: string) => {
    setIsRunning(true);
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock test results based on the lesson
    const mockResults: TestResult[] = selectedLesson.problem?.testCases.map((testCase: any, index: number) => ({
      passed: Math.random() > 0.3, // Random pass/fail for demo
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: Math.random() > 0.3 ? testCase.expectedOutput : 'Error: Syntax error',
      hidden: testCase.hidden
    })) || [];
    
    setTestResults(mockResults);
    setIsRunning(false);
  };

  const handleReset = () => {
    setCode(selectedLesson?.problem?.starterCode || '');
    setTestResults([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'intermediate':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'advanced':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = panelWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const containerWidth = window.innerWidth;
      const deltaPercentage = (deltaX / containerWidth) * 100;
      const newWidth = Math.max(20, Math.min(80, startWidth + deltaPercentage));
      setPanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (!selectedLesson?.problem) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-900">
        <p className="text-gray-400">No coding problems available</p>
      </div>
    );
  }

  return (
    <div className="h-full flex bg-black">
      {/* Left Panel - Problem Description */}
      <div 
        className="flex flex-col border-r border-gray-700"
        style={{ width: `${panelWidth}%`, backgroundColor: '#262626' }}
      >
        {/* Problem Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Problem Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 p-3 rounded-lg" style={{ backgroundColor: '#333333' }}>Problem</h3>
              <p className="text-gray-300 leading-relaxed">{selectedLesson.problem.description}</p>
            </div>

            {/* Examples */}
            {selectedLesson.problem.examples && selectedLesson.problem.examples.length > 0 && (
              <div>
                <h4 className="text-md font-semibold text-white mb-3 p-3 rounded-lg" style={{ backgroundColor: '#333333' }}>Examples</h4>
                <div className="space-y-4">
                  {selectedLesson.problem.examples.map((example: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4" style={{ backgroundColor: '#333333', borderColor: '#222222' }}>
                      <div className="font-medium text-sm text-gray-400 mb-2">Example {index + 1}:</div>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-sm text-gray-300">Input:</span>
                          <pre className="mt-1 text-sm border p-2 rounded font-mono text-gray-300" style={{ backgroundColor: '#262626', borderColor: '#222222' }}>{example.input}</pre>
                        </div>
                        <div>
                          <span className="font-medium text-sm text-gray-300">Output:</span>
                          <pre className="mt-1 text-sm border p-2 rounded font-mono text-gray-300" style={{ backgroundColor: '#262626', borderColor: '#222222' }}>{example.output}</pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Constraints */}
            {selectedLesson.problem.constraints && selectedLesson.problem.constraints.length > 0 && (
              <div>
                <h4 className="text-md font-semibold text-white mb-3 p-3 rounded-lg" style={{ backgroundColor: '#333333' }}>Constraints</h4>
                <ul className="space-y-2">
                  {selectedLesson.problem.constraints.map((constraint: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Target className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{constraint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hints */}
            <div>
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-gray-300 transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{showHints ? 'Hide Hints' : 'Show Hints'}</span>
                {showHints ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              
              {showHints && (
                <div className="mt-3 p-4 border rounded-lg" style={{ backgroundColor: '#333333', borderColor: '#222222' }}>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-300">Think about using the SELECT statement with appropriate clauses.</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-300">Remember to specify the table name after FROM.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Resizer */}
      <div
        className="w-1 bg-gray-700 hover:bg-gray-600 cursor-col-resize transition-colors"
        onMouseDown={handleMouseDown}
      />

      {/* Right Panel - Code Editor */}
      <div 
        className="flex flex-col bg-black"
        style={{ width: `${100 - panelWidth}%` }}
      >
        <CodeEditor
          language="sql"
          defaultValue={selectedLesson.problem.starterCode}
          onChange={handleCodeChange}
          onRun={handleRunCode}
          onReset={handleReset}
          testResults={testResults}
          isRunning={isRunning}
        />
      </div>
    </div>
  );
}