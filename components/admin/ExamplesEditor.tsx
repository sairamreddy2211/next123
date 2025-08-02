"use client";

import { useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface ExamplesEditorProps {
  examples: Example[];
  onExamplesChange: (examples: Example[]) => void;
}

export default function ExamplesEditor({ examples, onExamplesChange }: ExamplesEditorProps) {
  const { themeColors } = useTheme();

  const addExample = () => {
    onExamplesChange([...examples, { input: '', output: '', explanation: '' }]);
  };

  const removeExample = (index: number) => {
    onExamplesChange(examples.filter((_, i) => i !== index));
  };

  const updateExample = (index: number, field: keyof Example, value: string) => {
    const updated = examples.map((example, i) => 
      i === index ? { ...example, [field]: value } : example
    );
    onExamplesChange(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label 
          className="font-semibold"
          style={{ color: themeColors.textPrimary }}
        >
          Examples
        </label>
        <button
          type="button"
          onClick={addExample}
          className="px-3 py-1 text-sm rounded transition-colors"
          style={{
            backgroundColor: themeColors.accent,
            color: themeColors.primary
          }}
        >
          Add Example
        </button>
      </div>
      
      {examples.map((example, idx) => (
        <div 
          key={idx} 
          className="border rounded p-3 mb-3"
          style={{
            borderColor: themeColors.border,
            backgroundColor: themeColors.secondary
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <h4 
              className="font-medium"
              style={{ color: themeColors.textPrimary }}
            >
              Example {idx + 1}
            </h4>
            <button
              type="button"
              onClick={() => removeExample(idx)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label 
                className="block text-sm font-medium mb-1"
                style={{ color: themeColors.textSecondary }}
              >
                Input
              </label>
              <textarea
                className="w-full border rounded px-2 py-1 text-sm font-mono"
                style={{
                  backgroundColor: themeColors.tertiary,
                  borderColor: themeColors.border,
                  color: themeColors.textPrimary
                }}
                rows={3}
                value={example.input}
                placeholder="Input..."
                onChange={e => updateExample(idx, 'input', e.target.value)}
              />
            </div>
            
            <div>
              <label 
                className="block text-sm font-medium mb-1"
                style={{ color: themeColors.textSecondary }}
              >
                Output
              </label>
              <textarea
                className="w-full border rounded px-2 py-1 text-sm font-mono"
                style={{
                  backgroundColor: themeColors.tertiary,
                  borderColor: themeColors.border,
                  color: themeColors.textPrimary
                }}
                rows={3}
                value={example.output}
                placeholder="Output..."
                onChange={e => updateExample(idx, 'output', e.target.value)}
              />
            </div>
            
            <div>
              <label 
                className="block text-sm font-medium mb-1"
                style={{ color: themeColors.textSecondary }}
              >
                Explanation
              </label>
              <textarea
                className="w-full border rounded px-2 py-1 text-sm"
                style={{
                  backgroundColor: themeColors.tertiary,
                  borderColor: themeColors.border,
                  color: themeColors.textPrimary
                }}
                rows={3}
                value={example.explanation || ''}
                placeholder="Explanation..."
                onChange={e => updateExample(idx, 'explanation', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
      
      {examples.length === 0 && (
        <div 
          className="text-center py-4 border-2 border-dashed rounded"
          style={{ 
            borderColor: themeColors.border,
            color: themeColors.textSecondary 
          }}
        >
          No examples added yet. Click "Add Example" to get started.
        </div>
      )}
    </div>
  );
}
