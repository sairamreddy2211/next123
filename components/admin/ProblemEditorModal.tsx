"use client";

import { useState, useEffect } from "react";
import { useTheme } from '@/components/providers/ThemeProvider';
import { mockApiCalls } from '@/lib/courseManager';
import { PROBLEM_CATEGORIES, PROBLEM_DIFFICULTIES, DEFAULT_HINTS } from '@/constants';

interface ProblemSection {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  companies: string[];
  category: string;
  content: string;
  examples: Array<{
    input: string;
    output: string;
    explanation: string;
  }>;
  constraints: string[];
  hints: string[];
  starterCode: {
    javascript: string;
    python: string;
    sql: string;
  };
}

const defaultProblemSection: ProblemSection = {
  title: '',
  description: '',
  difficulty: 'Easy',
  tags: [],
  companies: [],
  category: '',
  content: '',
  examples: [{ input: '', output: '', explanation: '' }],
  constraints: [''],
  hints: [...DEFAULT_HINTS],
  starterCode: {
    javascript: '',
    python: '',
    sql: ''
  }
};

interface ProblemEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sectionId: string) => void;
  prefillId?: string;
}

export default function ProblemEditorModal({ isOpen, onClose, onSave, prefillId }: ProblemEditorModalProps) {
  console.log('ProblemEditorModal render:', { isOpen, prefillId });
  const { themeColors } = useTheme();
  const [problemSection, setProblemSection] = useState<ProblemSection>(defaultProblemSection);
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Load prefill data if available
  useEffect(() => {
    if (prefillId && isOpen) {
      mockApiCalls.loadSection(prefillId)
        .then(data => {
          setProblemSection({
            title: data.title || '',
            description: data.description || '',
            difficulty: data.difficulty || 'Easy',
            tags: data.tags || [],
            companies: data.companies || [],
            category: data.category || '',
            content: data.content || '',
            examples: data.examples || [{ input: '', output: '', explanation: '' }],
            constraints: data.constraints || [''],
            hints: data.hints || [...DEFAULT_HINTS],
            starterCode: data.starterCode || {
              javascript: '',
              python: '',
              sql: ''
            }
          });
        })
        .catch(error => {
          console.error('Failed to load problem section:', error);
        });
    } else if (isOpen && !prefillId) {
      setProblemSection(defaultProblemSection);
    }
  }, [prefillId, isOpen]);

  const handleFieldChange = (field: keyof ProblemSection, value: any) => {
    setProblemSection(prev => ({ ...prev, [field]: value }));
    
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
    
    if (!problemSection.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!problemSection.description.trim()) {
      errors.description = 'Description is required';
    }
    if (!problemSection.category.trim()) {
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
      const generatedSectionId = await mockApiCalls.saveSection('problem', problemSection);
      
      console.log('Problem section saved with ID:', generatedSectionId);
      console.log('Problem section data:', JSON.stringify(problemSection, null, 2));
      
      onSave(generatedSectionId);
      onClose();
      
    } catch (error) {
      console.error('Failed to save problem section:', error);
      alert('Failed to save problem section. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const addExample = () => {
    setProblemSection(prev => ({
      ...prev,
      examples: [...prev.examples, { input: '', output: '', explanation: '' }]
    }));
  };

  const updateExample = (index: number, field: string, value: string) => {
    setProblemSection(prev => ({
      ...prev,
      examples: prev.examples.map((example, i) => 
        i === index ? { ...example, [field]: value } : example
      )
    }));
  };

  const removeExample = (index: number) => {
    if (problemSection.examples.length > 1) {
      setProblemSection(prev => ({
        ...prev,
        examples: prev.examples.filter((_, i) => i !== index)
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative h-full flex flex-col">
        <div 
          className="flex-1 overflow-y-auto"
          style={{ backgroundColor: themeColors.primary }}
        >
          <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2" style={{ color: themeColors.textPrimary }}>
                  Problem Editor
                </h1>
                <p className="text-sm" style={{ color: themeColors.textMuted }}>
                  {prefillId ? 'Edit problem section' : 'Create new problem section'}
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm rounded transition-colors"
                  style={{
                    backgroundColor: themeColors.secondary,
                    borderColor: themeColors.border,
                    color: themeColors.textPrimary
                  }}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm rounded transition-colors"
                  style={{
                    backgroundColor: themeColors.accent,
                    borderColor: themeColors.border,
                    color: themeColors.textPrimary
                  }}
                >
                  {isSaving ? 'Saving...' : 'Save Section'}
                </button>
              </div>
            </div>

            {/* Form Content */}
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
                  value={problemSection.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="w-full px-3 py-2 rounded transition-colors"
                  style={{
                    backgroundColor: themeColors.primary,
                    borderColor: validationErrors.title ? '#ef4444' : themeColors.border,
                    color: themeColors.textPrimary
                  }}
                  placeholder="Enter problem title"
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
                  value={problemSection.description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 rounded transition-colors"
                  style={{
                    backgroundColor: themeColors.primary,
                    borderColor: validationErrors.description ? '#ef4444' : themeColors.border,
                    color: themeColors.textPrimary
                  }}
                  placeholder="Enter problem description (supports markdown)"
                />
                {validationErrors.description && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
                )}
              </div>

              {/* Difficulty and Category Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: themeColors.textPrimary }}>
                    Difficulty
                  </label>
                  <select
                    value={problemSection.difficulty}
                    onChange={(e) => handleFieldChange('difficulty', e.target.value)}
                    className="w-full px-3 py-2 rounded transition-colors"
                    style={{
                      backgroundColor: themeColors.primary,
                      borderColor: themeColors.border,
                      color: themeColors.textPrimary
                    }}
                  >
                    {PROBLEM_DIFFICULTIES.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: themeColors.textPrimary }}>
                    Category *
                  </label>
                  <select
                    value={problemSection.category}
                    onChange={(e) => handleFieldChange('category', e.target.value)}
                    className="w-full px-3 py-2 rounded transition-colors"
                    style={{
                      backgroundColor: themeColors.primary,
                      borderColor: validationErrors.category ? '#ef4444' : themeColors.border,
                      color: themeColors.textPrimary
                    }}
                  >
                    <option value="">Select category</option>
                    {PROBLEM_CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {validationErrors.category && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.category}</p>
                  )}
                </div>
              </div>

              {/* Examples */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium" style={{ color: themeColors.textPrimary }}>
                    Examples
                  </label>
                  <button
                    onClick={addExample}
                    className="px-3 py-1 text-sm rounded transition-colors"
                    style={{
                      backgroundColor: themeColors.accent,
                      color: themeColors.textPrimary
                    }}
                  >
                    + Add Example
                  </button>
                </div>
                
                {problemSection.examples.map((example, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded mb-4"
                    style={{ backgroundColor: themeColors.tertiary, borderColor: themeColors.border }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium" style={{ color: themeColors.textPrimary }}>
                        Example {index + 1}
                      </span>
                      {problemSection.examples.length > 1 && (
                        <button
                          onClick={() => removeExample(index)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm mb-1" style={{ color: themeColors.textPrimary }}>Input</label>
                        <textarea
                          value={example.input}
                          onChange={(e) => updateExample(index, 'input', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 rounded"
                          style={{
                            backgroundColor: themeColors.primary,
                            borderColor: themeColors.border,
                            color: themeColors.textPrimary
                          }}
                          placeholder="Example input"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm mb-1" style={{ color: themeColors.textPrimary }}>Output</label>
                        <textarea
                          value={example.output}
                          onChange={(e) => updateExample(index, 'output', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 rounded"
                          style={{
                            backgroundColor: themeColors.primary,
                            borderColor: themeColors.border,
                            color: themeColors.textPrimary
                          }}
                          placeholder="Expected output"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm mb-1" style={{ color: themeColors.textPrimary }}>Explanation</label>
                        <textarea
                          value={example.explanation}
                          onChange={(e) => updateExample(index, 'explanation', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 rounded"
                          style={{
                            backgroundColor: themeColors.primary,
                            borderColor: themeColors.border,
                            color: themeColors.textPrimary
                          }}
                          placeholder="Explanation of the example"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
