"use client";

import { ReactNode } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
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
  const { themeColors } = useTheme();
  
  return (
    <div 
      className="min-h-screen" 
      style={{ backgroundColor: themeColors.primary }}
    >
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
