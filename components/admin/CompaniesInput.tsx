"use client";

import { useTheme } from '@/components/providers/ThemeProvider';

interface CompaniesInputProps {
  companies: string[];
  onCompaniesChange: (companies: string[]) => void;
  placeholder?: string;
  label?: string;
}

export default function CompaniesInput({ 
  companies, 
  onCompaniesChange, 
  placeholder = "Add company and press Enter",
  label = "Companies"
}: CompaniesInputProps) {
  const { themeColors } = useTheme();

  const removeCompany = (indexToRemove: number) => {
    const updated = companies.filter((_, i) => i !== indexToRemove);
    onCompaniesChange(updated);
  };

  const addCompany = (company: string) => {
    if (company.trim() && !companies.includes(company.trim())) {
      onCompaniesChange([...companies, company.trim()]);
    }
  };

  return (
    <div>
      <label 
        className="block mb-1 font-semibold"
        style={{ color: themeColors.textPrimary }}
      >
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {companies.map((company, idx) => (
          <span 
            key={idx} 
            className="text-xs px-2 py-1 rounded flex items-center"
            style={{ backgroundColor: '#059669', color: 'white' }}
          >
            {company}
            <button
              className="ml-1 hover:opacity-70"
              style={{ color: '#FCA5A5' }}
              type="button"
              onClick={() => removeCompany(idx)}
            >×</button>
          </span>
        ))}
      </div>
      <input
        className="w-full border rounded px-3 py-2"
        style={{
          backgroundColor: themeColors.tertiary,
          borderColor: themeColors.border,
          color: themeColors.textPrimary
        }}
        placeholder={placeholder}
        onKeyDown={e => {
          if (e.key === 'Enter' && e.currentTarget.value.trim()) {
            addCompany(e.currentTarget.value);
            e.currentTarget.value = '';
            e.preventDefault();
          }
        }}
      />
    </div>
  );
}
