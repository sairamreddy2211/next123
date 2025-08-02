"use client";

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Maximize, RotateCcw } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

interface MediaPlayerProps {
  src: string;
  onTimeUpdate?: (time: number) => void;
  onDurationChange?: (duration: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  playing?: boolean;
  onPlayPause?: () => void;
  onSeek?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onSkip?: (seconds: number) => void;
  currentTime?: number;
  duration?: number;
}

export default function MediaPlayer({
  src,
  onTimeUpdate,
  onDurationChange,
  onPlay,
  onPause,
  onEnded,
  playing = false,
  onPlayPause,
  currentTime = 0,
  duration = 0,
  onSeek,
  onSkip
}: MediaPlayerProps) {
  const { themeColors } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [volume, setVolume] = useState(0.8);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (onTimeUpdate) {
        onTimeUpdate(video.currentTime);
      }
    };

    const handleDurationChange = () => {
      if (onDurationChange) {
        onDurationChange(video.duration);
      }
    };

    const handlePlay = () => {
      if (onPlay) onPlay();
    };

    const handlePause = () => {
      if (onPause) onPause();
    };

    const handleEnded = () => {
      if (onEnded) onEnded();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onTimeUpdate, onDurationChange, onPlay, onPause, onEnded]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      video.play();
    } else {
      video.pause();
    }
  }, [playing]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    video.currentTime = newTime;
  };

  return (
    <div 
      className="relative rounded-lg overflow-hidden" 
      style={{ backgroundColor: themeColors.primary }}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        style={{ aspectRatio: '16/9' }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      />
      
      {/* Video Controls Overlay */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div
            className="w-full h-2 rounded cursor-pointer mb-4"
            style={{ backgroundColor: themeColors.tertiary }}
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-red-500 rounded"
              style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
            />
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <button
                onClick={onPlayPause}
                className="p-2 hover:bg-white/20 rounded"
              >
                {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => {
                  const video = videoRef.current;
                  if (video) video.currentTime = Math.max(0, video.currentTime - 10);
                }}
                className="p-2 hover:bg-white/20 rounded"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => {
                    const newVolume = parseFloat(e.target.value);
                    setVolume(newVolume);
                    if (videoRef.current) {
                      videoRef.current.volume = newVolume;
                    }
                  }}
                  className="w-20"
                />
              </div>
              
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.requestFullscreen();
                }
              }}
              className="p-2 hover:bg-white/20 rounded"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
