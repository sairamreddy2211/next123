"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from '@/components/ui';
import VideoDescriptionPanel from './VideoDescriptionPanel';
import VideoPlayerContainer from './VideoPlayerContainer';
import { VideoLearningViewProps, VideoPlayerState } from '@/models/video';

export default function VideoLearningView({ 
  videos, 
  selectedVideoId, 
  onVideoChange 
}: VideoLearningViewProps) {
  const { themeColors } = useTheme();
  const [showDescriptionPanel, setShowDescriptionPanel] = useState(false);
  const [playerState, setPlayerState] = useState<VideoPlayerState>({
    playing: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    showControls: true
  });

  const currentVideo = videos.find(video => video.id === selectedVideoId);

  // Reset video state when video changes
  useEffect(() => {
    setPlayerState(prev => ({
      ...prev,
      playing: false,
      currentTime: 0,
      duration: 0
    }));
  }, [selectedVideoId]);

  const handlePlayPause = () => {
    setPlayerState(prev => ({ ...prev, playing: !prev.playing }));
  };

  const handleTimeUpdate = (time: number) => {
    setPlayerState(prev => ({ ...prev, currentTime: time }));
  };

  const handleDurationChange = (dur: number) => {
    setPlayerState(prev => ({ ...prev, duration: dur }));
  };

  const handlePlay = () => {
    setPlayerState(prev => ({ ...prev, playing: true }));
  };

  const handlePause = () => {
    setPlayerState(prev => ({ ...prev, playing: false }));
  };

  const handleEnded = () => {
    setPlayerState(prev => ({ ...prev, playing: false }));
  };

  const containerStyles: React.CSSProperties = {
    backgroundColor: themeColors.primary,
    color: themeColors.textPrimary
  };

  if (!currentVideo) {
    return (
      <div 
        className="flex w-full h-full justify-center items-center"
        style={containerStyles}
      >
        <p style={{ color: themeColors.textMuted }}>No video selected</p>
      </div>
    );
  }

  return (
    <div 
      className="flex w-full h-full justify-center items-center"
      style={containerStyles}
    >
      {/* Video Description Panel */}
      <VideoDescriptionPanel
        video={currentVideo}
        isVisible={showDescriptionPanel}
        onClose={() => setShowDescriptionPanel(false)}
      />

      <div className="p-6 flex flex-col">
        {/* Video Title */}
        <h2 
          className="text-2xl font-bold mb-4 max-w-4xl"
          style={{ color: themeColors.textPrimary }}
        >
          {currentVideo.title}
        </h2>

        {/* Video Player */}
        <VideoPlayerContainer
          video={currentVideo}
          playerState={playerState}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onPlayPause={handlePlayPause}
        />

        {/* Show Description Button */}
        <div className="mt-6">
          <Button
            variant="secondary"
            onClick={() => setShowDescriptionPanel(prev => !prev)}
          >
            {showDescriptionPanel ? 'Hide Description' : 'Show Description'}
          </Button>
        </div>
      </div>
    </div>
  );
}
