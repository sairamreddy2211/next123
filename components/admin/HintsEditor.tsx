"use client";

import { useTheme } from '@/components/providers/ThemeProvider';

interface HintsEditorProps {
  hints: string[];
  onHintsChange: (hints: string[]) => void;
}

export default function HintsEditor({ hints, onHintsChange }: HintsEditorProps) {
  const { themeColors } = useTheme();

  const addHint = () => {
    onHintsChange([...hints, '']);
  };

  const removeHint = (index: number) => {
    onHintsChange(hints.filter((_, i) => i !== index));
  };

  const updateHint = (index: number, value: string) => {
    const updated = hints.map((hint, i) => 
      i === index ? value : hint
    );
    onHintsChange(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label 
          className="font-semibold"
          style={{ color: themeColors.textPrimary }}
        >
          Hints
        </label>
        <button
          type="button"
          onClick={addHint}
          className="px-3 py-1 text-sm rounded transition-colors"
          style={{
            backgroundColor: themeColors.accent,
            color: themeColors.primary
          }}
        >
          Add Hint
        </button>
      </div>
      
      {hints.map((hint, idx) => (
        <div key={idx} className="flex gap-2 items-center mb-2">
          <span 
            className="text-sm font-mono"
            style={{ color: themeColors.textSecondary }}
          >
            Hint {idx + 1}:
          </span>
          <input
            className="flex-1 border rounded px-3 py-2"
            style={{
              backgroundColor: themeColors.tertiary,
              borderColor: themeColors.border,
              color: themeColors.textPrimary
            }}
            value={hint}
            onChange={e => updateHint(idx, e.target.value)}
            placeholder="Enter helpful hint..."
          />
          <button
            type="button"
            onClick={() => removeHint(idx)}
            className="px-2 py-1 text-red-500 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      
      {hints.length === 0 && (
        <div 
          className="text-center py-4 border-2 border-dashed rounded"
          style={{ 
            borderColor: themeColors.border,
            color: themeColors.textSecondary 
          }}
        >
          No hints added yet. Click "Add Hint" to get started.
        </div>
      )}
    </div>
  );
}
