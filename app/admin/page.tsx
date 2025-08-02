"use client";

import { useTheme } from '@/components/providers/ThemeProvider';
import AdminNavigation from '@/components/admin/AdminNavigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const { themeColors } = useTheme();

  const adminTools = [
    {
      title: 'Course Editor',
      description: 'Create and manage courses with modules and sections. Add video content and coding problems to your courses.',
      href: '/admin/course-editor',
      icon: '📚',
      features: ['Course Management', 'Module Organization', 'Section Types', 'Content Integration']
    },
    {
      title: 'Problem Editor',
      description: 'Create interactive coding problems and video content. Build problems with examples, constraints, and hints.',
      href: '/admin/problem-editor',
      icon: '💻',
      features: ['Problem Creation', 'Video Content', 'Code Examples', 'Test Cases']
    }
  ];

  return (
    <div className="min-h-screen text-white p-0" style={{ backgroundColor: themeColors.primary }}>
      <AdminNavigation />
      
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h1 
            className="text-3xl font-bold mb-8"
            style={{ color: themeColors.textPrimary }}
          >
            Welcome to Admin Dashboard
          </h1>
          
          <p 
            className="text-lg mb-8"
            style={{ color: themeColors.textSecondary }}
          >
            Manage your learning platform content with our comprehensive admin tools.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminTools.map((tool) => (
              <div
                key={tool.href}
                className="p-6 rounded-lg border transition-all hover:shadow-lg"
                style={{
                  backgroundColor: themeColors.secondary,
                  borderColor: themeColors.border
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{tool.icon}</div>
                  <div className="flex-1">
                    <h3 
                      className="text-xl font-semibold mb-2"
                      style={{ color: themeColors.textPrimary }}
                    >
                      {tool.title}
                    </h3>
                    <p 
                      className="mb-4"
                      style={{ color: themeColors.textSecondary }}
                    >
                      {tool.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 
                        className="font-semibold mb-2"
                        style={{ color: themeColors.textPrimary }}
                      >
                        Features:
                      </h4>
                      <ul className="space-y-1">
                        {tool.features.map((feature, index) => (
                          <li 
                            key={index}
                            className="text-sm flex items-center"
                            style={{ color: themeColors.textSecondary }}
                          >
                            <span className="mr-2">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={tool.href}
                      className="inline-block px-6 py-2 rounded transition-colors"
                      style={{
                        backgroundColor: themeColors.accent,
                        color: themeColors.textPrimary
                      }}
                    >
                      Open {tool.title}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div 
            className="mt-8 p-6 rounded-lg border"
            style={{
              backgroundColor: themeColors.secondary,
              borderColor: themeColors.border
            }}
          >
            <h2 
              className="text-xl font-semibold mb-4"
              style={{ color: themeColors.textPrimary }}
            >
              Quick Start Guide
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: themeColors.textPrimary }}
                >
                  1. Create a Course
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: themeColors.textSecondary }}
                >
                  Start by creating a course in the Course Editor. Add modules and sections to organize your content.
                </p>
              </div>
              
              <div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: themeColors.textPrimary }}
                >
                  2. Add Content
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: themeColors.textSecondary }}
                >
                  Use the Problem Editor to create coding problems or video content. You can then link this content to your course sections.
                </p>
              </div>
              
              <div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: themeColors.textPrimary }}
                >
                  3. Organize & Publish
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: themeColors.textSecondary }}
                >
                  Organize your content into logical modules and sections. Set the course status to published when ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 