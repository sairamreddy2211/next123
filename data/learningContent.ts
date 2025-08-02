import { Video, Step } from '@/types';
import { EMPLOYEE_SALES_LESSON } from '@/constants';

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
      videoUrl: 'https://www.youtube.com/embed/p2zMXSXhZ9M',
      difficulty: 'beginner',
      category: 'databases'
    },
  ],
  interactiveLessons: [
    EMPLOYEE_SALES_LESSON
  ]
};
