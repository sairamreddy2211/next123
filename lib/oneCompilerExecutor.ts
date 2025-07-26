'use client'

interface ExecutionResult {
  success: boolean
  output?: string
  error?: string
  executionTime?: number
}

class OneCompilerExecutor {
  private baseUrl = 'https://onecompiler-apis.p.rapidapi.com/api/v1/run'
  private apiKey = '34b9f1a3d6mshdb7e66d3c16b48ep17c3e0jsnd97a109697b3'

  async executeCode(code: string, language: string, tables?: any[]): Promise<ExecutionResult> {
    try {
      let finalCode = code

      // For SQL/PostgreSQL, prepend table creation if tables are provided
      if ((language === 'sql' || language === 'postgresql') && tables && tables.length > 0) {
        const schemaCode = this.generateSchemaCode(tables, language)
        finalCode = schemaCode + '\n\n-- User Query:\n' + code
      }

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
          'x-rapidapi-key': this.apiKey,
        },
        body: JSON.stringify({
          language: this.mapLanguage(language),
          stdin: '', // stdin input if needed
          files: [
            {
              name: this.getFileName(language),
              content: finalCode
            }
          ]
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      // Check for errors - OneCompiler can return exception even with status 'success'
      // For PostgreSQL, ignore NOTICEs about non-existent tables (these are expected)
      let hasError = result.exception || result.stderr || result.error
      
      if (language === 'postgresql' && hasError) {
        const errorMessage = hasError.toString()
        // If it's only PostgreSQL NOTICEs about tables not existing, don't treat as error
        // Check if there are any actual ERRORs, not just NOTICEs
        const hasActualError = errorMessage.includes('ERROR:') || 
                              errorMessage.includes('FATAL:') || 
                              errorMessage.includes('PANIC:')
        
        if (!hasActualError && errorMessage.includes('NOTICE:')) {
          hasError = null
        }
      }
      
      // OneCompiler API response format
      return {
        success: result.status === 'success' && !hasError,
        output: hasError ? undefined : (result.stdout || result.output || 'Code executed successfully'),
        error: hasError ? (result.exception || result.stderr || result.error) : undefined,
        executionTime: result.executionTime || 0
      }

    } catch (error: any) {
      return {
        success: false,
        error: `Execution failed: ${error.message}`,
        executionTime: 0
      }
    }
  }

  private getFileName(language: string): string {
    const fileMap: Record<string, string> = {
      'python': 'main.py',
      'sql': 'query.sql',
      'postgresql': 'query.sql'
    }
    return fileMap[language.toLowerCase()] || 'main.txt'
  }

  private mapLanguage(language: string): string {
    const languageMap: Record<string, string> = {
      'python': 'python',
      'sql': 'mysql', // OneCompiler uses 'mysql' for SQL
      'postgresql': 'postgresql'
    }
    return languageMap[language.toLowerCase()] || language
  }

  private generateSchemaCode(tables: any[], language: string): string {
    let schema = '-- Database Schema Setup\n'
    
    for (const table of tables) {
      schema += `\n-- Table: ${table.name}\n`
      
      // Drop table if exists
      schema += `DROP TABLE IF EXISTS ${table.name};\n`
      
      // Create table with MySQL-compatible syntax
      const columns = table.columns.map((col: any) => {
        let columnDef = `  ${col.name} ${this.convertToMySQLType(col.type)}`
        
        // Handle constraints properly for MySQL
        if (col.constraints) {
          const constraints = col.constraints.toLowerCase()
          if (constraints.includes('primary key')) {
            columnDef += ' PRIMARY KEY'
          }
          if (constraints.includes('not null') && !constraints.includes('primary key')) {
            columnDef += ' NOT NULL'
          }
          if (constraints.includes('unique')) {
            columnDef += ' UNIQUE'
          }
          // Skip FOREIGN KEY constraint in column definition - we'll add it later if needed
        }
        
        return columnDef
      }).join(',\n')
      
      schema += `CREATE TABLE ${table.name} (\n${columns}\n);\n\n`
      
      // Insert sample data
      if (table.sampleData && table.sampleData.length > 0) {
        schema += `-- Sample data for ${table.name}\n`
        
        for (const row of table.sampleData) {
          const values = table.columns.map((col: any) => {
            const value = row[col.name]
            if (value === null || value === undefined) return 'NULL'
            if (typeof value === 'string') return `'${value.replace(/'/g, "''")}'`
            return value
          }).join(', ')
          
          schema += `INSERT INTO ${table.name} VALUES (${values});\n`
        }
        schema += '\n'
      }
    }
    
    return schema
  }

  private convertToMySQLType(postgresType: string): string {
    const typeMap: Record<string, string> = {
      'INTEGER': 'INT',
      'VARCHAR(100)': 'VARCHAR(100)',
      'VARCHAR(50)': 'VARCHAR(50)',
      'VARCHAR(150)': 'VARCHAR(150)',
      'DATE': 'DATE',
      'BOOLEAN': 'BOOLEAN'
    }
    
    return typeMap[postgresType.toUpperCase()] || postgresType
  }
}

export const oneCompilerExecutor = new OneCompilerExecutor()
