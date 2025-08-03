"use client";

import { useTheme } from '@/components/providers/ThemeProvider';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

interface CourseFormProps {
  course: Course;
  onCourseChange: (field: keyof Course, value: any) => void;
  onSave: (status?: 'draft' | 'published') => void;
  onReset: () => void;
  isAutoSaving: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  validationErrors: Record<string, string>;
}

const COURSE_CATEGORIES = [
  'Databases',
  'Algorithms',
  'Data Structures',
  'Web Development',
  'Machine Learning',
  'System Design',
  'Programming Languages',
  'DevOps',
  'Mobile Development',
  'Security'
];

export default function CourseForm({
  course,
  onCourseChange,
  onSave,
  onReset,
  isAutoSaving,
  isSaving,
  lastSaved,
  validationErrors
}: CourseFormProps) {
  const { themeColors } = useTheme();

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
          Course Information
        </h2>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            className="px-3 py-2 text-sm rounded transition-colors"
            style={{
              backgroundColor: themeColors.secondary,
              borderColor: themeColors.border,
              color: themeColors.textPrimary
            }}
            onClick={() => onSave('draft')}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          
          <button
            className="px-3 py-2 text-sm rounded transition-colors"
            style={{
              backgroundColor: themeColors.primary,
              borderColor: themeColors.border,
              color: themeColors.textPrimary
            }}
            onClick={() => onSave('published')}
            disabled={isSaving}
          >
            {isSaving ? 'Publishing...' : 'Publish'}
          </button>
          
          <button
            className="px-3 py-2 text-sm rounded transition-colors"
            style={{
              backgroundColor: themeColors.tertiary,
              borderColor: themeColors.border,
              color: themeColors.textPrimary
            }}
            onClick={onReset}
            disabled={isSaving}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Auto-save status */}
      {lastSaved && (
        <div className="text-xs mb-4" style={{ color: themeColors.textMuted }}>
          Last saved: {lastSaved.toLocaleTimeString()}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold" style={{ color: themeColors.textPrimary }}>
            Course Title *
          </label>
          <input
            className={`w-full border rounded px-3 py-2 ${validationErrors.title ? 'border-red-500' : ''}`}
            style={{
              backgroundColor: themeColors.primary,
              borderColor: validationErrors.title ? '#EF4444' : themeColors.border,
              color: themeColors.textPrimary
            }}
            value={course.title}
            onChange={(e) => onCourseChange('title', e.target.value)}
            placeholder="Enter course title..."
          />
          {validationErrors.title && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold" style={{ color: themeColors.textPrimary }}>
            Description *
          </label>
          <textarea
            className={`w-full border rounded px-3 py-2 ${validationErrors.description ? 'border-red-500' : ''}`}
            style={{
              backgroundColor: themeColors.primary,
              borderColor: validationErrors.description ? '#EF4444' : themeColors.border,
              color: themeColors.textPrimary
            }}
            rows={3}
            value={course.description}
            onChange={(e) => onCourseChange('description', e.target.value)}
            placeholder="Enter course description..."
          />
          {validationErrors.description && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold" style={{ color: themeColors.textPrimary }}>
            Category *
          </label>
          <select
            className={`w-full border rounded px-3 py-2 ${validationErrors.category ? 'border-red-500' : ''}`}
            style={{
              backgroundColor: themeColors.primary,
              borderColor: validationErrors.category ? '#EF4444' : themeColors.border,
              color: themeColors.textPrimary
            }}
            value={course.category}
            onChange={(e) => onCourseChange('category', e.target.value)}
          >
            <option value="">Select a category...</option>
            {COURSE_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {validationErrors.category && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>
          )}
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
            onChange={(e) => onCourseChange('thumbnail', e.target.value)}
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
            onChange={(e) => onCourseChange('status', e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>
    </div>
  );
}
