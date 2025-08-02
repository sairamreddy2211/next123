"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { useTheme } from '@/components/providers/ThemeProvider';
import '../common/markdownStyles.css';

interface ProblemDescriptionProps {
  description: string;
}

export default function ProblemDescription({ description }: ProblemDescriptionProps) {
  const { themeColors } = useTheme();

  return (
    <div>
      {/* Problem Description (Markdown) */}
      <div>
        <div 
          className="mt-5 prose-markdown prose-invert max-w-none"
          style={{ color: themeColors.textPrimary }}
        >
          <ReactMarkdown 
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkBreaks]}
            components={{
              table: ({node, ...props}) => (
                <table 
                  className="min-w-full border my-2 text-xs" 
                  style={{ borderColor: themeColors.border }}
                  {...props} 
                />
              ), 
              th: ({node, ...props}) => (
                <th 
                  className="border px-2 py-1 text-xs" 
                  style={{ 
                    borderColor: themeColors.border,
                    backgroundColor: themeColors.tertiary,
                    color: themeColors.textSecondary
                  }}
                  {...props} 
                />
              ), 
              td: ({node, ...props}) => (
                <td 
                  className="border px-2 py-1 text-xs" 
                  style={{ 
                    borderColor: themeColors.border,
                    color: themeColors.textPrimary
                  }}
                  {...props} 
                />
              ), 
              tr: ({node, ...props}) => <tr {...props} />,
              h1: ({node, ...props}) => (
                <h1 
                  className="text-xl font-bold mt-4 mb-2" 
                  style={{ color: themeColors.textPrimary }}
                  {...props} 
                />
              ),
              h2: ({node, ...props}) => (
                <h2 
                  className="text-lg font-bold mt-3 mb-2" 
                  style={{ color: themeColors.textPrimary }}
                  {...props} 
                />
              ),
              h3: ({node, ...props}) => (
                <h3 
                  className="text-md font-bold mt-2 mb-1" 
                  style={{ color: themeColors.textSecondary }}
                  {...props} 
                />
              ),
              p: ({node, ...props}) => (
                <p 
                  className="mb-2 leading-relaxed text-sm" 
                  style={{ color: themeColors.textPrimary }}
                  {...props} 
                />
              ),
              ul: ({node, ...props}) => (
                <ul 
                  className="list-disc pl-5 mb-2 text-sm space-y-1" 
                  style={{ color: themeColors.textPrimary }}
                  {...props} 
                />
              ),
              ol: ({node, ...props}) => (
                <ol 
                  className="list-decimal pl-5 mb-2 text-sm space-y-1" 
                  style={{ color: themeColors.textPrimary }}
                  {...props} 
                />
              ),
              li: ({node, ...props}) => (
                <li 
                  className="text-sm" 
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
              ),
              pre: ({node, ...props}) => (
                <pre 
                  className="p-3 rounded text-xs font-mono overflow-x-auto my-2" 
                  style={{ 
                    backgroundColor: themeColors.tertiary,
                    color: themeColors.textMuted,
                    border: `1px solid ${themeColors.border}`
                  }}
                  {...props} 
                />
              )
            }}
          >
            {description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
