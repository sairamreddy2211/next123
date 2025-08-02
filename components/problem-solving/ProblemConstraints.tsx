"use client";

import { useTheme } from '@/components/providers/ThemeProvider';

interface ProblemConstraintsProps {
  constraints: string[];
}

export default function ProblemConstraints({ constraints }: ProblemConstraintsProps) {
  const { themeColors } = useTheme();

  if (!constraints || constraints.length === 0) {
    return null;
  }

  return (
    <div>
      {/* Constraints */}
      <div className="mt-6">
        <h3 
          className="font-semibold mb-3 text-sm"
          style={{ color: themeColors.textSecondary }}
        >
          Constraints
        </h3>
        <div 
          className="p-4 rounded-lg border"
          style={{ 
            backgroundColor: themeColors.secondary,
            borderColor: themeColors.border
          }}
        >
          <ul 
            className="space-y-2 text-sm"
            style={{ color: themeColors.textPrimary }}
          >
            {constraints.map((constraint, idx) => (
              <li key={idx} className="flex items-start">
                <span 
                  className="inline-block w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0"
                  style={{ backgroundColor: themeColors.accent }}
                />
                <span>{constraint}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
