// Re-export all models from a single entry point
export * from './video';
export * from './course';
export * from './problem';
export * from './navigation';

// Common types used across the application
export interface BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LearningContent {
  videos: import('./video').VideoContent[];
  interactiveLessons: import('./problem').InteractiveLesson[];
}

// Theme related types
export type ThemeMode = 'dark' | 'light';

// Common component props
export interface BaseComponentProps {
  className?: string;
  theme?: ThemeMode;
  children?: React.ReactNode;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
