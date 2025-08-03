// Mock API calls for course management
import { Course } from '@/lib/courseManager';

// Generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// In-memory storage (in a real app, this would be a database)
let courses: Course[] = [
  {
    id: 'course-1',
    title: 'Advanced Data Structures',
    description: 'Master complex data structures and algorithms',
    category: 'Programming',
    thumbnail: '',
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1,
    modules: [
      {
        id: 'module-1',
        title: 'Trees and Graphs',
        description: 'Learn about tree and graph data structures',
        order: 1,
        sections: [
          {
            id: 'section-1',
            title: 'Binary Trees',
            type: 'problem',
            description: 'Learn binary tree concepts through coding problems',
            order: 1,
            sectionId: 'binary-trees-001'
          },
          {
            id: 'section-2', 
            title: 'Graph Traversal',
            type: 'video',
            description: 'Video explanation of graph traversal algorithms',
            order: 2,
            sectionId: 'graph-traversal-001'
          }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    title: 'System Design Fundamentals',
    description: 'Learn to design scalable systems',
    category: 'System Design',
    thumbnail: '',
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1,
    modules: [
      {
        id: 'module-1',
        title: 'Load Balancing',
        description: 'Understanding load balancing concepts',
        order: 1,
        sections: [
          {
            id: 'section-1',
            title: 'Introduction to Load Balancers',
            type: 'video',
            description: 'Basic concepts of load balancing',
            order: 1,
            sectionId: 'load-balancers-intro'
          }
        ]
      }
    ]
  }
];

export const mockApiCalls = {
  // Get all courses (both draft and published)
  getAllCourses: async (): Promise<Course[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('API: Getting all courses', courses);
        resolve([...courses]);
      }, 300);
    });
  },

  // Get courses by status
  getCoursesByStatus: async (status: 'published' | 'draft'): Promise<Course[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredCourses = courses.filter(course => course.status === status);
        console.log(`API: Getting ${status} courses`, filteredCourses);
        resolve(filteredCourses);
      }, 300);
    });
  },

  // Create a new course
  createCourse: async (title: string, description?: string): Promise<Course> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCourse: Course = {
          id: generateId(),
          title,
          description: description || '',
          category: '',
          thumbnail: '',
          status: 'draft',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: 1,
          modules: []
        };
        
        courses.push(newCourse);
        console.log('API: Created new course', newCourse);
        resolve(newCourse);
      }, 500);
    });
  },

  // Get a specific course by ID
  getCourse: async (courseId: string): Promise<Course | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const course = courses.find(c => c.id === courseId);
        console.log('API: Getting course', courseId, course);
        resolve(course || null);
      }, 300);
    });
  },

  // Update course
  updateCourse: async (courseId: string, updates: Partial<Course>): Promise<Course | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const courseIndex = courses.findIndex(c => c.id === courseId);
        if (courseIndex === -1) {
          resolve(null);
          return;
        }

        courses[courseIndex] = { ...courses[courseIndex], ...updates };
        console.log('API: Updated course', courseId, courses[courseIndex]);
        resolve(courses[courseIndex]);
      }, 400);
    });
  },

  // Delete course
  deleteCourse: async (courseId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const courseIndex = courses.findIndex(c => c.id === courseId);
        if (courseIndex === -1) {
          resolve(false);
          return;
        }

        courses.splice(courseIndex, 1);
        console.log('API: Deleted course', courseId);
        resolve(true);
      }, 300);
    });
  },

  // Save section (existing function)
  saveSection: async (sectionData: any, type: 'problem' | 'video'): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sectionId = `${type}-${generateId()}`;
        console.log(`API: Saved ${type} section`, sectionId, sectionData);
        resolve(sectionId);
      }, 1000);
    });
  },

  // Save course
  saveCourse: async (courseData: Course): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const courseIndex = courses.findIndex(c => c.id === courseData.id);
        if (courseIndex >= 0) {
          // Update existing course
          courses[courseIndex] = { ...courseData, updatedAt: new Date().toISOString() };
        } else {
          // Add new course
          courses.push({ ...courseData, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        }
        
        console.log('API: Saved course', courseData.id, courseData);
        resolve(courseData.id);
      }, 800);
    });
  }
};
