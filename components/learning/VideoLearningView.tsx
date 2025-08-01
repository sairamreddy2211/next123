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
  const [showDescriptionPanel, setShowDescriptionPanel] = useState(false);
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
    <div className='flex w-full h-full justify-center items-center'>
      {/* Video Title on Top */}
      {showDescriptionPanel && currentVideo && (
        <div className="h-[78%] w-96 bg-white shadow-2xl z-30 border-r border-gray-200 flex flex-col transition-transform duration-300" style={{ transform: 'translateX(0)' }}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold">Details</h2>
            <button
              className="text-gray-500 hover:text-gray-700 text-xl font-bold px-2"
              onClick={() => setShowDescriptionPanel(false)}
              aria-label="Close description panel"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="font-semibold text-gray-900 mb-2">{currentVideo.title}</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>ID:</strong> {currentVideo.id}</p>
              <p><strong>Type:</strong> {currentVideo.type}</p>
              <p><strong>Difficulty:</strong> {currentVideo.difficulty}</p>
              <p><strong>Category:</strong> {currentVideo.category}</p>
              <p><strong>Duration:</strong> {currentVideo.duration}</p>
              <p><strong>Video URL:</strong> {currentVideo.videoUrl || currentVideo.url}</p>
              {currentVideo.thumbnail && (
                <div>
                  <strong>Thumbnail:</strong>
                  <img src={currentVideo.thumbnail} alt="thumbnail" className="w-full rounded mt-1" />
                </div>
              )}
              {currentVideo.presenter && (
                <p><strong>Presenter:</strong> {currentVideo.presenter}</p>
              )}
              {currentVideo.presenterTitle && (
                <p><strong>Presenter Title:</strong> {currentVideo.presenterTitle}</p>
              )}
              {currentVideo.description && (
                <p><strong>Description:</strong> {currentVideo.description}</p>
              )}
              {currentVideo.transcript && (
                <div>
                  <strong>Transcript:</strong>
                  <pre className="bg-gray-100 text-gray-800 rounded p-2 mt-1 whitespace-pre-wrap max-h-40 overflow-y-auto">{currentVideo.transcript}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="p-6 flex flex-col">
        {currentVideo && (
          <h2 className="text-2xl font-bold mb-4 max-w-4xl text-white">{currentVideo.title}</h2>
        )}

        {/* Video Player */}
        {currentVideo && currentVideo.type === 'custom' ? (
          <div
            className="relative group select-none flex items-center justify-center"
            style={{
              width: '50%',
              height: '70%',
              minWidth: '320px',
              minHeight: '180px',
              maxWidth: '900px',
              maxHeight: '80vh',
              background: 'black',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              pointerEvents: 'auto',
            }}
            onContextMenu={e => e.preventDefault()}
          >
            <div className="w-full h-full">
              {renderVideoPlayer()}
            </div>
            <div
              className="absolute inset-0 z-10"
              style={{
                background:
                  'repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 20px)',
                pointerEvents: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
              }}
              aria-hidden="true"
            />
          </div>
        ) : (
          <div
            className="flex items-center justify-center"
            style={{
              width: '60vw',
              height: '70vh',
              minWidth: '40vw',
              minHeight: '180px',
              maxWidth: '70vw',
              maxHeight: '70vh',
              background: 'black',
              borderRadius: '0.5rem',
              overflow: 'hidden',
            }}
          >
            <div className="w-full h-full">
              {renderVideoPlayer()}
            </div>
          </div>
        )}

        {/* Show Description Button */}
        {currentVideo && (
          <button
            className="mt-6 px-4 py-2 w-fit bg-white border border-gray-300 rounded-sm shadow hover:bg-gray-50 text-sm font-medium transition-colors"
            onClick={() => setShowDescriptionPanel((value)=>!value)}
          >
            Show Description
          </button>
        )}
      </div>
    </div>
  );
}
