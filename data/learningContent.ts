import { Video, Step } from '@/types';
import { EMPLOYEE_SALES_LESSON } from '@/constants';

export const videoLessons: Video[] = [
  {
    id: 'sql-joins-fundamentals',
    title: 'SQL Joins Fundamentals',
    description: 'Learn the fundamentals of SQL joins including INNER, LEFT, RIGHT, and FULL joins with practical examples.',
    duration: '15:30',
    videoUrl: 'https://www.youtube.com/embed/9yeOJ0ZMUYw',
    category: 'databases',
    thumbnail: 'https://img.youtube.com/vi/9yeOJ0ZMUYw/maxresdefault.jpg',
    type: 'youtube'
  },
  {
    id: 'database-design-principles',
    title: 'Database Design Principles',
    description: 'Master the core principles of database design including normalization, relationships, and best practices.',
    duration: '12:45',
    videoUrl: 'https://www.youtube.com/embed/ztHopE5Wnpc',
    category: 'databases',
    thumbnail: 'https://img.youtube.com/vi/ztHopE5Wnpc/maxresdefault.jpg',
    type: 'youtube'
  },
  {
    id: 'advanced-sql-tutorial',
    title: 'Advanced SQL Tutorial',
    description: 'Deep dive into advanced SQL concepts including window functions, CTEs, and complex queries.',
    duration: '10:30',
    videoUrl: '/video/advanced-sql.mp4',
    category: 'databases',
    thumbnail: '/thumbnails/advanced-sql.jpg',
    type: 'drm'
  },
  {
    id: 'performance-optimization',
    title: 'SQL Performance Optimization',
    description: 'Learn techniques to optimize SQL queries for better performance and efficiency.',
    duration: '15:45',
    videoUrl: '/video/sql-performance.mp4',
    category: 'databases',
    thumbnail: '/thumbnails/sql-performance.jpg',
    type: 'drm'
  },
  {
    id: 'query-optimization-masterclass',
    title: 'Query Optimization Masterclass',
    description: 'Master the art of query optimization with real-world examples and performance tuning strategies.',
    duration: '20:10',
    videoUrl: 'https://www.youtube.com/embed/7S_tz1z_5bA',
    category: 'databases',
    thumbnail: 'https://img.youtube.com/vi/7S_tz1z_5bA/maxresdefault.jpg',
    type: 'youtube'
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
      videoUrl: 'https://www.youtube.com/embed/p2zMXSXhZ9M',
      category: 'databases',
      thumbnail: 'https://img.youtube.com/vi/p2zMXSXhZ9M/maxresdefault.jpg',
      type: 'youtube'
    },
    {
      id: 'video-2',
      title: 'Advanced SQL Techniques',
      description: 'Master advanced SQL concepts including window functions and complex queries.',
      duration: '20 min',
      videoUrl: 'https://www.youtube.com/watch?v=KKKBaaxH_Jk&list=RDKKKBaaxH_Jk&start_radio=1',
      category: 'databases',
      thumbnail: 'https://img.youtube.com/vi/KKKBaaxH_Jk/maxresdefault.jpg',
      type: 'youtube'
    },
  ],
  interactiveLessons: [
    EMPLOYEE_SALES_LESSON
  ]
};
