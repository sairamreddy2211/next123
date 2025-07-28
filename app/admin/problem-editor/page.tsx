"use client";

import { useState, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import dynamic from "next/dynamic";
// Dynamically import Markdown Editor (react-markdown-editor-lite)
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
import 'react-markdown-editor-lite/lib/index.css';
import { useEffect } from 'react';
// Import the QuestionView component from the problem-solving folder
// Table Markdown Generator Tool
function TableMarkdownGenerator() {
  const [columns, setColumns] = useState<string[]>([""]);
  const [rows, setRows] = useState<string[][]>([[""]]);
  const [show, setShow] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Generate markdown
  const getMarkdown = () => {
    if (columns.length === 0 || columns.every(col => !col.trim())) return '';
    const header = '| ' + columns.map(col => col || ' ').join(' | ') + ' |';
    const divider = '| ' + columns.map(() => '---').join(' | ') + ' |';
    const body = rows
      .map(row => '| ' + columns.map((_, i) => row[i] || ' ').join(' | ') + ' |')
      .join('\n');
    return [header, divider, body].filter(Boolean).join('\n');
  };

  const handleCopy = () => {
    const md = getMarkdown();
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(md);
    }
  };

  return (
    <div className="mb-6">
      <button
        className="mb-2 px-3 py-1 bg-[#333333] border border-[#222222] rounded text-xs text-white hover:bg-[#222222]"
        onClick={() => setShow(v => !v)}
      >
        {show ? 'Hide Table Markdown Generator' : 'Show Table Markdown Generator'}
      </button>
      {show && (
        <div className="bg-[#222222] p-4 rounded-lg border border-[#333333] mb-2">
          <div className="mb-2">
            <label className="block font-semibold mb-1">Columns</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {columns.map((col, idx) => (
                <input
                  key={idx}
                  className="bg-[#333333] border border-[#222222] rounded px-2 py-1 text-white text-xs w-32"
                  placeholder={`Column ${idx + 1}`}
                  value={col}
                  onChange={e => {
                    const updated = [...columns];
                    updated[idx] = e.target.value;
                    setColumns(updated);
                  }}
                />
              ))}
              <button
                className="text-xs text-green-400 hover:underline"
                onClick={() => setColumns(cols => [...cols, ''])}
              >+ Add Column</button>
              {columns.length > 1 && (
                <button
                  className="text-xs text-red-400 hover:underline"
                  onClick={() => setColumns(cols => cols.slice(0, -1))}
                >- Remove</button>
              )}
            </div>
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Rows</label>
            {rows.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-2 mb-1">
                {columns.map((_, cIdx) => (
                  <input
                    key={cIdx}
                    className="bg-[#333333] border border-[#222222] rounded px-2 py-1 text-white text-xs w-32"
                    placeholder={`Row ${rIdx + 1} Col ${cIdx + 1}`}
                    value={row[cIdx] || ''}
                    onChange={e => {
                      const updatedRows = rows.map(arr => [...arr]);
                      updatedRows[rIdx][cIdx] = e.target.value;
                      setRows(updatedRows);
                    }}
                  />
                ))}
                <button
                  className="text-xs text-red-400 hover:underline"
                  onClick={() => setRows(rows => rows.length > 1 ? rows.filter((_, i) => i !== rIdx) : rows)}
                  disabled={rows.length === 1}
                >Remove</button>
              </div>
            ))}
            <button
              className="text-xs text-green-400 hover:underline"
              onClick={() => setRows(rows => [...rows, Array(columns.length).fill('')])}
            >+ Add Row</button>
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Markdown Output</label>
            <textarea
              ref={textareaRef}
              className="w-full bg-[#333333] border border-[#222222] rounded px-2 py-1 text-white text-xs font-mono mb-2"
              rows={Math.max(3, rows.length + 2)}
              value={getMarkdown()}
              readOnly
              onFocus={e => e.target.select()}
            />
            <button
              className="px-3 py-1 bg-[#333333] border border-[#222222] rounded text-xs text-white hover:bg-[#444444]"
              onClick={handleCopy}
              type="button"
            >Copy Markdown</button>
          </div>
          <div>
            <label className="block font-semibold mb-1">Preview</label>
            <div className="bg-black p-2 rounded border border-[#222222] overflow-x-auto">
              <div className="prose prose-invert max-w-none text-gray-300">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({node, ...props}: any) => <table className="min-w-full border border-gray-600 my-2 text-xs" {...props} />, 
                    th: ({node, ...props}: any) => <th className="border border-gray-600 px-2 py-1 bg-gray-800 text-gray-200 text-xs" {...props} />, 
                    td: ({node, ...props}: any) => <td className="border border-gray-600 px-2 py-1 text-gray-300 text-xs" {...props} />, 
                    tr: ({node, ...props}: any) => <tr {...props} />
                  }}
                >
                  {getMarkdown()}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { QuestionView } from "@/components/problem-solving/InteractiveLearningView";

