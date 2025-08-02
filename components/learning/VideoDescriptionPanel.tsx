"use client";

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Panel } from '@/components/ui';
import { VideoContent } from '@/models/video';

interface VideoDescriptionPanelProps {
  video: VideoContent;
  isVisible: boolean;
  onClose: () => void;
}

export default function VideoDescriptionPanel({ 
  video, 
  isVisible, 
  onClose 
}: VideoDescriptionPanelProps) {
  const { themeColors } = useTheme();

  if (!isVisible) return null;

  const panelStyles = {
    backgroundColor: themeColors.descriptionPanel.background,
    borderColor: themeColors.descriptionPanel.border,
    color: themeColors.descriptionPanel.text,
  };

  return (
    <div 
      className="h-[78%] w-96 shadow-2xl z-30 border-r flex flex-col transition-transform duration-300"
      style={{
        ...panelStyles,
        transform: 'translateX(0)'
      }}
    >
      <div 
        className="flex items-center justify-between p-4 border-b"
        style={{ borderColor: themeColors.descriptionPanel.border }}
      >
        <h2 className="text-lg font-bold" style={{ color: themeColors.descriptionPanel.text }}>
          Details
        </h2>
        <button
          className="text-xl font-bold px-2 hover:opacity-70 transition-opacity"
          style={{ color: themeColors.descriptionPanel.closeButton }}
          onClick={onClose}
          aria-label="Close description panel"
        >
          ×
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <h3 
          className="font-semibold mb-2"
          style={{ color: themeColors.descriptionPanel.text }}
        >
          {video.title}
        </h3>
        
        <div 
          className="text-sm space-y-2"
          style={{ color: themeColors.descriptionPanel.textSecondary }}
        >
          <p><strong>ID:</strong> {video.id}</p>
          <p><strong>Type:</strong> {video.type}</p>
          <p><strong>Difficulty:</strong> {video.difficulty}</p>
          <p><strong>Category:</strong> {video.category}</p>
          <p><strong>Duration:</strong> {video.duration}</p>
          <p><strong>Video URL:</strong> {video.videoUrl || video.url}</p>
          
          {video.thumbnail && (
            <div>
              <strong>Thumbnail:</strong>
              <img 
                src={video.thumbnail} 
                alt="thumbnail" 
                className="w-full rounded mt-1" 
              />
            </div>
          )}
          
          {video.presenter && (
            <p><strong>Presenter:</strong> {video.presenter}</p>
          )}
          
          {video.presenterTitle && (
            <p><strong>Presenter Title:</strong> {video.presenterTitle}</p>
          )}
          
          {video.description && (
            <p><strong>Description:</strong> {video.description}</p>
          )}
          
          {video.transcript && (
            <div>
              <strong>Transcript:</strong>
              <pre 
                className="rounded p-2 mt-1 whitespace-pre-wrap max-h-40 overflow-y-auto text-sm"
                style={{ 
                  backgroundColor: themeColors.tertiary,
                  color: themeColors.textPrimary 
                }}
              >
                {video.transcript}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
