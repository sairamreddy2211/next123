import { MOCK_SECTION_RESPONSES, MOCK_SAVED_COURSES } from '@/constants';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  modules: Module[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  version: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  order: number;
}

interface Section {
  id: string;
  title: string;
  type: 'video' | 'problem';
  description: string;
  duration?: string;
  order: number;
  sectionId?: string; // Reference to actual section content
}

// Mock API functions
export const mockApiCalls = {
  saveSection: async (sectionType: 'problem' | 'video', sectionData: any): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate mock section ID
    const sectionId = `${sectionType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate saving to backend and getting ID
    console.log(`[Mock API] Saving ${sectionType} section:`, sectionData);
    console.log(`[Mock API] Generated section ID: ${sectionId}`);
    
    return sectionId;
  },

  loadSection: async (sectionId: string): Promise<any> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return mock data based on sectionId
    const sectionData = (MOCK_SECTION_RESPONSES as any)[sectionId];
    if (!sectionData) {
      throw new Error(`Section not found: ${sectionId}`);
    }
    
    console.log(`[Mock API] Loading section ${sectionId}:`, sectionData);
    return sectionData;
  },

  saveCourse: async (courseData: Course): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    console.log(`[Mock API] Saving course:`, courseData);
    
    // Return course ID
    return courseData.id;
  },

  getCourse: async (courseId: string): Promise<Course | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // This would typically come from the mockApiCalls, but we'll import it here
    // In a real implementation, both would use the same database/API
    console.log(`[Mock API] Loading course ${courseId}`);
    
    // For now, return null - this will be handled by the actual mockApiCalls
    return null;
  }
};

interface CourseVersion {
  id: string;
  courseId: string;
  version: number;
  data: Course;
  timestamp: string;
  description: string;
}

interface ValidationError {
  field: string;
  message: string;
}

export class CourseManager {
  private static readonly STORAGE_KEY = 'courseEditor';
  private static readonly VERSIONS_KEY = 'courseVersions';
  private static readonly AUTO_SAVE_KEY = 'courseAutoSave';
  private static readonly AUTO_SAVE_INTERVAL = 30000; // 30 seconds

  // Save/Load functionality
  static saveCourse(course: Course): void {
    try {
      const courseWithTimestamp = {
        ...course,
        updatedAt: new Date().toISOString(),
        version: (course.version || 0) + 1
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(courseWithTimestamp));
      this.saveVersion(courseWithTimestamp, 'Manual save');
      
      console.log('Course saved successfully');
    } catch (error) {
      console.error('Failed to save course:', error);
      throw new Error('Failed to save course');
    }
  }

  static loadCourse(): Course | null {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (!saved) {
        // Return mock course for demo purposes
        const mockCourse = Object.values(MOCK_SAVED_COURSES)[0];
        return mockCourse as Course;
      }
      
      const course = JSON.parse(saved);
      return course;
    } catch (error) {
      console.error('Failed to load course:', error);
      return null;
    }
  }

  // Auto-save functionality
  static autoSaveCourse(course: Course): void {
    try {
      const courseWithTimestamp = {
        ...course,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(this.AUTO_SAVE_KEY, JSON.stringify(courseWithTimestamp));
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }

  static loadAutoSave(): Course | null {
    try {
      const saved = localStorage.getItem(this.AUTO_SAVE_KEY);
      if (!saved) return null;
      
      return JSON.parse(saved);
    } catch (error) {
      console.error('Failed to load auto-save:', error);
      return null;
    }
  }

  static clearAutoSave(): void {
    localStorage.removeItem(this.AUTO_SAVE_KEY);
  }

  // Version history
  static saveVersion(course: Course, description: string): void {
    try {
      const versions = this.getVersionHistory(course.id);
      const newVersion: CourseVersion = {
        id: this.generateId(),
        courseId: course.id,
        version: course.version || 1,
        data: { ...course },
        timestamp: new Date().toISOString(),
        description
      };

      versions.push(newVersion);
      
      // Keep only last 10 versions
      const limitedVersions = versions.slice(-10);
      
      const allVersions = this.getAllVersions();
      allVersions[course.id] = limitedVersions;
      
      localStorage.setItem(this.VERSIONS_KEY, JSON.stringify(allVersions));
    } catch (error) {
      console.error('Failed to save version:', error);
    }
  }

  static getVersionHistory(courseId: string): CourseVersion[] {
    try {
      const allVersions = this.getAllVersions();
      return allVersions[courseId] || [];
    } catch (error) {
      console.error('Failed to get version history:', error);
      return [];
    }
  }

  static restoreVersion(versionId: string): Course | null {
    try {
      const allVersions = this.getAllVersions();
      
      for (const courseId in allVersions) {
        const version = allVersions[courseId].find(v => v.id === versionId);
        if (version) {
          return { ...version.data };
        }
      }
      
      return null;
    } catch (error) {
      console.error('Failed to restore version:', error);
      return null;
    }
  }

  private static getAllVersions(): Record<string, CourseVersion[]> {
    try {
      const saved = localStorage.getItem(this.VERSIONS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Failed to get all versions:', error);
      return {};
    }
  }

  // Import/Export functionality
  static exportCourse(course: Course): void {
    try {
      const exportData = {
        ...course,
        exportedAt: new Date().toISOString(),
        exportVersion: '1.0'
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = `course-${course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Failed to export course:', error);
      throw new Error('Failed to export course');
    }
  }

  static importCourse(file: File): Promise<Course> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedCourse = JSON.parse(content);
          
          // Validate imported course structure
          const validationErrors = this.validateCourse(importedCourse);
          if (validationErrors.length > 0) {
            reject(new Error(`Invalid course format: ${validationErrors.map(e => e.message).join(', ')}`));
            return;
          }
          
          // Generate new IDs to avoid conflicts
          const processedCourse = this.regenerateIds(importedCourse);
          
          resolve(processedCourse);
        } catch (error) {
          reject(new Error('Failed to parse course file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  }

  // Validation
  static validateCourse(course: any): ValidationError[] {
    const errors: ValidationError[] = [];
    
    if (!course) {
      errors.push({ field: 'course', message: 'Course data is required' });
      return errors;
    }
    
    if (!course.title || course.title.trim() === '') {
      errors.push({ field: 'title', message: 'Course title is required' });
    }
    
    if (!course.description || course.description.trim() === '') {
      errors.push({ field: 'description', message: 'Course description is required' });
    }
    
    if (!course.category || course.category.trim() === '') {
      errors.push({ field: 'category', message: 'Course category is required' });
    }
    
    if (!Array.isArray(course.modules)) {
      errors.push({ field: 'modules', message: 'Modules must be an array' });
    } else {
      course.modules.forEach((module: any, index: number) => {
        if (!module.title || module.title.trim() === '') {
          errors.push({ field: `modules[${index}].title`, message: `Module ${index + 1} title is required` });
        }
        
        if (!Array.isArray(module.sections)) {
          errors.push({ field: `modules[${index}].sections`, message: `Module ${index + 1} sections must be an array` });
        } else {
          module.sections.forEach((section: any, sectionIndex: number) => {
            if (!section.title || section.title.trim() === '') {
              errors.push({ 
                field: `modules[${index}].sections[${sectionIndex}].title`, 
                message: `Module ${index + 1}, Section ${sectionIndex + 1} title is required` 
              });
            }
            
            if (!['video', 'problem'].includes(section.type)) {
              errors.push({ 
                field: `modules[${index}].sections[${sectionIndex}].type`, 
                message: `Module ${index + 1}, Section ${sectionIndex + 1} type must be 'video' or 'problem'` 
              });
            }
          });
        }
      });
    }
    
    return errors;
  }

  // Course templates
  static getTemplate(templateType: string): Partial<Course> {
    const templates: Record<string, Partial<Course>> = {
      basic: {
        title: 'New Course',
        description: 'A comprehensive course covering essential topics.',
        category: 'Programming Languages',
        status: 'draft',
        modules: [
          {
            id: this.generateId(),
            title: 'Introduction',
            description: 'Course introduction and overview',
            order: 1,
            sections: [
              {
                id: this.generateId(),
                title: 'Welcome',
                type: 'video',
                description: 'Welcome to the course',
                duration: '5 min',
                order: 1
              }
            ]
          }
        ]
      },
      comprehensive: {
        title: 'Comprehensive Course',
        description: 'A full-featured course with multiple modules and practice sessions.',
        category: 'Databases',
        status: 'draft',
        modules: [
          {
            id: this.generateId(),
            title: 'Introduction',
            description: 'Course introduction and setup',
            order: 1,
            sections: [
              {
                id: this.generateId(),
                title: 'Course Overview',
                type: 'video',
                description: 'What you will learn',
                duration: '10 min',
                order: 1
              },
              {
                id: this.generateId(),
                title: 'Setup and Prerequisites',
                type: 'video',
                description: 'Setting up your environment',
                duration: '15 min',
                order: 2
              }
            ]
          },
          {
            id: this.generateId(),
            title: 'Core Concepts',
            description: 'Fundamental concepts and theory',
            order: 2,
            sections: [
              {
                id: this.generateId(),
                title: 'Theoretical Foundation',
                type: 'video',
                description: 'Understanding the basics',
                duration: '20 min',
                order: 1
              },
              {
                id: this.generateId(),
                title: 'Practice Exercise 1',
                type: 'problem',
                description: 'Apply what you learned',
                order: 2
              }
            ]
          },
          {
            id: this.generateId(),
            title: 'Advanced Topics',
            description: 'Advanced concepts and real-world applications',
            order: 3,
            sections: [
              {
                id: this.generateId(),
                title: 'Advanced Techniques',
                type: 'video',
                description: 'Advanced methods and best practices',
                duration: '25 min',
                order: 1
              },
              {
                id: this.generateId(),
                title: 'Challenge Problem',
                type: 'problem',
                description: 'Put your skills to the test',
                order: 2
              }
            ]
          }
        ]
      }
    };
    
    return templates[templateType] || templates.basic;
  }

  // Utility functions
  static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private static regenerateIds(course: any): Course {
    const newCourse = { ...course };
    newCourse.id = this.generateId();
    newCourse.createdAt = new Date().toISOString();
    newCourse.updatedAt = new Date().toISOString();
    newCourse.version = 1;
    
    if (newCourse.modules) {
      newCourse.modules = newCourse.modules.map((module: any) => ({
        ...module,
        id: this.generateId(),
        sections: module.sections ? module.sections.map((section: any) => ({
          ...section,
          id: this.generateId()
        })) : []
      }));
    }
    
    return newCourse;
  }

  // Progress tracking
  static trackProgress(courseId: string, moduleId: string, sectionId: string, completed: boolean): void {
    try {
      const progressKey = `progress_${courseId}`;
      const saved = localStorage.getItem(progressKey);
      const progress = saved ? JSON.parse(saved) : {};
      
      if (!progress[moduleId]) {
        progress[moduleId] = {};
      }
      
      progress[moduleId][sectionId] = {
        completed,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem(progressKey, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to track progress:', error);
    }
  }

  static getProgress(courseId: string): any {
    try {
      const progressKey = `progress_${courseId}`;
      const saved = localStorage.getItem(progressKey);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Failed to get progress:', error);
      return {};
    }
  }

  static calculateCourseProgress(course: Course): number {
    const progress = this.getProgress(course.id);
    let totalSections = 0;
    let completedSections = 0;
    
    course.modules.forEach(module => {
      module.sections.forEach(section => {
        totalSections++;
        if (progress[module.id]?.[section.id]?.completed) {
          completedSections++;
        }
      });
    });
    
    return totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;
  }
}

export type { Course, Module, Section, CourseVersion, ValidationError };
