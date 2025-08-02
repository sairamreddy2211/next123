"use client";

import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { DEFAULT_HINTS } from '@/constants';

interface ProblemHintsProps {
  showHints: boolean;
  setShowHints: (show: boolean) => void;
  hints?: string[];
}

export default function ProblemHints({ showHints, setShowHints, hints }: ProblemHintsProps) {
  const { themeColors } = useTheme();

  const displayHints = hints && hints.length > 0 ? hints : DEFAULT_HINTS;

  return (
    <div>
      {/* Hints */}
      <div className="mt-6">
        <button
          onClick={() => setShowHints(!showHints)}
          className="flex items-center gap-2 w-full text-left group transition-colors"
          style={{ color: themeColors.accent }}
        >
          <Lightbulb 
            size={16} 
            className="group-hover:opacity-80 transition-opacity" 
          />
          <span className="font-semibold text-sm">
            Hints {showHints ? '(Hide)' : '(Show)'}
          </span>
          {showHints ? (
            <ChevronUp size={16} className="ml-auto" />
          ) : (
            <ChevronDown size={16} className="ml-auto" />
          )}
        </button>
        
        {showHints && (
          <div 
            className="mt-3 p-3 rounded border"
            style={{
              backgroundColor: themeColors.secondary,
              borderColor: themeColors.border
            }}
          >
            <ul className="space-y-2">
              {displayHints.map((hint, idx) => (
                <li 
                  key={idx} 
                  className="flex items-start gap-2 text-sm"
                  style={{ color: themeColors.textPrimary }}
                >
                  <span 
                    className="font-mono font-bold mt-0.5"
                    style={{ color: themeColors.accent }}
                  >
                    {idx + 1}.
                  </span>
                  <span>{hint}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
