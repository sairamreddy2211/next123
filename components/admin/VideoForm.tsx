"use client";

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { VIDEO_LEVELS } from '@/constants';

interface VideoFormProps {
  videoData: {
    title: string;
    description: string;
    videoUrl: string;
    duration: string;
    thumbnailUrl: string;
  };
  onVideoDataChange: (data: any) => void;
}

export default function VideoForm({ videoData, onVideoDataChange }: VideoFormProps) {
  const { themeColors } = useTheme();

  const updateField = (field: string, value: string) => {
    onVideoDataChange({ ...videoData, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label 
          className="block mb-1 font-semibold"
          style={{ color: themeColors.textPrimary }}
        >
          Video Title
        </label>
        <input
          className="w-full border rounded px-3 py-2"
          style={{
            backgroundColor: themeColors.tertiary,
            borderColor: themeColors.border,
            color: themeColors.textPrimary
          }}
          value={videoData.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Enter video title..."
        />
      </div>

      <div>
        <label 
          className="block mb-1 font-semibold"
          style={{ color: themeColors.textPrimary }}
        >
          Video URL
        </label>
        <input
          className="w-full border rounded px-3 py-2"
          style={{
            backgroundColor: themeColors.tertiary,
            borderColor: themeColors.border,
            color: themeColors.textPrimary
          }}
          value={videoData.videoUrl}
          onChange={(e) => updateField('videoUrl', e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div>
        <label 
          className="block mb-1 font-semibold"
          style={{ color: themeColors.textPrimary }}
        >
          Thumbnail URL
        </label>
        <input
          className="w-full border rounded px-3 py-2"
          style={{
            backgroundColor: themeColors.tertiary,
            borderColor: themeColors.border,
            color: themeColors.textPrimary
          }}
          value={videoData.thumbnailUrl}
          onChange={(e) => updateField('thumbnailUrl', e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div>
        <label 
          className="block mb-1 font-semibold"
          style={{ color: themeColors.textPrimary }}
        >
          Duration
        </label>
        <input
          className="w-full border rounded px-3 py-2"
          style={{
            backgroundColor: themeColors.tertiary,
            borderColor: themeColors.border,
            color: themeColors.textPrimary
          }}
          value={videoData.duration}
          onChange={(e) => updateField('duration', e.target.value)}
          placeholder="e.g., 15:30"
        />
      </div>



      <div className="md:col-span-2">
        <label 
          className="block mb-1 font-semibold"
          style={{ color: themeColors.textPrimary }}
        >
          Description
        </label>
        <textarea
          className="w-full border rounded px-3 py-2"
          style={{
            backgroundColor: themeColors.tertiary,
            borderColor: themeColors.border,
            color: themeColors.textPrimary
          }}
          rows={4}
          value={videoData.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Enter video description..."
        />
      </div>
    </div>
  );
}
