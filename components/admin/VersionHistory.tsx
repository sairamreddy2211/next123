"use client";

import { useTheme } from '@/components/providers/ThemeProvider';
import { CourseVersion, CourseManager } from '@/lib/courseManager';
import { useState, useEffect } from 'react';

interface VersionHistoryProps {
  courseId: string;
  onClose: () => void;
  onRestoreVersion: (version: CourseVersion) => void;
}

export default function VersionHistory({ 
  courseId, 
  onClose, 
  onRestoreVersion 
}: VersionHistoryProps) {
  const { themeColors } = useTheme();
  const [versions, setVersions] = useState<CourseVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<CourseVersion | null>(null);

  useEffect(() => {
    const versionHistory = CourseManager.getVersionHistory(courseId);
    setVersions(versionHistory.reverse()); // Show newest first
  }, [courseId]);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getVersionChanges = (version: CourseVersion, previousVersion?: CourseVersion) => {
    if (!previousVersion) return ['Initial version'];
    
    const changes: string[] = [];
    const current = version.data;
    const previous = previousVersion.data;
    
    if (current.title !== previous.title) {
      changes.push(`Title changed: "${previous.title}" → "${current.title}"`);
    }
    
    if (current.description !== previous.description) {
      changes.push('Description updated');
    }
    
    if (current.category !== previous.category) {
      changes.push(`Category changed: ${previous.category} → ${current.category}`);
    }
    
    if (current.modules.length !== previous.modules.length) {
      const diff = current.modules.length - previous.modules.length;
      changes.push(
        diff > 0 
          ? `Added ${diff} module${diff > 1 ? 's' : ''}` 
          : `Removed ${Math.abs(diff)} module${Math.abs(diff) > 1 ? 's' : ''}`
      );
    }
    
    // Check for section changes
    const currentSections = current.modules.reduce((total, m) => total + m.sections.length, 0);
    const previousSections = previous.modules.reduce((total, m) => total + m.sections.length, 0);
    
    if (currentSections !== previousSections) {
      const diff = currentSections - previousSections;
      changes.push(
        diff > 0 
          ? `Added ${diff} section${diff > 1 ? 's' : ''}` 
          : `Removed ${Math.abs(diff)} section${Math.abs(diff) > 1 ? 's' : ''}`
      );
    }
    
    return changes.length > 0 ? changes : ['Minor changes'];
  };

  const handleRestore = (version: CourseVersion) => {
    if (window.confirm(`Are you sure you want to restore to version ${version.version}? This will overwrite your current work.`)) {
      onRestoreVersion(version);
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="w-4/5 h-4/5 rounded-lg overflow-hidden flex"
        style={{ backgroundColor: themeColors.primary }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Panel - Version List */}
        <div 
          className="w-1/2 border-r overflow-y-auto"
          style={{ 
            backgroundColor: themeColors.secondary,
            borderColor: themeColors.border 
          }}
        >
          <div className="p-6 border-b" style={{ borderColor: themeColors.border }}>
            <div className="flex justify-between items-center">
              <h1 
                className="text-xl font-bold"
                style={{ color: themeColors.textPrimary }}
              >
                Version History
              </h1>
              <button
                className="text-xl"
                style={{ color: themeColors.textPrimary }}
                onClick={onClose}
              >
                ×
              </button>
            </div>
            
            <p 
              className="text-sm mt-2"
              style={{ color: themeColors.textMuted }}
            >
              {versions.length} version{versions.length !== 1 ? 's' : ''} saved
            </p>
          </div>

          <div className="p-4">
            {versions.length === 0 ? (
              <div 
                className="text-center py-12"
                style={{ color: themeColors.textMuted }}
              >
                <div className="text-4xl mb-4">📝</div>
                <p>No version history available</p>
                <p className="text-sm mt-2">Versions will appear here after you save your course</p>
              </div>
            ) : (
              <div className="space-y-3">
                {versions.map((version, index) => {
                  const previousVersion = versions[index + 1];
                  const changes = getVersionChanges(version, previousVersion);
                  
                  return (
                    <div
                      key={version.id}
                      className={`p-4 rounded border cursor-pointer transition-all ${
                        selectedVersion?.id === version.id ? 'border-blue-500 shadow-md' : ''
                      }`}
                      style={{
                        backgroundColor: selectedVersion?.id === version.id ? themeColors.accent : themeColors.primary,
                        borderColor: selectedVersion?.id === version.id ? '#3B82F6' : themeColors.border
                      }}
                      onClick={() => setSelectedVersion(version)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span 
                              className="px-2 py-1 text-xs rounded font-mono"
                              style={{
                                backgroundColor: themeColors.secondary,
                                color: themeColors.textPrimary
                              }}
                            >
                              v{version.version}
                            </span>
                            
                            {index === 0 && (
                              <span 
                                className="px-2 py-1 text-xs rounded"
                                style={{
                                  backgroundColor: '#10B981',
                                  color: 'white'
                                }}
                              >
                                Latest
                              </span>
                            )}
                          </div>
                          
                          <div 
                            className="font-medium mt-1"
                            style={{ color: themeColors.textPrimary }}
                          >
                            {version.description}
                          </div>
                        </div>
                        
                        <div 
                          className="text-xs text-right"
                          style={{ color: themeColors.textMuted }}
                        >
                          {formatDate(version.timestamp)}
                        </div>
                      </div>

                      <div className="space-y-1">
                        {changes.slice(0, 3).map((change, changeIndex) => (
                          <div 
                            key={changeIndex}
                            className="text-xs"
                            style={{ color: themeColors.textSecondary }}
                          >
                            • {change}
                          </div>
                        ))}
                        
                        {changes.length > 3 && (
                          <div 
                            className="text-xs"
                            style={{ color: themeColors.textMuted }}
                          >
                            +{changes.length - 3} more changes
                          </div>
                        )}
                      </div>

                      {index !== 0 && (
                        <div className="mt-3 pt-3 border-t" style={{ borderColor: themeColors.border }}>
                          <button
                            className="px-3 py-1 text-xs rounded transition-colors"
                            style={{
                              backgroundColor: '#3B82F6',
                              color: 'white'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRestore(version);
                            }}
                          >
                            Restore This Version
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Version Details */}
        <div 
          className="w-1/2 overflow-y-auto"
          style={{ backgroundColor: themeColors.primary }}
        >
          {selectedVersion ? (
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span 
                    className="px-3 py-1 text-sm rounded font-mono"
                    style={{
                      backgroundColor: themeColors.secondary,
                      color: themeColors.textPrimary
                    }}
                  >
                    Version {selectedVersion.version}
                  </span>
                  
                  <span 
                    className="text-sm"
                    style={{ color: themeColors.textMuted }}
                  >
                    {formatDate(selectedVersion.timestamp)}
                  </span>
                </div>
                
                <h2 
                  className="text-xl font-bold mb-2"
                  style={{ color: themeColors.textPrimary }}
                >
                  {selectedVersion.data.title}
                </h2>
                
                <p 
                  className="text-sm"
                  style={{ color: themeColors.textSecondary }}
                >
                  {selectedVersion.description}
                </p>
              </div>

              {/* Course Summary */}
              <div 
                className="p-4 rounded-lg border mb-6"
                style={{
                  backgroundColor: themeColors.secondary,
                  borderColor: themeColors.border
                }}
              >
                <h3 
                  className="font-semibold mb-3"
                  style={{ color: themeColors.textPrimary }}
                >
                  Course Summary
                </h3>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div style={{ color: themeColors.textMuted }}>Category</div>
                    <div style={{ color: themeColors.textPrimary }}>{selectedVersion.data.category}</div>
                  </div>
                  
                  <div>
                    <div style={{ color: themeColors.textMuted }}>Status</div>
                    <div style={{ color: themeColors.textPrimary }}>{selectedVersion.data.status}</div>
                  </div>
                  
                  <div>
                    <div style={{ color: themeColors.textMuted }}>Modules</div>
                    <div style={{ color: themeColors.textPrimary }}>{selectedVersion.data.modules.length}</div>
                  </div>
                  
                  <div>
                    <div style={{ color: themeColors.textMuted }}>Total Sections</div>
                    <div style={{ color: themeColors.textPrimary }}>
                      {selectedVersion.data.modules.reduce((total, m) => total + m.sections.length, 0)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Changes */}
              <div 
                className="p-4 rounded-lg border mb-6"
                style={{
                  backgroundColor: themeColors.secondary,
                  borderColor: themeColors.border
                }}
              >
                <h3 
                  className="font-semibold mb-3"
                  style={{ color: themeColors.textPrimary }}
                >
                  Changes in This Version
                </h3>
                
                <div className="space-y-2">
                  {getVersionChanges(
                    selectedVersion, 
                    versions[versions.findIndex(v => v.id === selectedVersion.id) + 1]
                  ).map((change, index) => (
                    <div 
                      key={index}
                      className="text-sm"
                      style={{ color: themeColors.textSecondary }}
                    >
                      • {change}
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Structure */}
              <div 
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: themeColors.secondary,
                  borderColor: themeColors.border
                }}
              >
                <h3 
                  className="font-semibold mb-3"
                  style={{ color: themeColors.textPrimary }}
                >
                  Module Structure
                </h3>
                
                <div className="space-y-3">
                  {selectedVersion.data.modules.map((module, index) => (
                    <div key={module.id}>
                      <div 
                        className="font-medium"
                        style={{ color: themeColors.textPrimary }}
                      >
                        {index + 1}. {module.title}
                      </div>
                      
                      <div className="ml-4 mt-1 space-y-1">
                        {module.sections.map((section, sectionIndex) => (
                          <div 
                            key={section.id}
                            className="text-sm flex items-center space-x-2"
                            style={{ color: themeColors.textSecondary }}
                          >
                            <span 
                              className="text-xs px-1 py-0.5 rounded"
                              style={{
                                backgroundColor: section.type === 'video' ? '#3B82F6' : '#10B981',
                                color: 'white'
                              }}
                            >
                              {section.type === 'video' ? '🎥' : '💻'}
                            </span>
                            <span>{sectionIndex + 1}. {section.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div 
                className="h-full flex items-center justify-center"
                style={{ color: themeColors.textMuted }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">📋</div>
                  <p className="text-xl">Select a version to view details</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
