"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import CodeEditor from '@/components/shared/CodeEditor';
import ProblemHeader from './ProblemHeader';
import ProblemDescription from './ProblemDescription';
import ProblemExamples from './ProblemExamples';
import ProblemConstraints from './ProblemConstraints';
import ProblemHints from './ProblemHints';
import { InteractiveLesson, TestResult } from '@/models/problem';
import { MOCK_TEST_RESULTS } from '@/constants';

// Reusable QuestionView component for rendering the question/left panel
export function QuestionView({ 
  problem, 
  showHints, 
  setShowHints 
}: {
  problem: any;
  showHints: boolean;
  setShowHints: (v: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <ProblemHeader problem={problem} />
      <ProblemDescription description={problem.description || 'No description provided.'} />
      <ProblemExamples examples={problem.examples || []} />
      <ProblemConstraints constraints={problem.constraints || []} />
      <ProblemHints 
        showHints={showHints} 
        setShowHints={setShowHints}
        hints={problem.hints || []}
      />
    </div>
  );
}

interface InteractiveLearningViewProps {
  lesson: InteractiveLesson;
}

export default function InteractiveLearningView({ lesson }: InteractiveLearningViewProps) {
  const { themeColors } = useTheme();
  const [showHints, setShowHints] = useState(false);
  const [panelWidth, setPanelWidth] = useState(40);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [code, setCode] = useState('');

  // The lesson IS the problem - no nested problem structure
  const problem = lesson;

  useEffect(() => {
    if (problem?.starterCode) {
      // Handle both string and object types for starterCode
      if (typeof problem.starterCode === 'string') {
        setCode(problem.starterCode);
      } else if (typeof problem.starterCode === 'object') {
        // Type assertion to handle the object case
        const starterCodeObj = problem.starterCode as { [key: string]: string };
        setCode(starterCodeObj.sql || starterCodeObj.javascript || '');
      }
    }
  }, [problem]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    
    // Simulate running tests
    setTimeout(() => {
      setTestResults(MOCK_TEST_RESULTS);
      setIsRunning(false);
    }, 2000);
  };

  const handleReset = () => {
    if (problem?.starterCode) {
      // Handle both string and object types for starterCode
      if (typeof problem.starterCode === 'string') {
        setCode(problem.starterCode);
      } else if (typeof problem.starterCode === 'object') {
        // Type assertion to handle the object case
        const starterCodeObj = problem.starterCode as { [key: string]: string };
        setCode(starterCodeObj.sql || starterCodeObj.javascript || '');
      }
    }
    setTestResults([]);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const handleMouseMove = (event: MouseEvent) => {
      const containerWidth = window.innerWidth;
      const newWidth = (event.clientX / containerWidth) * 100;
      setPanelWidth(Math.min(Math.max(newWidth, 20), 80));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (!problem) {
    return (
      <div 
        className="h-full flex items-center justify-center"
        style={{ backgroundColor: themeColors.primary }}
      >
        <p style={{ color: themeColors.textMuted }}>Loading problem...</p>
      </div>
    );
  }

  // Get default value for CodeEditor
  const getDefaultValue = () => {
    if (!problem?.starterCode) return '';
    if (typeof problem.starterCode === 'string') return problem.starterCode;
    if (typeof problem.starterCode === 'object') {
      // Type assertion to handle the object case
      const starterCodeObj = problem.starterCode as { [key: string]: string };
      return starterCodeObj.sql || starterCodeObj.javascript || '';
    }
    return '';
  };

  return (
    <div className="h-full flex" style={{ backgroundColor: themeColors.primary }}>
      {/* Left Panel - Question View */}
      <div 
        className="flex flex-col border-r"
        style={{ 
          width: `${panelWidth}%`, 
          backgroundColor: themeColors.secondary,
          borderColor: themeColors.border
        }}
      >
        <div className="flex-1 overflow-y-auto p-6">
          <QuestionView 
            problem={problem} 
            showHints={showHints} 
            setShowHints={setShowHints} 
          />
        </div>
      </div>
      
      {/* Resizer */}
      <div
        className="w-1 cursor-col-resize transition-colors hover:opacity-70"
        style={{ backgroundColor: themeColors.border }}
        onMouseDown={handleMouseDown}
      />
      
      {/* Right Panel - Code Editor */}
      <div 
        className="flex flex-col"
        style={{ 
          width: `${100 - panelWidth}%`,
          backgroundColor: themeColors.primary
        }}
      >
        <CodeEditor
          language="sql"
          defaultValue={getDefaultValue()}
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
