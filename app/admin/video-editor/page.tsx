"use client";

import { useState, useEffect } from "react";
import { useTheme } from '@/components/providers/ThemeProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminNavigation from '@/components/admin/AdminNavigation';
import { mockApiCalls } from '@/lib/courseManager';
import { VIDEO_LEVELS } from '@/constants';

interface VideoSection {
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  category: string;
  thumbnail: string;
  type: string;
}

const defaultVideoSection: VideoSection = {
  title: '',
  description: '',
  duration: '',
  videoUrl: '',
  category: '',
  thumbnail: '',
  type: 'not_detected'
};

export default function VideoEditor() {
  const { themeColors } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [videoSection, setVideoSection] = useState<VideoSection>(defaultVideoSection);
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const courseEditor = searchParams.get('courseEditor') === 'true';
  const moduleId = searchParams.get('moduleId');
  const sectionId = searchParams.get('sectionId');
  const prefillId = searchParams.get('prefill');

  // Load prefill data if available
  useEffect(() => {
    if (prefillId) {
      mockApiCalls.loadSection(prefillId)
        .then(data => {
          setVideoSection({
            title: data.title || '',
            description: data.description || '',
            duration: data.duration || '',
            videoUrl: data.videoUrl || '',
            category: data.category || '',
            thumbnail: data.thumbnail || '',
            type: data.type || 'not_detected'
          });
        })
        .catch(error => {
          console.error('Failed to load video section:', error);
        });
    }
  }, [prefillId]);

  const handleFieldChange = (field: keyof VideoSection, value: string) => {
    setVideoSection(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateSection = () => {
    const errors: Record<string, string> = {};
    
    if (!videoSection.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!videoSection.description.trim()) {
      errors.description = 'Description is required';
    }
    if (!videoSection.duration.trim()) {
      errors.duration = 'Duration is required';
    }
    if (!videoSection.category.trim()) {
      errors.category = 'Category is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateSection()) {
      alert('Please fix validation errors before saving');
      return;
    }

    setIsSaving(true);
    
    try {
      // Save section via mock API
      const generatedSectionId = await mockApiCalls.saveSection('video', videoSection);
      
      console.log('Video section saved with ID:', generatedSectionId);
      console.log('Video section data:', JSON.stringify(videoSection, null, 2));
      
      if (courseEditor && moduleId && sectionId) {
        // Navigate back to course editor with section ID
        router.push(`/admin/course-editor?moduleId=${moduleId}&sectionId=${sectionId}&savedSectionId=${generatedSectionId}`);
      } else {
        alert('Video section saved successfully!');
      }
      
    } catch (error) {
      console.error('Failed to save video section:', error);
      alert('Failed to save video section. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    if (courseEditor && moduleId && sectionId) {
      router.push(`/admin/course-editor?moduleId=${moduleId}&sectionId=${sectionId}`);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeColors.primary }}>
      <AdminNavigation />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: themeColors.textPrimary }}>
              Video Editor
            </h1>
            <p className="text-sm" style={{ color: themeColors.textMuted }}>
              {prefillId ? 'Edit video section' : 'Create new video section'}
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="px-4 py-2 text-sm rounded transition-colors"
              style={{
                backgroundColor: themeColors.secondary,
                borderColor: themeColors.border,
                color: themeColors.textPrimary
              }}
            >
              ← Back
            </button>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 text-sm rounded transition-colors"
              style={{
                backgroundColor: themeColors.primary,
                borderColor: themeColors.border,
                color: themeColors.textPrimary
              }}
            >
              {isSaving ? 'Saving...' : 'Save Section'}
            </button>
          </div>
        </div>

        <div 
          className="rounded-lg p-6 space-y-6"
          style={{ backgroundColor: themeColors.secondary, borderColor: themeColors.border }}
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: themeColors.textPrimary }}>
              Title *
            </label>
            <input
              type="text"
              value={videoSection.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              className="w-full px-3 py-2 rounded transition-colors"
              style={{
                backgroundColor: themeColors.primary,
                borderColor: validationErrors.title ? '#ef4444' : themeColors.border,
                color: themeColors.textPrimary
              }}
              placeholder="Enter video title"
            />
            {validationErrors.title && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: themeColors.textPrimary }}>
              Description *
            </label>
            <textarea
              value={videoSection.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 rounded transition-colors"
              style={{
                backgroundColor: themeColors.primary,
                borderColor: validationErrors.description ? '#ef4444' : themeColors.border,
                color: themeColors.textPrimary
              }}
              placeholder="Enter video description"
            />
            {validationErrors.description && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: themeColors.textPrimary }}>
              Duration *
            </label>
            <input
              type="text"
              value={videoSection.duration}
              onChange={(e) => handleFieldChange('duration', e.target.value)}
              className="w-full px-3 py-2 rounded transition-colors"
              style={{
                backgroundColor: themeColors.primary,
                borderColor: validationErrors.duration ? '#ef4444' : themeColors.border,
                color: themeColors.textPrimary
              }}
              placeholder="e.g., 15 min"
            />
            {validationErrors.duration && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.duration}</p>
            )}
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: themeColors.textPrimary }}>
              Video URL
            </label>
            <input
              type="url"
              value={videoSection.videoUrl}
              onChange={(e) => handleFieldChange('videoUrl', e.target.value)}
              className="w-full px-3 py-2 rounded transition-colors"
              style={{
                backgroundColor: themeColors.primary,
                borderColor: themeColors.border,
                color: themeColors.textPrimary
              }}
              placeholder="https://example.com/video.mp4"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: themeColors.textPrimary }}>
              Category *
            </label>
            <select
              value={videoSection.category}
              onChange={(e) => handleFieldChange('category', e.target.value)}
              className="w-full px-3 py-2 rounded transition-colors"
              style={{
                backgroundColor: themeColors.primary,
                borderColor: validationErrors.category ? '#ef4444' : themeColors.border,
                color: themeColors.textPrimary
              }}
            >
              <option value="">Select category</option>
              {VIDEO_LEVELS.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            {validationErrors.category && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.category}</p>
            )}
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: themeColors.textPrimary }}>
              Thumbnail URL
            </label>
            <input
              type="url"
              value={videoSection.thumbnail}
              onChange={(e) => handleFieldChange('thumbnail', e.target.value)}
              className="w-full px-3 py-2 rounded transition-colors"
              style={{
                backgroundColor: themeColors.primary,
                borderColor: themeColors.border,
                color: themeColors.textPrimary
              }}
              placeholder="https://example.com/thumbnail.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
