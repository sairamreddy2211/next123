"use client";

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import MediaPlayer from '../shared/MediaPlayer';
import { VideoContent } from '@/types';

interface VideoLearningViewProps {
  videos: VideoContent[];
  selectedVideoId: string;
  onVideoChange: (videoId: string) => void;
}

export default function VideoLearningView({ videos, selectedVideoId, onVideoChange }: VideoLearningViewProps) {
  const [showVideoDropdown, setShowVideoDropdown] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentVideo = videos.find(video => video.id === selectedVideoId);

  // Reset video state when video changes
  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [selectedVideoId]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleDurationChange = (dur: number) => {
    setDuration(dur);
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleEnded = () => {
    setPlaying(false);
  };

  const renderVideoPlayer = () => {
    if (!currentVideo) return null;

    // Use videoUrl or fallback to url for backward compatibility
    const videoSrc = currentVideo.videoUrl || currentVideo.url || '';
    const videoType = currentVideo.type || 'youtube';

    if (videoType === 'youtube') {
      return (
        <iframe
          key={currentVideo.id}
          src={videoSrc}
          title={currentVideo.title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    } else if (videoType === 'custom') {
      return (
        <MediaPlayer
          key={currentVideo.id}
          src={videoSrc}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          playing={playing}
          onPlayPause={handlePlayPause}
          currentTime={currentTime}
          duration={duration}
        />
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-6 mx-auto" style={{ maxWidth: '85%' }}>
      {/* Video Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">
          Video Learning
        </h2>
        
        {/* Video Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowVideoDropdown(!showVideoDropdown)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-sm font-medium"
          >
            <span>{currentVideo?.title}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showVideoDropdown && (
            <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
              <div className="p-3">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">
                  Select Video
                </div>
                {videos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => {
                      onVideoChange(video.id);
                      setShowVideoDropdown(false);
                      setPlaying(false);
                      setCurrentTime(0);
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                      selectedVideoId === video.id ? 'bg-blue-50 border border-blue-200' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">{video.title}</div>
                      {video.presenter && (
                        <div className="text-sm text-gray-600">{video.presenter}</div>
                      )}
                      {video.presenterTitle && (
                        <div className="text-xs text-gray-500">{video.presenterTitle}</div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 ml-4">
                      {video.duration}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Player */}
      <div className="p-6">
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          {renderVideoPlayer()}
        </div>
        
        {/* Video Info */}
        {currentVideo && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">{currentVideo.title}</h3>
            <div className="text-sm text-gray-600">
              {currentVideo.presenter && (
                <p><strong>Presenter:</strong> {currentVideo.presenter}</p>
              )}
              {currentVideo.presenterTitle && (
                <p><strong>Title:</strong> {currentVideo.presenterTitle}</p>
              )}
              <p><strong>Duration:</strong> {currentVideo.duration}</p>
              {currentVideo.description && (
                <p><strong>Description:</strong> {currentVideo.description}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
