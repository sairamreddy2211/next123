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

// Reusable QuestionView component for rendering the question/left panel
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
  const { themeColors } = useTheme();

  return (
    <div className="space-y-6">
      <ProblemHeader problem={problem} />
      <ProblemDescription description={problem.description || 'No description provided.'} />
      <ProblemExamples examples={problem.examples || []} />
      <ProblemConstraints constraints={problem.constraints || []} />
      <ProblemHints 
        showHints={showHints} 
        setShowHints={setShowHints}
        hints={problem.hints}
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

  const problem = lesson.problem;

  useEffect(() => {
    if (problem?.starterCode) {
      // Handle both string and object types for starterCode
      if (typeof problem.starterCode === 'string') {
        setCode(problem.starterCode);
      } else if (typeof problem.starterCode === 'object') {
        setCode(problem.starterCode.sql || problem.starterCode.javascript || '');
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

  const handleReset = () => {
    if (problem?.starterCode) {
      // Handle both string and object types for starterCode
      if (typeof problem.starterCode === 'string') {
        setCode(problem.starterCode);
      } else if (typeof problem.starterCode === 'object') {
        setCode(problem.starterCode.sql || problem.starterCode.javascript || '');
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
      return problem.starterCode.sql || problem.starterCode.javascript || '';
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

interface InteractiveLearningViewProps {
  lessons?: InteractiveLesson[];
}

export default function InteractiveLearningView({ lessons }: InteractiveLearningViewProps) {
  const { themeColors } = useTheme();
  
  // Simulate getting id from URL
  const id = 'employee-sales-analytics';

  // State for the fetched problem
  const [problem, setProblem] = useState<any | null>(null);
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);

  // Add state for resizable panels
  const [leftWidth, setLeftWidth] = useState(50); // percentage

  useEffect(() => {
    // Simulate fetching problem from ID
    const mockProblem = {
      id: 'employee-sales-analytics',
      title: 'Employee Sales Analytics',
      description: `
## Problem Statement

You are working with a company's sales database and need to analyze employee performance. Given the following tables:

**employees** table:
| employee_id | name | department | hire_date |
|-------------|------|------------|-----------|
| 1 | John Smith | Sales | 2020-01-15 |
| 2 | Jane Doe | Marketing | 2019-03-22 |
| 3 | Bob Johnson | Sales | 2021-06-10 |

**sales** table:
| sale_id | employee_id | amount | sale_date |
|---------|-------------|--------|-----------|
| 1 | 1 | 1000 | 2023-01-15 |
| 2 | 1 | 1500 | 2023-02-20 |
| 3 | 3 | 2000 | 2023-01-10 |

Write a SQL query to find the top 3 employees by total sales amount, including their names and total sales.
      `,
      difficulty: 'intermediate',
      tags: ['SQL', 'Aggregation', 'JOIN'],
      companies: ['Microsoft', 'Amazon'],
      examples: [
        {
          input: "employees and sales tables as shown above",
          output: "John Smith: $2500, Bob Johnson: $2000, Jane Doe: $0",
          explanation: "John Smith has sales of $1000 + $1500 = $2500, Bob Johnson has $2000, Jane Doe has no sales"
        }
      ],
      constraints: [
        "1 <= employee_id <= 1000",
        "1 <= sale_amount <= 100000",
        "Include employees with 0 sales"
      ],
      hints: [
        "Use LEFT JOIN to include employees with no sales",
        "Use GROUP BY to aggregate sales by employee",
        "Use ORDER BY with LIMIT to get top 3"
      ]
    };
    setProblem(mockProblem);
    setCode('SELECT \n  e.name,\n  COALESCE(SUM(s.amount), 0) as total_sales\nFROM employees e\nLEFT JOIN sales s ON e.employee_id = s.employee_id\nGROUP BY e.employee_id, e.name\nORDER BY total_sales DESC\nLIMIT 3;');
  }, [id]);

  const handleRunCode = (currentCode: string) => {
    setIsRunning(true);
    setCode(currentCode);
    
    // Simulate running code and getting results
    setTimeout(() => {
      const mockResults: TestResult[] = [
        { passed: true, input: "Test case 1", expected: "John Smith: $2500", actual: "John Smith: $2500" },
        { passed: true, input: "Test case 2", expected: "Bob Johnson: $2000", actual: "Bob Johnson: $2000" },
        { passed: false, input: "Test case 3", expected: "Jane Doe: $0", actual: "Jane Doe not included" }
      ];
      setTestResults(mockResults);
      setIsRunning(false);
    }, 2000);
  };

  const handleReset = () => {
    setCode('SELECT \n  e.name,\n  COALESCE(SUM(s.amount), 0) as total_sales\nFROM employees e\nLEFT JOIN sales s ON e.employee_id = s.employee_id\nGROUP BY e.employee_id, e.name\nORDER BY total_sales DESC\nLIMIT 3;');
    setTestResults([]);
  };

  if (!problem) {
    return (
      <div 
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: themeColors.primary, color: themeColors.textPrimary }}
      >
        Loading problem...
      </div>
    );
  }

  return (
    <div 
      className="h-screen flex"
      style={{ backgroundColor: themeColors.primary }}
    >
      {/* Left Panel - Question View */}
      <div 
        className="overflow-hidden"
        style={{ width: `${leftWidth}%` }}
      >
        <QuestionView 
          problem={problem} 
          showHints={showHints} 
          setShowHints={setShowHints} 
        />
      </div>

      {/* Resizer */}
      <div 
        className="w-1 cursor-col-resize hover:bg-blue-500 transition-colors"
        style={{ backgroundColor: themeColors.border }}
        onMouseDown={(e) => {
          const startX = e.clientX;
          const startWidth = leftWidth;
          
          const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startX;
            const containerWidth = window.innerWidth;
            const newWidth = startWidth + (deltaX / containerWidth) * 100;
            setLeftWidth(Math.min(80, Math.max(20, newWidth))); // Between 20% and 80%
          };
          
          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };
          
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      />

      {/* Right Panel - Code Editor */}
      <div 
        className="flex flex-col overflow-hidden"
        style={{ width: `${100 - leftWidth}%` }}
      >
        <CodeEditor
          language="sql"
          defaultValue={code}
          onChange={setCode}
          onRun={handleRunCode}
          onReset={handleReset}
          testResults={testResults}
          isRunning={isRunning}
        />
      </div>
    </div>
  );
}
