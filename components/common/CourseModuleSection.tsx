"use client";

import { CheckCircle, Lock, Book, Code, Video, Play } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  type: 'video' | 'practice' | 'reading';
  duration?: string;
  xp: number;
  completed: boolean;
  locked?: boolean;
}

interface CourseModuleSectionProps {
  section: Section;
  moduleId: string;
  onSectionClick: (moduleId: string, sectionId: string) => void;
}

export default function CourseModuleSection({ 
  section, 
  moduleId, 
  onSectionClick 
}: CourseModuleSectionProps) {
  const getSectionIcon = (type: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="w-4 h-4 text-orange-500" />;
    }
    
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-gray-400" />;
      case 'practice':
        return <Code className="w-4 h-4 text-gray-400" />;
      case 'reading':
        return <Book className="w-4 h-4 text-gray-400" />;
      default:
        return <Play className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <button
      key={section.id}
      onClick={() => !section.locked && onSectionClick(moduleId, section.id)}
      disabled={section.locked}
      className={`w-full p-4 pl-16 text-left hover:bg-gray-700/50 transition-colors border-l-2 ${
        section.completed 
          ? 'border-orange-500 bg-orange-500/5' 
          : section.locked 
            ? 'border-gray-600 opacity-50 cursor-not-allowed'
            : 'border-gray-600 hover:border-gray-500'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {section.locked ? (
            <Lock className="w-4 h-4 text-gray-500" />
          ) : (
            getSectionIcon(section.type, section.completed)
          )}
          <div>
            <h4 className={`font-medium ${
              section.completed 
                ? 'text-white' 
                : section.locked 
                  ? 'text-gray-500'
                  : 'text-gray-200'
            }`}>
              {section.title}
            </h4>
            {section.duration && (
              <p className="text-gray-500 text-xs mt-1">{section.duration}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {section.completed && (
            <span className="text-orange-500 text-xs">✓ {section.xp} XP</span>
          )}
          {!section.completed && !section.locked && (
            <span className="text-gray-400 text-xs">{section.xp} XP</span>
          )}
        </div>
      </div>
    </button>
  );
}
