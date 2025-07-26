export interface Example {
  input: string
  output: string
  explanation?: string
}

export interface Table {
  name: string
  columns: {
    name: string
    type: string
    constraints?: string
  }[]
  sampleData: Record<string, any>[]
}

export interface ProblemData {
  id: number
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  description: string
  examples: Example[]
  constraints: string[]
  tags: string[]
  acceptanceRate: string
  totalSubmissions: string
  tables?: Table[]  // For database problems
  starterCode: {
    python: string
    sql: string
    postgresql: string
  }
}

export const sampleProblems: ProblemData[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    tags: ["Array", "Hash Table"],
    acceptanceRate: "51.2%",
    totalSubmissions: "7.1M",
    starterCode: {
      python: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    pass`,
      sql: `-- This problem doesn't apply to SQL`,
      postgresql: `-- This problem doesn't apply to PostgreSQL`
    }
  },
  {
    id: 2,
    title: "Employee Salary Query",
    difficulty: "Easy",
    description: `Write SQL queries to retrieve employee information from the company database.

Given the tables below, write simple SQL queries to answer these questions:

1. Find all employees with their department names
2. List employees earning more than $70,000
3. Count how many employees are in each department

This is a basic SQL practice problem to get familiar with JOIN operations and filtering.`,
    examples: [
      {
        input: "Query 1: All employees with department names",
        output: `employee_name | department_name | salary
John Smith    | Engineering     | 95000
Alice Johnson | Marketing       | 72000
Bob Wilson    | Engineering     | 88000`,
        explanation: "Use JOIN to combine employees and departments tables"
      },
      {
        input: "Query 2: High earners (salary > 70000)",
        output: `employee_name | salary
John Smith    | 95000
Alice Johnson | 72000
Bob Wilson    | 88000`,
        explanation: "Use WHERE clause to filter by salary"
      }
    ],
    constraints: [
      "Use standard SQL syntax",
      "Join employees and departments tables using department_id",
      "Use appropriate WHERE clauses for filtering",
      "Sort results by employee name"
    ],
    tags: ["SQL", "Database", "JOIN", "Basic Queries"],
    acceptanceRate: "78.5%",
    totalSubmissions: "156K",
    tables: [
      {
        name: "employees",
        columns: [
          { name: "employee_id", type: "INTEGER", constraints: "PRIMARY KEY" },
          { name: "employee_name", type: "VARCHAR(100)", constraints: "NOT NULL" },
          { name: "department_id", type: "INTEGER", constraints: "FOREIGN KEY" },
          { name: "salary", type: "INTEGER", constraints: "NOT NULL" },
          { name: "hire_date", type: "DATE", constraints: "NOT NULL" }
        ],
        sampleData: [
          { employee_id: 1, employee_name: "John Smith", department_id: 1, salary: 95000, hire_date: "2022-01-15" },
          { employee_id: 2, employee_name: "Alice Johnson", department_id: 2, salary: 72000, hire_date: "2021-03-10" },
          { employee_id: 3, employee_name: "Bob Wilson", department_id: 1, salary: 88000, hire_date: "2023-06-01" },
          { employee_id: 4, employee_name: "Carol Davis", department_id: 3, salary: 65000, hire_date: "2022-09-20" },
          { employee_id: 5, employee_name: "David Brown", department_id: 2, salary: 58000, hire_date: "2023-02-14" },
          { employee_id: 6, employee_name: "Eva Garcia", department_id: 1, salary: 92000, hire_date: "2021-11-30" }
        ]
      },
      {
        name: "departments",
        columns: [
          { name: "department_id", type: "INTEGER", constraints: "PRIMARY KEY" },
          { name: "department_name", type: "VARCHAR(50)", constraints: "NOT NULL UNIQUE" },
          { name: "location", type: "VARCHAR(100)" }
        ],
        sampleData: [
          { department_id: 1, department_name: "Engineering", location: "San Francisco" },
          { department_id: 2, department_name: "Marketing", location: "New York" },
          { department_id: 3, department_name: "Sales", location: "Chicago" }
        ]
      }
    ],
    starterCode: {
      python: `# Python solution using pandas for data analysis
import pandas as pd

def query_employees():
    """
    Analyze employee data using pandas
    """
    
    # You would typically load data from the database here
    # employees_df = pd.read_sql("SELECT * FROM employees", connection)
    # departments_df = pd.read_sql("SELECT * FROM departments", connection)
    
    # Query 1: All employees with department names
    # Query 2: High earners (salary > 70000)  
    # Query 3: Employee count by department
    
    pass`,
      sql: `-- SQL Solution for Employee Queries

-- Query 1: All employees with their department names
SELECT e.employee_name, d.department_name, e.salary
FROM employees e
JOIN departments d ON e.department_id = d.department_id
ORDER BY e.employee_name;

-- Query 2: Employees earning more than $70,000
SELECT employee_name, salary
FROM employees
WHERE salary > 70000
ORDER BY employee_name;

-- Query 3: Count employees in each department
SELECT d.department_name, COUNT(e.employee_id) as employee_count
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_name
ORDER BY d.department_name;`,
      postgresql: `-- PostgreSQL Solution with Enhanced Features

-- Query 1: All employees with department info
SELECT 
    e.employee_name,
    d.department_name,
    e.salary,
    d.location
FROM employees e
JOIN departments d ON e.department_id = d.department_id
ORDER BY e.employee_name;

-- Query 2: High earners with salary formatting
SELECT 
    employee_name,
    TO_CHAR(salary, 'FM$999,999') as formatted_salary,
    salary
FROM employees
WHERE salary > 70000
ORDER BY salary DESC;

-- Query 3: Department statistics
SELECT 
    d.department_name,
    COUNT(e.employee_id) as employee_count,
    COALESCE(AVG(e.salary), 0)::INTEGER as avg_salary,
    COALESCE(MAX(e.salary), 0) as max_salary
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_name, d.department_id
ORDER BY d.department_name;`
    }
  }
]
