"use client";

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useState } from 'react';
import { apiClient } from '../../lib/api';
import { useCourses } from '../../hooks/api';

// Demo component to showcase API client with automatic token injection
function ApiClientDemo() {
  const [demoResults, setDemoResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  // React Query hook demo (automatic token injection via interceptors)
  const { data: courses, isLoading: coursesLoading, error: coursesError } = useCourses();

  const runDemo = async (demoType: string, demoFunction: () => Promise<any>) => {
    setLoading(prev => ({ ...prev, [demoType]: true }));
    try {
      const result = await demoFunction();
      setDemoResults(prev => ({ ...prev, [demoType]: result }));
    } catch (error: any) {
      setDemoResults(prev => ({ 
        ...prev, 
        [demoType]: { error: error.message || 'Request failed' } 
      }));
    } finally {
      setLoading(prev => ({ ...prev, [demoType]: false }));
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* React Query with Auto Token Demo */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🔄 React Query with Auto Token
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          React Query hooks automatically use the API client with token injection
        </p>
        <div className="space-y-3">
          <div className="text-sm">
            <strong>Status:</strong> {coursesLoading ? '⏳ Loading...' : '✅ Ready'}
          </div>
          {courses && (
            <div className="text-sm">
              <strong>Courses Found:</strong> {courses.data?.length || 0} courses
            </div>
          )}
          {coursesError && (
            <div className="text-sm text-red-600">
              <strong>Error:</strong> {coursesError.message}
            </div>
          )}
        </div>
      </div>

      {/* Direct API Client Demo */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🚀 Direct API Client Calls
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Make direct API calls with automatic token injection
        </p>
        <div className="space-y-3">
          <button
            onClick={() => runDemo('authenticated', () => apiClient.get('/user/profile'))}
            disabled={loading.authenticated}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded text-sm"
          >
            {loading.authenticated ? '⏳ Loading...' : '🔐 Authenticated Request'}
          </button>
          
          <button
            onClick={() => runDemo('templated', () => apiClient.templatedRequest('/admin/stats', 'pipecodetemplate'))}
            disabled={loading.templated}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-2 px-4 rounded text-sm"
          >
            {loading.templated ? '⏳ Loading...' : '🎯 Custom Template Request'}
          </button>
          
          <button
            onClick={() => runDemo('public', () => apiClient.publicRequest('/health'))}
            disabled={loading.public}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-4 rounded text-sm"
          >
            {loading.public ? '⏳ Loading...' : '🌐 Public Request (No Auth)'}
          </button>
        </div>
      </div>

      {/* Demo Results */}
      {Object.keys(demoResults).length > 0 && (
        <div className="md:col-span-2 bg-gray-50 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">📋 Demo Results</h4>
          <div className="space-y-4 text-sm">
            {Object.entries(demoResults).map(([key, result]) => (
              <div key={key} className="bg-white p-4 rounded border">
                <div className="font-medium text-gray-900 mb-2 capitalize">
                  {key} Request Result:
                </div>
                <pre className="text-xs text-gray-600 overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="md:col-span-2 bg-blue-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-blue-900 mb-4">💡 How It Works</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
          <div>
            <div className="font-medium mb-2">1. 🔗 Auto-Connection</div>
            <div>QueryProvider automatically connects your Clerk auth to the API client</div>
          </div>
          <div>
            <div className="font-medium mb-2">2. 🔐 Token Injection</div>
            <div>API client interceptors automatically add Bearer tokens to requests</div>
          </div>
          <div>
            <div className="font-medium mb-2">3. 🎯 Template Support</div>
            <div>Use custom Clerk templates for different API endpoints or permissions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <>
      {/* Auth Guard: Only show content to signed-in users */}
      <SignedIn>
        {/* This content is only visible to authenticated users */}
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="px-6 py-16 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Data Engineering Courses
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Master data engineering with our comprehensive, hands-on courses designed by industry experts.
              </p>
            </div>

            {/* Learning Paths */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Beginner Course */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Beginner
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Fundamentals of Data Engineering
                </h3>
                <p className="text-gray-600 mb-6">
                  Learn the basics of data pipelines, ETL processes, and essential tools. Perfect for getting started.
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">12 lessons</span>
                  <span className="text-sm text-gray-500">8 hours</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Start Course
                </button>
              </div>

              {/* Intermediate Course */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Intermediate
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Advanced ETL & Data Warehousing
                </h3>
                <p className="text-gray-600 mb-6">
                  Deep dive into complex ETL patterns, data warehousing concepts, and performance optimization.
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">16 lessons</span>
                  <span className="text-sm text-gray-500">12 hours</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Start Course
                </button>
              </div>

              {/* Advanced Course */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Advanced
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Real-time Streaming & Big Data
                </h3>
                <p className="text-gray-600 mb-6">
                  Master Apache Kafka, Spark Streaming, and building scalable real-time data systems.
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">20 lessons</span>
                  <span className="text-sm text-gray-500">15 hours</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Start Course
                </button>
              </div>
            </div>

            {/* API Client Demo Section */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                🔐 API Client Demo - Automatic Token Injection
              </h2>
              <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                This section demonstrates our enhanced API client with automatic Clerk token injection. 
                The API client automatically adds your authentication token to requests without any manual handling.
              </p>
              <ApiClientDemo />
            </div>

            {/* Course Features */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                What You'll Get
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Hands-on Projects</h3>
                  <p className="text-gray-600 text-sm">Build real data pipelines and systems</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Industry Tools</h3>
                  <p className="text-gray-600 text-sm">Learn with real-world technologies</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Expert Mentorship</h3>
                  <p className="text-gray-600 text-sm">Get guidance from industry professionals</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Certificates</h3>
                  <p className="text-gray-600 text-sm">Earn recognized completion certificates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>

      {/* Auth Guard: Redirect users who are not signed in */}
      <SignedOut>
        {/* 
          RedirectToSignIn automatically redirects unauthenticated users 
          to the sign-in page. This is the main auth guard mechanism.
        */}
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
