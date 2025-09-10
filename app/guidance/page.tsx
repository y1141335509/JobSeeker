'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../../lib/components/auth/ProtectedRoute';
import { useAuthStore } from '../../lib/store/auth';
import { HoroscopeGenerator } from '../../lib/data/horoscope';
import { TarotReader } from '../../lib/data/tarot';
import { QuoteManager } from '../../lib/data/quotes';
import type { DailyHoroscope } from '../../lib/data/horoscope';
import type { TarotReading, DrawnCard } from '../../lib/data/tarot';
import type { MotivationalQuote } from '../../lib/data/quotes';

const GuidancePage: React.FC = () => {
  const { user } = useAuthStore();
  const [horoscope, setHoroscope] = useState<DailyHoroscope | null>(null);
  const [dailyCard, setDailyCard] = useState<DrawnCard | null>(null);
  const [quote, setQuote] = useState<MotivationalQuote | null>(null);
  const [tarotReading, setTarotReading] = useState<TarotReading | null>(null);
  const [showTarotReading, setShowTarotReading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.zodiacSign) {
      generateDailyGuidance();
    }
  }, [user]);

  const generateDailyGuidance = async () => {
    if (!user?.zodiacSign) return;

    setLoading(true);
    try {
      // Generate horoscope
      const dailyHoroscope = HoroscopeGenerator.generateDailyHoroscope(user.zodiacSign);
      setHoroscope(dailyHoroscope);

      // Get daily tarot card
      const card = TarotReader.getDailyCard();
      setDailyCard(card);

      // Get contextual quote based on horoscope mood
      const contextualQuote = QuoteManager.getMotivationalQuoteForMood(dailyHoroscope.mood);
      setQuote(contextualQuote);
    } catch (error) {
      console.error('Error generating guidance:', error);
    } finally {
      setLoading(false);
    }
  };

  const drawTarotReading = () => {
    const reading = TarotReader.createReading('three-card');
    setTarotReading(reading);
    setShowTarotReading(true);
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'positive': return 'from-green-400 to-emerald-500';
      case 'challenging': return 'from-orange-400 to-red-500';
      default: return 'from-blue-400 to-indigo-500';
    }
  };

  const getEnergyBar = (energy: number) => {
    const percentage = (energy / 10) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full bg-gradient-to-r ${energy >= 7 ? 'from-green-400 to-green-600' : energy >= 4 ? 'from-yellow-400 to-yellow-600' : 'from-red-400 to-red-600'}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Preparing your daily guidance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/dashboard" className="text-blue-600 hover:text-blue-800">
                <i className="lucide-arrow-left mr-2"></i>
                Back to Dashboard
              </a>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Daily Mystical Guidance</h1>
            <button
              onClick={generateDailyGuidance}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <i className="lucide-refresh-cw mr-2"></i>
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Horoscope */}
          {horoscope && (
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getMoodColor(horoscope.mood)} flex items-center justify-center text-white text-xl font-bold mr-4`}>
                  {user?.zodiacSign?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{horoscope.sign} Daily Horoscope</h2>
                  <p className="text-gray-600">{horoscope.date}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Focus</h3>
                  <p className="text-gray-700">{horoscope.careerFocus}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Advice</h3>
                  <p className="text-gray-700">{horoscope.advice}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Energy Level</h4>
                    {getEnergyBar(horoscope.energy)}
                    <span className="text-sm text-gray-600">{horoscope.energy}/10</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Lucky Numbers</h4>
                    <div className="flex space-x-2">
                      {horoscope.luckyNumbers.map((num, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Mood</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      horoscope.mood === 'positive' ? 'bg-green-100 text-green-800' :
                      horoscope.mood === 'challenging' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {horoscope.mood}
                    </span>
                  </div>
                </div>

                {horoscope.opportunities.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Opportunities</h4>
                    <ul className="space-y-1">
                      {horoscope.opportunities.map((opportunity, index) => (
                        <li key={index} className="flex items-start">
                          <i className="lucide-star text-yellow-500 mr-2 mt-0.5"></i>
                          <span className="text-gray-700">{opportunity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {horoscope.warnings.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Things to Watch</h4>
                    <ul className="space-y-1">
                      {horoscope.warnings.map((warning, index) => (
                        <li key={index} className="flex items-start">
                          <i className="lucide-alert-triangle text-orange-500 mr-2 mt-0.5"></i>
                          <span className="text-gray-700">{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Tarot Card */}
            {dailyCard && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Daily Card</h3>
                <div className="text-center">
                  <div className="text-4xl mb-2">{dailyCard.emoji}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {dailyCard.name}
                    {dailyCard.reversed && <span className="text-orange-600"> (Reversed)</span>}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">{dailyCard.relevantMeaning}</p>
                  <p className="text-sm font-medium text-blue-700">{dailyCard.relevantAdvice}</p>
                </div>
              </div>
            )}

            {/* Daily Quote */}
            {quote && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Inspiration</h3>
                <blockquote className="text-gray-700 italic mb-3">
                  "{quote.text}"
                </blockquote>
                <p className="text-sm font-medium text-gray-900">— {quote.author}</p>
                <div className="mt-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    quote.category === 'motivation' ? 'bg-blue-100 text-blue-800' :
                    quote.category === 'success' ? 'bg-green-100 text-green-800' :
                    quote.category === 'resilience' ? 'bg-orange-100 text-orange-800' :
                    quote.category === 'growth' ? 'bg-purple-100 text-purple-800' :
                    quote.category === 'leadership' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {quote.category}
                  </span>
                </div>
              </div>
            )}

            {/* Tarot Reading */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Career Tarot Reading</h3>
              <p className="text-gray-600 mb-4">Get deeper insights into your career path with a three-card spread.</p>
              <button
                onClick={drawTarotReading}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <i className="lucide-sparkles mr-2"></i>
                Draw Three Cards
              </button>
            </div>
          </div>
        </div>

        {/* Tarot Reading Modal */}
        {showTarotReading && tarotReading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Your Career Tarot Reading</h2>
                  <button
                    onClick={() => setShowTarotReading(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="lucide-x text-2xl"></i>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {tarotReading.cards.map((card, index) => (
                    <div key={card.id} className="text-center p-4 border rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">{card.position}</h3>
                      <div className="text-4xl mb-2">{card.emoji}</div>
                      <h4 className="font-medium text-gray-800 mb-2">
                        {card.name}
                        {card.reversed && <span className="text-orange-600"> (Reversed)</span>}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">{card.relevantMeaning}</p>
                      <p className="text-xs text-blue-700">{card.relevantAdvice}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Interpretation</h3>
                    <p className="text-gray-700">{tarotReading.interpretation}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Action Items</h3>
                    <ul className="space-y-2">
                      {tarotReading.actionItems.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <i className="lucide-check-circle text-green-500 mr-2 mt-0.5"></i>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowTarotReading(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Close Reading
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function GuidancePageWrapper() {
  return (
    <ProtectedRoute>
      <GuidancePage />
    </ProtectedRoute>
  );
}