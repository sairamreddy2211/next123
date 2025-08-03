import { Course, CourseManager } from '@/lib/courseManager';

export interface CourseTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail?: string;
  template: Partial<Course>;
}

export const COURSE_TEMPLATES: CourseTemplate[] = [
  {
    id: 'basic-programming',
    name: 'Basic Programming Course',
    description: 'A foundational programming course with videos and practice problems',
    category: 'Programming Languages',
    template: {
      title: 'Introduction to Programming',
      description: 'Learn the fundamentals of programming with hands-on exercises and clear explanations.',
      category: 'Programming Languages',
      status: 'draft',
      modules: [
        {
          id: '',
          title: 'Getting Started',
          description: 'Introduction to programming concepts and setup',
          order: 1,
          sections: [
            {
              id: '',
              title: 'Welcome to Programming',
              type: 'video',
              description: 'An introduction to what programming is and what you will learn',
              duration: '10 min',
              order: 1
            },
            {
              id: '',
              title: 'Setting Up Your Environment',
              type: 'video',
              description: 'How to set up your development environment',
              duration: '15 min',
              order: 2
            },
            {
              id: '',
              title: 'Your First Program',
              type: 'problem',
              description: 'Write your first simple program',
              order: 3
            }
          ]
        },
        {
          id: '',
          title: 'Programming Fundamentals',
          description: 'Core programming concepts and syntax',
          order: 2,
          sections: [
            {
              id: '',
              title: 'Variables and Data Types',
              type: 'video',
              description: 'Understanding variables and different data types',
              duration: '20 min',
              order: 1
            },
            {
              id: '',
              title: 'Practice: Working with Variables',
              type: 'problem',
              description: 'Practice creating and using variables',
              order: 2
            },
            {
              id: '',
              title: 'Control Structures',
              type: 'video',
              description: 'If statements, loops, and conditional logic',
              duration: '25 min',
              order: 3
            },
            {
              id: '',
              title: 'Practice: Control Flow',
              type: 'problem',
              description: 'Practice with if statements and loops',
              order: 4
            }
          ]
        }
      ]
    }
  },
  {
    id: 'database-fundamentals',
    name: 'Database Fundamentals',
    description: 'Learn SQL and database design with practical exercises',
    category: 'Databases',
    template: {
      title: 'Database Fundamentals with SQL',
      description: 'Master database concepts and SQL through hands-on practice with real-world scenarios.',
      category: 'Databases',
      status: 'draft',
      modules: [
        {
          id: '',
          title: 'Database Basics',
          description: 'Introduction to databases and relational concepts',
          order: 1,
          sections: [
            {
              id: '',
              title: 'What are Databases?',
              type: 'video',
              description: 'Understanding databases and their importance',
              duration: '12 min',
              order: 1
            },
            {
              id: '',
              title: 'Relational Database Concepts',
              type: 'video',
              description: 'Tables, relationships, and normalization',
              duration: '18 min',
              order: 2
            }
          ]
        },
        {
          id: '',
          title: 'SQL Fundamentals',
          description: 'Basic SQL queries and operations',
          order: 2,
          sections: [
            {
              id: '',
              title: 'SELECT Statements',
              type: 'video',
              description: 'Learning to query data with SELECT',
              duration: '15 min',
              order: 1
            },
            {
              id: '',
              title: 'Practice: Basic Queries',
              type: 'problem',
              description: 'Practice writing SELECT statements',
              order: 2
            },
            {
              id: '',
              title: 'Filtering and Sorting',
              type: 'video',
              description: 'WHERE clauses and ORDER BY',
              duration: '20 min',
              order: 3
            },
            {
              id: '',
              title: 'Practice: Filtering Data',
              type: 'problem',
              description: 'Practice filtering and sorting query results',
              order: 4
            }
          ]
        },
        {
          id: '',
          title: 'Advanced SQL',
          description: 'Joins, aggregations, and advanced queries',
          order: 3,
          sections: [
            {
              id: '',
              title: 'Table Joins',
              type: 'video',
              description: 'INNER, LEFT, RIGHT, and OUTER joins',
              duration: '25 min',
              order: 1
            },
            {
              id: '',
              title: 'Practice: Joining Tables',
              type: 'problem',
              description: 'Practice writing join queries',
              order: 2
            },
            {
              id: '',
              title: 'Aggregate Functions',
              type: 'video',
              description: 'COUNT, SUM, AVG, and GROUP BY',
              duration: '20 min',
              order: 3
            },
            {
              id: '',
              title: 'Challenge: Complex Analytics',
              type: 'problem',
              description: 'Advanced SQL challenge with multiple concepts',
              order: 4
            }
          ]
        }
      ]
    }
  },
  {
    id: 'algorithms-data-structures',
    name: 'Algorithms & Data Structures',
    description: 'Comprehensive course on algorithms and data structures',
    category: 'Algorithms',
    template: {
      title: 'Algorithms and Data Structures Mastery',
      description: 'Master essential algorithms and data structures through theory and practice.',
      category: 'Algorithms',
      status: 'draft',
      modules: [
        {
          id: '',
          title: 'Introduction to Algorithms',
          description: 'Understanding algorithms and complexity analysis',
          order: 1,
          sections: [
            {
              id: '',
              title: 'What are Algorithms?',
              type: 'video',
              description: 'Introduction to algorithmic thinking',
              duration: '15 min',
              order: 1
            },
            {
              id: '',
              title: 'Big O Notation',
              type: 'video',
              description: 'Understanding time and space complexity',
              duration: '20 min',
              order: 2
            },
            {
              id: '',
              title: 'Practice: Complexity Analysis',
              type: 'problem',
              description: 'Analyze the complexity of given algorithms',
              order: 3
            }
          ]
        },
        {
          id: '',
          title: 'Basic Data Structures',
          description: 'Arrays, linked lists, stacks, and queues',
          order: 2,
          sections: [
            {
              id: '',
              title: 'Arrays and Lists',
              type: 'video',
              description: 'Understanding arrays and dynamic arrays',
              duration: '18 min',
              order: 1
            },
            {
              id: '',
              title: 'Practice: Array Problems',
              type: 'problem',
              description: 'Solve common array manipulation problems',
              order: 2
            },
            {
              id: '',
              title: 'Stacks and Queues',
              type: 'video',
              description: 'LIFO and FIFO data structures',
              duration: '22 min',
              order: 3
            },
            {
              id: '',
              title: 'Practice: Stack and Queue Problems',
              type: 'problem',
              description: 'Implement and use stacks and queues',
              order: 4
            }
          ]
        },
        {
          id: '',
          title: 'Sorting and Searching',
          description: 'Essential sorting and searching algorithms',
          order: 3,
          sections: [
            {
              id: '',
              title: 'Sorting Algorithms',
              type: 'video',
              description: 'Bubble sort, merge sort, quick sort',
              duration: '30 min',
              order: 1
            },
            {
              id: '',
              title: 'Practice: Implement Sorting',
              type: 'problem',
              description: 'Implement various sorting algorithms',
              order: 2
            },
            {
              id: '',
              title: 'Binary Search',
              type: 'video',
              description: 'Efficient searching in sorted arrays',
              duration: '15 min',
              order: 3
            },
            {
              id: '',
              title: 'Challenge: Search Problems',
              type: 'problem',
              description: 'Advanced searching and sorting challenges',
              order: 4
            }
          ]
        }
      ]
    }
  },
  {
    id: 'web-development',
    name: 'Full-Stack Web Development',
    description: 'Complete web development course from frontend to backend',
    category: 'Web Development',
    template: {
      title: 'Full-Stack Web Development Bootcamp',
      description: 'Learn to build complete web applications from scratch using modern technologies.',
      category: 'Web Development',
      status: 'draft',
      modules: [
        {
          id: '',
          title: 'Frontend Fundamentals',
          description: 'HTML, CSS, and JavaScript basics',
          order: 1,
          sections: [
            {
              id: '',
              title: 'HTML Structure',
              type: 'video',
              description: 'Building semantic HTML documents',
              duration: '20 min',
              order: 1
            },
            {
              id: '',
              title: 'Practice: HTML Page',
              type: 'problem',
              description: 'Create a structured HTML page',
              order: 2
            },
            {
              id: '',
              title: 'CSS Styling',
              type: 'video',
              description: 'Styling with CSS and responsive design',
              duration: '25 min',
              order: 3
            },
            {
              id: '',
              title: 'Practice: Responsive Layout',
              type: 'problem',
              description: 'Build a responsive webpage layout',
              order: 4
            }
          ]
        },
        {
          id: '',
          title: 'JavaScript Programming',
          description: 'Modern JavaScript and DOM manipulation',
          order: 2,
          sections: [
            {
              id: '',
              title: 'JavaScript Basics',
              type: 'video',
              description: 'Variables, functions, and control flow',
              duration: '30 min',
              order: 1
            },
            {
              id: '',
              title: 'Practice: JavaScript Functions',
              type: 'problem',
              description: 'Write JavaScript functions and logic',
              order: 2
            },
            {
              id: '',
              title: 'DOM Manipulation',
              type: 'video',
              description: 'Interacting with webpage elements',
              duration: '25 min',
              order: 3
            },
            {
              id: '',
              title: 'Practice: Interactive Webpage',
              type: 'problem',
              description: 'Create an interactive webpage with JavaScript',
              order: 4
            }
          ]
        },
        {
          id: '',
          title: 'Backend Development',
          description: 'Server-side programming and databases',
          order: 3,
          sections: [
            {
              id: '',
              title: 'Server Basics',
              type: 'video',
              description: 'Understanding servers and APIs',
              duration: '20 min',
              order: 1
            },
            {
              id: '',
              title: 'Database Integration',
              type: 'video',
              description: 'Connecting to databases',
              duration: '25 min',
              order: 2
            },
            {
              id: '',
              title: 'Final Project',
              type: 'problem',
              description: 'Build a complete full-stack application',
              order: 3
            }
          ]
        }
      ]
    }
  }
];

