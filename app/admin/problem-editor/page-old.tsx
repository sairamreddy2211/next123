"use client";

import { useState, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import dynamic from "next/dynamic";
import { useTheme } from '@/components/providers/ThemeProvider';
import CodeEditor from '@/components/shared/CodeEditor';
import { QuestionView } from '@/components/problem-solving/InteractiveLearningView';
import TableMarkdownGenerator from '@/components/admin/TableMarkdownGenerator';
import ProblemForm from '@/components/admin/ProblemForm';
import VideoForm from '@/components/admin/VideoForm';
import ExamplesEditor from '@/components/admin/ExamplesEditor';
import ConstraintsEditor from '@/components/admin/ConstraintsEditor';
import CodeEditorSection from '@/components/admin/CodeEditorSection';
// Dynamically import Markdown Editor (react-markdown-editor-lite)
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
import 'react-markdown-editor-lite/lib/index.css';
// Import the QuestionView component from the problem-solving folder

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface ProblemData {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  companies: string[];
  category?: string;
  content?: string;
  diagram?: {
    type: "image" | "mermaid" | "text";
    content: string;
    caption?: string;
  };
  examples: Example[];
  constraints: string[];
  tableView?: {
    headers: string[];
    rows: (string | number)[][];
    styling: {
      headerBg: string;
      alternateRows: boolean;
      borders: boolean;
    };
  };
  starterCode: {
    javascript: string;
    python: string;
    sql?: string;
  };
}

const defaultProblem: ProblemData = {
  id: "",
  title: "",
  description: "",
  difficulty: "beginner",
  tags: [],
  companies: [],
  category: "",
  content: "",
  examples: [{ input: "", output: "", explanation: "" }],
  constraints: [""],
  starterCode: { javascript: "", python: "", sql: "" }
};

export default function ProblemEditor() {
  const { themeColors } = useTheme();
  const [problem, setProblem] = useState<ProblemData>(defaultProblem);
  const [jsonView, setJsonView] = useState(false);
  type LangType = 'python' | 'sql' | 'postgres';
  const [selectedLang, setSelectedLang] = useState<LangType>('python');
  const [showHints, setShowHints] = useState(false);
  const [viewType, setViewType] = useState<'leetcode' | 'video'>('leetcode');
  // Controlled code state for each language
  const [codeState, setCodeState] = useState<{ [K in LangType]: string }>({
    python: problem.starterCode.python || '',
    sql: problem.starterCode.sql || '',
    postgres: problem.starterCode.sql || '',
  });

  // Video form state
  const [videoData, setVideoData] = useState({
    id: '',
    title: '',
    description: '',
    duration: '',
    videoUrl: '',
    difficulty: 'beginner',
    category: '',
    presenter: '',
    presenterTitle: '',
    type: 'youtube',
    thumbnail: '',
    transcript: '',
  });

  const handleChange = (field: keyof ProblemData, value: any) => {
    setProblem((prev) => ({ ...prev, [field]: value }));
    // If starterCode is updated, sync codeState
    if (field === 'starterCode') {
      setCodeState((prev) => ({
        ...prev,
        python: value.python ?? prev.python,
        sql: value.sql ?? prev.sql,
        postgres: value.sql ?? prev.postgres,
      }));
    }
  };

  const handleVideoChange = (field: string, value: any) => {
    setVideoData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen text-white p-0" style={{ backgroundColor: themeColors.primary }}>
      <div className="flex h-screen">
        {/* Left Panel: Live Preview (only for leetcode view) */}
        {viewType === 'leetcode' && (
          <div className="w-1/2 border-r overflow-y-auto p-6" style={{ 
            borderColor: themeColors.border,
            backgroundColor: themeColors.secondary 
          }}>
            <QuestionView problem={problem} showHints={showHints} setShowHints={setShowHints} />
          </div>
        )}
        {/* Right Panel: Form */}
        <div className={viewType === 'leetcode' ? "w-1/2 overflow-y-auto p-8" : "w-full overflow-y-auto p-8"}>
          <div className="max-w-3xl mx-auto space-y-8">
            {/* View Type Dropdown */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">View Type</label>
              <select
                style={{ 
                  backgroundColor: themeColors.tertiary, 
                  borderColor: themeColors.border,
                  color: themeColors.textPrimary
                }}
                className="border rounded px-3 py-2"
                value={viewType}
                onChange={e => setViewType(e.target.value as 'leetcode' | 'video')}
              >
                <option value="leetcode">LeetCode (Problem)</option>
                <option value="video">Video</option>
              </select>
            </div>
            {/* Table Markdown Generator Tool (only for leetcode) */}
            {viewType === 'leetcode' && <TableMarkdownGenerator />}
            
            <h1 className="text-2xl font-bold mb-4">Admin {viewType === 'leetcode' ? 'Problem Editor' : 'Video Editor'}</h1>
            
            {/* LeetCode Problem Form */}
            {viewType === 'leetcode' && (
              <>
                {/* Problem Form */}
                <div 
                  className="p-4 rounded-lg border mb-6"
                  style={{
                    backgroundColor: themeColors.secondary,
                    borderColor: themeColors.border
                  }}
                >
                  <ProblemForm
                    formData={{
                      title: problem.title,
                      category: problem.category || '',
                      difficulty: problem.difficulty,
                      tags: problem.tags,
                      companies: problem.companies,
                      description: problem.description,
                      hint: '' // You can add hint field to ProblemData if needed
                    }}
                    onFormDataChange={(data) => {
                      handleChange('title', data.title);
                      handleChange('category', data.category);
                      handleChange('difficulty', data.difficulty);
                      handleChange('tags', data.tags);
                      handleChange('companies', data.companies);
                      handleChange('description', data.description);
                    }}
                  />
                </div>
                {/* Description */}
                <div 
                  className="p-4 rounded-lg border mb-6"
                  style={{
                    backgroundColor: themeColors.secondary,
                    borderColor: themeColors.border
                  }}
                >
                  <label 
                    className="block mb-2 font-semibold"
                    style={{ color: themeColors.textPrimary }}
                  >
                    Description
                  </label>
                  <div 
                    className="border rounded"
                    style={{ borderColor: themeColors.border }}
                  >
                    <MdEditor
                      value={problem.description}
                      style={{ height: '300px', background: 'transparent', color: 'white' }}
                      renderHTML={text => <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>}
                      onChange={({ text }) => handleChange('description', text)}
                      config={{ view: { menu: true, md: true, html: false }, canView: { menu: true, md: true, html: false, fullScreen: true, hideMenu: true } }}
                      className="bg-transparent text-white"
                    />
                  </div>
                </div>
                {/* Examples */}
                <div 
                  className="p-4 rounded-lg border mb-6"
                  style={{
                    backgroundColor: themeColors.secondary,
                    borderColor: themeColors.border
                  }}
                >
                  <ExamplesEditor
                    examples={problem.examples}
                    onExamplesChange={(examples) => handleChange('examples', examples)}
                  />
                </div>
                {/* Constraints */}
                <div 
                  className="p-4 rounded-lg border mb-6"
                  style={{
                    backgroundColor: themeColors.secondary,
                    borderColor: themeColors.border
                  }}
                >
                  <ConstraintsEditor
                    constraints={problem.constraints}
                    onConstraintsChange={(constraints) => handleChange('constraints', constraints)}
                  />
                </div>
                {/* Starter Code */}
                <div 
                  className="p-4 rounded-lg border mb-6"
                  style={{
                    backgroundColor: themeColors.secondary,
                    borderColor: themeColors.border
                  }}
                >
                  <CodeEditorSection
                    languages={[
                      { key: 'python', name: 'Python' },
                      { key: 'sql', name: 'SQL' },
                      { key: 'postgres', name: 'PostgreSQL' }
                    ]}
                    selectedLanguage={selectedLang === 'postgres' ? 'sql' : selectedLang}
                    onLanguageChange={(lang) => setSelectedLang(lang as LangType)}
                    starterCode={codeState}
                    onStarterCodeChange={(lang, code) => {
                      setCodeState((prev) => ({ ...prev, [lang as LangType]: code }));
                      if (lang === 'postgres') {
                        handleChange('starterCode', { ...problem.starterCode, sql: code });
                      } else {
                        handleChange('starterCode', { ...problem.starterCode, [lang]: code });
                      }
                    }}
                  />
                </div>
                {/* JSON Preview */}
                                {/* JSON Preview */}
                <div 
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: themeColors.secondary,
                    borderColor: themeColors.border
                  }}
                >
                  <button
                    className="mb-2 px-3 py-1 text-xs rounded transition-colors"
                    style={{
                      backgroundColor: themeColors.tertiary,
                      borderColor: themeColors.border,
                      color: themeColors.textPrimary
                    }}
                    onClick={() => setJsonView((v) => !v)}
                  >
                    {jsonView ? "Hide JSON" : "Show JSON"}
                  </button>
                  {jsonView && (
                    <pre 
                      className="text-xs p-3 rounded overflow-x-auto border"
                      style={{
                        backgroundColor: themeColors.primary,
                        borderColor: themeColors.border,
                        color: themeColors.textPrimary
                      }}
                    >
                      {JSON.stringify(problem, null, 2)}
                    </pre>
                  )}
                </div>
              </>
            )}
            
            {/* Video Form */}
            {viewType === 'video' && (
              <>
                <VideoForm
                  videoData={{
                    title: videoData.title,
                    description: videoData.description,
                    videoUrl: videoData.videoUrl,
                    duration: videoData.duration,
                    level: videoData.difficulty,
                    thumbnailUrl: videoData.thumbnail
                  }}
                  onVideoDataChange={(data) => {
                    handleVideoChange('title', data.title);
                    handleVideoChange('description', data.description);
                    handleVideoChange('videoUrl', data.videoUrl);
                    handleVideoChange('duration', data.duration);
                    handleVideoChange('difficulty', data.level);
                    handleVideoChange('thumbnail', data.thumbnailUrl);
                  }}
                />
                
                {/* Additional video fields not in VideoForm */}
                <div 
                  className="p-4 rounded-lg border mb-6"
                  style={{
                    backgroundColor: themeColors.secondary,
                    borderColor: themeColors.border
                  }}
                >
                  <h3 
                    className="font-semibold mb-4"
                    style={{ color: themeColors.textPrimary }}
                  >
                    Additional Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label 
                        className="block mb-1 font-semibold"
                        style={{ color: themeColors.textPrimary }}
                      >
                        Video ID
                      </label>
                      <input
                        className="w-full border rounded px-3 py-2"
                        style={{
                          backgroundColor: themeColors.tertiary,
                          borderColor: themeColors.border,
                          color: themeColors.textPrimary
                        }}
                        value={videoData.id}
                        onChange={e => handleVideoChange('id', e.target.value)}
                        placeholder="Enter video ID..."
                      />
                    </div>

                    <div>
                      <label 
                        className="block mb-1 font-semibold"
                        style={{ color: themeColors.textPrimary }}
                      >
                        Type
                      </label>
                      <select
                        className="w-full border rounded px-3 py-2"
                        style={{
                          backgroundColor: themeColors.tertiary,
                          borderColor: themeColors.border,
                          color: themeColors.textPrimary
                        }}
                        value={videoData.type}
                        onChange={e => handleVideoChange('type', e.target.value)}
                      >
                        <option value="youtube">YouTube</option>
                        <option value="custom">Custom/DRM</option>
                      </select>
                    </div>

                    <div>
                      <label 
                        className="block mb-1 font-semibold"
                        style={{ color: themeColors.textPrimary }}
                      >
                        Category
                      </label>
                      <input
                        className="w-full border rounded px-3 py-2"
                        style={{
                          backgroundColor: themeColors.tertiary,
                          borderColor: themeColors.border,
                          color: themeColors.textPrimary
                        }}
                        value={videoData.category}
                        onChange={e => handleVideoChange('category', e.target.value)}
                        placeholder="Enter category..."
                      />
                    </div>

                    <div>
                      <label 
                        className="block mb-1 font-semibold"
                        style={{ color: themeColors.textPrimary }}
                      >
                        Presenter
                      </label>
                      <input
                        className="w-full border rounded px-3 py-2"
                        style={{
                          backgroundColor: themeColors.tertiary,
                          borderColor: themeColors.border,
                          color: themeColors.textPrimary
                        }}
                        value={videoData.presenter}
                        onChange={e => handleVideoChange('presenter', e.target.value)}
                        placeholder="Enter presenter name..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label 
                        className="block mb-1 font-semibold"
                        style={{ color: themeColors.textPrimary }}
                      >
                        Presenter Title
                      </label>
                      <input
                        className="w-full border rounded px-3 py-2"
                        style={{
                          backgroundColor: themeColors.tertiary,
                          borderColor: themeColors.border,
                          color: themeColors.textPrimary
                        }}
                        value={videoData.presenterTitle}
                        onChange={e => handleVideoChange('presenterTitle', e.target.value)}
                        placeholder="Enter presenter title..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label 
                        className="block mb-1 font-semibold"
                        style={{ color: themeColors.textPrimary }}
                      >
                        Transcript (Optional)
                      </label>
                      <textarea
                        className="w-full border rounded px-3 py-2"
                        style={{
                          backgroundColor: themeColors.tertiary,
                          borderColor: themeColors.border,
                          color: themeColors.textPrimary
                        }}
                        rows={5}
                        value={videoData.transcript}
                        onChange={e => handleVideoChange('transcript', e.target.value)}
                        placeholder="Enter video transcript..."
                      />
                    </div>
                  </div>
                </div>

                {/* JSON Preview for video data */}
                <div 
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: themeColors.secondary,
                    borderColor: themeColors.border
                  }}
                >
                  <button
                    className="mb-2 px-3 py-1 text-xs rounded transition-colors"
                    style={{
                      backgroundColor: themeColors.tertiary,
                      borderColor: themeColors.border,
                      color: themeColors.textPrimary
                    }}
                    onClick={() => setJsonView((v) => !v)}
                  >
                    {jsonView ? "Hide JSON" : "Show JSON"}
                  </button>
                  {jsonView && (
                    <pre 
                      className="text-xs p-3 rounded overflow-x-auto border"
                      style={{
                        backgroundColor: themeColors.primary,
                        borderColor: themeColors.border,
                        color: themeColors.textPrimary
                      }}
                    >
                      {JSON.stringify(videoData, null, 2)}
                    </pre>
                  )}
                </div>
              </>
            )}
                  }}
                  onVideoDataChange={(data) => {
                    handleVideoChange('title', data.title);
                    handleVideoChange('description', data.description);
                    handleVideoChange('videoUrl', data.videoUrl);
                    handleVideoChange('duration', data.duration);
                    handleVideoChange('difficulty', data.level);
                    handleVideoChange('thumbnail', data.thumbnailUrl);
                  }}
                />
                
                {/* Additional video fields not in VideoForm */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label 
                      className="block mb-1 font-semibold"
                      style={{ color: themeColors.textPrimary }}
                    >
                      Video ID
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      style={{
                        backgroundColor: themeColors.tertiary,
                        borderColor: themeColors.border,
                        color: themeColors.textPrimary
                      }}
                      value={videoData.id}
                      onChange={e => handleVideoChange('id', e.target.value)}
                      placeholder="Enter video ID..."
                    />
                  </div>

                  <div>
                    <label 
                      className="block mb-1 font-semibold"
                      style={{ color: themeColors.textPrimary }}
                    >
                      Type
                    </label>
                    <select
                      className="w-full border rounded px-3 py-2"
                      style={{
                        backgroundColor: themeColors.tertiary,
                        borderColor: themeColors.border,
                        color: themeColors.textPrimary
                      }}
                      value={videoData.type}
                      onChange={e => handleVideoChange('type', e.target.value)}
                    >
                      <option value="youtube">YouTube</option>
                      <option value="custom">Custom/DRM</option>
                    </select>
                  </div>

                  <div>
                    <label 
                      className="block mb-1 font-semibold"
                      style={{ color: themeColors.textPrimary }}
                    >
                      Category
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      style={{
                        backgroundColor: themeColors.tertiary,
                        borderColor: themeColors.border,
                        color: themeColors.textPrimary
                      }}
                      value={videoData.category}
                      onChange={e => handleVideoChange('category', e.target.value)}
                      placeholder="Enter category..."
                    />
                  </div>

                  <div>
                    <label 
                      className="block mb-1 font-semibold"
                      style={{ color: themeColors.textPrimary }}
                    >
                      Presenter
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      style={{
                        backgroundColor: themeColors.tertiary,
                        borderColor: themeColors.border,
                        color: themeColors.textPrimary
                      }}
                      value={videoData.presenter}
                      onChange={e => handleVideoChange('presenter', e.target.value)}
                      placeholder="Enter presenter name..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label 
                      className="block mb-1 font-semibold"
                      style={{ color: themeColors.textPrimary }}
                    >
                      Presenter Title
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      style={{
                        backgroundColor: themeColors.tertiary,
                        borderColor: themeColors.border,
                        color: themeColors.textPrimary
                      }}
                      value={videoData.presenterTitle}
                      onChange={e => handleVideoChange('presenterTitle', e.target.value)}
                      placeholder="Enter presenter title..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label 
                      className="block mb-1 font-semibold"
                      style={{ color: themeColors.textPrimary }}
                    >
                      Transcript (Optional)
                    </label>
                    <textarea
                      className="w-full border rounded px-3 py-2"
                      style={{
                        backgroundColor: themeColors.tertiary,
                        borderColor: themeColors.border,
                        color: themeColors.textPrimary
                      }}
                      rows={5}
                      value={videoData.transcript}
                      onChange={e => handleVideoChange('transcript', e.target.value)}
                      placeholder="Enter video transcript..."
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
