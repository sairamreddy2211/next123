"use client";

import { useTheme } from '@/components/providers/ThemeProvider';

interface TagsInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  tagColor?: string;
}

export default function TagsInput({ 
  tags, 
  onTagsChange, 
  placeholder = "Add tag and press Enter",
  label = "Tags",
  tagColor = '#1D4ED8'
}: TagsInputProps) {
  const { themeColors } = useTheme();

  const removeTag = (indexToRemove: number) => {
    const updated = tags.filter((_, i) => i !== indexToRemove);
    onTagsChange(updated);
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      onTagsChange([...tags, tag.trim()]);
    }
  };

  return (
    <div>
      <label 
        className="block mb-1 font-semibold"
        style={{ color: themeColors.textPrimary }}
      >
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, idx) => (
          <span 
            key={idx} 
            className="text-xs px-2 py-1 rounded flex items-center"
            style={{ backgroundColor: tagColor, color: 'white' }}
          >
            {tag}
            <button
              className="ml-1 hover:opacity-70"
              style={{ color: '#FCA5A5' }}
              type="button"
              onClick={() => removeTag(idx)}
            >×</button>
          </span>
        ))}
      </div>
      <input
        className="w-full border rounded px-3 py-2"
        style={{
          backgroundColor: themeColors.tertiary,
          borderColor: themeColors.border,
          color: themeColors.textPrimary
        }}
        placeholder={placeholder}
        onKeyDown={e => {
          if (e.key === 'Enter' && e.currentTarget.value.trim()) {
            addTag(e.currentTarget.value);
            e.currentTarget.value = '';
            e.preventDefault();
          }
        }}
      />
    </div>
  );
}
