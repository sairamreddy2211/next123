"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Course } from '@/lib/courseManager';
import { mockApiCalls } from '@/lib/mockApiCalls';

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
  isLoading: boolean;
}

function CreateCourseModal({ isOpen, onClose, onSubmit, isLoading }: CreateCourseModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { themeColors } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), description.trim());
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div 
        className="w-full max-w-md p-6 rounded-lg shadow-xl"
        style={{ backgroundColor: themeColors.secondary }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Create New Course</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">
              Course Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-black rounded border focus:outline-none focus:border-blue-500"
              placeholder="Enter course title"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-black rounded border focus:outline-none focus:border-blue-500 h-24 resize-none"
              placeholder="Enter course description"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-white rounded hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: '#6B7280' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || isLoading}
              className="flex-1 px-4 py-2 text-white rounded hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: themeColors.accent }}
            >
              {isLoading ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CourseDashboard() {
  const { themeColors } = useTheme();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const allCourses = await mockApiCalls.getAllCourses();
      setCourses(allCourses);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (title: string, description: string) => {
    try {
      setCreating(true);
      const newCourse = await mockApiCalls.createCourse(title, description);
      setCourses(prev => [newCourse, ...prev]);
      setShowCreateModal(false);
      
      // Navigate to course editor with the new course ID
      router.push(`/admin/course-editor?courseId=${newCourse.id}`);
    } catch (error) {
      console.error('Failed to create course:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleEditCourse = (courseId: string) => {
    router.push(`/admin/course-editor?courseId=${courseId}`);
  };

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  const publishedCount = courses.filter(c => c.status === 'published').length;
  const draftCount = courses.filter(c => c.status === 'draft').length;

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: themeColors.primary }}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Course Management</h1>
            <p className="text-gray-300">Create and manage your courses</p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: themeColors.accent }}
          >
            + Create New Course
          </button>
        </div>

        {/* Stats and Filter */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: themeColors.secondary }}
          >
            <div className="text-2xl font-bold text-green-400">{publishedCount}</div>
            <div className="text-sm text-gray-300">Published Courses</div>
          </div>
          
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: themeColors.secondary }}
          >
            <div className="text-2xl font-bold text-yellow-400">{draftCount}</div>
            <div className="text-sm text-gray-300">Draft Courses</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'all', label: 'All Courses', count: courses.length },
            { key: 'published', label: 'Published', count: publishedCount },
            { key: 'draft', label: 'Drafts', count: draftCount }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === key 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
              style={{ 
                backgroundColor: filter === key ? themeColors.accent : themeColors.secondary 
              }}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Courses List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl">Loading courses...</div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div 
            className="text-center py-12 rounded-lg"
            style={{ backgroundColor: themeColors.secondary }}
          >
            <div className="text-xl mb-2">No courses found</div>
            <div className="text-gray-400 mb-4">
              {filter === 'all' 
                ? 'Start by creating your first course'
                : `No ${filter} courses available`
              }
            </div>
            {filter === 'all' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-2 text-white rounded font-semibold hover:opacity-90"
                style={{ backgroundColor: themeColors.accent }}
              >
                Create Course
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
                style={{ backgroundColor: themeColors.secondary }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          course.status === 'published'
                            ? 'bg-green-600 text-green-100'
                            : 'bg-yellow-600 text-yellow-100'
                        }`}
                      >
                        {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                      </span>
                    </div>
                    {course.description && (
                      <p className="text-gray-300 mb-2">{course.description}</p>
                    )}
                    <div className="text-sm text-gray-400">
                      {course.modules.length} module{course.modules.length !== 1 ? 's' : ''} • 
                      Updated {new Date(course.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleEditCourse(course.id)}
                    className="px-4 py-2 text-white rounded font-medium hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: themeColors.accent }}
                  >
                    Edit Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Course Modal */}
      <CreateCourseModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateCourse}
        isLoading={creating}
      />
    </div>
  );
}
