"use client";

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import TagsInput from './TagsInput';
import CompaniesInput from './CompaniesInput';
import { PROBLEM_DIFFICULTIES, PROBLEM_CATEGORIES } from '@/constants';

interface ProblemFormProps {
  formData: {
    title: string;
    category: string;
    difficulty: string;
    tags: string[];
    companies: string[];
    description: string;
    hint: string;
  };
  onFormDataChange: (data: any) => void;
}

export default function ProblemForm({ formData, onFormDataChange }: ProblemFormProps) {
  const { themeColors } = useTheme();

  const updateField = (field: string, value: any) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label 
          className="block mb-1 font-semibold"
          style={{ color: themeColors.textPrimary }}
        >
          Problem Title
        </label>
        <input
          className="w-full border rounded px-3 py-2"
          style={{
            backgroundColor: themeColors.tertiary,
            borderColor: themeColors.border,
            color: themeColors.textPrimary
          }}
          value={formData.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Enter problem title..."
        />
      </div>

      <div>
        <label 
          className="block mb-1 font-semibold"
          style={{ color: themeColors.textPrimary }}
        >
          Category
        </label>
        <select
          className="w-full border rounded px-3 py-2"
          style={{
            backgroundColor: themeColors.tertiary,
            borderColor: themeColors.border,
            color: themeColors.textPrimary
          }}
          value={formData.category}
          onChange={(e) => updateField('category', e.target.value)}
        >
          <option value="">Select Category</option>
          {PROBLEM_CATEGORIES.map((cat: string) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label 
          className="block mb-1 font-semibold"
          style={{ color: themeColors.textPrimary }}
        >
          Difficulty
        </label>
        <select
          className="w-full border rounded px-3 py-2"
          style={{
            backgroundColor: themeColors.tertiary,
            borderColor: themeColors.border,
            color: themeColors.textPrimary
          }}
          value={formData.difficulty}
          onChange={(e) => updateField('difficulty', e.target.value)}
        >
          <option value="">Select Difficulty</option>
          {PROBLEM_DIFFICULTIES.map((diff: string) => (
            <option key={diff} value={diff}>{diff}</option>
          ))}
        </select>
      </div>

      <div>
        <TagsInput
          tags={formData.tags}
          onTagsChange={(tags) => updateField('tags', tags)}
        />
      </div>

      <div className="md:col-span-2">
        <CompaniesInput
          companies={formData.companies}
          onCompaniesChange={(companies) => updateField('companies', companies)}
        />
      </div>
    </div>
  );
}
