// Token management utilities for JWT handling

export interface TokenData {
  token: string;
  expiresAt: number;
  refreshToken?: string;
}

export class TokenManager {
  private static readonly TOKEN_KEY = 'auth-token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh-token';
  private static readonly EXPIRY_KEY = 'token-expiry';

  // Store token with expiry
  static setToken(token: string, expiresIn?: number): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem(this.TOKEN_KEY, token);
    
    if (expiresIn) {
      const expiryTime = Date.now() + (expiresIn * 1000);
      localStorage.setItem(this.EXPIRY_KEY, expiryTime.toString());
    }
  }

  // Get stored token
  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Store refresh token
  static setRefreshToken(refreshToken: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  // Get refresh token
  static getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  // Check if token is expired
  static isTokenExpired(): boolean {
    if (typeof window === 'undefined') return true;

    const expiryTime = localStorage.getItem(this.EXPIRY_KEY);
    if (!expiryTime) return false; // No expiry set, assume valid

    return Date.now() > parseInt(expiryTime);
  }

  // Check if token exists and is valid
  static isTokenValid(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired();
  }

  // Get time until token expires (in seconds)
  static getTimeUntilExpiry(): number {
    if (typeof window === 'undefined') return 0;

    const expiryTime = localStorage.getItem(this.EXPIRY_KEY);
    if (!expiryTime) return Infinity;

    const timeLeft = parseInt(expiryTime) - Date.now();
    return Math.max(0, Math.floor(timeLeft / 1000));
  }

  // Clear all stored tokens
  static clearTokens(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.EXPIRY_KEY);
  }

  // Decode JWT payload (without verification - for display purposes only)
  static decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Get user info from token
  static getUserFromToken(): any {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    return decoded?.user || decoded;
  }

  // Auto-refresh token before expiry
  static setupAutoRefresh(refreshCallback: () => Promise<void>): () => void {
    let timeoutId: NodeJS.Timeout;

    const scheduleRefresh = () => {
      const timeUntilExpiry = this.getTimeUntilExpiry();
      
      // Refresh 5 minutes before expiry (or immediately if expires in less than 5 minutes)
      const refreshTime = Math.max(0, timeUntilExpiry - 300) * 1000;

      timeoutId = setTimeout(async () => {
        if (this.isTokenValid()) {
          try {
            await refreshCallback();
            scheduleRefresh(); // Schedule next refresh
          } catch (error) {
            console.error('Token refresh failed:', error);
            this.clearTokens();
          }
        }
      }, refreshTime);
    };

    // Start the refresh cycle if token exists
    if (this.isTokenValid()) {
      scheduleRefresh();
    }

    // Return cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }
}

// Hook for using token manager in React components
export const useTokenManager = () => {
  return {
    setToken: TokenManager.setToken,
    getToken: TokenManager.getToken,
    setRefreshToken: TokenManager.setRefreshToken,
    getRefreshToken: TokenManager.getRefreshToken,
    isTokenValid: TokenManager.isTokenValid,
    isTokenExpired: TokenManager.isTokenExpired,
    getTimeUntilExpiry: TokenManager.getTimeUntilExpiry,
    clearTokens: TokenManager.clearTokens,
    decodeToken: TokenManager.decodeToken,
    getUserFromToken: TokenManager.getUserFromToken,
    setupAutoRefresh: TokenManager.setupAutoRefresh,
  };
};