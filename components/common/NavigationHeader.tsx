"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Menu, Sun, Globe, Bell, List } from 'lucide-react';
import CourseOutlinePopup from './CourseOutlinePopup';

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
      description: 'After familiarizing yourself with inner joins, you will come to grips with different kinds of outer joins.',
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

  const handleSectionClick = (moduleId: string, sectionId: string) => {
    console.log(`Navigate to module ${moduleId}, section ${sectionId}`);
    setShowCourseOutline(false);
  };

  return (
    <>
      <div className="bg-black border-b border-gray-800 px-4 py-3">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          {/* Left: Breadcrumbs */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-white">
              {/* <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DC</span>
              </div> */}
              <div className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {crumb.href ? (
                      <Link href={crumb.href} className="text-gray-400 hover:text-white transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-white">{crumb.label}</span>
                    )}
                    {index < breadcrumbs.length - 1 && (
                      <span className="text-gray-600">/</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center: Learning Navigation (only show if enabled) */}
          {showLearningNavigation && (
            <div className="flex items-center space-x-3">
              <button className="p-2 border rounded-lg bg-black hover:bg-gray-900 transition-colors" style={{ borderColor: '#222222' }}>
                <ArrowLeft className="w-4 h-4 text-gray-400" />
              </button>
              
              <button 
                onClick={() => setShowCourseOutline(true)}
                className="flex items-center space-x-2 px-4 py-2 border rounded-lg bg-black hover:bg-gray-900 transition-colors"
                style={{ borderColor: '#222222' }}
              >
                <List className="w-4 h-4 text-orange-500" />
                <span className="text-white text-sm font-medium">Course Outline</span>
              </button>
              
              <button className="p-2 border rounded-lg bg-black hover:bg-gray-900 transition-colors" style={{ borderColor: '#222222' }}>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}

          {/* Right: User Actions */}
          <div className="flex items-center space-x-4">
            {/* Daily XP */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-orange-500/20 border border-orange-500/30 rounded-lg">
              <span className="text-orange-500 font-bold text-sm">Daily XP</span>
              <span className="text-orange-400 font-bold">{dailyXP}</span>
            </div>

            {/* Language */}
            <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm">EN</span>
            </button>

            {/* User Avatar */}
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>

            {/* Notifications */}
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Bell className="w-4 h-4 text-gray-400" />
            </button>

            {/* Settings */}
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Menu className="w-4 h-4 text-gray-400" />
            </button>

            {/* Light mode toggle */}
            {onToggleLightMode && (
              <button 
                onClick={onToggleLightMode}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Sun className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Course Outline Popup */}
      <CourseOutlinePopup
        isOpen={showCourseOutline}
        onClose={() => setShowCourseOutline(false)}
        courseTitle={courseTitle}
        modules={mockCourseModules}
        onSectionClick={handleSectionClick}
      />
    </>
  );
}
