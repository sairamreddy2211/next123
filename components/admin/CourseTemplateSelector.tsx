"use client";

import { useTheme } from '@/components/providers/ThemeProvider';
import { useState } from 'react';
import { useCourseTemplates, CourseTemplate } from '@/hooks/useCourseTemplates';
import { Course } from '@/lib/courseManager';

interface CourseTemplateSelectorProps {
  onSelectTemplate: (course: Course) => void;
  onClose: () => void;
}

export default function CourseTemplateSelector({ 
  onSelectTemplate, 
  onClose 
}: CourseTemplateSelectorProps) {
  const { themeColors } = useTheme();
  const { templates, createCourseFromTemplate } = useCourseTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState<CourseTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = Array.from(new Set(templates.map(t => t.category)));
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (template: CourseTemplate) => {
    try {
      const course = createCourseFromTemplate(template.id);
      onSelectTemplate(course);
      onClose();
    } catch (error) {
      alert('Failed to create course from template');
    }
  };

  const getModuleCount = (template: CourseTemplate) => {
    return template.template.modules?.length || 0;
  };

  const getSectionCount = (template: CourseTemplate) => {
    return template.template.modules?.reduce((total, module) => 
      total + (module.sections?.length || 0), 0) || 0;
  };

  const getEstimatedDuration = (template: CourseTemplate) => {
    let totalMinutes = 0;
    template.template.modules?.forEach(module => {
      module.sections?.forEach(section => {
        if (section.duration) {
          const minutes = parseInt(section.duration.match(/\d+/)?.[0] || '0');
          totalMinutes += minutes;
        } else {
          totalMinutes += 15; // Default for problems
        }
      });
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
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
        {/* Left Panel - Template List */}
        <div 
          className="w-1/2 border-r overflow-y-auto"
          style={{ 
            backgroundColor: themeColors.secondary,
            borderColor: themeColors.border 
          }}
        >
          <div className="p-6 border-b" style={{ borderColor: themeColors.border }}>
            <div className="flex justify-between items-center mb-4">
              <h1 
                className="text-xl font-bold"
                style={{ color: themeColors.textPrimary }}
              >
                Course Templates
              </h1>
              <button
                className="text-xl"
                style={{ color: themeColors.textPrimary }}
                onClick={onClose}
              >
                ×
              </button>
            </div>

            {/* Search and Filter */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full px-3 py-2 rounded border"
                style={{
                  backgroundColor: themeColors.primary,
                  borderColor: themeColors.border,
                  color: themeColors.textPrimary
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <select
                className="w-full px-3 py-2 rounded border"
                style={{
                  backgroundColor: themeColors.primary,
                  borderColor: themeColors.border,
                  color: themeColors.textPrimary
                }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-4">
            {filteredTemplates.length === 0 ? (
              <div 
                className="text-center py-12"
                style={{ color: themeColors.textMuted }}
              >
                <div className="text-4xl mb-4">🔍</div>
                <p>No templates found</p>
                <p className="text-sm mt-2">Try adjusting your search or filter</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTemplates.map(template => (
                  <div
                    key={template.id}
                    className={`p-4 rounded border cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id ? 'border-blue-500 shadow-md' : ''
                    }`}
                    style={{
                      backgroundColor: selectedTemplate?.id === template.id ? themeColors.accent : themeColors.primary,
                      borderColor: selectedTemplate?.id === template.id ? '#3B82F6' : themeColors.border
                    }}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 
                          className="font-semibold"
                          style={{ color: themeColors.textPrimary }}
                        >
                          {template.name}
                        </h3>
                        <span 
                          className="text-xs px-2 py-1 rounded mt-1 inline-block"
                          style={{
                            backgroundColor: themeColors.secondary,
                            color: themeColors.textMuted
                          }}
                        >
                          {template.category}
                        </span>
                      </div>
                    </div>
                    
                    <p 
                      className="text-sm mb-3"
                      style={{ color: themeColors.textSecondary }}
                    >
                      {template.description}
                    </p>
                    
                    <div className="flex justify-between items-center text-xs">
                      <div 
                        className="space-x-4"
                        style={{ color: themeColors.textMuted }}
                      >
                        <span>{getModuleCount(template)} modules</span>
                        <span>{getSectionCount(template)} sections</span>
                        <span>~{getEstimatedDuration(template)}</span>
                      </div>
                      
                      <button
                        className="px-3 py-1 rounded text-xs transition-colors"
                        style={{
                          backgroundColor: '#3B82F6',
                          color: 'white'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectTemplate(template);
                        }}
                      >
                        Use Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Template Preview */}
        <div 
          className="w-1/2 overflow-y-auto"
          style={{ backgroundColor: themeColors.primary }}
        >
          {selectedTemplate ? (
            <div className="p-6">
              <div className="mb-6">
                <h2 
                  className="text-2xl font-bold mb-2"
                  style={{ color: themeColors.textPrimary }}
                >
                  {selectedTemplate.name}
                </h2>
                
                <div className="flex items-center space-x-3 mb-4">
                  <span 
                    className="px-3 py-1 text-sm rounded"
                    style={{
                      backgroundColor: themeColors.accent,
                      color: themeColors.textPrimary
                    }}
                  >
                    {selectedTemplate.category}
                  </span>
                  
                  <span 
                    className="text-sm"
                    style={{ color: themeColors.textMuted }}
                  >
                    {getModuleCount(selectedTemplate)} modules • {getSectionCount(selectedTemplate)} sections
                  </span>
                </div>
                
                <p 
                  className="text-lg mb-4"
                  style={{ color: themeColors.textSecondary }}
                >
                  {selectedTemplate.description}
                </p>

                <div 
                  className="text-sm mb-6"
                  style={{ color: themeColors.textMuted }}
                >
                  Estimated duration: ~{getEstimatedDuration(selectedTemplate)}
                </div>
              </div>

              {/* Course Structure Preview */}
              <div 
                className="p-4 rounded-lg border mb-6"
                style={{
                  backgroundColor: themeColors.secondary,
                  borderColor: themeColors.border
                }}
              >
                <h3 
                  className="font-semibold mb-4"
                  style={{ color: themeColors.textPrimary }}
                >
                  Course Structure
                </h3>
                
                <div className="space-y-4">
                  {selectedTemplate.template.modules?.map((module, moduleIndex) => (
                    <div key={moduleIndex}>
                      <div 
                        className="font-medium mb-2"
                        style={{ color: themeColors.textPrimary }}
                      >
                        {moduleIndex + 1}. {module.title}
                      </div>
                      
                      {module.description && (
                        <p 
                          className="text-sm mb-2 ml-4"
                          style={{ color: themeColors.textSecondary }}
                        >
                          {module.description}
                        </p>
                      )}
                      
                      <div className="ml-4 space-y-1">
                        {module.sections?.map((section, sectionIndex) => (
                          <div 
                            key={sectionIndex}
                            className="text-sm flex items-center space-x-2"
                          >
                            <span 
                              className="text-xs px-1 py-0.5 rounded"
                              style={{
                                backgroundColor: section.type === 'video' ? '#3B82F6' : '#10B981',
                                color: 'white'
                              }}
                            >
                              {section.type === 'video' ? '🎥' : '💻'}
                            </span>
                            
                            <span style={{ color: themeColors.textSecondary }}>
                              {sectionIndex + 1}. {section.title}
                            </span>
                            
                            {section.duration && (
                              <span 
                                className="text-xs px-1 py-0.5 rounded"
                                style={{
                                  backgroundColor: themeColors.tertiary,
                                  color: themeColors.textMuted
                                }}
                              >
                                {section.duration}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                <button
                  className="px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
                  style={{
                    backgroundColor: '#3B82F6',
                    color: 'white'
                  }}
                  onClick={() => handleSelectTemplate(selectedTemplate)}
                >
                  Create Course from Template
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div 
                className="h-full flex items-center justify-center"
                style={{ color: themeColors.textMuted }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">📋</div>
                  <p className="text-xl">Select a template to preview</p>
                  <p className="text-sm mt-2">Choose from our pre-built course templates</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
