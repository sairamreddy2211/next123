"use client";

import CourseModuleSection from './CourseModuleSection';

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

interface CourseModuleProps {
  module: Module;
  moduleIndex: number;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onSectionClick: (moduleId: string, sectionId: string) => void;
}

export default function CourseModule({ 
  module, 
  moduleIndex, 
  isExpanded, 
  onToggleExpanded,
  onSectionClick 
}: CourseModuleProps) {
  return (
    <div className="border-b border-gray-800 last:border-b-0">
      {/* Module Header */}
      <button
        onClick={onToggleExpanded}
        className="w-full p-6 text-left hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-500/20 border border-orange-500/30 rounded-lg">
              <span className="text-orange-500 font-bold text-sm">{moduleIndex + 1}</span>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">{module.title}</h3>
              <p className="text-gray-400 text-sm">{module.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {module.status === 'free' && (
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30">
                FREE
              </span>
            )}
            <div className="text-right">
              <div className="text-sm text-orange-500 font-medium">{module.progress}%</div>
              <div className="w-16 h-1 bg-gray-700 rounded-full mt-1">
                <div 
                  className="h-full bg-orange-500 rounded-full transition-all duration-300"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Module Sections */}
      {isExpanded && (
        <div className="bg-gray-800/30">
          {module.sections.map((section) => (
            <CourseModuleSection
              key={section.id}
              section={section}
              moduleId={module.id}
              onSectionClick={onSectionClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
