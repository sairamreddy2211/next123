// Problem Solving and Interactive Learning Models
export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  tags: string[];
  starterCode: {
    [language: string]: string;
  };
  testCases: TestCase[];
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  hidden?: boolean;
}

export interface TestResult {
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  error?: string;
  hidden?: boolean;
}

export interface InteractiveLesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  companies: string[];
  category: string;
  content: string;
  examples: ProblemExample[];
  constraints: string[];
  hints: string[];
  starterCode: {
    javascript: string;
    python: string;
    sql: string;
  };
}

export interface CodeEditorProps {
  language: string;
  defaultValue: string;
  onChange?: (value: string) => void;
  onRun?: (code: string) => void;
  onReset?: () => void;
  testResults?: TestResult[];
  isRunning?: boolean;
  theme?: 'dark' | 'light';
}
