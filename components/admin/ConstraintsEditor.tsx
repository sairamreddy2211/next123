"use client";

import { useTheme } from '@/components/providers/ThemeProvider';

interface ConstraintsEditorProps {
  constraints: string[];
  onConstraintsChange: (constraints: string[]) => void;
}

export default function ConstraintsEditor({ constraints, onConstraintsChange }: ConstraintsEditorProps) {
  const { themeColors } = useTheme();

  const addConstraint = () => {
    onConstraintsChange([...constraints, '']);
  };

  const removeConstraint = (index: number) => {
    onConstraintsChange(constraints.filter((_, i) => i !== index));
  };

  const updateConstraint = (index: number, value: string) => {
    const updated = constraints.map((constraint, i) => 
      i === index ? value : constraint
    );
    onConstraintsChange(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label 
          className="font-semibold"
          style={{ color: themeColors.textPrimary }}
        >
          Constraints
        </label>
        <button
          type="button"
          onClick={addConstraint}
          className="px-3 py-1 text-sm rounded transition-colors"
          style={{
            backgroundColor: themeColors.accent,
            color: themeColors.primary
          }}
        >
          Add Constraint
        </button>
      </div>
      
      {constraints.map((constraint, idx) => (
        <div key={idx} className="flex gap-2 items-center mb-2">
          <span 
            className="text-sm font-mono"
            style={{ color: themeColors.textSecondary }}
          >
            {idx + 1}.
          </span>
          <input
            className="flex-1 border rounded px-3 py-2"
            style={{
              backgroundColor: themeColors.tertiary,
              borderColor: themeColors.border,
              color: themeColors.textPrimary
            }}
            value={constraint}
            onChange={e => updateConstraint(idx, e.target.value)}
            placeholder="Enter constraint..."
          />
          <button
            type="button"
            onClick={() => removeConstraint(idx)}
            className="px-2 py-1 text-red-500 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      
      {constraints.length === 0 && (
        <div 
          className="text-center py-4 border-2 border-dashed rounded"
          style={{ 
            borderColor: themeColors.border,
            color: themeColors.textSecondary 
          }}
        >
          No constraints added yet. Click "Add Constraint" to get started.
        </div>
      )}
    </div>
  );
}
