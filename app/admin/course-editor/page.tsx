"use client";

import { useState } from "react";
import { useTheme } from '@/components/providers/ThemeProvider';
import { useRouter } from 'next/navigation';
import AdminNavigation from '@/components/admin/AdminNavigation';

interface Section {
  id: string;
  title: string;
  type: 'video' | 'problem';
  description: string;
  duration?: string;
  content?: any; // JSON content from problem editor or video data
  order: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  order: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  modules: Module[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

const defaultCourse: Course = {
  id: '',
  title: '',
  description: '',
  category: '',
  thumbnail: '',
  modules: [],
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function CourseEditor() {
  const { themeColors } = useTheme();
  const router = useRouter();
  const [course, setCourse] = useState<Course>(defaultCourse);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [showJsonView, setShowJsonView] = useState(false);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleCourseChange = (field: keyof Course, value: any) => {
    setCourse(prev => ({ ...prev, [field]: value }));
  };

  const addModule = () => {
    const newModule: Module = {
      id: generateId(),
      title: '',
      description: '',
      sections: [],
      order: course.modules.length + 1,
    };
    setCourse(prev => ({
      ...prev,
      modules: [...prev.modules, newModule]
    }));
    setSelectedModuleId(newModule.id);
  };

  const updateModule = (moduleId: string, field: keyof Module, value: any) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module =>
        module.id === moduleId ? { ...module, [field]: value } : module
      )
    }));
  };

  const deleteModule = (moduleId: string) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.filter(module => module.id !== moduleId)
    }));
    if (selectedModuleId === moduleId) {
      setSelectedModuleId(null);
    }
  };

  const addSection = (moduleId: string) => {
    const module = course.modules.find(m => m.id === moduleId);
    if (!module) return;

    const newSection: Section = {
      id: generateId(),
      title: '',
      type: 'video',
      description: '',
      order: module.sections.length + 1,
    };

    updateModule(moduleId, 'sections', [...module.sections, newSection]);
    setSelectedSectionId(newSection.id);
  };

  const updateSection = (moduleId: string, sectionId: string, field: keyof Section, value: any) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module =>
        module.id === moduleId
          ? {
              ...module,
              sections: module.sections.map(section =>
                section.id === sectionId ? { ...section, [field]: value } : section
              )
            }
          : module
      )
    }));
  };

  const deleteSection = (moduleId: string, sectionId: string) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module =>
        module.id === moduleId
          ? {
              ...module,
              sections: module.sections.filter(section => section.id !== sectionId)
            }
          : module
      )
    }));
    if (selectedSectionId === sectionId) {
      setSelectedSectionId(null);
    }
  };

  const openProblemEditor = (moduleId: string, sectionId: string) => {
    // Store current course data in localStorage
    localStorage.setItem('courseEditorData', JSON.stringify(course));
    localStorage.setItem('editingSection', JSON.stringify({ moduleId, sectionId }));
    
    // Redirect to problem editor
    router.push('/admin/problem-editor');
  };

  const openVideoEditor = (moduleId: string, sectionId: string) => {
    // Store current course data in localStorage
    localStorage.setItem('courseEditorData', JSON.stringify(course));
    localStorage.setItem('editingSection', JSON.stringify({ moduleId, sectionId }));
    
    // Redirect to problem editor with video mode
    router.push('/admin/problem-editor?mode=video');
  };

  return (
    <div className="min-h-screen text-white p-0" style={{ backgroundColor: themeColors.primary }}>
      <AdminNavigation />
      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Panel: Course Structure */}
        <div className="w-1/3 border-r overflow-y-auto p-6" style={{ 
          borderColor: themeColors.border,
          backgroundColor: themeColors.secondary 
        }}>
          <h1 
            className="text-2xl font-bold mb-6"
            style={{ color: themeColors.textPrimary }}
          >
            Course Editor
          </h1>

          {/* Course Basic Info */}
          <div 
            className="p-4 rounded-lg border mb-6"
            style={{
              backgroundColor: themeColors.tertiary,
              borderColor: themeColors.border
            }}
          >
            <h2 
              className="text-lg font-semibold mb-4"
              style={{ color: themeColors.textPrimary }}
            >
              Course Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold" style={{ color: themeColors.textPrimary }}>
                  Course Title
                </label>
                <input
                  className="w-full border rounded px-3 py-2"
                  style={{
                    backgroundColor: themeColors.primary,
                    borderColor: themeColors.border,
                    color: themeColors.textPrimary
                  }}
                  value={course.title}
                  onChange={(e) => handleCourseChange('title', e.target.value)}
                  placeholder="Enter course title..."
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold" style={{ color: themeColors.textPrimary }}>
                  Description
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  style={{
                    backgroundColor: themeColors.primary,
                    borderColor: themeColors.border,
                    color: themeColors.textPrimary
                  }}
                  rows={3}
                  value={course.description}
                  onChange={(e) => handleCourseChange('description', e.target.value)}
                  placeholder="Enter course description..."
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold" style={{ color: themeColors.textPrimary }}>
                  Category
                </label>
                <input
                  className="w-full border rounded px-3 py-2"
                  style={{
                    backgroundColor: themeColors.primary,
                    borderColor: themeColors.border,
                    color: themeColors.textPrimary
                  }}
                  value={course.category}
                  onChange={(e) => handleCourseChange('category', e.target.value)}
                  placeholder="e.g., Databases, Algorithms..."
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold" style={{ color: themeColors.textPrimary }}>
                  Thumbnail URL
                </label>
                <input
                  className="w-full border rounded px-3 py-2"
                  style={{
                    backgroundColor: themeColors.primary,
                    borderColor: themeColors.border,
                    color: themeColors.textPrimary
                  }}
                  value={course.thumbnail}
                  onChange={(e) => handleCourseChange('thumbnail', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold" style={{ color: themeColors.textPrimary }}>
                  Status
                </label>
                <select
                  className="w-full border rounded px-3 py-2"
                  style={{
                    backgroundColor: themeColors.primary,
                    borderColor: themeColors.border,
                    color: themeColors.textPrimary
                  }}
                  value={course.status}
                  onChange={(e) => handleCourseChange('status', e.target.value)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>

          {/* Modules */}
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
                Modules ({course.modules.length})
              </h2>
              <button
                className="px-3 py-1 text-sm rounded transition-colors"
                style={{
                  backgroundColor: themeColors.accent,
                  color: themeColors.textPrimary
                }}
                onClick={addModule}
              >
                + Add Module
              </button>
            </div>

            <div className="space-y-3">
              {course.modules.map((module, index) => (
                <div
                  key={module.id}
                  className={`p-3 rounded border cursor-pointer transition-colors ${
                    selectedModuleId === module.id ? 'border-blue-500' : ''
                  }`}
                  style={{
                    backgroundColor: selectedModuleId === module.id ? themeColors.accent : themeColors.primary,
                    borderColor: selectedModuleId === module.id ? '#3B82F6' : themeColors.border
                  }}
                  onClick={() => setSelectedModuleId(module.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <input
                        className="w-full font-semibold mb-1 bg-transparent border-none outline-none"
                        style={{ color: themeColors.textPrimary }}
                        value={module.title}
                        onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                        placeholder="Module title..."
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="text-sm" style={{ color: themeColors.textSecondary }}>
                        {module.sections.length} sections
                      </div>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-400 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteModule(module.id);
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Module/Section Details */}
        <div className="w-2/3 overflow-y-auto p-6">
          {selectedModuleId ? (
            <ModuleDetails
              module={course.modules.find(m => m.id === selectedModuleId)!}
              onUpdateModule={(field, value) => updateModule(selectedModuleId, field, value)}
              onAddSection={() => addSection(selectedModuleId)}
              onUpdateSection={(sectionId, field, value) => updateSection(selectedModuleId, sectionId, field, value)}
              onDeleteSection={(sectionId) => deleteSection(selectedModuleId, sectionId)}
              onOpenProblemEditor={(sectionId) => openProblemEditor(selectedModuleId, sectionId)}
              onOpenVideoEditor={(sectionId) => openVideoEditor(selectedModuleId, sectionId)}
              selectedSectionId={selectedSectionId}
              onSelectSection={setSelectedSectionId}
            />
          ) : (
            <div 
              className="flex items-center justify-center h-full"
              style={{ color: themeColors.textMuted }}
            >
              <p>Select a module to edit its details</p>
            </div>
          )}
        </div>
      </div>

      {/* JSON Preview Button */}
      <div className="fixed bottom-4 right-4">
        <button
          className="px-4 py-2 rounded transition-colors"
          style={{
            backgroundColor: themeColors.tertiary,
            borderColor: themeColors.border,
            color: themeColors.textPrimary
          }}
          onClick={() => setShowJsonView(!showJsonView)}
        >
          {showJsonView ? "Hide JSON" : "Show JSON"}
        </button>
      </div>

      {/* JSON Preview Modal */}
      {showJsonView && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowJsonView(false)}
        >
          <div 
            className="w-3/4 h-3/4 p-6 rounded-lg overflow-auto"
            style={{
              backgroundColor: themeColors.secondary,
              borderColor: themeColors.border
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 
                className="text-lg font-semibold"
                style={{ color: themeColors.textPrimary }}
              >
                Course JSON
              </h3>
              <button
                className="text-xl"
                style={{ color: themeColors.textPrimary }}
                onClick={() => setShowJsonView(false)}
              >
                ×
              </button>
            </div>
            <pre 
              className="text-xs p-4 rounded overflow-x-auto border"
              style={{
                backgroundColor: themeColors.primary,
                borderColor: themeColors.border,
                color: themeColors.textPrimary
              }}
            >
              {JSON.stringify(course, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

// Module Details Component
interface ModuleDetailsProps {
  module: Module;
  onUpdateModule: (field: keyof Module, value: any) => void;
  onAddSection: () => void;
  onUpdateSection: (sectionId: string, field: keyof Section, value: any) => void;
  onDeleteSection: (sectionId: string) => void;
  onOpenProblemEditor: (sectionId: string) => void;
  onOpenVideoEditor: (sectionId: string) => void;
  selectedSectionId: string | null;
  onSelectSection: (sectionId: string | null) => void;
}

function ModuleDetails({
  module,
  onUpdateModule,
  onAddSection,
  onUpdateSection,
  onDeleteSection,
  onOpenProblemEditor,
  onOpenVideoEditor,
  selectedSectionId,
  onSelectSection
}: ModuleDetailsProps) {
  const { themeColors } = useTheme();

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
              Module Title
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              style={{
                backgroundColor: themeColors.tertiary,
                borderColor: themeColors.border,
                color: themeColors.textPrimary
              }}
              value={module.title}
              onChange={(e) => onUpdateModule('title', e.target.value)}
              placeholder="Enter module title..."
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" style={{ color: themeColors.textPrimary }}>
              Description
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              style={{
                backgroundColor: themeColors.tertiary,
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
              className={`p-4 rounded border ${
                selectedSectionId === section.id ? 'border-blue-500' : ''
              }`}
              style={{
                backgroundColor: selectedSectionId === section.id ? themeColors.accent : themeColors.tertiary,
                borderColor: selectedSectionId === section.id ? '#3B82F6' : themeColors.border
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <input
                    className="w-full font-semibold mb-2 bg-transparent border-none outline-none"
                    style={{ color: themeColors.textPrimary }}
                    value={section.title}
                    onChange={(e) => onUpdateSection(section.id, 'title', e.target.value)}
                    placeholder="Section title..."
                  />
                  <textarea
                    className="w-full text-sm bg-transparent border-none outline-none resize-none"
                    style={{ color: themeColors.textSecondary }}
                    rows={2}
                    value={section.description}
                    onChange={(e) => onUpdateSection(section.id, 'description', e.target.value)}
                    placeholder="Section description..."
                  />
                </div>
                <button
                  className="text-red-500 hover:text-red-400 ml-2"
                  onClick={() => onDeleteSection(section.id)}
                >
                  ×
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: themeColors.textPrimary }}>
                      Type
                    </label>
                    <select
                      className="text-sm border rounded px-2 py-1"
                      style={{
                        backgroundColor: themeColors.primary,
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

                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: themeColors.textPrimary }}>
                      Duration
                    </label>
                    <input
                      className="text-sm border rounded px-2 py-1 w-20"
                      style={{
                        backgroundColor: themeColors.primary,
                        borderColor: themeColors.border,
                        color: themeColors.textPrimary
                      }}
                      value={section.duration || ''}
                      onChange={(e) => onUpdateSection(section.id, 'duration', e.target.value)}
                      placeholder="15m"
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  {section.type === 'video' ? (
                    <button
                      className="px-3 py-1 text-xs rounded transition-colors"
                      style={{
                        backgroundColor: themeColors.accent,
                        color: themeColors.textPrimary
                      }}
                      onClick={() => onOpenVideoEditor(section.id)}
                    >
                      Edit Video
                    </button>
                  ) : (
                    <button
                      className="px-3 py-1 text-xs rounded transition-colors"
                      style={{
                        backgroundColor: themeColors.accent,
                        color: themeColors.textPrimary
                      }}
                      onClick={() => onOpenProblemEditor(section.id)}
                    >
                      Edit Problem
                    </button>
                  )}
                </div>
              </div>

              {section.content && (
                <div className="mt-3 p-2 rounded text-xs" style={{ backgroundColor: themeColors.primary }}>
                  <span style={{ color: themeColors.textSecondary }}>
                    Content: {section.type === 'video' ? 'Video data loaded' : 'Problem data loaded'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 