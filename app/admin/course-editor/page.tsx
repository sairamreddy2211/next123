"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from '@/components/providers/ThemeProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import CourseForm from '@/components/admin/CourseForm';
import ModuleManager from '@/components/admin/ModuleManager';
import SectionEditor from '@/components/admin/SectionEditor';
import CoursePreview from '@/components/admin/CoursePreview';
import EditorModal from '@/components/admin/EditorModal';
import { CourseManager, Course, Module, Section, CourseVersion } from '@/lib/courseManager';
import { mockApiCalls } from '@/lib/mockApiCalls';

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
  version: 1
};

export default function CourseEditor() {
  const { themeColors } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  
  const [course, setCourse] = useState<Course>(defaultCourse);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [showJsonView, setShowJsonView] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [editorModalType, setEditorModalType] = useState<'problem' | 'video'>('problem');
  const [editorPrefillId, setEditorPrefillId] = useState<string | undefined>();
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'draft' | 'published'>('draft');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [draggedModuleId, setDraggedModuleId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  // Load course if courseId is provided
  useEffect(() => {
    if (courseId) {
      loadExistingCourse(courseId);
    }
  }, [courseId]);

  const loadExistingCourse = async (id: string) => {
    try {
      setIsInitialLoading(true);
      const existingCourse = await mockApiCalls.getCourse(id);
      if (existingCourse) {
        setCourse(existingCourse);
        setSaveStatus(existingCourse.status);
        console.log('Loaded existing course:', existingCourse);
      } else {
        console.error('Course not found:', id);
        // Optionally redirect back to dashboard
        router.push('/admin');
      }
    } catch (error) {
      console.error('Failed to load course:', error);
      router.push('/admin');
    } finally {
      setIsInitialLoading(false);
    }
  };
  const [draggedSectionId, setDraggedSectionId] = useState<string | null>(null);

  // Handle saved section ID when returning from editors
  useEffect(() => {
    const savedSectionId = searchParams.get('savedSectionId');
    const moduleId = searchParams.get('moduleId');
    const sectionId = searchParams.get('sectionId');
    
    if (savedSectionId && moduleId && sectionId) {
      // Update the section with the saved section ID
      updateSection(moduleId, sectionId, 'sectionId', savedSectionId);
      
      // Clean up URL parameters
      const params = new URLSearchParams();
      params.set('moduleId', moduleId);
      params.set('sectionId', sectionId);
      
      const newUrl = `/admin/course-editor?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
      
      console.log(`Section ${sectionId} updated with sectionId: ${savedSectionId}`);
    }
  }, [searchParams]);

  // Preserve navigation state
  useEffect(() => {
    const moduleId = searchParams.get('moduleId');
    const sectionId = searchParams.get('sectionId');
    
    if (moduleId) setSelectedModuleId(moduleId);
    if (sectionId) setSelectedSectionId(sectionId);
  }, [searchParams]);

  // Update URL when navigation changes
  const updateNavigation = useCallback((moduleId: string | null, sectionId: string | null) => {
    const params = new URLSearchParams();
    if (moduleId) params.set('moduleId', moduleId);
    if (sectionId) params.set('sectionId', sectionId);
    
    const newUrl = `/admin/course-editor${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.replaceState({}, '', newUrl);
    
    setSelectedModuleId(moduleId);
    setSelectedSectionId(sectionId);
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (course.title.trim() || course.description.trim()) {
        setIsAutoSaving(true);
        CourseManager.autoSaveCourse(course);
        setTimeout(() => {
          setIsAutoSaving(false);
          setLastSaved(new Date());
        }, 500);
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [course]);

  // Load course on mount
  useEffect(() => {
    const savedCourse = CourseManager.loadCourse();
    
    if (savedCourse) {
      setCourse(savedCourse);
    } else {
      // Initialize with default course with ID
      const newCourse = {
        ...defaultCourse,
        id: generateId()
      };
      setCourse(newCourse);
    }
  }, []);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Validation
  const validateCourse = useCallback(() => {
    const errors = CourseManager.validateCourse(course);
    const errorMap: Record<string, string> = {};
    
    errors.forEach(error => {
      errorMap[error.field] = error.message;
    });
    
    setValidationErrors(errorMap);
    return errors.length === 0;
  }, [course]);

  // Course management functions
  const handleSaveCourse = async (status: 'draft' | 'published' = 'draft') => {
    if (!validateCourse()) {
      alert('Please fix validation errors before saving');
      return;
    }

    setIsSaving(true);
    setSaveStatus(status);
    
    try {
      const courseToSave = {
        ...course,
        status,
        updatedAt: new Date().toISOString()
      };

      // Save course with mock API
      await mockApiCalls.saveCourse(courseToSave);
      
      // Save to localStorage
      CourseManager.saveCourse(courseToSave);
      setCourse(courseToSave);
      setLastSaved(new Date());
      
      console.log('Course saved successfully with status:', status);
      console.log('Final JSON:', JSON.stringify(courseToSave, null, 2));
      
      // Show save confirmation
      if (status === 'published') {
        alert('Course published successfully!');
      } else {
        alert('Course draft saved successfully!');
      }
      
    } catch (error) {
      console.error('Failed to save course:', error);
      alert('Failed to save course. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    const shouldReset = window.confirm(
      'Are you sure you want to reset? This will clear all current data and cannot be undone.'
    );
    
    if (shouldReset) {
      const newCourse = {
        ...defaultCourse,
        id: generateId()
      };
      setCourse(newCourse);
      updateNavigation(null, null);
      setValidationErrors({});
      CourseManager.clearAutoSave();
      alert('Course reset successfully!');
    }
  };

  // Course field updates
  const handleCourseChange = (field: keyof Course, value: any) => {
    setCourse(prev => ({ 
      ...prev, 
      [field]: value,
      updatedAt: new Date().toISOString()
    }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Module management
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
      modules: [...prev.modules, newModule],
      updatedAt: new Date().toISOString()
    }));
    setSelectedModuleId(newModule.id);
  };

  const createModuleFromTemplate = (templateType: string) => {
    // Template functionality removed - this function is no longer used
    console.log('Template functionality has been removed');
  };

  const updateModule = (moduleId: string, field: keyof Module, value: any) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module =>
        module.id === moduleId ? { ...module, [field]: value } : module
      ),
      updatedAt: new Date().toISOString()
    }));
  };

  const deleteModule = (moduleId: string) => {
    if (!window.confirm('Are you sure you want to delete this module?')) return;
    
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.filter(module => module.id !== moduleId),
      updatedAt: new Date().toISOString()
    }));
    
    if (selectedModuleId === moduleId) {
      setSelectedModuleId(null);
      setSelectedSectionId(null);
    }
  };

  // Drag and drop for modules
  const handleModuleDragStart = (moduleId: string) => {
    setDraggedModuleId(moduleId);
  };

  const handleModuleDragOver = (e: React.DragEvent, targetModuleId: string) => {
    e.preventDefault();
  };

  const handleModuleDrop = (e: React.DragEvent, targetModuleId: string) => {
    e.preventDefault();
    
    if (!draggedModuleId || draggedModuleId === targetModuleId) {
      setDraggedModuleId(null);
      return;
    }

    const modules = [...course.modules];
    const draggedIndex = modules.findIndex(m => m.id === draggedModuleId);
    const targetIndex = modules.findIndex(m => m.id === targetModuleId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Reorder modules
    const [draggedModule] = modules.splice(draggedIndex, 1);
    modules.splice(targetIndex, 0, draggedModule);

    // Update order numbers
    const reorderedModules = modules.map((module, index) => ({
      ...module,
      order: index + 1
    }));

    setCourse(prev => ({
      ...prev,
      modules: reorderedModules,
      updatedAt: new Date().toISOString()
    }));

    setDraggedModuleId(null);
  };

  // Section management
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
      ),
      updatedAt: new Date().toISOString()
    }));
  };

  const deleteSection = (moduleId: string, sectionId: string) => {
    if (!window.confirm('Are you sure you want to delete this section?')) return;
    
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module =>
        module.id === moduleId
          ? {
              ...module,
              sections: module.sections.filter(section => section.id !== sectionId)
            }
          : module
      ),
      updatedAt: new Date().toISOString()
    }));
    
    if (selectedSectionId === sectionId) {
      setSelectedSectionId(null);
    }
  };

  // Drag and drop for sections
  const handleSectionDragStart = (sectionId: string) => {
    setDraggedSectionId(sectionId);
  };

  const handleSectionDragOver = (e: React.DragEvent, targetSectionId: string) => {
    e.preventDefault();
  };

  const handleSectionDrop = (e: React.DragEvent, targetSectionId: string) => {
    e.preventDefault();
    
    if (!draggedSectionId || !selectedModuleId || draggedSectionId === targetSectionId) {
      setDraggedSectionId(null);
      return;
    }

    const module = course.modules.find(m => m.id === selectedModuleId);
    if (!module) return;

    const sections = [...module.sections];
    const draggedIndex = sections.findIndex(s => s.id === draggedSectionId);
    const targetIndex = sections.findIndex(s => s.id === targetSectionId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Reorder sections
    const [draggedSection] = sections.splice(draggedIndex, 1);
    sections.splice(targetIndex, 0, draggedSection);

    // Update order numbers
    const reorderedSections = sections.map((section, index) => ({
      ...section,
      order: index + 1
    }));

    updateModule(selectedModuleId, 'sections', reorderedSections);
    setDraggedSectionId(null);
  };

  // Navigation to other editors
  const handleOpenProblemEditor = (sectionId: string) => {
    console.log('Opening problem editor for section:', sectionId);
    const section = course.modules
      .flatMap(m => m.sections)
      .find(s => s.id === sectionId);
    
    console.log('Found section:', section);
    setEditingSectionId(sectionId);
    setEditorPrefillId(section?.sectionId);
    setEditorModalType('problem'); // Correct: problem section should open as problem
    setShowEditorModal(true);
    console.log('Problem modal state set to true');
  };

  const handleEditorSaved = (generatedSectionId: string) => {
    if (editingSectionId && selectedModuleId) {
      // Update the section with the saved section ID
      updateSection(selectedModuleId, editingSectionId, 'sectionId', generatedSectionId);
      console.log(`Section ${editingSectionId} updated with sectionId: ${generatedSectionId}`);
    }
    setEditingSectionId(null);
    setEditorPrefillId(undefined);
    setShowEditorModal(false);
  };

  const handleOpenVideoEditor = (sectionId: string) => {
    console.log('Opening video editor for section:', sectionId);
    const section = course.modules
      .flatMap(m => m.sections)
      .find(s => s.id === sectionId);
    
    console.log('Found section:', section);
    setEditingSectionId(sectionId);
    setEditorPrefillId(section?.sectionId);
    setEditorModalType('video'); // Correct: video section should open as video
    setShowEditorModal(true);
    console.log('Video modal state set to true');
  };

  return (
    <div className="min-h-screen text-white p-0" style={{ backgroundColor: themeColors.primary }}>
      {/* Header with Back Button */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: themeColors.border, backgroundColor: themeColors.secondary }}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 text-white rounded hover:opacity-80 transition-opacity"
            style={{ backgroundColor: themeColors.accent }}
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-xl font-bold">Course Editor</h1>
        </div>
        
        {isInitialLoading && (
          <div className="text-sm text-gray-400">Loading course...</div>
        )}
      </div>
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel: Course Structure */}
        <div className="w-1/3 border-r overflow-y-auto p-6" style={{ 
          borderColor: themeColors.border,
          backgroundColor: themeColors.secondary 
        }}>
          <div className="flex justify-between items-center mb-6">
            <h1 
              className="text-2xl font-bold"
              style={{ color: themeColors.textPrimary }}
            >
              Course Editor
            </h1>
            
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 text-sm rounded transition-colors"
                style={{
                  backgroundColor: themeColors.accent,
                  color: themeColors.textPrimary
                }}
                onClick={() => setShowPreview(true)}
                disabled={!course.title.trim()}
              >
                👁️ Preview
              </button>
            </div>
          </div>

          {/* Course Form */}
          <CourseForm
            course={course}
            onCourseChange={handleCourseChange}
            onSave={handleSaveCourse}
            onReset={handleReset}
            isAutoSaving={isAutoSaving}
            isSaving={isSaving}
            lastSaved={lastSaved}
            validationErrors={validationErrors}
          />

          {/* Module Manager */}
          <ModuleManager
            modules={course.modules}
            selectedModuleId={selectedModuleId}
            onSelectModule={setSelectedModuleId}
            onAddModule={addModule}
            onUpdateModule={updateModule}
            onDeleteModule={deleteModule}
            onDragStart={handleModuleDragStart}
            onDragOver={handleModuleDragOver}
            onDrop={handleModuleDrop}
            onCreateFromTemplate={createModuleFromTemplate}
          />
        </div>

        {/* Right Panel: Module/Section Details */}
        <div className="w-2/3 overflow-y-auto p-6">
          {selectedModuleId ? (
            <SectionEditor
              module={course.modules.find(m => m.id === selectedModuleId)!}
              selectedSectionId={selectedSectionId}
              onSelectSection={(sectionId) => updateNavigation(selectedModuleId, sectionId)}
              onAddSection={() => addSection(selectedModuleId)}
              onUpdateSection={(sectionId, field, value) => updateSection(selectedModuleId, sectionId, field, value)}
              onDeleteSection={(sectionId) => deleteSection(selectedModuleId, sectionId)}
              onOpenProblemEditor={handleOpenProblemEditor}
              onOpenVideoEditor={handleOpenVideoEditor}
              onDragStartSection={handleSectionDragStart}
              onDragOverSection={handleSectionDragOver}
              onDropSection={handleSectionDrop}
              onUpdateModule={(field, value) => updateModule(selectedModuleId, field, value)}
              validationErrors={validationErrors}
            />
          ) : (
            <div 
              className="flex items-center justify-center h-full"
              style={{ color: themeColors.textMuted }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-xl mb-2">Select a module to edit its details</p>
                <p className="text-sm">Or create your first module to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-4 right-4 flex space-x-2">
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

      {/* Modals */}
      {showPreview && course.title.trim() && (
        <CoursePreview
          course={course}
          onClose={() => setShowPreview(false)}
        />
      )}

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

      {/* Problem Editor Modal */}
      {/* Editor Modal - opens existing problem-editor in overlay */}
      <EditorModal
        isOpen={showEditorModal}
        onClose={() => setShowEditorModal(false)}
        onSave={handleEditorSaved}
        prefillId={editorPrefillId}
        sectionType={editorModalType || 'problem'}
        moduleId={selectedModuleId || undefined}
        sectionId={editingSectionId || undefined}
      />
    </div>
  );
} 