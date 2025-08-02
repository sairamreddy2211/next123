"use client";

import { useTheme } from '@/components/providers/ThemeProvider';

type LearningModeType = 'interactive' | 'video' | 'document';

interface ContentSwitcherProps {
  currentMode: LearningModeType;
  onModeChange: (mode: LearningModeType) => void;
  availableModes?: LearningModeType[];
}

export default function ContentSwitcher({ 
  currentMode, 
  onModeChange, 
  availableModes = ['interactive', 'video'] 
}: ContentSwitcherProps) {
  const { themeColors } = useTheme();
  
  const modeLabels: Record<LearningModeType, string> = {
    interactive: 'Interactive Practice',
    video: 'Video Lessons',
    document: 'Study Notes'
  };

  return (
    <div 
      className="flex items-center space-x-1 rounded-lg p-1"
      style={{ backgroundColor: themeColors.secondary }}
    >
      {availableModes.map((mode) => (
        <button
          key={mode}
          onClick={() => onModeChange(mode)}
          className="px-4 py-2 text-sm font-medium rounded-md transition-colors"
          style={{
            backgroundColor: currentMode === mode ? themeColors.tertiary : 'transparent',
            color: currentMode === mode ? themeColors.textPrimary : themeColors.textSecondary,
            boxShadow: currentMode === mode ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (currentMode !== mode) {
              e.currentTarget.style.backgroundColor = `${themeColors.tertiary}50`;
            }
          }}
          onMouseLeave={(e) => {
            if (currentMode !== mode) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          {modeLabels[mode]}
        </button>
      ))}
    </div>
  );
}
