"use client";

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { BaseComponentProps } from '@/models';

interface PanelProps extends BaseComponentProps {
  title?: string;
  onClose?: () => void;
  width?: string | number;
  height?: string | number;
  showCloseButton?: boolean;
}

export function Panel({ 
  children, 
  title, 
  onClose, 
  width = 'auto', 
  height = 'auto',
  showCloseButton = true,
  className = '' 
}: PanelProps) {
  const { themeColors } = useTheme();

  const panelStyles = {
    backgroundColor: themeColors.secondary,
    borderColor: themeColors.border,
    color: themeColors.textPrimary,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div 
      className={`border shadow-lg rounded-lg flex flex-col ${className}`}
      style={panelStyles}
    >
      {title && (
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: themeColors.border }}
        >
          <h3 className="font-semibold" style={{ color: themeColors.textPrimary }}>
            {title}
          </h3>
          {showCloseButton && onClose && (
            <button
              onClick={onClose}
              className="text-xl font-bold px-2 hover:opacity-70 transition-opacity"
              style={{ color: themeColors.textMuted }}
              aria-label="Close panel"
            >
              ×
            </button>
          )}
        </div>
      )}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
