'use client'

import { Editor } from '@monaco-editor/react'
import { useState } from 'react'
import { oneCompilerExecutor } from '../lib/oneCompilerExecutor'

interface CodeEditorProps {
  defaultLanguage?: string
  defaultValue?: string
  onChange?: (value: string | undefined) => void
  onLanguageChange?: (language: string) => void
  height?: string | number
  problem?: any
  theme?: string
}

export function CodeEditor({
  defaultLanguage = 'sql',
  defaultValue = '',
  onChange,
  onLanguageChange,
  height = '400px',
  problem,
  theme = 'vs-dark'
}: CodeEditorProps) {
  const [language, setLanguage] = useState(defaultLanguage)
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)

  const handleEditorChange = (value: string | undefined) => {
    onChange?.(value)
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    onLanguageChange?.(newLanguage)
  }

  const runCode = async () => {
    if (!defaultValue) {
      setOutput('❌ No code to execute')
      return
    }

    setIsRunning(true)
    setOutput('🚀 Executing code...')

    try {
      const result = await oneCompilerExecutor.executeCode(
        defaultValue, 
        language, 
        problem?.tables
      )

      if (result.success) {
        setOutput(`✅ Success!\n\n${result.output}`)
      } else {
        setOutput(`❌ Error:\n${result.error}`)
      }
    } catch (error: any) {
      setOutput(`❌ Execution failed: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="w-full h-full">
      {/* Monaco Editor */}
      <Editor
        height={height}
        language={language === 'postgresql' ? 'sql' : language}
        value={defaultValue}
        onChange={handleEditorChange}
        theme={theme}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          renderLineHighlight: 'all',
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            verticalScrollbarSize: 12,
            horizontalScrollbarSize: 12
          }
        }}
      />

      {/* Output Section */}
      {output && (
        <div className="mt-4 border border-gray-700 rounded">
          <div className="bg-[#2d2d2d] px-4 py-2 border-b border-gray-700">
            <h4 className="font-medium text-gray-300">Output</h4>
          </div>
          <div className="p-4 bg-[#1e1e1e] text-gray-300 font-mono text-sm max-h-48 overflow-y-auto whitespace-pre-wrap">
            {output}
          </div>
        </div>
      )}
    </div>
  )
}
