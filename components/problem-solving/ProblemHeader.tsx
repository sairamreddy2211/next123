"use client";

import { useTheme } from '@/components/providers/ThemeProvider';

interface ProblemHeaderProps {
  problem: any;
}

export default function ProblemHeader({ problem }: ProblemHeaderProps) {
  const { themeColors } = useTheme();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return `text-green-400 border-green-500/30`;
      case 'intermediate':
        return `text-orange-400 border-orange-500/30`;
      case 'advanced':
        return `text-red-400 border-red-500/30`;
      default:
        return `text-gray-400 border-gray-500/30`;
    }
  };

  const getDifficultyBgColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'rgba(16, 185, 129, 0.2)';
      case 'intermediate':
        return 'rgba(249, 115, 22, 0.2)';
      case 'advanced':
        return 'rgba(239, 68, 68, 0.2)';
      default:
        return 'rgba(107, 114, 128, 0.2)';
    }
  };
  
  return (
    <div>
      {/* Problem Title and Badges */}
      <div className="mb-4">
        <h1 
          className="text-2xl font-bold mb-2"
          style={{ color: themeColors.textPrimary }}
        >
          {problem.title || 'Untitled Problem'}
        </h1>
        
        <div className="flex flex-wrap gap-2 items-center">
          {problem.difficulty && (
            <span 
              className={`text-xs px-2 py-1 border rounded ${getDifficultyColor(problem.difficulty)}`}
              style={{ backgroundColor: getDifficultyBgColor(problem.difficulty) }}
            >
              {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
            </span>
          )}
          {problem.tags && problem.tags.map((tag: string, idx: number) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 rounded"
              style={{ 
                backgroundColor: 'rgba(59, 130, 246, 0.3)', 
                color: '#93C5FD' 
              }}
            >
              {tag}
            </span>
          ))}
          {problem.companies && problem.companies.map((company: string, idx: number) => (
            <span 
              key={company} 
              className="text-xs px-2 py-1 rounded"
              style={{ 
                backgroundColor: 'rgba(34, 197, 94, 0.3)', 
                color: '#86EFAC' 
              }}
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
