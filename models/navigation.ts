// Navigation and UI Models
export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface NavigationHeaderProps {
  breadcrumbs?: Breadcrumb[];
  showLearningNavigation?: boolean;
  dailyXP?: number;
  isLightMode?: boolean;
  onToggleLightMode?: () => void;
  courseTitle?: string;
  theme?: 'dark' | 'light';
}

export interface LearningLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  showLearningNavigation?: boolean;
  dailyXP?: number;
  isLightMode?: boolean;
  onToggleLightMode?: () => void;
  theme?: 'dark' | 'light';
}

export interface CourseOutlinePopupProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  modules: import('./course').CourseModule[];
  onSectionClick: (moduleId: string, sectionId: string) => void;
  theme?: 'dark' | 'light';
}
