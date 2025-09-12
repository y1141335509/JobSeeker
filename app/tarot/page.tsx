'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../../lib/components/auth/ProtectedRoute';
import { useAuthStore } from '../../lib/store/auth';
import Header from '../../components/Header';
import { ErrorBoundary } from '../../lib/components/ui/ErrorBoundary';
import { TarotReader, TAROT_SPREADS } from '../../lib/data/tarot';
import type { TarotReading, DrawnCard } from '../../lib/data/tarot';

export default function TarotPage() {
  const { user } = useAuthStore();
  const [currentReading, setCurrentReading] = useState<TarotReading | null>(null);
  const [selectedSpread, setSelectedSpread] = useState<keyof typeof TAROT_SPREADS>('single');
  const [isDrawing, setIsDrawing] = useState(false);
  const [cardFlipStates, setCardFlipStates] = useState<boolean[]>([]);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [readingHistory, setReadingHistory] = useState<TarotReading[]>([]);

  useEffect(() => {
    // Load reading history from localStorage
    const savedHistory = localStorage.getItem('tarot-history');
    if (savedHistory) {
      setReadingHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveReading = (reading: TarotReading) => {
    const updatedHistory = [reading, ...readingHistory.slice(0, 9)]; // Keep last 10 readings
    setReadingHistory(updatedHistory);
    localStorage.setItem('tarot-history', JSON.stringify(updatedHistory));
  };

  const handleDrawCards = async () => {
    setIsDrawing(true);
    setShowInterpretation(false);
    
    // Add dramatic pause for card drawing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const reading = TarotReader.createReading(selectedSpread);
    setCurrentReading(reading);
    setCardFlipStates(new Array(reading.cards.length).fill(false));
    saveReading(reading);
    setIsDrawing(false);
  };

  const flipCard = (index: number) => {
    setCardFlipStates(prev => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };

  const revealInterpretation = () => {
    // Auto-flip any remaining cards
    setCardFlipStates(prev => prev.map(() => true));
    
    setTimeout(() => {
      setShowInterpretation(true);
    }, 1000);
  };

  const resetReading = () => {
    setCurrentReading(null);
    setCardFlipStates([]);
    setShowInterpretation(false);
  };

  return (
    <ErrorBoundary>
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
          <Header />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                Career Tarot Reading ✨
              </h1>
              <p className="text-xl text-purple-200 mb-2">
                Discover mystical insights for your professional journey
              </p>
              <p className="text-purple-300">
                Welcome, {user?.name}. The cards are ready to reveal your career destiny.
              </p>
            </div>

            {!currentReading ? (
              /* Spread Selection */
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    Choose Your Reading Type
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {Object.entries(TAROT_SPREADS).map(([key, spread]) => (
                      <div
                        key={key}
                        onClick={() => setSelectedSpread(key as keyof typeof TAROT_SPREADS)}
                        className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                          selectedSpread === key
                            ? 'border-purple-400 bg-purple-500/20 shadow-lg'
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {spread.name}
                        </h3>
                        <p className="text-purple-200 text-sm mb-3">
                          {spread.description}
                        </p>
                        <div className="text-purple-300 text-xs">
                          {spread.positions.length} card{spread.positions.length > 1 ? 's' : ''}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleDrawCards}
                      disabled={isDrawing}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                    >
                      {isDrawing ? (
                        <div className="flex items-center gap-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Drawing Cards...
                        </div>
                      ) : (
                        'Draw Cards ✨'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Reading Display */
              <div className="max-w-6xl mx-auto">
                {/* Card Layout */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    {TAROT_SPREADS[currentReading.spread].name}
                  </h2>
                  
                  <div className={`grid gap-6 ${
                    currentReading.cards.length === 1 
                      ? 'grid-cols-1 max-w-xs mx-auto'
                      : currentReading.cards.length === 3
                      ? 'grid-cols-1 md:grid-cols-3'
                      : 'grid-cols-2 md:grid-cols-5'
                  }`}>
                    {currentReading.cards.map((card, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="mb-2 text-center">
                          <p className="text-purple-200 text-sm font-medium">
                            {card.position}
                          </p>
                        </div>
                        
                        <div
                          onClick={() => flipCard(index)}
                          className={`relative w-32 h-48 cursor-pointer transition-all duration-700 transform-gpu ${
                            cardFlipStates[index] ? '' : 'hover:scale-105'
                          }`}
                          style={{ perspective: '1000px' }}
                        >
                          <div
                            className={`relative w-full h-full transition-transform duration-700 transform-gpu ${
                              cardFlipStates[index] ? 'rotate-y-180' : ''
                            }`}
                            style={{ transformStyle: 'preserve-3d' }}
                          >
                            {/* Card Back */}
                            <div
                              className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-purple-600 to-indigo-800 border-2 border-purple-300 shadow-lg flex items-center justify-center"
                              style={{ backfaceVisibility: 'hidden' }}
                            >
                              <div className="text-6xl">🌟</div>
                            </div>
                            
                            {/* Card Front */}
                            <div
                              className={`absolute inset-0 w-full h-full rounded-xl bg-white border-2 shadow-lg transform rotate-y-180 ${
                                card.reversed ? 'rotate-180' : ''
                              }`}
                              style={{ backfaceVisibility: 'hidden' }}
                            >
                              <div className="p-4 h-full flex flex-col items-center justify-center text-center">
                                <div className="text-4xl mb-2">{card.emoji}</div>
                                <h3 className="font-bold text-gray-900 text-sm mb-1">
                                  {card.name}
                                </h3>
                                {card.reversed && (
                                  <span className="text-xs text-orange-600 font-medium">
                                    (Reversed)
                                  </span>
                                )}
                                <div className="text-xs text-gray-600 mt-2">
                                  {card.keywords.slice(0, 2).join(', ')}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {cardFlipStates[index] && (
                          <div className="mt-4 text-center max-w-xs">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                              <p className="text-purple-100 text-sm">
                                {card.relevantMeaning}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interpretation Section */}
                {!showInterpretation ? (
                  <div className="text-center">
                    <button
                      onClick={revealInterpretation}
                      className="px-6 py-3 bg-gradient-to-r from-gold-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-gold-600 hover:to-yellow-700 transition-all duration-300 shadow-lg"
                    >
                      Reveal Reading Interpretation
                    </button>
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Reading Interpretation
                    </h3>
                    <p className="text-purple-100 text-lg leading-relaxed mb-6">
                      {currentReading.interpretation}
                    </p>
                    
                    <h4 className="text-lg font-semibold text-white mb-4">
                      Career Action Items
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {currentReading.actionItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-purple-200">
                          <span className="text-purple-400 mt-1">✦</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={resetReading}
                        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
                      >
                        New Reading
                      </button>
                      <button
                        onClick={() => window.location.href = '/dashboard'}
                        className="px-6 py-3 border border-purple-400 text-purple-200 font-semibold rounded-lg hover:bg-purple-500/20 transition-colors duration-300"
                      >
                        Back to Dashboard
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Reading History */}
            {readingHistory.length > 0 && (
              <div className="mt-12 max-w-4xl mx-auto">
                <h2 className="text-xl font-bold text-white mb-6">Recent Readings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {readingHistory.slice(0, 6).map((reading) => (
                    <div
                      key={reading.id}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-white text-sm">
                          {TAROT_SPREADS[reading.spread].name}
                        </h3>
                        <span className="text-purple-300 text-xs">
                          {reading.date}
                        </span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {reading.cards.slice(0, 3).map((card, idx) => (
                          <span key={idx} className="text-lg">
                            {card.emoji}
                          </span>
                        ))}
                        {reading.cards.length > 3 && (
                          <span className="text-purple-300 text-sm">
                            +{reading.cards.length - 3}
                          </span>
                        )}
                      </div>
                      <p className="text-purple-200 text-xs line-clamp-2">
                        {reading.interpretation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </ProtectedRoute>
    </ErrorBoundary>
  );
}