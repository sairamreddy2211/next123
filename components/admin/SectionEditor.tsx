"use client";

import { useTheme } from '@/components/providers/ThemeProvider';
import { useState } from 'react';

interface Section {
  id: string;
  title: string;
  type: 'video' | 'problem';
  description: string;
  duration?: string;
  order: number;
  sectionId?: string; // Reference to actual section content
}

interface Module {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  order: number;
}

interface SectionEditorProps {
  module: Module;
  selectedSectionId: string | null;
  onSelectSection: (sectionId: string | null) => void;
  onAddSection: () => void;
  onUpdateSection: (sectionId: string, field: keyof Section, value: any) => void;
  onDeleteSection: (sectionId: string) => void;
  onOpenProblemEditor: (sectionId: string) => void;
  onOpenVideoEditor: (sectionId: string) => void;
  onDragStartSection: (sectionId: string) => void;
  onDragOverSection: (e: React.DragEvent, sectionId: string) => void;
  onDropSection: (e: React.DragEvent, sectionId: string) => void;
  onUpdateModule: (field: keyof Module, value: any) => void;
  validationErrors: Record<string, string>;
}

export default function SectionEditor({
  module,
  selectedSectionId,
  onSelectSection,
  onAddSection,
  onUpdateSection,
  onDeleteSection,
  onOpenProblemEditor,
  onOpenVideoEditor,
  onDragStartSection,
  onDragOverSection,
  onDropSection,
  onUpdateModule,
  validationErrors
}: SectionEditorProps) {
  const { themeColors } = useTheme();
  const [draggedSectionId, setDraggedSectionId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggedSectionId(sectionId);
    onDragStartSection(sectionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, sectionId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOverSection(e, sectionId);
  };

  const handleDrop = (e: React.DragEvent, sectionId: string) => {
    e.preventDefault();
    setDraggedSectionId(null);
    onDropSection(e, sectionId);
  };

  const getTypeIcon = (type: string) => {
    return type === 'video' ? '🎥' : '💻';
  };

  const getTypeBadgeColor = (type: string) => {
    return type === 'video' ? '#3B82F6' : '#10B981';
  };

  return (
    <div>
      <h2 
        className="text-xl font-bold mb-6"
        style={{ color: themeColors.textPrimary }}
      >
        Module: {module.title || 'Untitled Module'}
      </h2>

      {/* Module Details */}
      <div 
        className="p-4 rounded-lg border mb-6"
        style={{
          backgroundColor: themeColors.secondary,
          borderColor: themeColors.border
        }}
      >
        <h3 
          className="text-lg font-semibold mb-4"
          style={{ color: themeColors.textPrimary }}
        >
          Module Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold" style={{ color: themeColors.textPrimary }}>
              Module Title *
            </label>
            <input
              className={`w-full border rounded px-3 py-2 ${validationErrors.moduleTitle ? 'border-red-500' : ''}`}
              style={{
                backgroundColor: themeColors.primary,
                borderColor: validationErrors.moduleTitle ? '#EF4444' : themeColors.border,
                color: themeColors.textPrimary
              }}
              value={module.title}
              onChange={(e) => onUpdateModule('title', e.target.value)}
              placeholder="Enter module title..."
            />
            {validationErrors.moduleTitle && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.moduleTitle}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold" style={{ color: themeColors.textPrimary }}>
              Module Description
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              style={{
                backgroundColor: themeColors.primary,
                borderColor: themeColors.border,
                color: themeColors.textPrimary
              }}
              rows={3}
              value={module.description}
              onChange={(e) => onUpdateModule('description', e.target.value)}
              placeholder="Enter module description..."
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div 
        className="p-4 rounded-lg border"
        style={{
          backgroundColor: themeColors.secondary,
          borderColor: themeColors.border
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 
            className="text-lg font-semibold"
            style={{ color: themeColors.textPrimary }}
          >
            Sections ({module.sections.length})
          </h3>
          
          <button
            className="px-3 py-1 text-sm rounded transition-colors"
            style={{
              backgroundColor: themeColors.accent,
              color: themeColors.textPrimary
            }}
            onClick={onAddSection}
          >
            + Add Section
          </button>
        </div>

        <div className="space-y-3">
          {module.sections.map((section, index) => (
            <div
              key={section.id}
              draggable
              onDragStart={(e) => handleDragStart(e, section.id)}
              onDragOver={(e) => handleDragOver(e, section.id)}
              onDrop={(e) => handleDrop(e, section.id)}
              className={`p-4 rounded border cursor-pointer transition-all duration-200 ${
                selectedSectionId === section.id ? 'border-blue-500 shadow-md' : ''
              } ${
                draggedSectionId === section.id ? 'opacity-50' : ''
              } hover:shadow-sm`}
              style={{
                backgroundColor: selectedSectionId === section.id ? themeColors.accent : themeColors.primary,
                borderColor: selectedSectionId === section.id ? '#3B82F6' : themeColors.border
              }}
              onClick={() => onSelectSection(section.id)}
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
                    <div className="flex items-center space-x-2 mb-2">
                      <span 
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: themeColors.secondary,
                          color: themeColors.textMuted
                        }}
                      >
                        #{index + 1}
                      </span>
                      
                      <span 
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: getTypeBadgeColor(section.type),
                          color: 'white'
                        }}
                      >
                        {getTypeIcon(section.type)} {section.type}
                      </span>
                      
                      {section.duration && (
                        <span 
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor: themeColors.secondary,
                            color: themeColors.textMuted
                          }}
                        >
                          {section.duration}
                        </span>
                      )}
                    </div>
                    
                    <input
                      className="w-full font-semibold mb-1 bg-transparent border-none outline-none"
                      style={{ color: themeColors.textPrimary }}
                      value={section.title}
                      onChange={(e) => onUpdateSection(section.id, 'title', e.target.value)}
                      placeholder="Section title..."
                      onClick={(e) => e.stopPropagation()}
                    />
                    
                    <input
                      className="w-full text-sm bg-transparent border-none outline-none"
                      style={{ color: themeColors.textSecondary }}
                      value={section.description}
                      onChange={(e) => onUpdateSection(section.id, 'description', e.target.value)}
                      placeholder="Section description..."
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {/* Edit Button */}
                  <button
                    className="px-2 py-1 text-xs rounded transition-colors"
                    style={{
                      backgroundColor: section.type === 'video' ? '#3B82F6' : '#10B981',
                      color: 'white'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (section.type === 'video') {
                        onOpenVideoEditor(section.id);
                      } else {
                        onOpenProblemEditor(section.id);
                      }
                    }}
                    title={`Edit ${section.type}`}
                  >
                    ✏️ Edit
                  </button>
                  
                  {/* Delete Button */}
                  <button
                    className="text-red-500 hover:text-red-400 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSection(section.id);
                    }}
                    title="Delete section"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              {/* Section Details when Selected */}
              {selectedSectionId === section.id && (
                <div 
                  className="mt-4 pt-4 border-t"
                  style={{ borderColor: themeColors.border }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium" style={{ color: themeColors.textPrimary }}>
                        Section Type
                      </label>
                      <select
                        className="w-full border rounded px-2 py-1 text-sm"
                        style={{
                          backgroundColor: themeColors.secondary,
                          borderColor: themeColors.border,
                          color: themeColors.textPrimary
                        }}
                        value={section.type}
                        onChange={(e) => onUpdateSection(section.id, 'type', e.target.value)}
                      >
                        <option value="video">Video</option>
                        <option value="problem">Problem</option>
                      </select>
                    </div>
                    
                    {section.type === 'video' && (
                      <div>
                        <label className="block mb-1 text-sm font-medium" style={{ color: themeColors.textPrimary }}>
                          Duration
                        </label>
                        <input
                          className="w-full border rounded px-2 py-1 text-sm"
                          style={{
                            backgroundColor: themeColors.secondary,
                            borderColor: themeColors.border,
                            color: themeColors.textPrimary
                          }}
                          value={section.duration || ''}
                          onChange={(e) => onUpdateSection(section.id, 'duration', e.target.value)}
                          placeholder="e.g., 15 min"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {module.sections.length === 0 && (
            <div 
              className="text-center py-8"
              style={{ color: themeColors.textMuted }}
            >
              <p>No sections yet. Add your first section!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
