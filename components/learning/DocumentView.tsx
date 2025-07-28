"use client";

import { LearningModeType } from '@/types';

interface DocumentViewProps {
  courseId: string;
  currentStep?: number;
}

export default function DocumentView({ courseId, currentStep }: DocumentViewProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-6 mx-auto" style={{ maxWidth: '85%' }}>
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">�</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Study Notes & Documentation
          </h3>
          <p className="text-gray-600">
            Interactive study notes, documentation, and downloadable resources will be available in a future update.
          </p>
        </div>
      </div>
    </div>
  );
}
