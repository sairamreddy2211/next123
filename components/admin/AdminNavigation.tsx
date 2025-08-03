"use client";

import { useTheme } from '@/components/providers/ThemeProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNavigation() {
  const { themeColors } = useTheme();
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      description: 'Admin dashboard and overview'
    },
    {
      label: 'Course Editor',
      href: '/admin/course-editor',
      description: 'Create and manage courses with modules and sections'
    },
    {
      label: 'Problem Editor',
      href: '/admin/problem-editor',
      description: 'Create coding problems and video content'
    }
  ];

  return (
    <div 
      className="p-6 border-b"
      style={{
        backgroundColor: themeColors.secondary,
        borderColor: themeColors.border
      }}
    >
      <h1 
        className="text-2xl font-bold mb-6"
        style={{ color: themeColors.textPrimary }}
      >
        Admin Panel
      </h1>
      
      <div className="flex space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-lg transition-colors ${
              pathname === item.href 
                ? 'border-2' 
                : 'border border-transparent hover:border-opacity-50'
            }`}
            style={{
              backgroundColor: pathname === item.href ? themeColors.accent : themeColors.tertiary,
              borderColor: pathname === item.href ? themeColors.accent : themeColors.border,
              color: themeColors.textPrimary
            }}
          >
            <div className="font-semibold">{item.label}</div>
            <div 
              className="text-xs mt-1"
              style={{ color: themeColors.textSecondary }}
            >
              {item.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 