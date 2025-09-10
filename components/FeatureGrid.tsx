'use client';

import React, { useState } from 'react';
import { LoadingSpinner } from '../lib/components/ui/LoadingSpinner';

interface Feature {
  icon: string;
  title: string;
  description: string;
  category: 'career' | 'mystical' | 'support';
}

const FeatureGrid: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const features: Feature[] = [
    {
      icon: 'briefcase',
      title: 'Resume Builder',
      description: 'AI-assisted resume creation with industry-specific templates and optimization tips',
      category: 'career'
    },
    {
      icon: 'target',
      title: 'Job Matching',
      description: 'Semantic search technology finds opportunities that align with your skills and goals',
      category: 'career'
    },
    {
      icon: 'chart-bar',
      title: 'Progress Tracking',
      description: 'Monitor applications, interviews, and outcomes with detailed analytics',
      category: 'career'
    },
    {
      icon: 'moon',
      title: 'Daily Horoscope',
      description: 'Career-focused astrological guidance to navigate your professional journey',
      category: 'mystical'
    },
    {
      icon: 'sparkles',
      title: 'Tarot Insights',
      description: 'Weekly career tarot draws for clarity and motivation during job searches',
      category: 'mystical'
    },
    {
      icon: 'users',
      title: 'Community Support',
      description: 'Connect with fellow job seekers, share wins, and get encouragement',
      category: 'support'
    }
  ];

  const handleGetStarted = async () => {
    setIsLoading(true);
    try {
      // Simulate navigation delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.href = '/auth';
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryStyles = (category: Feature['category']) => {
    const styles = {
      mystical: {
        card: 'mystical-card',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600'
      },
      support: {
        card: 'card',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600'
      },
      career: {
        card: 'card',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600'
      }
    };
    
    return styles[category];
  };

  return (
    <section 
      id="features" 
      className="py-20 px-4 bg-white animate-fade-in" 
      data-testid="feature-grid"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Combine practical career tools with emotional support to transform your job search experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const categoryStyles = getCategoryStyles(feature.category);
            
            return (
              <div 
                key={index} 
                className={`${categoryStyles.card} hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform hover:scale-110 ${categoryStyles.iconBg}`}>
                  <div className={`icon-${feature.icon} text-xl ${categoryStyles.iconColor}`} />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[var(--text-secondary)]">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16 animate-slide-up">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Career Journey?</h3>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Join thousands who have found their dream jobs with guidance and support
          </p>
          <button 
            onClick={handleGetStarted}
            disabled={isLoading}
            className="btn-primary text-lg px-8 py-4 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
            data-testid="get-started-btn"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Loading...</span>
              </>
            ) : (
              'Start Free Today'
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;