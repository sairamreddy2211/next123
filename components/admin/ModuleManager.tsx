"use client";

import { useTheme } from '@/components/providers/ThemeProvider';
import { useState } from 'react';

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
  content?: any;
  order: number;
}

interface ModuleManagerProps {
  modules: Module[];
  selectedModuleId: string | null;
  onSelectModule: (id: string) => void;
  onAddModule: () => void;
  onUpdateModule: (id: string, field: keyof Module, value: any) => void;
  onDeleteModule: (id: string) => void;
  onDragStart: (moduleId: string) => void;
  onDragOver: (e: React.DragEvent, moduleId: string) => void;
  onDrop: (e: React.DragEvent, moduleId: string) => void;
  onCreateFromTemplate: (templateType: string) => void;
}

const MODULE_TEMPLATES = [
  {
    id: 'intro',
    name: 'Introduction Module',
    description: 'Basic course introduction with welcome video and overview',
    template: {
      title: 'Introduction',
      description: 'Welcome to the course! This module covers the basics.',
      sections: [
        {
          title: 'Welcome Video',
          type: 'video' as const,
          description: 'Course introduction and overview',
          duration: '5 min'
        },
        {
          title: 'Course Overview',
          type: 'video' as const,
          description: 'What you will learn in this course',
          duration: '10 min'
        }
      ]
    }
  },
  {
    id: 'practice',
    name: 'Practice Module',
    description: 'Coding practice with problems and solutions',
    template: {
      title: 'Practice Session',
      description: 'Hands-on coding practice with guided problems.',
      sections: [
        {
          title: 'Concept Review',
          type: 'video' as const,
          description: 'Review of key concepts',
          duration: '15 min'
        },
        {
          title: 'Practice Problem 1',
          type: 'problem' as const,
          description: 'Beginner level practice problem'
        },
        {
          title: 'Practice Problem 2',
          type: 'problem' as const,
          description: 'Intermediate level practice problem'
        }
      ]
    }
  },
  {
    id: 'assessment',
    name: 'Assessment Module',
    description: 'Assessment module with challenging problems',
    template: {
      title: 'Assessment',
      description: 'Test your knowledge with these challenges.',
      sections: [
        {
          title: 'Assessment Instructions',
          type: 'video' as const,
          description: 'How to approach the assessment',
          duration: '5 min'
        },
        {
          title: 'Challenge Problem',
          type: 'problem' as const,
          description: 'Advanced challenge problem'
        }
      ]
    }
  }
];

export default function ModuleManager({
  modules,
  selectedModuleId,
  onSelectModule,
  onAddModule,
  onUpdateModule,
  onDeleteModule,
  onDragStart,
  onDragOver,
  onDrop,
  onCreateFromTemplate
}: ModuleManagerProps) {
  const { themeColors } = useTheme();
  const [showTemplates, setShowTemplates] = useState(false);
  const [draggedModuleId, setDraggedModuleId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, moduleId: string) => {
    setDraggedModuleId(moduleId);
    onDragStart(moduleId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, moduleId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOver(e, moduleId);
  };

  const handleDrop = (e: React.DragEvent, moduleId: string) => {
    e.preventDefault();
    setDraggedModuleId(null);
    onDrop(e, moduleId);
  };

  return (
    <div 
      className="p-4 rounded-lg border mb-6"
      style={{
        backgroundColor: themeColors.tertiary,
        borderColor: themeColors.border
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 
          className="text-lg font-semibold"
          style={{ color: themeColors.textPrimary }}
        >
          Modules ({modules.length})
        </h2>
        
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 text-sm rounded transition-colors"
            style={{
              backgroundColor: themeColors.accent,
              color: themeColors.textPrimary
            }}
            onClick={() => setShowTemplates(!showTemplates)}
          >
            📋 Templates
          </button>
          
          <button
            className="px-3 py-1 text-sm rounded transition-colors"
            style={{
              backgroundColor: themeColors.accent,
              color: themeColors.textPrimary
            }}
            onClick={onAddModule}
          >
            + Add Module
          </button>
        </div>
      </div>

      {/* Template Selection */}
      {showTemplates && (
        <div 
          className="mb-4 p-3 rounded border"
          style={{
            backgroundColor: themeColors.primary,
            borderColor: themeColors.border
          }}
        >
          <h3 
            className="text-sm font-semibold mb-2"
            style={{ color: themeColors.textPrimary }}
          >
            Create from Template
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {MODULE_TEMPLATES.map(template => (
              <button
                key={template.id}
                className="text-left p-2 rounded border hover:bg-opacity-80 transition-colors"
                style={{
                  backgroundColor: themeColors.secondary,
                  borderColor: themeColors.border,
                  color: themeColors.textPrimary
                }}
                onClick={() => {
                  onCreateFromTemplate(template.id);
                  setShowTemplates(false);
                }}
              >
                <div className="font-medium">{template.name}</div>
                <div 
                  className="text-xs"
                  style={{ color: themeColors.textMuted }}
                >
                  {template.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modules List */}
      <div className="space-y-3">
        {modules.map((module, index) => (
          <div
            key={module.id}
            draggable
            onDragStart={(e) => handleDragStart(e, module.id)}
            onDragOver={(e) => handleDragOver(e, module.id)}
            onDrop={(e) => handleDrop(e, module.id)}
            className={`p-3 rounded border cursor-pointer transition-all duration-200 ${
              selectedModuleId === module.id ? 'border-blue-500 shadow-md' : ''
            } ${
              draggedModuleId === module.id ? 'opacity-50' : ''
            } hover:shadow-sm`}
            style={{
              backgroundColor: selectedModuleId === module.id ? themeColors.accent : themeColors.primary,
              borderColor: selectedModuleId === module.id ? '#3B82F6' : themeColors.border
            }}
            onClick={() => onSelectModule(module.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3 flex-1">
                {/* Drag Handle */}
                <div 
                  className="cursor-grab active:cursor-grabbing mt-1"
                  style={{ color: themeColors.textMuted }}
                >
                  ⋮⋮
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span 
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: themeColors.secondary,
                        color: themeColors.textMuted
                      }}
                    >
                      #{index + 1}
                    </span>
                    <input
                      className="font-semibold bg-transparent border-none outline-none flex-1"
                      style={{ color: themeColors.textPrimary }}
                      value={module.title}
                      onChange={(e) => onUpdateModule(module.id, 'title', e.target.value)}
                      placeholder="Module title..."
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  
                  <div className="text-sm" style={{ color: themeColors.textSecondary }}>
                    {module.sections.length} sections
                  </div>
                  
                  {module.description && (
                    <div 
                      className="text-xs mt-1"
                      style={{ color: themeColors.textMuted }}
                    >
                      {module.description}
                    </div>
                  )}
                </div>
              </div>
              
              <button
                className="text-red-500 hover:text-red-400 ml-2 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteModule(module.id);
                }}
                title="Delete module"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        
        {modules.length === 0 && (
          <div 
            className="text-center py-8"
            style={{ color: themeColors.textMuted }}
          >
            <p>No modules yet. Create your first module!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export { MODULE_TEMPLATES };
