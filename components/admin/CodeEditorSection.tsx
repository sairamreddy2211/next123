"use client";

import { useTheme } from '@/components/providers/ThemeProvider';
import CodeEditor from '@/components/shared/CodeEditor';

interface CodeEditorSectionProps {
  languages: Array<{
    key: string;
    name: string;
  }>;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  starterCode: { [key: string]: string };
  onStarterCodeChange: (language: string, code: string) => void;
}

export default function CodeEditorSection({
  languages,
  selectedLanguage,
  onLanguageChange,
  starterCode,
  onStarterCodeChange
}: CodeEditorSectionProps) {
  const { themeColors } = useTheme();

  return (
    <div className="flex flex-col h-full">
      <label 
        className="block text-sm font-medium mb-2"
        style={{ color: themeColors.textPrimary }}
      >
        Starter Code
      </label>
      
      <div className="flex gap-2 mb-3">
        {languages.map((lang) => (
          <button
            key={lang.key}
            type="button"
            onClick={() => onLanguageChange(lang.key)}
            className="px-3 py-1 text-sm rounded transition-colors"
            style={{
              backgroundColor: selectedLanguage === lang.key 
                ? themeColors.accent 
                : themeColors.secondary,
              color: selectedLanguage === lang.key 
                ? themeColors.primary 
                : themeColors.textPrimary,
              borderWidth: '1px',
              borderColor: themeColors.border
            }}
          >
            {lang.name}
          </button>
        ))}
      </div>
      
      <div 
        className="border rounded overflow-hidden flex-1"
        style={{ borderColor: themeColors.border }}
      >
        <CodeEditor
          defaultValue={starterCode[selectedLanguage] || ''}
          onChange={(value) => onStarterCodeChange(selectedLanguage, value)}
          language={selectedLanguage}
        />
      </div>
      
      <p 
        className="text-xs mt-1"
        style={{ color: themeColors.textSecondary }}
      >
        Provide starter code for {languages.find(l => l.key === selectedLanguage)?.name}. 
        Switch languages using the tabs above.
      </p>
    </div>
  );
}
