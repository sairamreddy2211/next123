"use client";

import { useState } from 'react';
import LearningLayout from '@/components/common/LearningLayout';
import VideoLearningView from '@/components/learning/VideoLearningView';
import { learningContent } from '@/data/learningContent';

export default function LearnPage() {
  const [selectedVideoId, setSelectedVideoId] = useState('video-1');
  const [isLightMode, setIsLightMode] = useState(false);

  const breadcrumbs = [
    { label: 'Learn', href: '/learn' },
    { label: 'Courses', href: '/courses' },
    { label: 'SQL Database Relationships' }
  ];

  return (
    <LearningLayout
      breadcrumbs={breadcrumbs}
      showLearningNavigation={true}
      dailyXP={25}
      isLightMode={isLightMode}
      onToggleLightMode={() => setIsLightMode(!isLightMode)}
    >
      {/* Content */}
      <div className="h-[calc(100vh-67px)]">
        <VideoLearningView
          selectedVideoId="video-1"
          videos={learningContent.videos}
          selectedVideoId={selectedVideoId}
          onVideoChange={setSelectedVideoId}
        />
      </div>
    </LearningLayout>
  );
}
