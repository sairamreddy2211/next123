"use client";

import { useState } from 'react';
import { X, Play, CheckCircle, Lock, Book, Code, Video } from 'lucide-react';

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
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['1']));

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
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
            <div key={module.id} className="border-b border-gray-800 last:border-b-0">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
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
              {expandedModules.has(module.id) && (
                <div className="bg-gray-800/30">
                  {module.sections.map((section, sectionIndex) => (
                    <button
                      key={section.id}
                      onClick={() => !section.locked && onSectionClick(module.id, section.id)}
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
                  ))}
                </div>
              )}
            </div>
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
