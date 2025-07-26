/**
 * Navigation Component with Auth-Aware Links
 * 
 * This component demonstrates how to handle navigation differently
 * for authenticated vs unauthenticated users
 */

"use client";

import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            PipeCode
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {/* Public link - always visible */}
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>

            {/* Movies demo - public access */}
            <Link href="/movies" className="text-gray-600 hover:text-gray-900 transition-colors">
              Movies Demo
            </Link>

            {/* Redux demo - public access */}
            <Link href="/redux-demo" className="text-gray-600 hover:text-gray-900 transition-colors">
              Redux Demo
            </Link>

            {/* Practice page - public access */}
            <Link href="/practice" className="text-gray-600 hover:text-gray-900 transition-colors">
              Practice
            </Link>

            {/* Auth-protected links - only visible to signed-in users */}
            <SignedIn>
              <Link href="/courses" className="text-gray-600 hover:text-gray-900 transition-colors">
                Courses
              </Link>
              <Link href="/problems" className="text-gray-600 hover:text-gray-900 transition-colors">
                Problems
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900 transition-colors">
                Profile
              </Link>
            </SignedIn>

            {/* Links for non-authenticated users */}
            <SignedOut>
              <span className="text-gray-400 text-sm">
                Sign in to access courses and problems
              </span>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
