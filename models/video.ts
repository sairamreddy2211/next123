// Video Learning Models
export interface VideoContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  category: string;
  thumbnail: string;
  type: 'youtube' | 'drm';
}

export interface VideoPlayerState {
  playing: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  showControls: boolean;
}

export interface VideoLearningViewProps {
  videos: VideoContent[];
  selectedVideoId: string;
  onVideoChange: (videoId: string) => void;
  theme?: 'dark' | 'light';
}

export interface MediaPlayerProps {
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
