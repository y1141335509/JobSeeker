'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/auth';
import { TokenManager } from '../../utils/tokenManager';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isAuthenticated, refreshToken, logout, setLoading } = useAuthStore();

  useEffect(() => {
    // Initialize auth state from stored tokens
    const initializeAuth = async () => {
      setLoading(true);

      try {
        const token = TokenManager.getToken();
        
        if (token) {
          if (TokenManager.isTokenValid()) {
            // Token exists and is valid, try to refresh user data
            await refreshToken();
            
            // Setup auto-refresh
            const cleanup = TokenManager.setupAutoRefresh(async () => {
              await refreshToken();
            });

            // Cleanup on unmount
            return cleanup;
          } else {
            // Token exists but is expired, clear it
            TokenManager.clearTokens();
            logout();
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        TokenManager.clearTokens();
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [refreshToken, logout, setLoading]);

  // Handle browser tab visibility changes to refresh token
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isAuthenticated) {
        // Tab became visible, check if token needs refresh
        if (TokenManager.isTokenExpired()) {
          logout();
        } else if (TokenManager.getTimeUntilExpiry() < 300) {
          // Less than 5 minutes left, refresh token
          refreshToken().catch(() => {
            logout();
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated, refreshToken, logout]);

  // Handle browser storage events (for multi-tab sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth-token') {
        if (!e.newValue && isAuthenticated) {
          // Token was removed in another tab, log out this tab
          logout();
        } else if (e.newValue && !isAuthenticated) {
          // Token was added in another tab, refresh this tab
          window.location.reload();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isAuthenticated, logout]);

  return <>{children}</>;
};

export default AuthProvider;