export function useCourseTemplates() {
  const createCourseFromTemplate = (templateId: string): Course => {
    const template = COURSE_TEMPLATES.find(t => t.id === templateId);
    if (!template) {
      throw new Error('Template not found');
    }

    // Generate IDs for the course and all nested entities
    const newCourse: Course = {
      ...template.template,
      id: CourseManager.generateId(),
      title: template.template.title || '',
      description: template.template.description || '',
      category: template.template.category || '',
      thumbnail: template.thumbnail || '',
      status: 'draft' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      modules: template.template.modules?.map((module, moduleIndex) => ({
        ...module,
        id: CourseManager.generateId(),
        order: moduleIndex + 1,
        sections: module.sections?.map((section, sectionIndex) => ({
          ...section,
          id: CourseManager.generateId(),
          order: sectionIndex + 1,
          type: section.type as 'video' | 'problem'
        })) || []
      })) || []
    };

    return newCourse;
  };

  const getTemplatesByCategory = (category?: string) => {
    if (!category) return COURSE_TEMPLATES;
    return COURSE_TEMPLATES.filter(template => 
      template.category.toLowerCase().includes(category.toLowerCase())
    );
  };

  const getTemplate = (templateId: string) => {
    return COURSE_TEMPLATES.find(t => t.id === templateId);
  };

  return {
    templates: COURSE_TEMPLATES,
    createCourseFromTemplate,
    getTemplatesByCategory,
    getTemplate
  };
}
