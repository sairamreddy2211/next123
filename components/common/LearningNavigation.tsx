"use client";

import { ArrowLeft, ArrowRight, List } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

interface LearningNavigationProps {
  onShowCourseOutline: () => void;
}

export default function LearningNavigation({ onShowCourseOutline }: LearningNavigationProps) {
  const { themeColors } = useTheme();

  return (
    <div className="flex items-center space-x-3">
      <button 
        className="p-2 border rounded-lg transition-colors" 
        style={{ 
          backgroundColor: themeColors.primary,
          borderColor: themeColors.border,
          color: themeColors.textPrimary
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = themeColors.secondary}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = themeColors.primary}
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      
      <button 
        onClick={onShowCourseOutline}
        className="flex items-center space-x-2 px-4 py-2 border rounded-lg bg-black hover:bg-gray-900 transition-colors"
        style={{ borderColor: '#222222' }}
      >
        <List className="w-4 h-4 text-orange-500" />
        <span className="text-white text-sm font-medium">Course Outline</span>
      </button>
      
      <button className="p-2 border rounded-lg bg-black hover:bg-gray-900 transition-colors" style={{ borderColor: '#222222' }}>
        <ArrowRight className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  );
}
