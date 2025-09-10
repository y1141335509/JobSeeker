import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Horoscope {
  sign: string;
  date: string;
  careerFocus: string;
  advice: string;
  luckyNumbers: number[];
  mood: 'positive' | 'neutral' | 'challenging';
}

export interface TarotCard {
  id: string;
  name: string;
  suit: string;
  meaning: string;
  careerInterpretation: string;
  imageUrl: string;
  reversed: boolean;
}

export interface TarotReading {
  id: string;
  date: string;
  cards: TarotCard[];
  interpretation: string;
  actionItems: string[];
}

export interface MotivationalQuote {
  id: string;
  text: string;
  author: string;
  category: 'motivation' | 'success' | 'resilience' | 'growth';
}

interface MysticalState {
  todaysHoroscope: Horoscope | null;
  recentReadings: TarotReading[];
  dailyQuote: MotivationalQuote | null;
  userZodiacSign: string | null;
  isLoading: boolean;
  
  // Actions
  setZodiacSign: (sign: string) => void;
  fetchDailyHoroscope: () => Promise<void>;
  createTarotReading: () => Promise<TarotReading>;
  fetchDailyQuote: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

// Mock data
const mockHoroscopes: Record<string, Horoscope> = {
  leo: {
    sign: 'leo',
    date: new Date().toISOString().split('T')[0],
    careerFocus: 'Leadership opportunities are highlighted today. Your natural charisma will attract new professional connections.',
    advice: 'Trust your instincts when making important career decisions. The universe supports bold moves.',
    luckyNumbers: [3, 17, 25],
    mood: 'positive',
  },
  virgo: {
    sign: 'virgo',
    date: new Date().toISOString().split('T')[0],
    careerFocus: 'Attention to detail will set you apart from other candidates. Perfect day for resume polishing.',
    advice: 'Organization is your superpower. Create a systematic approach to your job search.',
    luckyNumbers: [6, 14, 22],
    mood: 'neutral',
  },
};

const mockQuotes: MotivationalQuote[] = [
  {
    id: '1',
    text: 'Every rejection is a redirection to something better.',
    author: 'Unknown',
    category: 'resilience',
  },
  {
    id: '2',
    text: 'Your career is a journey, not a destination. Enjoy the process.',
    author: 'Sarah Johnson',
    category: 'growth',
  },
  {
    id: '3',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
    category: 'motivation',
  },
];

export const useMysticalStore = create<MysticalState>()(
  persist(
    (set, get) => ({
      todaysHoroscope: null,
      recentReadings: [],
      dailyQuote: null,
      userZodiacSign: null,
      isLoading: false,
      
      setZodiacSign: (sign) => {
        set({ userZodiacSign: sign });
      },
      
      fetchDailyHoroscope: async () => {
        const { userZodiacSign } = get();
        if (!userZodiacSign) return;
        
        set({ isLoading: true });
        try {
          // Mock API call - replace with actual astrology API
          const horoscope = mockHoroscopes[userZodiacSign] || mockHoroscopes.leo;
          set({ 
            todaysHoroscope: horoscope, 
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          console.error('Failed to fetch horoscope:', error);
        }
      },
      
      createTarotReading: async () => {
        set({ isLoading: true });
        try {
          // Mock tarot reading creation
          const mockCards: TarotCard[] = [
            {
              id: '1',
              name: 'The Star',
              suit: 'Major Arcana',
              meaning: 'Hope, inspiration, and spiritual guidance',
              careerInterpretation: 'New opportunities are on the horizon. Stay optimistic about your job search.',
              imageUrl: '/tarot/star.jpg',
              reversed: false,
            },
            {
              id: '2',
              name: 'Three of Pentacles',
              suit: 'Pentacles',
              meaning: 'Collaboration, teamwork, and skill-building',
              careerInterpretation: 'Focus on networking and building professional relationships.',
              imageUrl: '/tarot/three-pentacles.jpg',
              reversed: false,
            },
            {
              id: '3',
              name: 'Ace of Wands',
              suit: 'Wands',
              meaning: 'New beginnings, inspiration, and creative potential',
              careerInterpretation: 'A new job opportunity or career path is emerging. Be ready to take action.',
              imageUrl: '/tarot/ace-wands.jpg',
              reversed: false,
            },
          ];
          
          const newReading: TarotReading = {
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            cards: mockCards,
            interpretation: 'Your cards suggest that hope and new opportunities are coming your way. The Star indicates that you\'re on the right path, while the Three of Pentacles encourages you to network and collaborate. The Ace of Wands promises new beginnings - stay alert for unexpected opportunities.',
            actionItems: [
              'Update your LinkedIn profile',
              'Reach out to three professional contacts',
              'Apply to at least one new job today',
              'Trust your intuition when evaluating opportunities',
            ],
          };
          
          set((state) => ({
            recentReadings: [newReading, ...state.recentReadings.slice(0, 4)],
            isLoading: false,
          }));
          
          return newReading;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      fetchDailyQuote: async () => {
        set({ isLoading: true });
        try {
          // Mock API call
          const randomQuote = mockQuotes[Math.floor(Math.random() * mockQuotes.length)];
          set({ 
            dailyQuote: randomQuote, 
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          console.error('Failed to fetch quote:', error);
        }
      },
      
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'mystical-storage',
      partialize: (state) => ({
        userZodiacSign: state.userZodiacSign,
        recentReadings: state.recentReadings,
      }),
    }
  )
);