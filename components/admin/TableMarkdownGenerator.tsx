"use client";

import { useState, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from '@/components/providers/ThemeProvider';

export default function TableMarkdownGenerator() {
  const { themeColors } = useTheme();
  const [columns, setColumns] = useState<string[]>([""]);
  const [rows, setRows] = useState<string[][]>([[""]]);
  const [show, setShow] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Generate markdown
  const getMarkdown = () => {
    if (columns.length === 0 || columns.every(col => !col.trim())) return '';
    const header = '| ' + columns.map(col => col || ' ').join(' | ') + ' |';
    const divider = '| ' + columns.map(() => '---').join(' | ') + ' |';
    const body = rows
      .map(row => '| ' + columns.map((_, i) => row[i] || ' ').join(' | ') + ' |')
      .join('\n');
    return [header, divider, body].filter(Boolean).join('\n');
  };

  const handleCopy = () => {
    const md = getMarkdown();
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(md);
    }
  };

  return (
    <div className="mb-6">
      <button
        className="mb-2 px-3 py-1 rounded text-xs font-medium transition-colors"
        style={{
          backgroundColor: themeColors.tertiary,
          borderColor: themeColors.border,
          color: themeColors.textPrimary
        }}
        onClick={() => setShow(v => !v)}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = themeColors.border}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = themeColors.tertiary}
      >
        {show ? 'Hide Table Markdown Generator' : 'Show Table Markdown Generator'}
      </button>
      {show && (
        <div 
          className="p-4 rounded-lg border mb-2"
          style={{
            backgroundColor: themeColors.border,
            borderColor: themeColors.tertiary
          }}
        >
          <div className="mb-2">
            <label 
              className="block font-semibold mb-1"
              style={{ color: themeColors.textPrimary }}
            >
              Columns
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {columns.map((col, idx) => (
                <input
                  key={idx}
                  className="border rounded px-2 py-1 text-xs w-32"
                  style={{
                    backgroundColor: themeColors.tertiary,
                    borderColor: themeColors.border,
                    color: themeColors.textPrimary
                  }}
                  placeholder={`Column ${idx + 1}`}
                  value={col}
                  onChange={e => {
                    const updated = [...columns];
                    updated[idx] = e.target.value;
                    setColumns(updated);
                  }}
                />
              ))}
              <button
                className="text-xs hover:underline"
                style={{ color: '#22C55E' }}
                onClick={() => setColumns(cols => [...cols, ''])}
              >+ Add Column</button>
              {columns.length > 1 && (
                <button
                  className="text-xs hover:underline"
                  style={{ color: '#EF4444' }}
                  onClick={() => setColumns(cols => cols.slice(0, -1))}
                >- Remove</button>
              )}
            </div>
          </div>
          <div className="mb-2">
            <label 
              className="block font-semibold mb-1"
              style={{ color: themeColors.textPrimary }}
            >
              Rows
            </label>
            {rows.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-2 mb-1">
                {columns.map((_, cIdx) => (
                  <input
                    key={cIdx}
                    className="border rounded px-2 py-1 text-xs w-32"
                    style={{
                      backgroundColor: themeColors.tertiary,
                      borderColor: themeColors.border,
                      color: themeColors.textPrimary
                    }}
                    placeholder={`Row ${rIdx + 1} Col ${cIdx + 1}`}
                    value={row[cIdx] || ''}
                    onChange={e => {
                      const updatedRows = rows.map(arr => [...arr]);
                      updatedRows[rIdx][cIdx] = e.target.value;
                      setRows(updatedRows);
                    }}
                  />
                ))}
                <button
                  className="text-xs hover:underline"
                  style={{ color: '#EF4444' }}
                  onClick={() => setRows(rows => rows.length > 1 ? rows.filter((_, i) => i !== rIdx) : rows)}
                  disabled={rows.length === 1}
                >Remove</button>
              </div>
            ))}
            <button
              className="text-xs hover:underline"
              style={{ color: '#22C55E' }}
              onClick={() => setRows(rows => [...rows, Array(columns.length).fill('')])}
            >+ Add Row</button>
          </div>
          <div className="mb-2">
            <label 
              className="block font-semibold mb-1"
              style={{ color: themeColors.textPrimary }}
            >
              Markdown Output
            </label>
            <textarea
              ref={textareaRef}
              className="w-full border rounded px-2 py-1 text-xs font-mono mb-2"
              style={{
                backgroundColor: themeColors.tertiary,
                borderColor: themeColors.border,
                color: themeColors.textPrimary
              }}
              rows={Math.max(3, rows.length + 2)}
              value={getMarkdown()}
              readOnly
              onFocus={e => e.target.select()}
            />
            <button
              className="px-3 py-1 border rounded text-xs transition-colors"
              style={{
                backgroundColor: themeColors.tertiary,
                borderColor: themeColors.border,
                color: themeColors.textPrimary
              }}
              onClick={handleCopy}
              type="button"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = themeColors.secondary}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = themeColors.tertiary}
            >Copy Markdown</button>
          </div>
          <div>
            <label 
              className="block font-semibold mb-1"
              style={{ color: themeColors.textPrimary }}
            >
              Preview
            </label>
            <div 
              className="p-2 rounded border overflow-x-auto"
              style={{
                backgroundColor: themeColors.primary,
                borderColor: themeColors.border
              }}
            >
              <div className="prose prose-invert max-w-none" style={{ color: themeColors.textSecondary }}>
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({node, ...props}: any) => (
                      <table 
                        className="min-w-full border my-2 text-xs" 
                        style={{ borderColor: themeColors.border }}
                        {...props} 
                      />
                    ), 
                    th: ({node, ...props}: any) => (
                      <th 
                        className="border px-2 py-1 text-xs" 
                        style={{ 
                          borderColor: themeColors.border,
                          backgroundColor: themeColors.secondary,
                          color: themeColors.textPrimary
                        }}
                        {...props} 
                      />
                    ), 
                    td: ({node, ...props}: any) => (
                      <td 
                        className="border px-2 py-1 text-xs" 
                        style={{ 
                          borderColor: themeColors.border,
                          color: themeColors.textSecondary
                        }}
                        {...props} 
                      />
                    ), 
                    tr: ({node, ...props}: any) => <tr {...props} />
                  }}
                >
                  {getMarkdown()}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
