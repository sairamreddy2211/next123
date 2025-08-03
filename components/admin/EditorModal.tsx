"use client";

import { useEffect } from "react";
import ProblemEditor from '@/app/admin/problem-editor/page';

interface EditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sectionId: string) => void;
  sectionType: 'problem' | 'video';
  prefillId?: string;
  moduleId?: string;
  sectionId?: string;
}

export default function EditorModal({ 
  isOpen, 
  onClose, 
  onSave, 
  sectionType, 
  prefillId,
  moduleId,
  sectionId 
}: EditorModalProps) {
  
  // Set up the environment for the existing editor
  useEffect(() => {
    if (isOpen && moduleId && sectionId) {
      console.log('Setting up EditorModal environment:', { sectionType, moduleId, sectionId, prefillId });
      
      // Set up localStorage for the existing editor logic
      localStorage.setItem('editingSection', JSON.stringify({ moduleId, sectionId }));
      
      // Set the mode parameter for video/problem distinction
      const url = new URL(window.location.href);
      if (sectionType === 'video') {
        url.searchParams.set('mode', 'video');
      } else {
        url.searchParams.delete('mode');
      }
      
      // Update URL without navigation
      window.history.replaceState({}, '', url.toString());
      
      // Set up message listener for when editor saves
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'SECTION_SAVED') {
          console.log('Received SECTION_SAVED message:', event.data);
          onSave(event.data.sectionId);
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
    
    return () => {
      // Cleanup when modal closes
      if (!isOpen) {
        localStorage.removeItem('editingSection');
        const url = new URL(window.location.href);
        url.searchParams.delete('mode');
        window.history.replaceState({}, '', url.toString());
      }
    };
  }, [isOpen, moduleId, sectionId, sectionType, onSave]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-80" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative h-full w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 text-2xl bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
          style={{ zIndex: 1000 }}
        >
          ✕
        </button>
        
        {/* Existing ProblemEditor component */}
        <div className="h-full w-full">
          <ProblemEditor />
        </div>
      </div>
    </div>
  );
}
