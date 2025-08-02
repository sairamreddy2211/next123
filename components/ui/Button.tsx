"use client";

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { BaseComponentProps } from '@/models';

interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  onClick,
  type = 'button',
  className = '' 
}: ButtonProps) {
  const { themeColors } = useTheme();

  const baseStyles = "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: `text-white border`,
    secondary: `border hover:bg-opacity-10`,
    ghost: `hover:bg-opacity-10`,
    danger: `text-red-400 border-red-500 hover:bg-red-500 hover:bg-opacity-10`
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: themeColors.accent,
          borderColor: themeColors.accent,
          color: 'white'
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          borderColor: themeColors.border,
          color: themeColors.textPrimary
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          border: 'none',
          color: themeColors.textSecondary
        };
      case 'danger':
        return {
          backgroundColor: 'transparent',
          borderColor: themeColors.error,
          color: themeColors.error
        };
      default:
        return {};
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={getVariantStyles()}
    >
      {children}
    </button>
  );
}
