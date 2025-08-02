"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeName, getTheme, applyTheme, defaultTheme } from '@/lib/theme';

interface ThemeContextType {
  theme: ThemeName;
  toggleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
  themeColors: ReturnType<typeof getTheme>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
}

export function ThemeProvider({ children, defaultTheme: initialTheme = defaultTheme }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(initialTheme);

  useEffect(() => {
    // Apply theme on mount and when theme changes
    applyTheme(theme);
    
    // Store theme preference in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    // Load theme from localStorage on mount
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as ThemeName;
      if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
        setThemeState(savedTheme);
      }
    }
  }, []);

  const toggleTheme = () => {
    setThemeState(current => current === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
  };

  const themeColors = getTheme(theme);

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
    themeColors
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
