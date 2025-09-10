import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateZodiacSign, calculateAge } from '../utils/zodiacCalculator';

export interface User {
  id: string;
  email: string;
  name: string;
  birthDate?: string; // ISO string format
  zodiacSign?: string; // Auto-calculated from birthDate
  mbtiType?: string; // 16 personality types
  age?: number; // Auto-calculated from birthDate
  profileComplete: boolean;
  createdAt: string;
  emailVerified: boolean;
  avatar?: string;
  
  // Extended profile information
  bio?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  
  // Career information
  currentTitle?: string;
  experienceLevel?: 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'executive';
  skills?: string[];
  interests?: string[];
  preferredJobTypes?: ('full-time' | 'part-time' | 'contract' | 'freelance' | 'internship')[];
  preferredWorkModel?: ('onsite' | 'remote' | 'hybrid')[];
  preferredLocations?: string[];
  salaryExpectation?: {
    min: number;
    max: number;
    currency: string;
  };
  
  // Preferences
  willingToRelocate?: boolean;
  openToRemote?: boolean;
  preferredCompanySizes?: ('startup' | 'small' | 'medium' | 'large' | 'enterprise')[];
  preferredCategories?: string[];
}

export interface AuthError {
  message: string;
  field?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
  token: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
  refreshToken: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  birthDate: string; // ISO string format
  mbtiType: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      token: null,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call - replace with actual API integration
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Mock API response
          const mockResponse = {
            user: {
              id: '1',
              email,
              name: email.split('@')[0].replace(/[^a-zA-Z]/g, '') || 'User',
              zodiacSign: 'leo',
              profileComplete: true,
              createdAt: new Date().toISOString(),
              emailVerified: true,
            },
            token: 'mock-jwt-token-' + Date.now()
          };
          
          // Store token in localStorage
          localStorage.setItem('auth-token', mockResponse.token);
          
          set({ 
            user: mockResponse.user, 
            token: mockResponse.token,
            isAuthenticated: true, 
            isLoading: false,
            error: null
          });
        } catch (error) {
          const authError: AuthError = {
            message: 'Invalid email or password',
            field: 'email'
          };
          set({ 
            isLoading: false, 
            error: authError,
            isAuthenticated: false,
            user: null,
            token: null
          });
          throw authError;
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Calculate zodiac sign and age from birth date
          const birthDate = new Date(userData.birthDate);
          const zodiacSign = calculateZodiacSign(birthDate);
          const age = calculateAge(birthDate);
          
          // Mock successful registration
          const newUser: User = {
            id: Date.now().toString(),
            email: userData.email,
            name: userData.name,
            birthDate: userData.birthDate,
            zodiacSign: zodiacSign,
            mbtiType: userData.mbtiType,
            age: age,
            profileComplete: false,
            createdAt: new Date().toISOString(),
            emailVerified: false,
          };
          
          const token = 'mock-jwt-token-' + Date.now();
          localStorage.setItem('auth-token', token);
          
          set({ 
            user: newUser,
            token,
            isAuthenticated: true, 
            isLoading: false,
            error: null
          });
        } catch (error) {
          const authError: AuthError = {
            message: 'Registration failed. Please try again.',
            field: 'email'
          };
          set({ 
            isLoading: false, 
            error: authError 
          });
          throw authError;
        }
      },
      
      logout: () => {
        localStorage.removeItem('auth-token');
        set({ 
          user: null, 
          token: null,
          isAuthenticated: false, 
          isLoading: false,
          error: null
        });
      },
      
      updateProfile: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updates };
          set({ 
            user: updatedUser,
            error: null
          });
        }
      },
      
      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      clearError: () => {
        set({ error: null });
      },

      refreshToken: async () => {
        const currentToken = get().token;
        if (!currentToken) return;

        try {
          // Simulate token refresh
          await new Promise(resolve => setTimeout(resolve, 1000));
          const newToken = 'refreshed-token-' + Date.now();
          localStorage.setItem('auth-token', newToken);
          set({ token: newToken });
        } catch (error) {
          // Token refresh failed, logout user
          get().logout();
        }
      },

      verifyEmail: async (token: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate email verification
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: { ...currentUser, emailVerified: true },
              isLoading: false
            });
          }
        } catch (error) {
          const authError: AuthError = {
            message: 'Email verification failed. Please try again.'
          };
          set({ 
            isLoading: false, 
            error: authError 
          });
          throw authError;
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        token: state.token
      }),
    }
  )
);