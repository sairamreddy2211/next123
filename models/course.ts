// Course and Learning Models
export interface CourseModule {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'free' | 'premium';
  sections: CourseSection[];
}

export interface CourseSection {
  id: string;
  title: string;
  type: 'video' | 'practice' | 'reading';
  duration?: string;
  xp: number;
  completed: boolean;
  locked?: boolean;
}

export interface LearningSession {
  id: string;
  courseId: string;
  currentMode: LearningModeType;
  progress: number;
  completedSteps: number[];
  startedAt: Date;
  lastAccessedAt: Date;
}

export type LearningModeType = 'interactive' | 'video' | 'document';

export interface LearningViewProps {
  courseId: string;
  viewType: LearningModeType;
  currentStep?: number;
  onViewChange?: (viewType: LearningModeType) => void;
}
