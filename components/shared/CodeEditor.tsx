"use client";

import { useState, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { Play, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';

interface CodeEditorProps {
  language: string;
  defaultValue: string;
  onChange?: (value: string) => void;
  onRun?: (code: string) => void;
  onReset?: () => void;
  testResults?: TestResult[];
  isRunning?: boolean;
}

interface TestResult {
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  hidden?: boolean;
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
  const [code, setCode] = useState(defaultValue);

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onChange?.(newCode);
  };

  const handleRun = () => {
    onRun?.(code);
  };

  const handleReset = () => {
    setCode(defaultValue);
    onChange?.(defaultValue);
    onReset?.();
  };

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on' as const,
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on' as const,
    bracketPairColorization: { enabled: true },
    renderLineHighlight: 'gutter' as const,
    selectionHighlight: false,
    occurrencesHighlight: 'off' as const,
  };

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-black" style={{ borderBottomColor: '#222222', backgroundColor: '#262626' }}>
        <div className="flex items-center space-x-2">
          {/* <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div> */}

            <Image src="/code.svg" alt="Code Icon" width={20} height={20} className="w-5 h-5" />
            <span className="text-white">Code</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-400 hover:text-gray-300 rounded transition-colors"
            style={{ backgroundColor: 'transparent', border: '1px solid #222222' }}
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded text-xs font-medium transition-colors"
          >
            <Play className="w-3 h-3" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-0 bg-black">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          options={editorOptions}
          theme="vs-dark"
          beforeMount={(monaco) => {
            // Define custom LeetCode-like theme
            monaco.editor.defineTheme('leetcode-theme', {
              base: 'vs-dark',
              inherit: true,
              rules: [
                { token: 'comment', foreground: '6B7280', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'C678DD' },
                { token: 'string', foreground: '98C379' },
                { token: 'number', foreground: 'D19A66' },
                { token: 'type', foreground: 'E06C75' },
                { token: 'identifier', foreground: 'ABB2BF' },
                { token: 'operator', foreground: '56B6C2' },
              ],
              colors: {
                'editor.background': '#000000',
                'editor.foreground': '#F9FAFB',
                'editor.lineHighlightBackground': '#222222',
                'editor.selectionBackground': '#4B5563',
                'editor.inactiveSelectionBackground': '#374151',
                'editorCursor.foreground': '#F9FAFB',
                'editorLineNumber.foreground': '#6B7280',
                'editorLineNumber.activeForeground': '#D1D5DB',
                'editorGutter.background': '#000000',
                'editorWidget.background': '#262626',
                'editorWidget.border': '#222222',
                'input.background': '#262626',
                'input.border': '#222222',
                'dropdown.background': '#262626',
                'dropdown.border': '#222222',
                'list.hoverBackground': '#333333',
                'list.activeSelectionBackground': '#333333',
              }
            });
            monaco.editor.setTheme('leetcode-theme');
          }}
        />
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="border-t p-4 max-h-48 overflow-y-auto" style={{ borderTopColor: '#222222', backgroundColor: '#262626' }}>
          <h4 className="text-sm font-semibold text-white mb-3">Test Results:</h4>
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  result.passed
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {result.passed ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                  <span className="text-sm font-medium text-white">
                    Test Case {index + 1} {result.hidden ? '(Hidden)' : ''}
                  </span>
                </div>
                
                {!result.hidden && (
                  <div className="text-xs space-y-1">
                    <div>
                      <span className="font-medium text-gray-300">Input:</span> 
                      <span className="text-green-400 ml-2">{result.input}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-300">Expected:</span> 
                      <span className="text-blue-400 ml-2">{result.expectedOutput}</span>
                    </div>
                    {!result.passed && (
                      <div>
                        <span className="font-medium text-gray-300">Got:</span> 
                        <span className="text-red-400 ml-2">{result.actualOutput}</span>
                      </div>
                    )}
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
