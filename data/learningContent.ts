import { Video, Step } from '@/types';

export const videoLessons: Video[] = [
  {
    id: 'sql-joins-fundamentals',
    title: 'SQL Joins Fundamentals',
    type: 'youtube',
    url: 'https://www.youtube.com/embed/9yeOJ0ZMUYw',
    duration: '15:30',
    presenter: 'Maham Faisal Khan',
    presenterTitle: 'Senior Content Developer, DataCamp'
  },
  {
    id: 'database-design-principles',
    title: 'Database Design Principles',
    type: 'youtube',
    url: 'https://www.youtube.com/embed/ztHopE5Wnpc',
    duration: '12:45',
    presenter: 'Alex Johnson',
    presenterTitle: 'Database Architect, TechCorp'
  },
  {
    id: 'advanced-sql-tutorial',
    title: 'Advanced SQL Tutorial',
    type: 'custom',
    url: '/video/advanced-sql.mp4',
    duration: '10:30',
    presenter: 'Sarah Mitchell',
    presenterTitle: 'SQL Expert & Instructor'
  },
  {
    id: 'performance-optimization',
    title: 'SQL Performance Optimization',
    type: 'custom',
    url: '/video/sql-performance.mp4',
    duration: '15:45',
    presenter: 'Michael Chen',
    presenterTitle: 'Database Performance Engineer'
  },
  {
    id: 'query-optimization-masterclass',
    title: 'Query Optimization Masterclass',
    type: 'youtube',
    url: 'https://www.youtube.com/embed/7S_tz1z_5bA',
    duration: '20:10',
    presenter: 'Emily Watson',
    presenterTitle: 'Performance Engineer, QueryMaster'
  }
];

import { LearningContent } from '@/types';

export const learningContent: LearningContent = {
  videos: [
    {
      id: 'video-1',
      title: 'Introduction to Databases',
      description: 'Learn the fundamentals of database design and SQL.',
      duration: '15 min',
      videoUrl: 'https://example.com/video1',
      difficulty: 'beginner',
      category: 'databases'
    },
    {
      id: 'video-2', 
      title: 'Advanced SQL Queries',
      description: 'Master complex SQL operations and joins.',
      duration: '25 min',
      videoUrl: 'https://example.com/video2',
      difficulty: 'intermediate',
      category: 'databases'
    },
    {
      id: 'video-3',
      title: 'Database Optimization',
      description: 'Techniques for improving database performance.',
      duration: '20 min',
      videoUrl: 'https://example.com/video3',
      difficulty: 'advanced',
      category: 'databases'
    }
  ],
  interactiveLessons: [
    {
      id: 'lesson-1',
      title: 'SQL SELECT Statements',
      description: 'Practice writing basic SELECT queries.',
      difficulty: 'beginner',
      category: 'databases',
      content: 'Learn how to retrieve data from tables using SELECT statements.',
      problem: {
        description: 'Write a SQL query to select all columns from the "users" table.',
        examples: [
          {
            input: 'Table: users\\nColumns: id, name, email, age',
            output: 'All rows with columns: id, name, email, age'
          }
        ],
        constraints: ['Use standard SQL syntax', 'Select all columns using *'],
        difficulty: 'beginner',
        starterCode: '-- Write your SQL query here\\nSELECT',
        testCases: [
          {
            input: 'users table with 3 rows',
            expectedOutput: '3 rows returned with all columns',
            hidden: false
          }
        ]
      }
    },
    {
      id: 'lesson-2',
      title: 'JOIN Operations',
      description: 'Master different types of SQL JOINs.',
      difficulty: 'intermediate', 
      category: 'databases',
      content: 'Understand INNER, LEFT, RIGHT, and FULL OUTER JOINs.',
      problem: {
        description: 'Write a SQL query to join the "orders" and "customers" tables to show customer names with their orders.',
        examples: [
          {
            input: 'orders: id, customer_id, product\\ncustomers: id, name',
            output: 'customer_name, product for each order'
          }
        ],
        constraints: ['Use INNER JOIN', 'Include customer name and product columns'],
        difficulty: 'intermediate',
        starterCode: '-- Join orders and customers tables\\nSELECT \\nFROM orders\\n',
        testCases: [
          {
            input: '5 orders, 3 customers',
            expectedOutput: '5 rows with customer names and products',
            hidden: false
          }
        ]
      }
    },
    {
      id: 'lesson-3',
      title: 'Data Aggregation',
      description: 'Use GROUP BY and aggregate functions.',
      difficulty: 'advanced',
      category: 'databases',
      content: 'Learn to summarize data using COUNT, SUM, AVG, and more.',
      problem: {
        description: 'Write a SQL query to count the number of orders per customer, showing only customers with more than 2 orders.',
        examples: [
          {
            input: 'orders: customer_id, order_date, amount',
            output: 'customer_id, order_count (where order_count > 2)'
          }
        ],
        constraints: ['Use GROUP BY and HAVING', 'Count orders per customer', 'Filter for > 2 orders'],
        difficulty: 'advanced',
        starterCode: '-- Count orders per customer\\nSELECT customer_id,\\nFROM orders\\n',
        testCases: [
          {
            input: '10 orders across 5 customers',
            expectedOutput: 'Only customers with > 2 orders shown',
            hidden: false
          }
        ]
      }
    }
  ]
};
