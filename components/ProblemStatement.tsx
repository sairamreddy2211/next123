'use client'

import { DatabaseSchema } from './DatabaseSchema'

interface Example {
  input: string
  output: string
  explanation?: string
}

interface Table {
  name: string
  columns: {
    name: string
    type: string
    constraints?: string
  }[]
  sampleData: Record<string, any>[]
}

interface ProblemData {
  id: number
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  description: string
  examples: Example[]
  constraints: string[]
  tags: string[]
  acceptanceRate: string
  totalSubmissions: string
  tables?: Table[]  // For database problems
}

interface ProblemStatementProps {
  problem: ProblemData
}

export function ProblemStatement({ problem }: ProblemStatementProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-100'
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'Hard':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6 bg-white">
      {/* Problem Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-gray-900">
            {problem.id}. {problem.title}
          </h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
        </div>
        
        {/* Problem Stats */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Acceptance Rate: {problem.acceptanceRate}</span>
          <span>Total Submissions: {problem.totalSubmissions}</span>
        </div>
      </div>

      {/* Problem Description */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Problem Description</h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {problem.description}
          </p>
        </div>
      </div>

      {/* Examples */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Examples</h2>
        {problem.examples.map((example, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Example {index + 1}:</h3>
            
            <div className="mb-2">
              <span className="font-medium text-gray-700">Input: </span>
              <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">
                {example.input}
              </code>
            </div>
            
            <div className="mb-2">
              <span className="font-medium text-gray-700">Output: </span>
              <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">
                {example.output}
              </code>
            </div>
            
            {example.explanation && (
              <div>
                <span className="font-medium text-gray-700">Explanation: </span>
                <span className="text-gray-600">{example.explanation}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Constraints */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Constraints</h2>
        <ul className="list-disc list-inside space-y-1">
          {problem.constraints.map((constraint, index) => (
            <li key={index} className="text-gray-700 text-sm">
              <code className="bg-gray-100 px-1 rounded">{constraint}</code>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Database Schema - only show for database problems */}
      {problem.tables && problem.tables.length > 0 && (
        <div className="mb-6">
          <DatabaseSchema tables={problem.tables} />
        </div>
      )}

      {/* Similar Problems */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-3">Similar Problems</h2>
        <div className="space-y-2">
          <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
            • Two Sum (Easy)
          </a>
          <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
            • Three Sum (Medium)
          </a>
          <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
            • Four Sum (Medium)
          </a>
        </div>
      </div>
    </div>
  )
}
