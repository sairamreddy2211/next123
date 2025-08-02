// Centralized theme configuration
export const themes = {
  dark: {
    // Background colors
    primary: '#000000',     // Pure black
    secondary: '#262626',   // Panels, headers, inputs
    tertiary: '#333333',    // Section headers, highlights, hover states
    
    // Border colors
    border: '#222222',      // Subtle borders throughout
    
    // Text colors
    textPrimary: '#FFFFFF',    // White for headings
    textSecondary: '#F9FAFB',  // Light gray for body text
    textMuted: '#6B7280',      // Darker gray for secondary info
    
    // Status colors
    success: '#10B981',     // Green for passed tests
    error: '#EF4444',       // Red for failed tests
    warning: '#F59E0B',     // Yellow for hints/warnings
    accent: '#F97316',      // Orange accent color
    
    // Component specific
    videoOverlay: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 20px)',
    
    // Panel colors
    descriptionPanel: {
      background: '#FFFFFF',
      border: '#E5E7EB',
      text: '#111827',
      textSecondary: '#6B7280',
      closeButton: '#6B7280',
      closeButtonHover: '#374151'
    }
  },
  
  light: {
    // Background colors
    primary: '#FFFFFF',
    secondary: '#F3F4F6',
    tertiary: '#E5E7EB',
    
    // Border colors
    border: '#D1D5DB',
    
    // Text colors
    textPrimary: '#111827',
    textSecondary: '#374151',
    textMuted: '#6B7280',
    
    // Status colors
    success: '#059669',
    error: '#DC2626',
    warning: '#D97706',
    accent: '#EA580C',
    
    // Component specific
    videoOverlay: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0 2px, transparent 2px 20px)',
    
    // Panel colors
    descriptionPanel: {
      background: '#111827',
      border: '#374151',
      text: '#FFFFFF',
      textSecondary: '#D1D5DB',
      closeButton: '#9CA3AF',
      closeButtonHover: '#D1D5DB'
    }
  }
} as const;

export type ThemeName = keyof typeof themes;
export type Theme = typeof themes[ThemeName];

// Default theme
export const defaultTheme: ThemeName = 'dark';

// Helper function to get theme colors
export const getTheme = (themeName: ThemeName = defaultTheme) => {
  return themes[themeName];
};

// CSS custom properties for dynamic theming
export const getCSSVariables = (theme: ReturnType<typeof getTheme>) => ({
  '--color-primary': theme.primary,
  '--color-secondary': theme.secondary,
  '--color-tertiary': theme.tertiary,
  '--color-border': theme.border,
  '--color-text-primary': theme.textPrimary,
  '--color-text-secondary': theme.textSecondary,
  '--color-text-muted': theme.textMuted,
  '--color-success': theme.success,
  '--color-error': theme.error,
  '--color-warning': theme.warning,
  '--color-accent': theme.accent,
});

// Theme context utilities
export const applyTheme = (themeName: ThemeName, element?: HTMLElement) => {
  const theme = getTheme(themeName);
  const cssVars = getCSSVariables(theme);
  const targetElement = element || document.documentElement;
  
  Object.entries(cssVars).forEach(([property, value]) => {
    targetElement.style.setProperty(property, value);
  });
};
