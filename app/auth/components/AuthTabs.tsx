'use client';

import React from 'react';
import { cn } from '../../../lib/utils/cn';

type AuthMode = 'login' | 'register';

interface AuthTabsProps {
  activeMode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ activeMode, onModeChange }) => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1" data-testid="auth-tabs">
      <button
        onClick={() => onModeChange('login')}
        className={cn(
          'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
          activeMode === 'login'
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        )}
        data-testid="login-tab"
      >
        Sign In
      </button>
      <button
        onClick={() => onModeChange('register')}
        className={cn(
          'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
          activeMode === 'register'
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        )}
        data-testid="register-tab"
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthTabs;