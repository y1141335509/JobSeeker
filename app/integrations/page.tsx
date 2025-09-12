'use client';

import React, { useState } from 'react';
import ProtectedRoute from '../../lib/components/auth/ProtectedRoute';
import { useAuthStore } from '../../lib/store/auth';
import Header from '../../components/Header';
import { ErrorBoundary } from '../../lib/components/ui/ErrorBoundary';
import { LinkedInConnect } from '../../lib/components/integrations/LinkedInConnect';

export default function IntegrationsPage() {
  const { user } = useAuthStore();
  const [successMessage, setSuccessMessage] = useState('');

  const handleProfileImported = (profileData: any) => {
    setSuccessMessage('LinkedIn profile imported successfully! Your profile has been updated.');
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const comingSoonIntegrations = [
    {
      name: 'GitHub',
      description: 'Import your repositories and showcase your coding projects',
      icon: '🐙',
      color: 'bg-gray-900',
      features: [
        'Import public repositories',
        'Showcase your coding activity',
        'Display programming languages',
        'Show contribution graphs'
      ]
    },
    {
      name: 'Google Calendar',
      description: 'Sync interview schedules and career events',
      icon: '📅',
      color: 'bg-blue-500',
      features: [
        'Schedule interview reminders',
        'Track application deadlines',
        'Career event notifications',
        'Meeting preparation alerts'
      ]
    },
    {
      name: 'Slack',
      description: 'Get job alerts and career updates in your workspace',
      icon: '💬',
      color: 'bg-purple-500',
      features: [
        'Daily job match notifications',
        'Interview reminder messages',
        'Team collaboration for job search',
        'Career milestone celebrations'
      ]
    },
    {
      name: 'Indeed/Glassdoor',
      description: 'Import saved jobs and application history',
      icon: '🔍',
      color: 'bg-green-500',
      features: [
        'Import saved job listings',
        'Sync application status',
        'Company review insights',
        'Salary comparison data'
      ]
    },
    {
      name: 'Notion',
      description: 'Export your career planning and job search notes',
      icon: '📝',
      color: 'bg-gray-800',
      features: [
        'Export application tracker',
        'Career goals documentation',
        'Interview notes backup',
        'Resume version control'
      ]
    },
    {
      name: 'Zoom',
      description: 'Streamline virtual interview scheduling and preparation',
      icon: '🎥',
      color: 'bg-blue-600',
      features: [
        'One-click interview joins',
        'Recording interview prep sessions',
        'Virtual background setup',
        'Screen sharing practice'
      ]
    }
  ];

  return (
    <ErrorBoundary>
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                External Integrations 🔗
              </h1>
              <p className="text-gray-600 text-lg">
                Connect your favorite tools and platforms to enhance your job search experience
              </p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="text-green-600 mr-3">✅</div>
                  <span className="text-green-800">{successMessage}</span>
                </div>
              </div>
            )}

            {/* Active Integrations */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Integrations</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* LinkedIn Integration */}
                <LinkedInConnect onProfileImported={handleProfileImported} />
                
                {/* Placeholder for other integrations */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 opacity-75">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl">🐙</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">GitHub</h3>
                      <p className="text-sm text-gray-600">Coming Soon</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">
                    Showcase your coding projects and contributions
                  </p>
                  <button 
                    disabled 
                    className="w-full px-4 py-2 bg-gray-100 text-gray-400 font-medium rounded-lg cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>

            {/* Coming Soon Integrations */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Coming Soon</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comingSoonIntegrations.map((integration) => (
                  <div 
                    key={integration.name}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 ${integration.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-2xl">{integration.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                        <span className="text-xs text-orange-600 font-medium bg-orange-100 px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {integration.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-900">Features:</h4>
                      <ul className="space-y-1">
                        {integration.features.map((feature, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Notify me when ready</span>
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                          Get Notified
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration Benefits */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Why Connect Your Accounts? 🤔
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Save Time</h3>
                  <p className="text-sm text-gray-600">
                    Auto-import your professional data instead of manual entry
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Better Matching</h3>
                  <p className="text-sm text-gray-600">
                    More accurate job recommendations based on complete profile
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Stay Synced</h3>
                  <p className="text-sm text-gray-600">
                    Keep your profile updated automatically across platforms
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
                  <p className="text-sm text-gray-600">
                    Monitor your career growth across all connected platforms
                  </p>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-yellow-600 text-xl">🔒</div>
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-1">Your Data is Secure</h3>
                  <p className="text-sm text-yellow-800">
                    We use industry-standard OAuth 2.0 protocols to connect with external services. 
                    We never store your passwords, and you can disconnect any integration at any time. 
                    Your data is encrypted and processed securely according to our privacy policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </ErrorBoundary>
  );
}