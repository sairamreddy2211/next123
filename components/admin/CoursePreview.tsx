"use client";

import { useTheme } from '@/components/providers/ThemeProvider';
import { useState } from 'react';
import { Course } from '@/lib/courseManager';

interface CoursePreviewProps {
  course: Course;
  onClose: () => void;
}

export default function CoursePreview({ course, onClose }: CoursePreviewProps) {
  const { themeColors } = useTheme();
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(
    course.modules.length > 0 ? course.modules[0].id : null
  );
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  const selectedModule = course.modules.find(m => m.id === selectedModuleId);
  const selectedSection = selectedModule?.sections.find(s => s.id === selectedSectionId);

  const totalSections = course.modules.reduce((total, module) => total + module.sections.length, 0);
  const totalDuration = course.modules.reduce((total, module) => {
    return total + module.sections.reduce((sectionTotal, section) => {
      if (section.duration) {
        const minutes = parseInt(section.duration.match(/\d+/)?.[0] || '0');
        return sectionTotal + minutes;
      }
      return sectionTotal + 15; // Default 15 min for problems
    }, 0);
  }, 0);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getTypeIcon = (type: string) => {
    return type === 'video' ? '🎥' : '💻';
  };

  const getTypeBadgeColor = (type: string) => {
    return type === 'video' ? '#3B82F6' : '#10B981';
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="w-5/6 h-5/6 rounded-lg overflow-hidden flex"
        style={{ backgroundColor: themeColors.primary }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Panel - Course Navigation */}
        <div 
          className="w-1/3 border-r overflow-y-auto"
          style={{ 
            backgroundColor: themeColors.secondary,
            borderColor: themeColors.border 
          }}
        >
          {/* Course Header */}
          <div className="p-6 border-b" style={{ borderColor: themeColors.border }}>
            <div className="flex justify-between items-start mb-4">
              <h1 
                className="text-xl font-bold"
                style={{ color: themeColors.textPrimary }}
              >
                Course Preview
              </h1>
              <button
                className="text-xl"
                style={{ color: themeColors.textPrimary }}
                onClick={onClose}
              >
                ×
              </button>
            </div>
            
            <h2 
              className="text-lg font-semibold mb-2"
              style={{ color: themeColors.textPrimary }}
            >
              {course.title}
            </h2>
            
            <p 
              className="text-sm mb-4"
              style={{ color: themeColors.textSecondary }}
            >
              {course.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span 
                className="px-2 py-1 text-xs rounded"
                style={{
                  backgroundColor: themeColors.accent,
                  color: themeColors.textPrimary
                }}
              >
                {course.category}
              </span>
              
              <span 
                className="px-2 py-1 text-xs rounded"
                style={{
                  backgroundColor: course.status === 'published' ? '#10B981' : '#F59E0B',
                  color: 'white'
                }}
              >
                {course.status}
              </span>
            </div>

            <div 
              className="text-xs"
              style={{ color: themeColors.textMuted }}
            >
              <div>{course.modules.length} modules • {totalSections} sections</div>
              <div>Total duration: ~{formatDuration(totalDuration)}</div>
            </div>
          </div>

          {/* Course Outline */}
          <div className="p-4">
            <h3 
              className="font-semibold mb-4"
              style={{ color: themeColors.textPrimary }}
            >
              Course Outline
            </h3>
            
            <div className="space-y-3">
              {course.modules.map((module, moduleIndex) => (
                <div key={module.id}>
                  <div
                    className={`p-3 rounded cursor-pointer transition-colors ${
                      selectedModuleId === module.id ? 'shadow-md' : ''
                    }`}
                    style={{
                      backgroundColor: selectedModuleId === module.id ? themeColors.accent : themeColors.primary,
                      borderColor: themeColors.border
                    }}
                    onClick={() => {
                      setSelectedModuleId(module.id);
                      setSelectedSectionId(null);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div 
                          className="font-medium"
                          style={{ color: themeColors.textPrimary }}
                        >
                          {moduleIndex + 1}. {module.title}
                        </div>
                        <div 
                          className="text-xs"
                          style={{ color: themeColors.textMuted }}
                        >
                          {module.sections.length} sections
                        </div>
                      </div>
                      <div 
                        className="text-sm"
                        style={{ color: themeColors.textMuted }}
                      >
                        {selectedModuleId === module.id ? '▼' : '▶'}
                      </div>
                    </div>
                  </div>

                  {/* Sections */}
                  {selectedModuleId === module.id && (
                    <div className="ml-4 mt-2 space-y-2">
                      {module.sections.map((section, sectionIndex) => (
                        <div
                          key={section.id}
                          className={`p-2 rounded cursor-pointer transition-colors ${
                            selectedSectionId === section.id ? 'shadow-sm' : ''
                          }`}
                          style={{
                            backgroundColor: selectedSectionId === section.id ? themeColors.tertiary : themeColors.secondary,
                            borderColor: themeColors.border
                          }}
                          onClick={() => setSelectedSectionId(section.id)}
                        >
                          <div className="flex items-center space-x-2">
                            <span 
                              className="text-xs px-1 py-0.5 rounded"
                              style={{
                                backgroundColor: getTypeBadgeColor(section.type),
                                color: 'white'
                              }}
                            >
                              {getTypeIcon(section.type)}
                            </span>
                            
                            <div className="flex-1">
                              <div 
                                className="text-sm font-medium"
                                style={{ color: themeColors.textPrimary }}
                              >
                                {sectionIndex + 1}. {section.title}
                              </div>
                              
                              {section.duration && (
                                <div 
                                  className="text-xs"
                                  style={{ color: themeColors.textMuted }}
                                >
                                  {section.duration}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Content Preview */}
        <div 
          className="w-2/3 overflow-y-auto"
          style={{ backgroundColor: themeColors.primary }}
        >
          {selectedSection ? (
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <span 
                    className="px-3 py-1 text-sm rounded"
                    style={{
                      backgroundColor: getTypeBadgeColor(selectedSection.type),
                      color: 'white'
                    }}
                  >
                    {getTypeIcon(selectedSection.type)} {selectedSection.type}
                  </span>
                  
                  {selectedSection.duration && (
                    <span 
                      className="px-2 py-1 text-xs rounded"
                      style={{
                        backgroundColor: themeColors.secondary,
                        color: themeColors.textMuted
                      }}
                    >
                      {selectedSection.duration}
                    </span>
                  )}
                </div>
                
                <h1 
                  className="text-2xl font-bold mb-2"
                  style={{ color: themeColors.textPrimary }}
                >
                  {selectedSection.title}
                </h1>
                
                <p 
                  className="text-lg"
                  style={{ color: themeColors.textSecondary }}
                >
                  {selectedSection.description}
                </p>
              </div>

              {/* Content Preview */}
              <div 
                className="p-6 rounded-lg border"
                style={{
                  backgroundColor: themeColors.secondary,
                  borderColor: themeColors.border
                }}
              >
                {selectedSection.type === 'video' ? (
                  <div className="text-center">
                    <div 
                      className="w-full h-64 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: themeColors.tertiary }}
                    >
                      <div 
                        className="text-6xl"
                        style={{ color: themeColors.textMuted }}
                      >
                        🎥
                      </div>
                    </div>
                    <p 
                      className="text-lg"
                      style={{ color: themeColors.textPrimary }}
                    >
                      Video Player
                    </p>
                    <p 
                      className="text-sm"
                      style={{ color: themeColors.textMuted }}
                    >
                      This section will contain a video player with the lesson content.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 
                      className="text-lg font-semibold mb-4"
                      style={{ color: themeColors.textPrimary }}
                    >
                      Coding Problem
                    </h3>
                    
                    <div 
                      className="p-4 rounded border mb-4"
                      style={{
                        backgroundColor: themeColors.primary,
                        borderColor: themeColors.border
                      }}
                    >
                      <div 
                        className="font-mono text-sm"
                        style={{ color: themeColors.textSecondary }}
                      >
                        This section will contain an interactive coding problem where students can:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Read the problem description</li>
                          <li>View examples and constraints</li>
                          <li>Write and test their solution</li>
                          <li>Get hints if needed</li>
                          <li>Submit and get feedback</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div 
                        className="w-full h-32 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: themeColors.tertiary }}
                      >
                        <div 
                          className="text-4xl"
                          style={{ color: themeColors.textMuted }}
                        >
                          💻
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : selectedModule ? (
            <div className="p-6">
              <h1 
                className="text-2xl font-bold mb-4"
                style={{ color: themeColors.textPrimary }}
              >
                {selectedModule.title}
              </h1>
              
              <p 
                className="text-lg mb-6"
                style={{ color: themeColors.textSecondary }}
              >
                {selectedModule.description}
              </p>
              
              <div 
                className="p-6 rounded-lg border text-center"
                style={{
                  backgroundColor: themeColors.secondary,
                  borderColor: themeColors.border
                }}
              >
                <div 
                  className="text-4xl mb-4"
                  style={{ color: themeColors.textMuted }}
                >
                  📚
                </div>
                <p 
                  className="text-lg"
                  style={{ color: themeColors.textPrimary }}
                >
                  Select a section to preview its content
                </p>
                <p 
                  className="text-sm"
                  style={{ color: themeColors.textMuted }}
                >
                  This module contains {selectedModule.sections.length} sections
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div 
                className="h-full flex items-center justify-center"
                style={{ color: themeColors.textMuted }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">📖</div>
                  <p className="text-xl">Select a module to preview</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
