// Constants for hardcoded data throughout the application

// Type definitions
interface Section {
  id: string;
  title: string;
  type: 'video' | 'practice' | 'reading';
  duration?: string;
  xp: number;
  completed: boolean;
  locked?: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  sections: Section[];
  status: 'free' | 'premium';
}

// Mock test results for code execution
export const MOCK_TEST_RESULTS = [
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

// Problem Categories for Admin Forms
export const PROBLEM_CATEGORIES = [
  'Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math',
  'Sorting', 'Greedy', 'Depth-First Search', 'Binary Search', 'Database',
  'Breadth-First Search', 'Tree', 'Matrix', 'Two Pointers', 'Binary Tree',
  'Bit Manipulation', 'Heap (Priority Queue)', 'Stack', 'Graph', 'Design'
];

// Problem Difficulties for Admin Forms
export const PROBLEM_DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

// Video Levels for Admin Forms
export const VIDEO_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

// Default Hints for Problems
export const DEFAULT_HINTS = [
  "Think about the data structure that would be most efficient for this problem.",
  "Consider the time complexity of your solution.",
  "Look for patterns in the examples provided."
];

// Mock Course Modules for Navigation
export const MOCK_COURSE_MODULES: Module[] = [
  {
    id: '1',
    title: 'Introduction to TypeScript',
    description: 'Learn the fundamentals of TypeScript',
    progress: 75,
    status: 'free' as const,
    sections: [
      {
        id: '1.1',
        title: 'What is TypeScript?',
        type: 'video',
        duration: '10 min',
        xp: 50,
        completed: true
      },
      {
        id: '1.2',
        title: 'Basic Types',
        type: 'practice',
        xp: 100,
        completed: true
      },
      {
        id: '1.3',
        title: 'Functions',
        type: 'video',
        duration: '15 min',
        xp: 75,
        completed: false,
        locked: false
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced Concepts',
    description: 'Deep dive into advanced TypeScript features',
    progress: 25,
    status: 'premium' as const,
    sections: [
      {
        id: '2.1',
        title: 'Generics',
        type: 'video',
        duration: '20 min',
        xp: 100,
        completed: false,
        locked: true
      },
      {
        id: '2.2',
        title: 'Union Types',
        type: 'practice',
        xp: 150,
        completed: false,
        locked: true
      }
    ]
  }
];

// Advanced Employee Sales Analytics Lesson - matches your exact structure
export const EMPLOYEE_SALES_LESSON = {
  id: "employee-sales-analytics",
  title: "Employee Sales Analytics",
  description: "You are given three tables: **Employees**, **Sales**, and **Regions**.\n\nEach employee belongs to a region. The **Sales** table records each sale made by an employee, including the sale amount and date. Your task is to write a SQL query to find the top 2 employees (by total sales amount) in each region for the year 2023.\n\n### Tables\n\n**Employees**\n\n| employee_id | name    | region_id |\n|-------------|---------|-----------|  \n| 1           | Alice   | 10        |\n| 2           | Bob     | 10        |\n| 3           | Carol   | 20        |\n| 4           | Dave    | 20        |\n| 5           | Eve     | 30        |\n\n**Sales**\n\n| sale_id | employee_id | amount | sale_date  |\n|---------|-------------|--------|------------|\n| 1001    | 1           | 500    | 2023-01-15 |\n| 1002    | 1           | 300    | 2023-02-20 |\n| 1003    | 2           | 200    | 2022-12-10 |\n| 1004    | 2           | 700    | 2023-03-05 |\n| 1005    | 3           | 1500   | 2023-01-20 |\n| 1006    | 4           | 400    | 2023-02-15 |\n| 1007    | 5           | 0      | 2023-01-01 |\n\n**Regions**\n\n| region_id | region_name |\n|-----------|-------------|\n| 10        | North       |\n| 20        | South       |\n| 30        | East        |\n\n### Expected Output\n\nReturn the top 2 employees by total sales amount in each region for 2023:\n\n| region_name | name  | total_sales |\n|-------------|-------|-------------|\n| North       | Alice | 800         |\n| North       | Bob   | 700         |\n| South       | Carol | 1500        |\n| South       | Dave  | 400         |\n| East        | Eve   | 0           |",
  difficulty: "advanced" as const,
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
  hints: [
    "Start by joining the three tables: Employees, Sales, and Regions.",
    "Filter the sales data to only include records from 2023 using WHERE YEAR(sale_date) = 2023.",
    "Use SUM() with GROUP BY to calculate total sales per employee per region.",
    "Apply ROW_NUMBER() or RANK() window function partitioned by region and ordered by total sales descending.",
    "Finally, filter the results to only show employees ranked 1 or 2 in each region."
  ],
  starterCode: {
    javascript: "",
    python: "",
    sql: "-- Write your SQL query here\nselect * from employees;\nselect * from sales;"
  }
};

// Breadcrumbs for different pages  
export const BREADCRUMBS = {
  LEARN: [
    { label: 'Home', href: '/' },
    { label: 'Learn', href: '/learn' }
  ],
  PRACTICE: [
    { label: 'Home', href: '/' },
    { label: 'Practice', href: '/practice' }
  ]
};

// Default starter code templates
export const DEFAULT_STARTER_CODE = {
  javascript: `function solution() {
  // Write your solution here
  return null;
}`,
  sql: `-- Write your SQL query here
SELECT * FROM table_name;`,
  python: `def solution():
    # Write your solution here
    return None`
};
