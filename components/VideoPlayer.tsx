"use client";

import { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, Download, Maximize, Headphones } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  onTimeUpdate: (time: number) => void;
  onDurationChange: (duration: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onEnded: () => void;
  playing: boolean;
  onPlayPause: () => void;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  onSkip: (seconds: number) => void;
  currentTime: number;
  duration: number;
}

const VideoPlayer = ({
  src,
  onTimeUpdate,
  onDurationChange,
  onPlay,
  onPause,
  onEnded,
  playing,
  onPlayPause,
  onSeek,
  onSkip,
  currentTime,
  duration
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [localCurrentTime, setLocalCurrentTime] = useState(0);
  const [localDuration, setLocalDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const handleTimeUpdate = () => {
      if (!isSeeking && video.currentTime !== undefined) {
        const time = video.currentTime;
        setLocalCurrentTime(time);
        onTimeUpdate(time);
      }
    };

    const handleLoadedMetadata = () => {
      const dur = video.duration;
      if (dur && !isNaN(dur) && dur !== Infinity) {
        setLocalDuration(dur);
        onDurationChange(dur);
      }
    };

    const handlePlay = () => {
      onPlay();
    };

    const handlePause = () => {
      onPause();
    };

    const handleEnded = () => {
      onEnded();
    };

    const handleSeeked = () => {
      setIsSeeking(false);
    };

    const handleSeeking = () => {
      setIsSeeking(true);
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
    };

    video.addEventListener('timeupdate', handleTimeUpdate, { passive: true });
    video.addEventListener('loadedmetadata', handleLoadedMetadata, { passive: true });
    video.addEventListener('play', handlePlay, { passive: true });
    video.addEventListener('pause', handlePause, { passive: true });
    video.addEventListener('ended', handleEnded, { passive: true });
    video.addEventListener('seeked', handleSeeked, { passive: true });
    video.addEventListener('seeking', handleSeeking, { passive: true });
    video.addEventListener('error', handleError, { passive: true });

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('error', handleError);
    };
  }, [onTimeUpdate, onDurationChange, onPlay, onPause, onEnded, isSeeking]);

  useEffect(() => {
    if (!videoRef.current) return;

    if (playing) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Error playing video:', error);
          // If autoplay fails, try playing without user interaction
          if (error.name === 'NotAllowedError') {
            console.log('Autoplay blocked, waiting for user interaction');
            // Set volume to 0 to allow autoplay in some browsers
            videoRef.current!.muted = true;
            videoRef.current!.play().catch(console.error);
          }
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (!videoRef.current || isSeeking) return;
    
    // Only update if the difference is significant to avoid conflicts
    if (Math.abs(videoRef.current.currentTime - currentTime) > 0.5) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime, isSeeking]);

  const handlePlayPause = () => {
    onPlayPause();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * localDuration;
    
    setIsSeeking(true);
    videoRef.current.currentTime = newTime;
    setLocalCurrentTime(newTime);
    onTimeUpdate(newTime);
  };

  const handleSkip = (seconds: number) => {
    if (!videoRef.current) return;
    
    const newTime = Math.max(0, Math.min(localDuration, videoRef.current.currentTime + seconds));
    setIsSeeking(true);
    videoRef.current.currentTime = newTime;
    setLocalCurrentTime(newTime);
    onTimeUpdate(newTime);
  };

  const handleVideoClick = () => {
    handlePlayPause();
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === Infinity || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Use local state for display to avoid conflicts
  const displayTime = localCurrentTime || currentTime;
  const displayDuration = localDuration || duration;
  const progressPercentage = displayDuration > 0 ? (displayTime / displayDuration) * 100 : 0;

  if (!isClient) {
    return (
      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
        Loading video player...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        preload="metadata"
        playsInline
        controls={false}
        onClick={handleVideoClick}
        style={{ 
          willChange: 'auto',
          transform: 'translateZ(0)'
        }}
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play')}
        onCanPlayThrough={() => console.log('Video can play through')}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Custom Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Progress Bar */}
        <div className="mb-3">
          <div 
            className="w-full bg-gray-600 h-1 rounded-full cursor-pointer relative"
            onClick={handleSeek}
          >
            <div 
              className="bg-green-500 h-1 rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
            <div 
              className="absolute top-0 w-3 h-3 bg-green-500 rounded-full -mt-1 -ml-1.5 cursor-pointer"
              style={{ left: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        {/* Control Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handlePlayPause}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              {playing ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-1" />
              )}
            </button>
            
            <button 
              onClick={() => handleSkip(-10)}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-white" />
              <span className="text-xs text-white ml-1">10</span>
            </button>
            
            <button 
              onClick={() => handleSkip(10)}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-white rotate-180" />
              <span className="text-xs text-white ml-1">10</span>
            </button>
            
            <button className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
              <Volume2 className="w-4 h-4 text-white" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-white text-sm">
              {formatTime(displayTime)} / {formatTime(displayDuration)}
            </span>
            <button className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
              <Download className="w-4 h-4 text-white" />
            </button>
            <button className="text-white text-sm bg-white/20 hover:bg-white/30 px-2 py-1 rounded">
              1x
            </button>
            <button className="text-white text-sm font-semibold bg-white/20 hover:bg-white/30 px-2 py-1 rounded">
              CC
            </button>
            <button className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
              <Headphones className="w-4 h-4 text-white" />
            </button>
            <button className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
              <Maximize className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer; 