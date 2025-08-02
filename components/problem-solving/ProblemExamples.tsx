"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { useTheme } from '@/components/providers/ThemeProvider';

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface ProblemExamplesProps {
  examples: Example[];
}

export default function ProblemExamples({ examples }: ProblemExamplesProps) {
  const { themeColors } = useTheme();

  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <div>
      {/* Examples */}
      <div className="mt-6">
        <h3 
          className="font-semibold mb-3 text-sm"
          style={{ color: themeColors.textSecondary }}
        >
          Examples
        </h3>
        {examples.map((example, idx) => (
          <div 
            key={idx} 
            className="mb-4 p-3 rounded border"
            style={{
              backgroundColor: themeColors.secondary,
              borderColor: themeColors.border
            }}
          >
            <div className="mb-2">
              <span 
                className="font-medium text-xs"
                style={{ color: themeColors.textSecondary }}
              >
                Example {idx + 1}:
              </span>
            </div>
            <div className="space-y-2">
              <div>
                <span 
                  className="font-medium text-xs"
                  style={{ color: themeColors.textSecondary }}
                >
                  Input:{' '}
                </span>
                <code 
                  className="text-xs font-mono px-1 py-0.5 rounded"
                  style={{
                    backgroundColor: themeColors.tertiary,
                    color: themeColors.accent
                  }}
                >
                  {example.input}
                </code>
              </div>
              <div>
                <span 
                  className="font-medium text-xs"
                  style={{ color: themeColors.textSecondary }}
                >
                  Output:{' '}
                </span>
                <div 
                  className="mt-1 text-xs"
                  style={{ color: themeColors.textPrimary }}
                >
                  <ReactMarkdown
                    remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkBreaks]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      table: ({node, ...props}) => (
                        <div className="overflow-x-auto my-2">
                          <table 
                            {...props} 
                            className="min-w-full border-collapse text-xs"
                            style={{ 
                              borderColor: themeColors.border,
                              backgroundColor: themeColors.secondary
                            }}
                          />
                        </div>
                      ),
                      th: ({node, ...props}) => (
                        <th 
                          {...props} 
                          className="border px-2 py-1 text-left font-semibold text-xs"
                          style={{ 
                            borderColor: themeColors.border,
                            backgroundColor: themeColors.tertiary,
                            color: themeColors.textSecondary
                          }}
                        />
                      ),
                      td: ({node, ...props}) => (
                        <td 
                          {...props} 
                          className="border px-2 py-1 text-xs"
                          style={{ 
                            borderColor: themeColors.border,
                            color: themeColors.textPrimary
                          }}
                        />
                      ),
                      tr: ({node, ...props}) => <tr {...props} />,
                      p: ({node, ...props}) => (
                        <p 
                          className="text-xs inline" 
                          style={{ color: themeColors.textPrimary }}
                          {...props} 
                        />
                      ),
                      code: ({node, ...props}) => (
                        <code 
                          className="px-1 py-0.5 rounded text-xs font-mono"
                          style={{ 
                            backgroundColor: themeColors.tertiary,
                            color: themeColors.accent
                          }}
                          {...props} 
                        />
                      )
                    }}
                  >
                    {example.output}
                  </ReactMarkdown>
                </div>
              </div>
              {example.explanation && (
                <div>
                  <span 
                    className="font-medium text-xs"
                    style={{ color: themeColors.textSecondary }}
                  >
                    Explanation:{' '}
                  </span>
                  <span 
                    className="text-xs"
                    style={{ color: themeColors.textMuted }}
                  >
                    {example.explanation}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
