'use client';

import React, { useState } from 'react';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { ErrorBoundary } from '../../lib/components/ui/ErrorBoundary';

type AuthMode = 'login' | 'register';

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="icon-compass text-white text-2xl" />
              </div>
              <span className="text-3xl font-bold text-gradient">JobSeer</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {authMode === 'login' ? 'Welcome Back!' : 'Join JobSeer'}
            </h1>
            <p className="text-gray-600">
              {authMode === 'login' 
                ? 'Sign in to continue your career journey' 
                : 'Start your journey with guidance and hope'}
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
            <AuthTabs 
              activeMode={authMode} 
              onModeChange={setAuthMode} 
            />
            
            <div className="mt-6">
              {authMode === 'login' ? (
                <LoginForm />
              ) : (
                <RegisterForm />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}