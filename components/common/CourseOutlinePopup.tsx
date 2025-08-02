"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import CourseModule from './CourseModule';

interface Section {
  id: string;
  title: string;
  type: 'video' | 'practice' | 'reading';
  duration?: string;
  xp: number;
  completed: boolean;
  locked?: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  sections: Section[];
  status: 'free' | 'premium';
}

interface CourseOutlinePopupProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  modules: Module[];
  onSectionClick: (moduleId: string, sectionId: string) => void;
}

export default function CourseOutlinePopup({
  isOpen,
  onClose,
  courseTitle,
  modules,
  onSectionClick
}: CourseOutlinePopupProps) {
  const { themeColors } = useTheme();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);  
  
  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-900 border border-orange-500/30 rounded-xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">{courseTitle}</h2>
            <p className="text-gray-400 text-sm">Course Outline</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {modules.map((module, moduleIndex) => (
            <CourseModule
              key={module.id}
              module={module}
              moduleIndex={moduleIndex}
              isExpanded={expandedModules.includes(module.id)}
              onToggleExpanded={() => toggleModule(module.id)}
              onSectionClick={onSectionClick}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-gray-800/50">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
            >
              Reset progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
