"use client";

import React, { useState } from 'react';
import { Search, User, Settings, BookOpen, Trophy } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import CourseOutlinePopup from './CourseOutlinePopup';
import { MOCK_COURSE_MODULES } from '@/constants';
import BreadcrumbNavigation from './BreadcrumbNavigation';
import LearningNavigation from './LearningNavigation';
import UserActions from './UserActions';

interface NavigationHeaderProps {
  breadcrumbs?: Array<{ label: string; href?: string }>;
  showLearningNavigation?: boolean;
  dailyXP?: number;
  isLightMode?: boolean;
  onToggleLightMode?: () => void;
  courseTitle?: string;
}

export default function NavigationHeader({ 
  breadcrumbs = [],
  showLearningNavigation = false,
  dailyXP = 0,
  isLightMode = false,
  onToggleLightMode,
  courseTitle = "Joining Data in SQL"
}: NavigationHeaderProps) {
  const { themeColors } = useTheme();
  const [showCourseOutline, setShowCourseOutline] = useState(false);

  // Mock course data - you can replace this with real data
  const mockCourseModules = [
    {
      id: '1',
      title: 'Introducing Inner Joins',
      description: 'In this chapter, you\'ll be introduced to the concept of joining tables and will explore all the ways you can enrich your queries using joins—beginning with inner joins.',
      progress: 10,
      status: 'free' as const,
      sections: [
        {
          id: '1-1',
          title: 'The ins and outs of INNER JOIN',
          type: 'video' as const,
          duration: '3 min',
          xp: 50,
          completed: true
        },
        {
          id: '1-2',
          title: 'Your first join',
          type: 'practice' as const,
          xp: 100,
          completed: false
        },
        {
          id: '1-3',
          title: 'Joining with aliased tables',
          type: 'practice' as const,
          xp: 100,
          completed: false
        },
        {
          id: '1-4',
          title: 'USING in action',
          type: 'practice' as const,
          xp: 100,
          completed: false
        }
      ]
    },
    {
      id: '2',
      title: 'Outer Joins, Cross Joins and Self Joins',
      description: 'After familiarizing yourself with different kinds of outer joins.',
      progress: 0,
      status: 'premium' as const,
      sections: [
        {
          id: '2-1',
          title: 'LEFT and RIGHT JOINs',
          type: 'video' as const,
          duration: '4 min',
          xp: 50,
          completed: false,
          locked: true
        },
        {
          id: '2-2',
          title: 'FULL JOINs',
          type: 'practice' as const,
          xp: 100,
          completed: false,
          locked: true
        }
      ]
    }
  ];

  const handleNavigation = (moduleId: string, sectionId: string) => {
    // TODO: Implement navigation logic
  };

  const handleSectionClick = (moduleId: string, sectionId: string) => {
    handleNavigation(moduleId, sectionId);
    setShowCourseOutline(false);
  };

  return (
    <>
      <div 
        className="border-b px-4 py-3" 
        style={{ 
          backgroundColor: themeColors.primary, 
          borderBottomColor: themeColors.border 
        }}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          {/* Left: Breadcrumbs */}
          <BreadcrumbNavigation breadcrumbs={breadcrumbs} />

          {/* Center: Learning Navigation (only show if enabled) */}
          {showLearningNavigation && (
            <LearningNavigation onShowCourseOutline={() => setShowCourseOutline(true)} />
          )}

          {/* Right: User Actions */}
          <UserActions
            dailyXP={dailyXP}
            isLightMode={isLightMode}
            onToggleLightMode={onToggleLightMode}
          />
        </div>
      </div>

      {/* Course Outline Popup */}
      <CourseOutlinePopup
        isOpen={showCourseOutline}
        onClose={() => setShowCourseOutline(false)}
        courseTitle={courseTitle}
        modules={MOCK_COURSE_MODULES}
        onSectionClick={handleSectionClick}
      />
    </>
  );
}
