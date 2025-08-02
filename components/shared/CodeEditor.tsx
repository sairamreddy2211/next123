"use client";

import { useState, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { Play, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import type { TestResult } from '@/models/problem';

interface CodeEditorProps {
  language: string;
  defaultValue: string;
  onChange?: (value: string) => void;
  onRun?: (code: string) => void;
  onReset?: () => void;
  testResults?: TestResult[];
  isRunning?: boolean;
}

export default function CodeEditor({
  language = 'sql',
  defaultValue,
  onChange,
  onRun,
  onReset,
  testResults = [],
  isRunning = false
}: CodeEditorProps) {
  const { themeColors } = useTheme();
  const [code, setCode] = useState(defaultValue);

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value ?? '';
    setCode(newCode);
    if (onChange) onChange(newCode);
  };

  const handleRun = () => {
    if (onRun) onRun(code);
  };

  const handleReset = () => {
    setCode(defaultValue);
    if (onChange) onChange(defaultValue);
    if (onReset) onReset();
  };

  // Get language label
  const getLanguageLabel = () => {
    switch (language) {
      case 'sql':
      case 'postgres':
        return 'SQL';
      case 'javascript':
        return 'JavaScript';
      case 'python':
        return 'Python';
      default:
        return language.toUpperCase();
    }
  };

  const passedTests = testResults.filter(t => t.passed).length;
  const totalTests = testResults.length;

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: themeColors.primary }}>
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-2 border-b" 
        style={{ 
          borderBottomColor: themeColors.border, 
          backgroundColor: themeColors.secondary 
        }}
      >
        {/* Language info */}
        <div className="flex items-center space-x-2">
          <span 
            className="text-sm font-medium" 
            style={{ color: themeColors.textPrimary }}
          >
            {getLanguageLabel()}
          </span>
          <div 
            className="px-2 py-1 rounded text-xs" 
            style={{ 
              backgroundColor: 'transparent', 
              border: `1px solid ${themeColors.border}`,
              color: themeColors.textMuted
            }}
          >
            Code
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center space-x-1 px-3 py-1 text-white rounded text-xs font-medium transition-colors"
            style={{ 
              backgroundColor: isRunning ? '#6B7280' : '#16A34A',
              cursor: isRunning ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!isRunning) e.currentTarget.style.backgroundColor = '#15803D';
            }}
            onMouseLeave={(e) => {
              if (!isRunning) e.currentTarget.style.backgroundColor = '#16A34A';
            }}
          >
            <Play className="w-3 h-3" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1 rounded hover:opacity-70 transition-opacity"
            style={{ color: themeColors.textMuted }}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0" style={{ backgroundColor: themeColors.primary }}>
        <Editor
          language={language === 'postgres' ? 'sql' : language}
          value={code}
          onChange={handleEditorChange}
          theme="leetcode-theme"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: 'on',
            wordWrap: 'on',
            automaticLayout: true,
            contextmenu: false,
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible'
            },
          }}
          beforeMount={(monaco) => {
            // Define custom theme using our theme colors
            monaco.editor.defineTheme('leetcode-theme', {
              base: 'vs-dark',
              inherit: true,
              rules: [],
              colors: {
                'editor.background': themeColors.primary,
                'editor.foreground': themeColors.textPrimary,
                'editor.lineHighlightBackground': themeColors.border,
                'editorLineNumber.foreground': themeColors.textMuted,
                'editorLineNumber.activeForeground': themeColors.textSecondary,
                'editor.selectionBackground': `${themeColors.tertiary}80`,
                'editor.inactiveSelectionBackground': `${themeColors.tertiary}40`,
                'editorCursor.foreground': themeColors.textPrimary,
                'editorWhitespace.foreground': themeColors.textMuted,
                'editorWidget.background': themeColors.secondary,
                'editorWidget.border': themeColors.border,
                'input.background': themeColors.secondary,
                'input.border': themeColors.border,
                'dropdown.background': themeColors.secondary,
                'dropdown.border': themeColors.border,
                'list.hoverBackground': themeColors.tertiary,
                'list.activeSelectionBackground': themeColors.tertiary,
              }
            });
          }}
        />
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div 
          className="border-t p-4 max-h-48 overflow-y-auto" 
          style={{ 
            borderTopColor: themeColors.border, 
            backgroundColor: themeColors.secondary 
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 
              className="text-sm font-semibold"
              style={{ color: themeColors.textPrimary }}
            >
              Test Results ({passedTests}/{totalTests} passed)
            </h3>
            <div className="flex items-center space-x-2">
              {passedTests === totalTests && totalTests > 0 ? (
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-500">All tests passed!</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-xs text-red-500">Some tests failed</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            {testResults.map((result, index) => (
              <div 
                key={index} 
                className="p-3 rounded-lg border"
                style={{ 
                  borderColor: result.passed ? '#16A34A' : '#DC2626',
                  backgroundColor: result.passed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(220, 38, 38, 0.1)'
                }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {result.passed ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span 
                    className="text-sm font-medium"
                    style={{ color: themeColors.textPrimary }}
                  >
                    Test Case {index + 1} {result.hidden ? '(Hidden)' : ''}
                  </span>
                </div>
                
                {!result.hidden && (
                  <div className="space-y-2 text-xs">
                    <div>
                      <span 
                        className="font-medium"
                        style={{ color: themeColors.textSecondary }}
                      >
                        Input: 
                      </span>
                      <code 
                        className="ml-1"
                        style={{ color: themeColors.textMuted }}
                      >
                        {result.input}
                      </code>
                    </div>
                    <div>
                      <span 
                        className="font-medium"
                        style={{ color: themeColors.textSecondary }}
                      >
                        Expected: 
                      </span>
                      <code 
                        className="ml-1"
                        style={{ color: themeColors.textMuted }}
                      >
                        {result.expectedOutput}
                      </code>
                    </div>
                    <div>
                      <span 
                        className="font-medium"
                        style={{ color: themeColors.textSecondary }}
                      >
                        Actual: 
                      </span>
                      <code 
                        className="ml-1"
                        style={{ color: result.passed ? themeColors.textMuted : '#DC2626' }}
                      >
                        {result.actualOutput}
                      </code>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
