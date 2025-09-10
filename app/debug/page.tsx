'use client';

import React from 'react';
import { useAuthStore } from '../../lib/store/auth';

export default function DebugPage() {
  const authState = useAuthStore();

  const handleClearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  const handleMockLogin = () => {
    authState.login('test@example.com', 'password123');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Authentication</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Auth State */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Authentication State</h2>
            <div className="space-y-2 text-sm">
              <div><strong>Is Authenticated:</strong> {authState.isAuthenticated ? 'Yes' : 'No'}</div>
              <div><strong>Is Loading:</strong> {authState.isLoading ? 'Yes' : 'No'}</div>
              <div><strong>Has Token:</strong> {authState.token ? 'Yes' : 'No'}</div>
              <div><strong>Has User:</strong> {authState.user ? 'Yes' : 'No'}</div>
              <div><strong>User Email:</strong> {authState.user?.email || 'None'}</div>
              <div><strong>User Name:</strong> {authState.user?.name || 'None'}</div>
              <div><strong>Zodiac Sign:</strong> {authState.user?.zodiacSign || 'None'}</div>
              <div><strong>Error:</strong> {authState.error?.message || 'None'}</div>
            </div>
          </div>

          {/* Local Storage */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Local Storage</h2>
            <div className="space-y-2 text-sm">
              <div><strong>Auth Token:</strong> {localStorage.getItem('auth-token') || 'None'}</div>
              <div><strong>Auth Storage:</strong> {localStorage.getItem('auth-storage') || 'None'}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Debug Actions</h2>
            <div className="space-y-4">
              <button
                onClick={handleMockLogin}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Mock Login
              </button>
              <button
                onClick={() => authState.logout()}
                className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
              <button
                onClick={handleClearStorage}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Clear All Storage
              </button>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => window.location.href = '/auth'}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Go to Auth
              </button>
            </div>
          </div>

          {/* Raw Data */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Raw State</h2>
            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-64">
              {JSON.stringify({
                isAuthenticated: authState.isAuthenticated,
                isLoading: authState.isLoading,
                user: authState.user,
                token: authState.token ? `${authState.token.substring(0, 20)}...` : null,
                error: authState.error
              }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}