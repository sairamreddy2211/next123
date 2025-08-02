'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { ChevronDown, ChevronUp, Lightbulb, Target } from 'lucide-react';
import CodeEditor from '../shared/CodeEditor';
import ContentSwitcher from '../shared/ContentSwitcher';
import MediaPlayer from '../shared/MediaPlayer';
import { useTheme } from '../../lib/theme';
import { InteractiveLesson, TestResult } from '../../models/problem';
import ProblemHeader from './ProblemHeader';
import ProblemDescription from './ProblemDescription';
import ProblemExamples from './ProblemExamples';
import ProblemConstraints from './ProblemConstraints';
import ProblemHints from './ProblemHints';

// This is the main QuestionView component
export function QuestionView({
  lesson,
  onCodeSubmit,
  testResults,
  isRunning
}: {
  lesson: InteractiveLesson;
  onCodeSubmit: (code: string) => void;
  testResults: TestResult[];
  isRunning: boolean;
}) {
  const { themeColors } = useTheme();
  const [code, setCode] = useState(lesson.problem?.starterCode || '');
  const [activeContent, setActiveContent] = useState<'problem' | 'explanation'>('problem');
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [hintsVisible, setHintsVisible] = useState(false);

  const handleSubmit = () => {
    onCodeSubmit(code);
  };

  const contentSwitcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentSwitcherRef.current) {
      contentSwitcherRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const toggleVideo = () => {
    setIsVideoVisible(!isVideoVisible);
  };

  const toggleHints = () => {
    setHintsVisible(!hintsVisible);
  };

  if (!lesson.problem) {
    return (
      <div className="flex items-center justify-center h-64" style={{ color: themeColors.text }}>
        <p>No problem data available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full gap-4 p-4" style={{ backgroundColor: themeColors.background }}>
      {/* Left Panel - Problem Statement */}
      <div className="flex-1 lg:max-w-md overflow-y-auto">
        <div className="space-y-6">
          <ProblemHeader 
            title={lesson.title}
            difficulty={lesson.problem.difficulty}
            tags={lesson.tags}
            companies={lesson.companies}
          />

          <div ref={contentSwitcherRef}>
            <ContentSwitcher
              activeContent={activeContent}
              setActiveContent={setActiveContent}
              problemContent={
                <div className="space-y-6">
                  <ProblemDescription description={lesson.problem.description} />
                  
                  {lesson.problem.examples && lesson.problem.examples.length > 0 && (
                    <ProblemExamples examples={lesson.problem.examples} />
                  )}
                  
                  {lesson.problem.constraints && lesson.problem.constraints.length > 0 && (
                    <ProblemConstraints constraints={lesson.problem.constraints} />
                  )}
                  
                  {/* Hints Section */}
                  <div style={{ backgroundColor: themeColors.secondary, color: themeColors.text }} className="rounded-lg p-4">
                    <button
                      onClick={toggleHints}
                      className="flex items-center justify-between w-full text-left font-medium"
                      style={{ color: themeColors.text }}
                    >
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        <span>Hints</span>
                      </div>
                      {hintsVisible ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    
                    {hintsVisible && (
                      <div className="mt-4 space-y-3">
                        <div className="p-3 rounded-md" style={{ backgroundColor: themeColors.background }}>
                          <div className="flex items-start gap-2 mb-2">
                            <Lightbulb className="w-4 h-4" style={{ color: themeColors.warning }} />
                            <span className="font-medium text-sm" style={{ color: themeColors.text }}>Hint 1:</span>
                          </div>
                          <p className="text-sm" style={{ color: themeColors.text }}>Think about the time and space complexity of your solution.</p>
                        </div>
                        <div className="p-3 rounded-md" style={{ backgroundColor: themeColors.background }}>
                          <div className="flex items-start gap-2 mb-2">
                            <Lightbulb className="w-4 h-4" style={{ color: themeColors.warning }} />
                            <span className="font-medium text-sm" style={{ color: themeColors.text }}>Hint 2:</span>
                          </div>
                          <p className="text-sm" style={{ color: themeColors.text }}>Consider using appropriate data structures to optimize your approach.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              }
              explanationContent={
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold" style={{ color: themeColors.text }}>Detailed Explanation</h3>
                  
                  {/* Video Section */}
                  <div style={{ backgroundColor: themeColors.secondary }} className="rounded-lg p-4">
                    <button
                      onClick={toggleVideo}
                      className="flex items-center justify-between w-full text-left font-medium mb-4"
                      style={{ color: themeColors.text }}
                    >
                      <span>📹 Video Explanation</span>
                      {isVideoVisible ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    
                    {isVideoVisible && (
                      <MediaPlayer
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        title="Problem Explanation Video"
                        type="video"
                      />
                    )}
                  </div>

                  {/* Text Explanation */}
                  <div style={{ backgroundColor: themeColors.secondary, color: themeColors.text }} className="rounded-lg p-4">
                    <ReactMarkdown
                      remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkBreaks]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        table: ({node, ...props}: any) => (
                          <div className="overflow-x-auto my-4">
                            <table 
                              {...props} 
                              className="min-w-full border-collapse"
                              style={{ 
                                borderColor: themeColors.border,
                                backgroundColor: themeColors.background 
                              }}
                            />
                          </div>
                        ),
                        th: ({node, ...props}: any) => (
                          <th 
                            {...props} 
                            className="border px-4 py-2 text-left font-semibold"
                            style={{ 
                              borderColor: themeColors.border,
                              backgroundColor: themeColors.secondary,
                              color: themeColors.text 
                            }}
                          />
                        ),
                        td: ({node, ...props}: any) => (
                          <td 
                            {...props} 
                            className="border px-4 py-2"
                            style={{ 
                              borderColor: themeColors.border,
                              color: themeColors.text 
                            }}
                          />
                        ),
                        tr: ({node, ...props}: any) => <tr {...props} />
                      }}
                    >
                      {lesson.content}
                    </ReactMarkdown>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Code Editor and Results */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold" style={{ color: themeColors.text }}>Code Editor</h3>
          <button
            onClick={handleSubmit}
            disabled={isRunning}
            className="px-4 py-2 rounded-md font-medium disabled:opacity-50"
            style={{ 
              backgroundColor: themeColors.primary, 
              color: '#ffffff'
            }}
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>

        <div className="flex-1 min-h-0">
          <CodeEditor
            value={code}
            onChange={setCode}
            language="javascript"
            className="h-full"
          />
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="mt-4 max-h-40 overflow-y-auto">
            <h4 className="text-md font-medium mb-2" style={{ color: themeColors.text }}>
              Test Results
            </h4>
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className="p-3 rounded-md text-sm"
                  style={{
                    backgroundColor: result.passed ? '#10b981' : '#ef4444',
                    color: '#ffffff'
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4" />
                    <span className="font-medium">
                      Test {index + 1}: {result.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>
                  {!result.hidden && (
                    <>
                      <div>Input: {result.input}</div>
                      <div>Expected: {result.expectedOutput}</div>
                      <div>Got: {result.actualOutput}</div>
                      {result.error && <div>Error: {result.error}</div>}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface InteractiveLearningViewProps {
  lesson: InteractiveLesson;
}

export default function InteractiveLearningView({ lesson }: InteractiveLearningViewProps) {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleCodeSubmit = async (code: string) => {
    setIsRunning(true);
    
    // Simulate running tests
    setTimeout(() => {
      const mockResults: TestResult[] = [
        {
          passed: true,
          input: 'Example input 1',
          expectedOutput: 'Expected output 1',
          actualOutput: 'Expected output 1'
        },
        {
          passed: false,
          input: 'Example input 2',
          expectedOutput: 'Expected output 2',
          actualOutput: 'Wrong output 2',
          error: 'Logic error in implementation'
        }
      ];
      setTestResults(mockResults);
      setIsRunning(false);
    }, 2000);
  };

  return (
    <QuestionView
      lesson={lesson}
      onCodeSubmit={handleCodeSubmit}
      testResults={testResults}
      isRunning={isRunning}
    />
  );
}
