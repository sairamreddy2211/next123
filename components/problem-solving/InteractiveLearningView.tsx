"use client";
import remarkBreaks from 'remark-breaks';
import { useState, useEffect } from 'react';
import rehypeRaw from 'rehype-raw';
import '../common/markdownStyles.css';
// Reusable QuestionView component for rendering the question/left panel
export function QuestionView({ problem, showHints, setShowHints }: {
  problem: any;
  showHints: boolean;
  setShowHints: (v: boolean) => void;
}) {
  const { Target, Lightbulb, ChevronUp, ChevronDown } = require('lucide-react');
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
  return (
    <div className="space-y-6">
      {/* Problem Title and Badges */}
      <div className="mb-2">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-xl font-bold text-white">{problem.title}</h2>
          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold border ${getDifficultyColor(problem.difficulty)}`}>{problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}</span>
          {problem.tags && problem.tags.length > 0 && (
            <span className="inline-block bg-gray-700 text-xs px-2 py-1 rounded text-gray-200">Topics</span>
          )}
          {problem.companies && problem.companies.length > 0 && (
            <span className="inline-block bg-yellow-900 text-xs px-2 py-1 rounded text-yellow-300">Companies</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          {problem.tags && problem.tags.map((tag: string, idx: number) => (
            <span key={idx} className="bg-blue-700 text-xs text-white px-2 py-1 rounded">{tag}</span>
          ))}
          {problem.companies && problem.companies.map((company: string, idx: number) => (
            <span key={company} className="bg-green-700 text-xs text-white px-2 py-1 rounded">{company}</span>
          ))}
        </div>
      </div>
      {/* Problem Description (Markdown) */}
      <div>
        <div className="mt-5 prose-markdown prose-invert max-w-none text-white">
          <ReactMarkdown 
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkBreaks]}
            components={{
              table: ({node, ...props}) => <table className="min-w-full border border-gray-600 my-2 text-xs" {...props} />, 
              th: ({node, ...props}) => <th className="border border-gray-600 px-2 py-1 bg-gray-800 text-gray-200 text-xs" {...props} />, 
              td: ({node, ...props}) => <td className="border border-gray-600 px-2 py-1 text-gray-300 text-xs" {...props} />, 
              tr: ({node, ...props}) => <tr {...props} />
            }}
            skipHtml={false}
            unwrapDisallowed={false}
          >
            {problem.description}
          </ReactMarkdown>
        </div>
      </div>
      {/* Examples */}
      {problem.examples && problem.examples.length > 0 && (
        <div>
          {/* <h4 className="text-md font-semibold text-white mb-3 p-3 rounded-lg" style={{ backgroundColor: '#333333' }}>Examples</h4> */}
          <div className="space-y-2">
            {problem.examples.map((example: any, index: number) => (
              <div key={index} className="border rounded-lg" style={{ borderColor: '#222222' }}>
                <div className="font-medium text-sm text-gray-400 mb-2">Example {index + 1}:</div>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-xs text-gray-300">Input:</span>
                    <pre
                      className="mt-1 text-xs border p-2 rounded font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap break-words max-w-full"
                      style={{ backgroundColor: '#262626', borderColor: '#222222', fontSize: '12px', wordBreak: 'break-all', maxWidth: '100%' }}
                    >
                      {example.input.length > 300
                        ? example.input.slice(0, 300) + '...'
                        : example.input}
                    </pre>
                  </div>
                  <div>
                    <span className="font-medium text-xs text-gray-300">Output:</span>
                    <div className="mt-1 overflow-x-auto max-w-full">
                       <ReactMarkdown
                        remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkBreaks]}
                        components={{
                          table: ({node, ...props}) => <table className="min-w-full border border-gray-600 my-2 text-xs" style={{maxWidth:'100%'}} {...props} />, 
                          th: ({node, ...props}) => <th className="border border-gray-600 px-2 py-1 bg-gray-800 text-gray-200 text-xs" style={{maxWidth:'200px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} {...props} />, 
                          td: ({node, ...props}) => <td className="border border-gray-600 px-2 py-1 text-gray-300 text-xs" style={{maxWidth:'200px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} {...props} />, 
                          tr: ({node, ...props}) => <tr {...props} />
                        }}
                      >
                        {example.output}
                      </ReactMarkdown>
                    </div>
                  </div>
                  {example.explanation && (
                    <div>
                      <span className="font-medium text-sm text-gray-300">Explanation:</span>
                      <div className="mt-1 text-sm text-gray-400">{example.explanation}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Constraints */}
      {problem.constraints && problem.constraints.length > 0 && (
        <div>
          <h4 className="text-md font-semibold text-white mb-3 p-3 rounded-lg" style={{ backgroundColor: '#333333' }}>Constraints</h4>
          <ul className="space-y-2">
            {problem.constraints.map((constraint: string, index: number) => (
              <li key={index} className="flex items-start space-x-2">
                <Target className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{constraint}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Hints (static for now) */}
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
  );
}
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronDown, ChevronUp, Target, Lightbulb } from 'lucide-react';
import { InteractiveLesson } from '@/types';
import CodeEditor from '@/components/shared/CodeEditor';

  // No props needed, will fetch by id


interface TestResult {
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  hidden?: boolean;
}
export default function InteractiveLearningView() {
  // Simulate getting id from URL
  const id = 'employee-sales-analytics';

  // State for the fetched problem
  const [problem, setProblem] = useState<any | null>(null);
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [panelWidth, setPanelWidth] = useState(45); // Percentage for left panel

  // Simulate fetching the problem JSON by id
  useEffect(() => {
    // Mock fetch
    const fetchProblem = async () => {
      // Simulate network delay
      await new Promise(res => setTimeout(res, 300));
      // Use the provided JSON
      const data = {
        id: "employee-sales-analytics",
        title: "Employee Sales Analytics",
        description: "You are given three tables: **Employees**, **Sales**, and **Regions**.\n\nEach employee belongs to a region. The **Sales** table records each sale made by an employee, including the sale amount and date. Your task is to write a SQL query to find the top 2 employees (by total sales amount) in each region for the year 2023.\n\n### Tables\n\n**Employees**\n\n| employee_id | name    | region_id |\n|-------------|---------|-----------|\n| 1           | Alice   | 10        |\n| 2           | Bob     | 10        |\n| 3           | Carol   | 20        |\n| 4           | Dave    | 20        |\n| 5           | Eve     | 30        |\n\n**Sales**\n\n| sale_id | employee_id | amount | sale_date  |\n|---------|-------------|--------|------------|\n| 1001    | 1           | 500    | 2023-01-10 |\n| 1002    | 2           | 700    | 2023-02-15 |\n| 1003    | 1           | 300    | 2023-03-20 |\n| 1004    | 3           | 900    | 2023-01-25 |\n| 1005    | 4           | 400    | 2023-04-10 |\n| 1006    | 3           | 600    | 2023-05-05 |\n| 1007    | 5           | 800    | 2023-06-18 |\n| 1008    | 2           | 200    | 2022-12-30 |\n\n**Regions**\n\n| region_id | region_name |\n|-----------|-------------|\n| 10        | North       |\n| 20        | South       |\n| 30        | East        |\n\n### Task\nFor each region, return the region name, employee name, and total sales amount for the top 2 employees (by total sales in 2023). If a region has fewer than 2 employees with sales, return all employees with sales for that region.\n\nOrder the results by region name, then by total sales descending.",
        difficulty: "advanced",
        tags: ["sql", "window functions", "analytics", "group by", "database"],
        companies: ["Amazon", "Google", "Meta"],
        category: "databases",
        content: "This problem tests your ability to join multiple tables, aggregate data, and use window functions in SQL.",
        examples: [
          {
            input: "Tables as above. For region 'North', Alice has total sales 800, Bob has 700 (only 2023 sales count).",
            output: "| region_name | name  | total_sales |\n|-------------|-------|-------------|\n| North       | Alice | 800         |\n| North       | Bob   | 700         |",
            explanation: "Alice and Bob are the top 2 in North. Bob's 200 sale in 2022 is ignored."
          },
          {
            input: "For region 'South', Carol has 1500, Dave has 400.",
            output: "| region_name | name  | total_sales |\n|-------------|-------|-------------|\n| South       | Carol | 1500        |\n| South       | Dave  | 400         |",
            explanation: "Carol and Dave are the only employees with sales in South."
          }
        ],
        constraints: [
          "Use standard SQL syntax.",
          "Only consider sales from the year 2023.",
          "Use window functions (e.g., ROW_NUMBER or RANK) to find the top 2 employees per region.",
          "If a region has fewer than 2 employees with sales, return all such employees."
        ],
        starterCode: {
          javascript: "",
          python: "",
          sql: "-- Write your SQL query here\nselect * from employees;\nselect * from sales;"
        }
      };
      setProblem(data);
      setCode(data.starterCode.sql);
    };
    fetchProblem();
  }, [id]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRunCode = async (codeToRun: string) => {
    setIsRunning(true);
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock test results based on the lesson
    const mockResults: TestResult[] = (problem?.testCases || []).map((testCase: any, index: number) => ({
      passed: Math.random() > 0.3, // Random pass/fail for demo
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: Math.random() > 0.3 ? testCase.expectedOutput : 'Error: Syntax error',
      hidden: testCase.hidden
    }));
    setTestResults(mockResults);
    setIsRunning(false);
  };

  const handleReset = () => {
    setCode(problem?.starterCode?.sql || '');
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

  if (!problem) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-900">
        <p className="text-gray-400">Loading problem...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex bg-black">
      {/* Left Panel - Question View */}
      <div 
        className="flex flex-col border-r border-gray-700"
        style={{ width: `${panelWidth}%`, backgroundColor: '#262626' }}
      >
        <div className="flex-1 overflow-y-auto p-6">
          <QuestionView problem={problem} showHints={showHints} setShowHints={setShowHints} />
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
          defaultValue={problem.starterCode.sql}
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