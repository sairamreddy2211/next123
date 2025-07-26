'use client'

interface Table {
  name: string
  columns: {
    name: string
    type: string
    constraints?: string
  }[]
  sampleData: Record<string, any>[]
}

interface DatabaseSchemaProps {
  tables: Table[]
}

export function DatabaseSchema({ tables }: DatabaseSchemaProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 1.79 4 4 4h8c0-2.21-1.79-4-4-4H8c-2.21 0-4-1.79-4-4zm0 0V4c0-2.21 1.79-4 4-4h4c2.21 0 4 1.79 4 4v3M4 7h16" />
        </svg>
        Database Schema
      </h3>
      
      <div className="space-y-6">
        {tables.map((table, tableIndex) => (
          <div key={tableIndex} className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-300">
              <h4 className="font-semibold text-gray-900">{table.name}</h4>
            </div>
            
            {/* Column Definitions */}
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-300">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Columns:</h5>
              <div className="space-y-1">
                {table.columns.map((column, colIndex) => (
                  <div key={colIndex} className="text-sm font-mono text-gray-600">
                    <span className="font-semibold text-blue-600">{column.name}</span>
                    <span className="text-gray-500"> {column.type}</span>
                    {column.constraints && (
                      <span className="text-orange-600"> {column.constraints}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sample Data */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    {table.columns.map((column, colIndex) => (
                      <th key={colIndex} className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300 last:border-r-0">
                        {column.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {table.sampleData.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {table.columns.map((column, colIndex) => (
                        <td key={colIndex} className="px-3 py-2 text-sm text-gray-900 border-r border-gray-200 last:border-r-0">
                          <code className="text-xs bg-gray-100 px-1 rounded">
                            {row[column.name] !== null && row[column.name] !== undefined 
                              ? String(row[column.name]) 
                              : <span className="text-gray-400">NULL</span>
                            }
                          </code>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      
      {/* Schema Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
        <h5 className="text-sm font-medium text-blue-900 mb-1">Schema Information:</h5>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Use standard SQL syntax for your queries</li>
          <li>• Table and column names are case-sensitive</li>
          <li>• Sample data shown above represents the actual data in the database</li>
          <li>• Foreign key relationships are defined in the problem constraints</li>
        </ul>
      </div>
    </div>
  )
}
