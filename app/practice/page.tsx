"use client";

import { useState } from 'react';
import LearningLayout from '@/components/common/LearningLayout';
import InteractiveLearningView from '@/components/problem-solving/InteractiveLearningView';
import { learningContent } from '@/data/learningContent';

export default function PracticePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLightMode, setIsLightMode] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState('employee-sales-analytics');

  const breadcrumbs = [
    { label: 'Practice', href: '/practice' },
    { label: 'Problem Solving', href: '/practice' },
    { label: 'SQL Relationships Challenge' }
  ];

  // Get the currently selected lesson
  const currentLesson = learningContent.interactiveLessons.find(
    lesson => lesson.id === selectedLessonId
  ) || learningContent.interactiveLessons[0];
  
  return (
    <LearningLayout
      breadcrumbs={breadcrumbs}
      showLearningNavigation={true}
      dailyXP={50}
      isLightMode={isLightMode}
      onToggleLightMode={() => setIsLightMode(!isLightMode)}
    >
      {/* Content */}
      <div className="h-[calc(100vh-67px)]">
        <InteractiveLearningView
          lesson={currentLesson}
        />
      </div>
    </LearningLayout>
  );
}
