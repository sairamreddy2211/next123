"use client";

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import MediaPlayer from '@/components/shared/MediaPlayer';
import { VideoContent, VideoPlayerState } from '@/models/video';

interface VideoPlayerContainerProps {
  video: VideoContent;
  playerState: VideoPlayerState;
  onTimeUpdate: (time: number) => void;
  onDurationChange: (duration: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onEnded: () => void;
  onPlayPause: () => void;
}

export default function VideoPlayerContainer({
  video,
  playerState,
  onTimeUpdate,
  onDurationChange,
  onPlay,
  onPause,
  onEnded,
  onPlayPause
}: VideoPlayerContainerProps) {
  const { themeColors } = useTheme();
  
  const videoSrc = video.videoUrl || video.url || '';
  const videoType = video.type || 'youtube';

  const renderVideoPlayer = () => {
    if (videoType === 'youtube') {
      return (
        <iframe
          key={video.id}
          src={videoSrc}
          title={video.title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    } else if (videoType === 'custom') {
      return (
        <MediaPlayer
          key={video.id}
          src={videoSrc}
          onTimeUpdate={onTimeUpdate}
          onDurationChange={onDurationChange}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          playing={playerState.playing}
          onPlayPause={onPlayPause}
          currentTime={playerState.currentTime}
          duration={playerState.duration}
        />
      );
    }
    return null;
  };

  const getContainerStyles = (): React.CSSProperties => {
    if (videoType === 'custom') {
      return {
        width: '50%',
        height: '70%',
        minWidth: '320px',
        minHeight: '180px',
        maxWidth: '900px',
        maxHeight: '80vh',
        background: themeColors.primary,
        borderRadius: '0.5rem',
        overflow: 'hidden',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        pointerEvents: 'auto' as const,
      };
    } else {
      return {
        width: '60vw',
        height: '70vh',
        minWidth: '40vw',
        minHeight: '180px',
        maxWidth: '70vw',
        maxHeight: '70vh',
        background: themeColors.primary,
        borderRadius: '0.5rem',
        overflow: 'hidden',
      };
    }
  };

  return (
    <div
      className={`flex items-center justify-center ${videoType === 'custom' ? 'relative group select-none' : ''}`}
      style={getContainerStyles()}
      onContextMenu={videoType === 'custom' ? (e) => e.preventDefault() : undefined}
    >
      <div className="w-full h-full">
        {renderVideoPlayer()}
      </div>
      
      {/* Anti-piracy overlay for custom videos */}
      {videoType === 'custom' && (
        <div
          className="absolute inset-0 z-10"
          style={{
            background: themeColors.videoOverlay,
            pointerEvents: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
