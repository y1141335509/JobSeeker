'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/auth';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireEmailVerification?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/auth',
  requireEmailVerification = false 
}) => {
  const { isAuthenticated, user, isLoading, refreshToken } = useAuthStore();

  useEffect(() => {
    // Check if user has a stored token and try to refresh it
    const token = localStorage.getItem('auth-token');
    if (token && !isAuthenticated && !isLoading) {
      refreshToken();
    }
  }, [isAuthenticated, isLoading, refreshToken]);

  useEffect(() => {
    // Only redirect if definitely not authenticated and not loading
    if (!isLoading && !isAuthenticated) {
      // Double check localStorage before redirecting
      const token = localStorage.getItem('auth-token');
      const authStorage = localStorage.getItem('auth-storage');
      
      if (!token && !authStorage) {
        // Definitely not authenticated
        window.location.href = redirectTo;
      }
    }
  }, [isAuthenticated, isLoading, redirectTo]);

  useEffect(() => {
    // Redirect if email verification is required but user hasn't verified
    if (!isLoading && isAuthenticated && requireEmailVerification && user && !user.emailVerified) {
      window.location.href = '/auth/verify-email';
    }
  }, [isAuthenticated, isLoading, requireEmailVerification, user]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  // Show email verification notice if required
  if (requireEmailVerification && user && !user.emailVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="icon-mail text-yellow-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verification Required</h2>
          <p className="text-gray-600 mb-6">
            Please verify your email address to access this feature. Check your inbox for the verification link.
          </p>
          <button
            onClick={() => window.location.href = '/auth/verify-email'}
            className="btn-primary w-full"
          >
            Go to Email Verification
          </button>
        </div>
      </div>
    );
  }

  // Render protected content
  return <>{children}</>;
};

export default ProtectedRoute;