// Dynamically import Monaco to avoid SSR issues
const CodeEditor = dynamic(() => import("@/components/shared/CodeEditor"), { ssr: false });

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

export default function AdminProblemEditorPage() {
  const [problem, setProblem] = useState<ProblemData>(defaultProblem);
  const [jsonView, setJsonView] = useState(false);
  type LangType = 'python' | 'sql' | 'postgres';
  const [selectedLang, setSelectedLang] = useState<LangType>('python');
  const [showHints, setShowHints] = useState(false);
  // Controlled code state for each language
  const [codeState, setCodeState] = useState<{ [K in LangType]: string }>({
    python: problem.starterCode.python || '',
    sql: problem.starterCode.sql || '',
    postgres: problem.starterCode.sql || '',
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

  return (
    <div className="min-h-screen bg-black text-white p-0">
      <div className="flex h-screen">
        {/* Left Panel: Live Preview */}
        <div className="w-1/2 border-r border-gray-800 bg-[#181818] overflow-y-auto p-6">
          <QuestionView problem={problem} showHints={showHints} setShowHints={setShowHints} />
        </div>
        {/* Right Panel: Form */}
        <div className="w-1/2 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Table Markdown Generator Tool */}
            <TableMarkdownGenerator />
            <h1 className="text-2xl font-bold mb-4">Admin Problem Editor</h1>
            {/* Title, Category, Content, Tags, Companies & Difficulty */}
            <div className="space-y-4 bg-[#262626] p-4 rounded-lg border border-[#222222]">
              <input
                className="w-full bg-[#333333] border border-[#222222] rounded px-3 py-2 text-white mb-2"
                placeholder="Problem Title"
                value={problem.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              <input
                className="w-full bg-[#333333] border border-[#222222] rounded px-3 py-2 text-white mb-2"
                placeholder="Category (optional)"
                value={problem.category}
                onChange={(e) => handleChange("category", e.target.value)}
              />
              <input
                className="w-full bg-[#333333] border border-[#222222] rounded px-3 py-2 text-white mb-2"
                placeholder="Content (optional)"
                value={problem.content}
                onChange={(e) => handleChange("content", e.target.value)}
              />
              {/* Tags */}
              <div>
                <label className="block mb-1 font-semibold">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {problem.tags.map((tag, idx) => (
                    <span key={idx} className="bg-blue-700 text-xs px-2 py-1 rounded flex items-center">
                      {tag}
                      <button
                        className="ml-1 text-red-300 hover:text-red-500"
                        type="button"
                        onClick={() => {
                          const updated = problem.tags.filter((_, i) => i !== idx);
                          handleChange("tags", updated);
                        }}
                      >×</button>
                    </span>
                  ))}
                </div>
                <input
                  className="w-full bg-[#333333] border border-[#222222] rounded px-3 py-2 text-white"
                  placeholder="Add tag and press Enter"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      handleChange("tags", [...problem.tags, e.currentTarget.value.trim()]);
                      e.currentTarget.value = '';
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              {/* Companies */}
              <div>
                <label className="block mb-1 font-semibold">Companies</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {problem.companies.map((company, idx) => (
                    <span key={idx} className="bg-green-700 text-xs px-2 py-1 rounded flex items-center">
                      {company}
                      <button
                        className="ml-1 text-red-300 hover:text-red-500"
                        type="button"
                        onClick={() => {
                          const updated = problem.companies.filter((_, i) => i !== idx);
                          handleChange("companies", updated);
                        }}
                      >×</button>
                    </span>
                  ))}
                </div>
                <input
                  className="w-full bg-[#333333] border border-[#222222] rounded px-3 py-2 text-white"
                  placeholder="Add company and press Enter"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      handleChange("companies", [...problem.companies, e.currentTarget.value.trim()]);
                      e.currentTarget.value = '';
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <select
                className="bg-[#333333] border border-[#222222] rounded px-3 py-2 text-white"
                value={problem.difficulty}
                onChange={(e) => handleChange("difficulty", e.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            {/* Description */}
            <div className="space-y-2 bg-[#262626] p-4 rounded-lg border border-[#222222]">
              <label className="block mb-1 font-semibold">Description</label>
              <div className="bg-[#333333] border border-[#222222] rounded">
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
            <div className="space-y-2 bg-[#262626] p-4 rounded-lg border border-[#222222]">
              <label className="block mb-1 font-semibold">Examples</label>
              {problem.examples.map((ex, idx) => (
                <div key={idx} className="mb-2 p-2 rounded bg-[#333333] border border-[#222222]">
                  <input
                    className="w-full mb-1 bg-transparent border-b border-[#222222] text-white"
                    placeholder="Input"
                    value={ex.input}
                    onChange={(e) => {
                      const updated = [...problem.examples];
                      updated[idx].input = e.target.value;
                      handleChange("examples", updated);
                    }}
                  />
                  <input
                    className="w-full mb-1 bg-transparent border-b border-[#222222] text-white"
                    placeholder="Output"
                    value={ex.output}
                    onChange={(e) => {
                      const updated = [...problem.examples];
                      updated[idx].output = e.target.value;
                      handleChange("examples", updated);
                    }}
                  />
                  <input
                    className="w-full bg-transparent border-b border-[#222222] text-white"
                    placeholder="Explanation (optional)"
                    value={ex.explanation}
                    onChange={(e) => {
                      const updated = [...problem.examples];
                      updated[idx].explanation = e.target.value;
                      handleChange("examples", updated);
                    }}
                  />
                  <div className="flex justify-end mt-1">
                    <button
                      className="text-xs text-red-400 hover:underline"
                      onClick={() => {
                        const updated = problem.examples.filter((_, i) => i !== idx);
                        handleChange("examples", updated);
                      }}
                      disabled={problem.examples.length === 1}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="text-xs text-green-400 hover:underline"
                onClick={() => handleChange("examples", [...problem.examples, { input: "", output: "", explanation: "" }])}
              >
                + Add Example
              </button>
            </div>
            {/* Constraints */}
            <div className="space-y-2 bg-[#262626] p-4 rounded-lg border border-[#222222]">
              <label className="block mb-1 font-semibold">Constraints</label>
              {problem.constraints.map((c, idx) => (
                <div key={idx} className="flex items-center mb-1">
                  <input
                    className="w-full bg-[#333333] border border-[#222222] rounded px-2 py-1 text-white"
                    placeholder="Constraint"
                    value={c}
                    onChange={(e) => {
                      const updated = [...problem.constraints];
                      updated[idx] = e.target.value;
                      handleChange("constraints", updated);
                    }}
                  />
                  <button
                    className="ml-2 text-xs text-red-400 hover:underline"
                    onClick={() => {
                      const updated = problem.constraints.filter((_, i) => i !== idx);
                      handleChange("constraints", updated);
                    }}
                    disabled={problem.constraints.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="text-xs text-green-400 hover:underline"
                onClick={() => handleChange("constraints", [...problem.constraints, ""])}
              >
                + Add Constraint
              </button>
            </div>
            {/* Starter Code (Single Editor with Language Switcher) */}
            <div className="space-y-2 bg-[#262626] p-4 rounded-lg border border-[#222222]">
              <label className="block mb-1 font-semibold">Starter Code</label>
              <div className="flex items-center space-x-2 mb-2">
                {(['python', 'sql', 'postgres'] as LangType[]).map((lang) => (
                  <button
                    key={lang}
                    className={`px-3 py-1 rounded text-xs font-medium border border-[#222222] transition-colors focus:outline-none ${selectedLang === lang ? 'bg-[#333333] text-white' : 'bg-black text-gray-400 hover:text-white'}`}
                    onClick={() => setSelectedLang(lang)}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>
              <div style={{ height: '70vh' }}>
                <CodeEditor
                  language={selectedLang === 'postgres' ? 'sql' : selectedLang}
                  value={codeState[selectedLang]}
                  onChange={(val) => {
                    setCodeState((prev) => ({ ...prev, [selectedLang]: val }));
                    // Update the correct field in starterCode
                    if (selectedLang === 'postgres') {
                      handleChange('starterCode', { ...problem.starterCode, sql: val });
                    } else {
                      handleChange('starterCode', { ...problem.starterCode, [selectedLang]: val });
                    }
                  }}
                />
              </div>
            </div>
            {/* JSON Preview */}
            <div className="bg-[#262626] p-4 rounded-lg border border-[#222222]">
              <button
                className="mb-2 px-3 py-1 bg-[#333333] border border-[#222222] rounded text-xs text-white hover:bg-[#222222]"
                onClick={() => setJsonView((v) => !v)}
              >
                {jsonView ? "Hide JSON" : "Show JSON"}
              </button>
              {jsonView && (
                <pre className="text-xs bg-black p-3 rounded overflow-x-auto border border-[#222222]">
                  {JSON.stringify(problem, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
