'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../../lib/components/auth/ProtectedRoute';
import { useAuthStore } from '../../lib/store/auth';
import Header from '../../components/Header';
import { ErrorBoundary } from '../../lib/components/ui/ErrorBoundary';
import { PersonalizationEngine } from '../../lib/utils/personalizedRecommendations';
import type { PersonalizedGuidance } from '../../lib/utils/personalizedRecommendations';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const [guidance, setGuidance] = useState<PersonalizedGuidance | null>(null);
  const [loadingGuidance, setLoadingGuidance] = useState(true);

  useEffect(() => {
    if (user?.zodiacSign) {
      generatePersonalizedGuidance();
    }
  }, [user]);

  const generatePersonalizedGuidance = async () => {
    if (!user?.zodiacSign) return;
    
    setLoadingGuidance(true);
    try {
      // Create user profile for personalization
      const userProfile = PersonalizationEngine.createUserProfile(user, {
        applications: 12, // Mock data - would come from actual user activity
        rejections: 2,
        interviews: 3,
        lastLoginDays: 0
      });
      
      const personalizedGuidance = PersonalizationEngine.generatePersonalizedGuidance(userProfile);
      setGuidance(personalizedGuidance);
    } catch (error) {
      console.error('Error generating personalized guidance:', error);
    } finally {
      setLoadingGuidance(false);
    }
  };

  const handleLogout = async () => {
    logout();
    window.location.href = '/';
  };

  return (
    <ErrorBoundary>
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      Welcome back, {user?.name}! 👋
                    </h1>
                    <p className="text-gray-600 text-lg">
                      Ready to continue your career journey?
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-2">Your Sign</div>
                    <div className="text-2xl capitalize font-semibold text-indigo-600">
                      {user?.zodiacSign} ✨
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="icon-briefcase text-blue-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">12</div>
                    <div className="text-sm text-gray-600">Applications</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="icon-calendar text-green-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-600">Interviews</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <div className="icon-star text-purple-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">85%</div>
                    <div className="text-sm text-gray-600">Match Score</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <div className="icon-target text-yellow-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">1</div>
                    <div className="text-sm text-gray-600">Job Offers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Recent Activity */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <div className="icon-send text-blue-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="font-medium text-gray-900">Applied to Senior Developer at TechCorp</div>
                        <div className="text-sm text-gray-600">2 hours ago</div>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-green-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="icon-calendar text-green-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="font-medium text-gray-900">Interview scheduled with StartupXYZ</div>
                        <div className="text-sm text-gray-600">Yesterday</div>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <div className="icon-sparkles text-purple-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="font-medium text-gray-900">Received daily tarot guidance</div>
                        <div className="text-sm text-gray-600">This morning</div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-6 py-3 px-4 border-2 border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                    View All Activity
                  </button>
                </div>
              </div>

              {/* Right Column - Daily Guidance */}
              <div>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-purple-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Today's Guidance ✨</h2>
                  
                  {loadingGuidance ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Generating your personalized guidance...</p>
                    </div>
                  ) : guidance ? (
                    <div className="space-y-6">
                      {/* Horoscope */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">Career Horoscope</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            guidance.horoscope.mood === 'positive' ? 'bg-green-100 text-green-800' :
                            guidance.horoscope.mood === 'challenging' ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {guidance.horoscope.mood}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          {guidance.horoscope.careerFocus}
                        </p>
                        <div className="flex items-center text-xs text-gray-600">
                          <span>Energy: {guidance.horoscope.energy}/10</span>
                          <div className="ml-2 flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${guidance.horoscope.energy >= 7 ? 'bg-green-500' : guidance.horoscope.energy >= 4 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${(guidance.horoscope.energy / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Tarot Card */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Daily Card</h3>
                        <div className="bg-white rounded-lg p-4">
                          <div className="text-center">
                            <div className="text-2xl mb-2">{guidance.dailyCard.emoji}</div>
                            <div className="font-medium">
                              {guidance.dailyCard.name}
                              {guidance.dailyCard.reversed && <span className="text-orange-600 text-sm"> (Reversed)</span>}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">{guidance.dailyCard.relevantMeaning}</div>
                          </div>
                        </div>
                      </div>

                      {/* Quote */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Motivation</h3>
                        <blockquote className="text-sm italic text-gray-700 mb-2">
                          "{guidance.primaryQuote.text}"
                        </blockquote>
                        <p className="text-xs text-gray-600">— {guidance.primaryQuote.author}</p>
                      </div>

                      {/* Personalized Insights */}
                      {guidance.personalizedInsights.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Personal Insight</h3>
                          <p className="text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">
                            {guidance.personalizedInsights[0]}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">Unable to load guidance</p>
                      <button 
                        onClick={generatePersonalizedGuidance}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  <button 
                    onClick={() => window.location.href = '/guidance'}
                    className="w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    View Full Guidance
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                onClick={() => window.location.href = '/jobs'}
                className="btn-primary"
              >
                Search Jobs
              </button>
              <button 
                onClick={() => window.location.href = '/resume'}
                className="btn-secondary"
              >
                Build Resume
              </button>
              <button 
                onClick={() => window.location.href = '/guidance'}
                className="btn-secondary"
              >
                Daily Guidance
              </button>
              <button 
                onClick={handleLogout}
                className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </ErrorBoundary>
  );
}