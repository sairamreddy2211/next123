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
    title: "Data Pipeline ETL",
    difficulty: "Medium",
    description: `Design and implement a data pipeline that extracts data from multiple sources, transforms it according to business rules, and loads it into a target data warehouse.

You need to handle:
- Data validation and cleaning
- Schema transformation
- Error handling and logging
- Performance optimization

The pipeline should be scalable and handle both batch and streaming data.`,
    examples: [
      {
        input: `Source 1: CSV files with user data
Source 2: JSON API with transaction data
Target: PostgreSQL data warehouse`,
        output: `Transformed and loaded data with proper schema mapping`,
        explanation: "ETL process should normalize data formats and apply business rules"
      }
    ],
    constraints: [
      "Handle up to 1M records per batch",
      "Support multiple data formats (CSV, JSON, XML)",
      "Implement proper error handling",
      "Ensure data quality and consistency"
    ],
    tags: ["ETL", "Data Engineering", "Pipeline", "SQL"],
    acceptanceRate: "34.7%",
    totalSubmissions: "245K",
    starterCode: {
      python: `import pandas as pd
from typing import List, Dict, Any

class DataPipeline:
    def __init__(self, config: Dict[str, Any]):
        """
        Initialize the data pipeline
        """
        self.config = config
    
    def extract(self, sources: List[str]) -> pd.DataFrame:
        """
        Extract data from multiple sources
        """
        pass
    
    def transform(self, data: pd.DataFrame) -> pd.DataFrame:
        """
        Transform data according to business rules
        """
        pass
    
    def load(self, data: pd.DataFrame, target: str) -> bool:
        """
        Load data into target destination
        """
        pass
    
    def run_pipeline(self) -> bool:
        """
        Execute the complete ETL pipeline
        """
        pass`,
      sql: `-- Create staging tables for ETL process
CREATE OR REPLACE PROCEDURE run_etl_pipeline()
LANGUAGE plpgsql
AS $$
BEGIN
    -- Extract: Copy data from source tables
    
    -- Transform: Apply business rules and data cleaning
    
    -- Load: Insert transformed data into target tables
    
    -- Log pipeline execution
    
END;
$$;

-- Call the ETL pipeline
-- CALL run_etl_pipeline();`,
      postgresql: `-- PostgreSQL ETL Pipeline Procedure
CREATE OR REPLACE FUNCTION run_etl_pipeline()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    -- Extract: Copy data from source tables
    
    -- Transform: Apply business rules and data cleaning
    
    -- Load: Insert transformed data into target tables
    
    -- Log pipeline execution
    
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'ETL Pipeline failed: %', SQLERRM;
            ROLLBACK;
END;
$$;

-- Call the ETL pipeline
-- SELECT run_etl_pipeline();`
    }
  },
  {
    id: 3,
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
    
    # Query 1: All employees with department names
    query1 = """
    SELECT e.employee_name, d.department_name, e.salary
    FROM employees e
    JOIN departments d ON e.department_id = d.department_id
    ORDER BY e.employee_name;
    """
    
    # Query 2: High earners (salary > 70000)
    query2 = """
    SELECT employee_name, salary
    FROM employees
    WHERE salary > 70000
    ORDER BY employee_name;
    """
    
    # Query 3: Employee count by department
    query3 = """
    SELECT d.department_name, COUNT(e.employee_id) as employee_count
    FROM departments d
    LEFT JOIN employees e ON d.department_id = e.department_id
    GROUP BY d.department_name
    ORDER BY d.department_name;
    """
    
    return [query1, query2, query3]`,
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
  },
  {
    id: 3,
    title: "Employee Department Analytics",
    difficulty: "Medium",
    description: `Write SQL queries to analyze employee data across multiple departments.

Given the database schema below, write queries to solve the following problems:

1. Find all employees who earn more than the average salary in their department
2. List departments with more than 5 employees, ordered by total salary budget
3. Find the top 3 highest-paid employees in each department
4. Calculate the salary difference between each employee and their department's average

The database contains employee records with their department assignments, salaries, and hire dates.`,
    examples: [
      {
        input: "Query 1: Employees earning above department average",
        output: `employee_name | department_name | salary | dept_avg_salary
John Smith    | Engineering     | 95000  | 87500.00
Alice Johnson | Marketing       | 72000  | 65000.00`,
        explanation: "Shows employees whose salary exceeds their department's average salary"
      },
      {
        input: "Query 2: Departments with >5 employees by budget",
        output: `department_name | employee_count | total_budget
Engineering     | 8              | 700000
Sales          | 6              | 390000`,
        explanation: "Departments ordered by total salary budget (descending)"
      }
    ],
    constraints: [
      "All employees belong to exactly one department",
      "Salaries are stored as INTEGER values",
      "Department names are unique",
      "Handle NULL values appropriately",
      "Use standard SQL syntax (PostgreSQL compatible)"
    ],
    tags: ["SQL", "Database", "Analytics", "Window Functions", "Aggregation"],
    acceptanceRate: "42.3%",
    totalSubmissions: "89K",
    tables: [
      {
        name: "employees",
        columns: [
          { name: "employee_id", type: "INTEGER", constraints: "PRIMARY KEY" },
          { name: "employee_name", type: "VARCHAR(100)", constraints: "NOT NULL" },
          { name: "department_id", type: "INTEGER", constraints: "FOREIGN KEY" },
          { name: "salary", type: "INTEGER", constraints: "NOT NULL" },
          { name: "hire_date", type: "DATE", constraints: "NOT NULL" },
          { name: "email", type: "VARCHAR(150)", constraints: "UNIQUE" }
        ],
        sampleData: [
          { employee_id: 1, employee_name: "John Smith", department_id: 1, salary: 95000, hire_date: "2022-01-15", email: "john.smith@company.com" },
          { employee_id: 2, employee_name: "Alice Johnson", department_id: 2, salary: 72000, hire_date: "2021-03-10", email: "alice.johnson@company.com" },
          { employee_id: 3, employee_name: "Bob Wilson", department_id: 1, salary: 88000, hire_date: "2023-06-01", email: "bob.wilson@company.com" },
          { employee_id: 4, employee_name: "Carol Davis", department_id: 3, salary: 65000, hire_date: "2022-09-20", email: "carol.davis@company.com" },
          { employee_id: 5, employee_name: "David Brown", department_id: 2, salary: 58000, hire_date: "2023-02-14", email: "david.brown@company.com" },
          { employee_id: 6, employee_name: "Eva Garcia", department_id: 1, salary: 92000, hire_date: "2021-11-30", email: "eva.garcia@company.com" },
          { employee_id: 7, employee_name: "Frank Miller", department_id: 3, salary: 70000, hire_date: "2022-05-18", email: "frank.miller@company.com" },
          { employee_id: 8, employee_name: "Grace Lee", department_id: 2, salary: 75000, hire_date: "2023-01-08", email: "grace.lee@company.com" }
        ]
      },
      {
        name: "departments",
        columns: [
          { name: "department_id", type: "INTEGER", constraints: "PRIMARY KEY" },
          { name: "department_name", type: "VARCHAR(50)", constraints: "NOT NULL UNIQUE" },
          { name: "manager_id", type: "INTEGER", constraints: "FOREIGN KEY" },
          { name: "budget", type: "INTEGER", constraints: "NOT NULL" },
          { name: "location", type: "VARCHAR(100)" }
        ],
        sampleData: [
          { department_id: 1, department_name: "Engineering", manager_id: 1, budget: 1200000, location: "San Francisco" },
          { department_id: 2, department_name: "Marketing", manager_id: 2, budget: 800000, location: "New York" },
          { department_id: 3, department_name: "Sales", manager_id: 7, budget: 600000, location: "Chicago" },
          { department_id: 4, department_name: "HR", manager_id: null, budget: 400000, location: "Austin" }
        ]
      }
    ],
    starterCode: {
      python: `# Python solution using pandas for data analysis
import pandas as pd
import sqlite3

def analyze_employee_data():
    """
    Analyze employee data using pandas
    This would connect to a database and perform the analysis
    """
    
    # Connect to database
    # conn = sqlite3.connect('company.db')
    
    # Query 1: Employees earning above department average
    query1 = """
    -- Write your SQL query here
    """
    
    # Query 2: Departments with >5 employees by budget  
    query2 = """
    -- Write your SQL query here
    """
    
    # Query 3: Top 3 highest-paid employees per department
    query3 = """
    -- Write your SQL query here
    """
    
    # Query 4: Salary difference from department average
    query4 = """
    -- Write your SQL query here
    """
    
    return {
        'above_avg_employees': query1,
        'dept_budgets': query2, 
        'top_employees': query3,
        'salary_differences': query4
    }`,
      javascript: `// JavaScript solution using SQL queries
const analyzeEmployeeData = () => {
    // Query 1: Employees earning above department average
    const query1 = \`
    -- Write your SQL query here
    \`;
    
    // Query 2: Departments with >5 employees by budget
    const query2 = \`
    -- Write your SQL query here
    \`;
    
    // Query 3: Top 3 highest-paid employees per department
    const query3 = \`
    -- Write your SQL query here
    \`;
    
    // Query 4: Salary difference from department average
    const query4 = \`
    -- Write your SQL query here
    \`;
    
    return {
        aboveAvgEmployees: query1,
        deptBudgets: query2,
        topEmployees: query3,
        salaryDifferences: query4
    };
};`,
      typescript: `// TypeScript solution with type definitions
interface Employee {
    employee_id: number;
    employee_name: string;
    department_id: number;
    salary: number;
    hire_date: string;
    email: string;
}

interface Department {
    department_id: number;
    department_name: string;
    manager_id: number | null;
    budget: number;
    location: string;
}

const analyzeEmployeeData = (): Record<string, string> => {
    // Query 1: Employees earning above department average
    const query1: string = \`
    -- Write your SQL query here
    \`;
    
    // Query 2: Departments with >5 employees by budget
    const query2: string = \`
    -- Write your SQL query here
    \`;
    
    // Query 3: Top 3 highest-paid employees per department
    const query3: string = \`
    -- Write your SQL query here
    \`;
    
    // Query 4: Salary difference from department average
    const query4: string = \`
    -- Write your SQL query here
    \`;
    
    return {
        aboveAvgEmployees: query1,
        deptBudgets: query2,
        topEmployees: query3,
        salaryDifferences: query4
    };
};`,
      java: `// Java solution using JDBC
import java.sql.*;
import java.util.*;

public class EmployeeAnalytics {
    
    public Map<String, String> analyzeEmployeeData() {
        Map<String, String> queries = new HashMap<>();
        
        // Query 1: Employees earning above department average
        String query1 = """
        -- Write your SQL query here
        """;
        
        // Query 2: Departments with >5 employees by budget
        String query2 = """
        -- Write your SQL query here
        """;
        
        // Query 3: Top 3 highest-paid employees per department
        String query3 = """
        -- Write your SQL query here
        """;
        
        // Query 4: Salary difference from department average
        String query4 = """
        -- Write your SQL query here
        """;
        
        queries.put("aboveAvgEmployees", query1);
        queries.put("deptBudgets", query2);
        queries.put("topEmployees", query3);
        queries.put("salaryDifferences", query4);
        
        return queries;
    }
}`,
      cpp: `// C++ solution structure
#include <iostream>
#include <string>
#include <map>

class EmployeeAnalytics {
public:
    std::map<std::string, std::string> analyzeEmployeeData() {
        std::map<std::string, std::string> queries;
        
        // Query 1: Employees earning above department average
        std::string query1 = R"(
        -- Write your SQL query here
        )";
        
        // Query 2: Departments with >5 employees by budget
        std::string query2 = R"(
        -- Write your SQL query here
        )";
        
        // Query 3: Top 3 highest-paid employees per department
        std::string query3 = R"(
        -- Write your SQL query here
        )";
        
        // Query 4: Salary difference from department average
        std::string query4 = R"(
        -- Write your SQL query here
        )";
        
        queries["aboveAvgEmployees"] = query1;
        queries["deptBudgets"] = query2;
        queries["topEmployees"] = query3;
        queries["salaryDifferences"] = query4;
        
        return queries;
    }
};`,
      sql: `-- SQL Solution for Employee Department Analytics

-- Query 1: Find employees earning above department average
SELECT 
    e.employee_name,
    d.department_name,
    e.salary,
    dept_avg.avg_salary as dept_avg_salary
FROM employees e
JOIN departments d ON e.department_id = d.department_id
JOIN (
    SELECT 
        department_id,
        AVG(salary) as avg_salary
    FROM employees
    GROUP BY department_id
) dept_avg ON e.department_id = dept_avg.department_id
WHERE e.salary > dept_avg.avg_salary
ORDER BY d.department_name, e.salary DESC;

-- Query 2: Departments with >5 employees ordered by total budget
SELECT 
    d.department_name,
    COUNT(e.employee_id) as employee_count,
    SUM(e.salary) as total_budget
FROM departments d
JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name
HAVING COUNT(e.employee_id) > 5
ORDER BY total_budget DESC;

-- Query 3: Top 3 highest-paid employees per department
WITH ranked_employees AS (
    SELECT 
        e.employee_name,
        d.department_name,
        e.salary,
        ROW_NUMBER() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) as salary_rank
    FROM employees e
    JOIN departments d ON e.department_id = d.department_id
)
SELECT 
    employee_name,
    department_name,
    salary,
    salary_rank
FROM ranked_employees
WHERE salary_rank <= 3
ORDER BY department_name, salary_rank;

-- Query 4: Salary difference from department average
SELECT 
    e.employee_name,
    d.department_name,
    e.salary,
    dept_avg.avg_salary,
    (e.salary - dept_avg.avg_salary) as salary_difference
FROM employees e
JOIN departments d ON e.department_id = d.department_id
JOIN (
    SELECT 
        department_id,
        AVG(salary) as avg_salary
    FROM employees
    GROUP BY department_id
) dept_avg ON e.department_id = dept_avg.department_id
ORDER BY d.department_name, salary_difference DESC;`,
      postgresql: `-- PostgreSQL Solution with Advanced Features

-- Query 1: Employees earning above department average (using window functions)
SELECT 
    e.employee_name,
    d.department_name,
    e.salary,
    AVG(e.salary) OVER (PARTITION BY e.department_id) as dept_avg_salary,
    e.salary - AVG(e.salary) OVER (PARTITION BY e.department_id) as above_avg_amount
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > AVG(e.salary) OVER (PARTITION BY e.department_id)
ORDER BY d.department_name, e.salary DESC;

-- Query 2: Departments with employee statistics
SELECT 
    d.department_name,
    COUNT(e.employee_id) as employee_count,
    SUM(e.salary) as total_salary_budget,
    AVG(e.salary)::NUMERIC(10,2) as avg_salary,
    MIN(e.salary) as min_salary,
    MAX(e.salary) as max_salary,
    STDDEV(e.salary)::NUMERIC(10,2) as salary_stddev
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name
HAVING COUNT(e.employee_id) > 0
ORDER BY total_salary_budget DESC NULLS LAST;

-- Query 3: Top employees with percentile rankings
WITH employee_rankings AS (
    SELECT 
        e.employee_name,
        d.department_name,
        e.salary,
        RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) as salary_rank,
        PERCENT_RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary) as percentile_rank,
        NTILE(4) OVER (PARTITION BY e.department_id ORDER BY e.salary) as salary_quartile
    FROM employees e
    JOIN departments d ON e.department_id = d.department_id
)
SELECT 
    employee_name,
    department_name,
    salary,
    salary_rank,
    ROUND(percentile_rank::NUMERIC * 100, 2) as salary_percentile,
    CASE 
        WHEN salary_quartile = 4 THEN 'Top 25%'
        WHEN salary_quartile = 3 THEN 'Upper Middle'
        WHEN salary_quartile = 2 THEN 'Lower Middle' 
        ELSE 'Bottom 25%'
    END as performance_tier
FROM employee_rankings
WHERE salary_rank <= 3
ORDER BY department_name, salary_rank;

-- Query 4: Advanced salary analysis with department comparisons
SELECT 
    e.employee_name,
    d.department_name,
    e.salary,
    AVG(e.salary) OVER (PARTITION BY e.department_id) as dept_avg,
    AVG(e.salary) OVER () as company_avg,
    e.salary - AVG(e.salary) OVER (PARTITION BY e.department_id) as dept_difference,
    e.salary - AVG(e.salary) OVER () as company_difference,
    CASE 
        WHEN e.salary > AVG(e.salary) OVER (PARTITION BY e.department_id) * 1.2 THEN 'High Performer'
        WHEN e.salary > AVG(e.salary) OVER (PARTITION BY e.department_id) THEN 'Above Average'
        WHEN e.salary > AVG(e.salary) OVER (PARTITION BY e.department_id) * 0.8 THEN 'Average'
        ELSE 'Below Average'
    END as performance_category
FROM employees e
JOIN departments d ON e.department_id = d.department_id
ORDER BY d.department_name, e.salary DESC;`
    }
  }
]
