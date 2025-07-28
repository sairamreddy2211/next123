"use client";

import { LearningModeType } from '@/types';

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
  const modeLabels: Record<LearningModeType, string> = {
    interactive: 'Interactive Practice',
    video: 'Video Lessons',
    document: 'Study Notes'
  };

  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
      {availableModes.map((mode) => (
        <button
          key={mode}
          onClick={() => onModeChange(mode)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            currentMode === mode
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          {modeLabels[mode]}
        </button>
      ))}
    </div>
  );
}
