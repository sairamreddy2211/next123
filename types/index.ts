// Core types for the application

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail?: string;
}

export interface Video {
  id: string;
  title: string;
  type: 'youtube' | 'custom';
  url: string;
  duration: string;
  presenter: string;
  presenterTitle: string;
}

export interface Step {
  id: number;
  title: string;
  content: string;
  type: 'concept' | 'practice' | 'exercise' | 'coding';
  xp: number;
  example?: {
    title: string;
    description: string;
  };
  codingProblem?: CodingProblem;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  tags: string[];
  starterCode: {
    [language: string]: string;
  };
  testCases: {
    input: string;
    expectedOutput: string;
    hidden?: boolean;
  }[];
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  tags: string[];
}

export type LearningModeType = 'interactive' | 'video' | 'document';

export interface LearningViewProps {
  courseId: string;
  viewType: LearningModeType;
  currentStep?: number;
  onViewChange?: (viewType: LearningModeType) => void;
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

// Learning content types
export interface VideoContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  type?: 'youtube' | 'custom';
  url?: string;
  presenter?: string;
  presenterTitle?: string;
}

export interface InteractiveLesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  content: string;
  problem?: {
    description: string;
    examples: {
      input: string;
      output: string;
    }[];
    constraints: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    starterCode: string;
    testCases: {
      input: string;
      expectedOutput: string;
      hidden: boolean;
    }[];
  };
}

export interface LearningContent {
  videos: VideoContent[];
  interactiveLessons: InteractiveLesson[];
}
