"use client";

import { ReactNode } from 'react';
import NavigationHeader from './NavigationHeader';

interface LearningLayoutProps {
  children: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  showLearningNavigation?: boolean;
  dailyXP?: number;
  isLightMode?: boolean;
  onToggleLightMode?: () => void;
}

export default function LearningLayout({
  children,
  breadcrumbs,
  showLearningNavigation = true,
  dailyXP,
  isLightMode,
  onToggleLightMode
}: LearningLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <NavigationHeader
        breadcrumbs={breadcrumbs}
        showLearningNavigation={showLearningNavigation}
        dailyXP={dailyXP}
        isLightMode={isLightMode}
        onToggleLightMode={onToggleLightMode}
      />
      <div>
        {children}
      </div>
    </div>
  );
}
