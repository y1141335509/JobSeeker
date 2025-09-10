'use client';

import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from '../lib/components/ui/LoadingSpinner';

const HeroSection: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const inspiringQuotes = [
    "Your next opportunity is waiting to be discovered",
    "Every application brings you closer to your dream job",
    "The stars align when preparation meets opportunity"
  ];

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000);
    
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % inspiringQuotes.length);
    }, 4000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <section className="relative py-20 px-4 min-h-[600px] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </section>
    );
  }

  const handleStartJourney = () => {
    // This will be replaced with proper navigation
    window.location.href = '/auth';
  };

  const handleBrowseJobs = () => {
    // This will be replaced with proper navigation
    window.location.href = '/jobs';
  };

  return (
    <section className="relative py-20 px-4 animate-fade-in" data-testid="hero-section">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            Find Your <span className="text-gradient">Perfect Career</span>
            <br />
            with Guidance & Hope
          </h1>
          
          <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto animate-slide-up">
            Discover meaningful job opportunities while receiving emotional support through personalized astrology and tarot guidance. 
            Build your future with confidence and cosmic wisdom.
          </p>

          <div className="h-12 mb-8 flex items-center justify-center">
            <p className="text-lg text-[var(--accent-color)] font-medium italic transition-opacity duration-1000">
              "{inspiringQuotes[currentQuote]}"
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
          <button 
            onClick={handleStartJourney}
            className="btn-primary text-lg px-8 py-4 transition-transform hover:scale-105"
            data-testid="start-journey-btn"
          >
            Start Your Journey
          </button>
          <button 
            onClick={handleBrowseJobs}
            className="btn-secondary text-lg px-8 py-4 transition-transform hover:scale-105"
            data-testid="browse-jobs-btn"
          >
            Browse Jobs
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex flex-col items-center animate-slide-up">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110">
              <div className="icon-search text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Job Matching</h3>
            <p className="text-[var(--text-secondary)]">AI-powered recommendations based on your skills and aspirations</p>
          </div>
          
          <div className="flex flex-col items-center animate-slide-up">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110">
              <div className="icon-sparkles text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mystical Guidance</h3>
            <p className="text-[var(--text-secondary)]">Daily horoscopes and tarot insights for career clarity</p>
          </div>
          
          <div className="flex flex-col items-center animate-slide-up">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110">
              <div className="icon-heart text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Emotional Support</h3>
            <p className="text-[var(--text-secondary)]">Community encouragement and progress celebration</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;