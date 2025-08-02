"use client";

import { Globe, Bell, Menu, Sun } from 'lucide-react';

interface UserActionsProps {
  dailyXP: number;
  isLightMode?: boolean;
  onToggleLightMode?: () => void;
}

export default function UserActions({ 
  dailyXP, 
  isLightMode, 
  onToggleLightMode 
}: UserActionsProps) {
  return (
    <div className="flex items-center space-x-4">
      {/* Daily XP */}
      <div className="flex items-center space-x-2 px-3 py-1.5 bg-orange-500/20 border border-orange-500/30 rounded-lg">
        <span className="text-orange-500 font-bold text-sm">Daily XP</span>
        <span className="text-orange-400 font-bold">{dailyXP}</span>
      </div>

      {/* Language */}
      <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors">
        <Globe className="w-4 h-4" />
        <span className="text-sm">EN</span>
      </button>

      {/* User Avatar */}
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-sm">U</span>
      </div>

      {/* Notifications */}
      <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
        <Bell className="w-4 h-4 text-gray-400" />
      </button>

      {/* Settings */}
      <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
        <Menu className="w-4 h-4 text-gray-400" />
      </button>

      {/* Light mode toggle */}
      {onToggleLightMode && (
        <button 
          onClick={onToggleLightMode}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Sun className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  );
}
