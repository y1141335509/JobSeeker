'use client';

import React, { useState } from 'react';
import { useAuthStore } from '../lib/store/auth';
import { LoadingSpinner } from '../lib/components/ui/LoadingSpinner';

interface NavigationItem {
  label: string;
  href: string;
  action: 'navigate' | 'scroll';
}

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { label: 'Features', href: 'features', action: 'scroll' },
    { label: 'Dashboard', href: '/dashboard', action: 'navigate' },
    { label: 'Job Search', href: '/jobs', action: 'navigate' },
    { label: 'Guidance', href: '/guidance', action: 'navigate' },
  ];

  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${sectionId}`;
    }
    setMobileMenuOpen(false);
  };

  const navigateToPage = async (page: string) => {
    setIsLoading(true);
    try {
      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      window.location.href = page;
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (item: NavigationItem) => {
    if (item.action === 'scroll') {
      navigateToSection(item.href);
    } else {
      navigateToPage(item.href);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
              <div className="icon-compass text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-gradient">JobSeer</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item)}
                className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200"
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[var(--text-secondary)] text-sm">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors disabled:opacity-50"
                  data-testid="logout-btn"
                >
                  {isLoading ? <LoadingSpinner size="sm" /> : 'Sign Out'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigateToPage('/auth')}
                  className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
                  data-testid="sign-in-btn"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigateToPage('/auth')}
                  disabled={isLoading}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                  data-testid="get-started-btn"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    'Get Started'
                  )}
                </button>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
              data-testid="mobile-menu-btn"
            >
              <div className="icon-menu text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item)}
                  className="text-left text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
                  data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </button>
              ))}
              
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => navigateToPage('/auth')}
                    className="text-left text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigateToPage('/auth')}
                    className="btn-primary text-center"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;