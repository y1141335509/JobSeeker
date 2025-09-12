'use client';

import React, { useState, useEffect } from 'react';
import { TarotReader } from '../../data/tarot';
import type { DrawnCard } from '../../data/tarot';

interface DailyTarotCardProps {
  className?: string;
}

export const DailyTarotCard: React.FC<DailyTarotCardProps> = ({ className = '' }) => {
  const [dailyCard, setDailyCard] = useState<DrawnCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if we already have a card for today
    const today = new Date().toISOString().split('T')[0];
    const savedCard = localStorage.getItem(`daily-tarot-${today}`);
    
    if (savedCard) {
      setDailyCard(JSON.parse(savedCard));
      setIsFlipped(true);
    }
  }, []);

  const drawDailyCard = async () => {
    setIsLoading(true);
    
    // Add dramatic pause
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const card = TarotReader.getDailyCard();
    setDailyCard(card);
    
    // Save to localStorage
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`daily-tarot-${today}`, JSON.stringify(card));
    
    setIsLoading(false);
    
    // Auto-flip after a moment
    setTimeout(() => {
      setIsFlipped(true);
    }, 500);
  };

  const resetCard = () => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.removeItem(`daily-tarot-${today}`);
    setDailyCard(null);
    setIsFlipped(false);
  };

  return (
    <div className={`bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Daily Tarot Card</h3>
        <span className="text-purple-600 text-2xl">✨</span>
      </div>

      {!dailyCard ? (
        <div className="text-center py-8">
          <div className="w-24 h-36 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-indigo-800 rounded-xl border-2 border-purple-300 shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300"
               onClick={drawDailyCard}>
            {isLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            ) : (
              <div className="text-white text-4xl">🌟</div>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Click to draw your daily career guidance card
          </p>
          {isLoading && (
            <p className="text-purple-600 text-sm animate-pulse">
              The universe is aligning your card...
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Card Display */}
          <div className="flex justify-center">
            <div
              className={`relative w-24 h-36 cursor-pointer transition-all duration-700 ${
                isFlipped ? 'transform' : 'hover:scale-105'
              }`}
              style={{ perspective: '1000px' }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Back */}
                <div
                  className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-purple-600 to-indigo-800 border-2 border-purple-300 shadow-lg flex items-center justify-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="text-white text-3xl">🌟</div>
                </div>
                
                {/* Card Front */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-xl bg-white border-2 shadow-lg transform rotate-y-180 ${
                    dailyCard.reversed ? 'rotate-180' : ''
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="p-3 h-full flex flex-col items-center justify-center text-center">
                    <div className="text-2xl mb-1">{dailyCard.emoji}</div>
                    <h4 className="font-bold text-gray-900 text-xs mb-1">
                      {dailyCard.name}
                    </h4>
                    {dailyCard.reversed && (
                      <span className="text-xs text-orange-600 font-medium">
                        (Reversed)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Interpretation */}
          {isFlipped && (
            <div className="bg-white rounded-lg p-4 border border-purple-100">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                {dailyCard.name} {dailyCard.reversed ? '(Reversed)' : ''}
              </h4>
              <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                {dailyCard.relevantMeaning}
              </p>
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-purple-800 text-sm font-medium mb-1">
                  Career Advice:
                </p>
                <p className="text-purple-700 text-sm">
                  {dailyCard.relevantAdvice}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => window.location.href = '/tarot'}
              className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              Full Reading
            </button>
            <button
              onClick={resetCard}
              className="px-4 py-2 border border-purple-300 text-purple-700 text-sm font-medium rounded-lg hover:bg-purple-50 transition-colors duration-300"
            >
              New Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};