// Motivational quotes library for career guidance and inspiration

export interface MotivationalQuote {
  id: string;
  text: string;
  author: string;
  category: 'motivation' | 'success' | 'resilience' | 'growth' | 'leadership' | 'opportunity' | 'confidence';
  tags: string[];
  careerRelevant: boolean;
}

export const MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  // Motivation & Success
  {
    id: 'quote-1',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
    category: 'success',
    tags: ['perseverance', 'courage', 'determination'],
    careerRelevant: true
  },
  {
    id: 'quote-2',
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    category: 'motivation',
    tags: ['passion', 'fulfillment', 'excellence'],
    careerRelevant: true
  },
  {
    id: 'quote-3',
    text: 'Your limitation—it\'s only your imagination.',
    author: 'Unknown',
    category: 'motivation',
    tags: ['potential', 'mindset', 'breakthrough'],
    careerRelevant: true
  },
  {
    id: 'quote-4',
    text: 'Don\'t watch the clock; do what it does. Keep going.',
    author: 'Sam Levenson',
    category: 'motivation',
    tags: ['persistence', 'time management', 'progress'],
    careerRelevant: true
  },
  {
    id: 'quote-5',
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    category: 'motivation',
    tags: ['dreams', 'belief', 'future'],
    careerRelevant: true
  },

  // Resilience & Growth
  {
    id: 'quote-6',
    text: 'Every rejection is a redirection to something better.',
    author: 'Unknown',
    category: 'resilience',
    tags: ['rejection', 'opportunity', 'perspective'],
    careerRelevant: true
  },
  {
    id: 'quote-7',
    text: 'Fall seven times, stand up eight.',
    author: 'Japanese Proverb',
    category: 'resilience',
    tags: ['persistence', 'recovery', 'strength'],
    careerRelevant: true
  },
  {
    id: 'quote-8',
    text: 'The only impossible journey is the one you never begin.',
    author: 'Tony Robbins',
    category: 'growth',
    tags: ['beginning', 'action', 'possibility'],
    careerRelevant: true
  },
  {
    id: 'quote-9',
    text: 'In the middle of difficulty lies opportunity.',
    author: 'Albert Einstein',
    category: 'resilience',
    tags: ['opportunity', 'challenge', 'perspective'],
    careerRelevant: true
  },
  {
    id: 'quote-10',
    text: 'Growth begins at the end of your comfort zone.',
    author: 'Neale Donald Walsch',
    category: 'growth',
    tags: ['comfort zone', 'development', 'challenge'],
    careerRelevant: true
  },

  // Leadership & Confidence
  {
    id: 'quote-11',
    text: 'A leader is one who knows the way, goes the way, and shows the way.',
    author: 'John C. Maxwell',
    category: 'leadership',
    tags: ['guidance', 'example', 'direction'],
    careerRelevant: true
  },
  {
    id: 'quote-12',
    text: 'Believe you can and you\'re halfway there.',
    author: 'Theodore Roosevelt',
    category: 'confidence',
    tags: ['belief', 'self-confidence', 'mindset'],
    careerRelevant: true
  },
  {
    id: 'quote-13',
    text: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney',
    category: 'motivation',
    tags: ['action', 'execution', 'progress'],
    careerRelevant: true
  },
  {
    id: 'quote-14',
    text: 'Innovation distinguishes between a leader and a follower.',
    author: 'Steve Jobs',
    category: 'leadership',
    tags: ['innovation', 'creativity', 'leadership'],
    careerRelevant: true
  },
  {
    id: 'quote-15',
    text: 'Confidence comes not from always being right but from not fearing to be wrong.',
    author: 'Peter T. Mcintyre',
    category: 'confidence',
    tags: ['confidence', 'courage', 'risk-taking'],
    careerRelevant: true
  },

  // Opportunity & Career Growth
  {
    id: 'quote-16',
    text: 'Opportunities don\'t happen. You create them.',
    author: 'Chris Grosser',
    category: 'opportunity',
    tags: ['creation', 'proactive', 'initiative'],
    careerRelevant: true
  },
  {
    id: 'quote-17',
    text: 'Your career is a journey, not a destination.',
    author: 'Unknown',
    category: 'growth',
    tags: ['journey', 'process', 'development'],
    careerRelevant: true
  },
  {
    id: 'quote-18',
    text: 'The expert in anything was once a beginner.',
    author: 'Helen Hayes',
    category: 'growth',
    tags: ['learning', 'expertise', 'progress'],
    careerRelevant: true
  },
  {
    id: 'quote-19',
    text: 'Success is where preparation and opportunity meet.',
    author: 'Bobby Unser',
    category: 'success',
    tags: ['preparation', 'opportunity', 'readiness'],
    careerRelevant: true
  },
  {
    id: 'quote-20',
    text: 'Choose a job you love, and you will never have to work a day in your life.',
    author: 'Confucius',
    category: 'motivation',
    tags: ['passion', 'fulfillment', 'career choice'],
    careerRelevant: true
  },

  // Network & Relationships
  {
    id: 'quote-21',
    text: 'Your network is your net worth.',
    author: 'Porter Gale',
    category: 'opportunity',
    tags: ['networking', 'relationships', 'value'],
    careerRelevant: true
  },
  {
    id: 'quote-22',
    text: 'Alone we can do so little; together we can do so much.',
    author: 'Helen Keller',
    category: 'leadership',
    tags: ['teamwork', 'collaboration', 'synergy'],
    careerRelevant: true
  },
  {
    id: 'quote-23',
    text: 'The currency of real networking is not greed but generosity.',
    author: 'Keith Ferrazzi',
    category: 'opportunity',
    tags: ['networking', 'generosity', 'relationships'],
    careerRelevant: true
  },

  // Skill Development & Learning
  {
    id: 'quote-24',
    text: 'An investment in knowledge pays the best interest.',
    author: 'Benjamin Franklin',
    category: 'growth',
    tags: ['learning', 'knowledge', 'investment'],
    careerRelevant: true
  },
  {
    id: 'quote-25',
    text: 'The beautiful thing about learning is that no one can take it away from you.',
    author: 'B.B. King',
    category: 'growth',
    tags: ['learning', 'knowledge', 'security'],
    careerRelevant: true
  },
  {
    id: 'quote-26',
    text: 'Skills are cheap. Passion is priceless.',
    author: 'Gary Vaynerchuk',
    category: 'motivation',
    tags: ['passion', 'skills', 'value'],
    careerRelevant: true
  },

  // Change & Adaptation
  {
    id: 'quote-27',
    text: 'The only constant in life is change.',
    author: 'Heraclitus',
    category: 'resilience',
    tags: ['change', 'adaptation', 'flexibility'],
    careerRelevant: true
  },
  {
    id: 'quote-28',
    text: 'Change is the end result of all true learning.',
    author: 'John F. Kennedy',
    category: 'growth',
    tags: ['change', 'learning', 'transformation'],
    careerRelevant: true
  },
  {
    id: 'quote-29',
    text: 'Progress is impossible without change.',
    author: 'George Bernard Shaw',
    category: 'growth',
    tags: ['progress', 'change', 'evolution'],
    careerRelevant: true
  },

  // Excellence & Quality
  {
    id: 'quote-30',
    text: 'Excellence is not a skill, it\'s an attitude.',
    author: 'Ralph Marston',
    category: 'success',
    tags: ['excellence', 'attitude', 'quality'],
    careerRelevant: true
  },
  {
    id: 'quote-31',
    text: 'Quality is not an act, it is a habit.',
    author: 'Aristotle',
    category: 'success',
    tags: ['quality', 'habits', 'consistency'],
    careerRelevant: true
  },
  {
    id: 'quote-32',
    text: 'Strive not to be a success, but rather to be of value.',
    author: 'Albert Einstein',
    category: 'success',
    tags: ['value', 'purpose', 'contribution'],
    careerRelevant: true
  },

  // Time & Productivity
  {
    id: 'quote-33',
    text: 'Time is what we want most, but what we use worst.',
    author: 'William Penn',
    category: 'motivation',
    tags: ['time management', 'productivity', 'efficiency'],
    careerRelevant: true
  },
  {
    id: 'quote-34',
    text: 'The key is not to prioritize what\'s on your schedule, but to schedule your priorities.',
    author: 'Stephen Covey',
    category: 'motivation',
    tags: ['priorities', 'planning', 'productivity'],
    careerRelevant: true
  },
  {
    id: 'quote-35',
    text: 'You are never too old to set another goal or to dream a new dream.',
    author: 'C.S. Lewis',
    category: 'motivation',
    tags: ['goals', 'dreams', 'age'],
    careerRelevant: true
  }
];

// Quote generation and management system
export class QuoteManager {
  static getRandomQuote(category?: MotivationalQuote['category']): MotivationalQuote {
    let filteredQuotes = MOTIVATIONAL_QUOTES;
    
    if (category) {
      filteredQuotes = MOTIVATIONAL_QUOTES.filter(quote => quote.category === category);
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    return filteredQuotes[randomIndex];
  }

  static getDailyQuote(date: Date = new Date()): MotivationalQuote {
    // Use date to ensure same quote for same day
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    const quoteIndex = dayOfYear % MOTIVATIONAL_QUOTES.length;
    return MOTIVATIONAL_QUOTES[quoteIndex];
  }

  static getQuotesByCategory(category: MotivationalQuote['category']): MotivationalQuote[] {
    return MOTIVATIONAL_QUOTES.filter(quote => quote.category === category);
  }

  static getQuotesByTag(tag: string): MotivationalQuote[] {
    return MOTIVATIONAL_QUOTES.filter(quote => 
      quote.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    );
  }

  static getMotivationalQuoteForMood(mood: 'positive' | 'neutral' | 'challenging'): MotivationalQuote {
    let preferredCategories: MotivationalQuote['category'][];
    
    switch (mood) {
      case 'positive':
        preferredCategories = ['success', 'opportunity', 'leadership'];
        break;
      case 'challenging':
        preferredCategories = ['resilience', 'growth', 'confidence'];
        break;
      default:
        preferredCategories = ['motivation', 'growth'];
    }

    const filteredQuotes = MOTIVATIONAL_QUOTES.filter(quote => 
      preferredCategories.includes(quote.category)
    );

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    return filteredQuotes[randomIndex] || MOTIVATIONAL_QUOTES[0];
  }

  static searchQuotes(searchTerm: string): MotivationalQuote[] {
    const term = searchTerm.toLowerCase();
    return MOTIVATIONAL_QUOTES.filter(quote => 
      quote.text.toLowerCase().includes(term) ||
      quote.author.toLowerCase().includes(term) ||
      quote.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }

  static getCareerRelevantQuotes(): MotivationalQuote[] {
    return MOTIVATIONAL_QUOTES.filter(quote => quote.careerRelevant);
  }

  static getQuoteOfTheWeek(): MotivationalQuote {
    // Get different quote for each week
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
    
    const quoteIndex = weekNumber % MOTIVATIONAL_QUOTES.length;
    return MOTIVATIONAL_QUOTES[quoteIndex];
  }

  // Get contextual quote based on user activity or career stage
  static getContextualQuote(context: {
    recentApplications?: number;
    recentRejections?: number;
    interviews?: number;
    careerStage?: 'job-seeking' | 'career-change' | 'advancement' | 'starting-out';
  }): MotivationalQuote {
    const { recentApplications = 0, recentRejections = 0, interviews = 0, careerStage } = context;

    // If many rejections, focus on resilience
    if (recentRejections > 3) {
      return this.getRandomQuote('resilience');
    }

    // If many applications but no interviews, focus on persistence
    if (recentApplications > 10 && interviews === 0) {
      return this.getRandomQuote('motivation');
    }

    // If upcoming interviews, focus on confidence
    if (interviews > 0) {
      return this.getRandomQuote('confidence');
    }

    // Based on career stage
    switch (careerStage) {
      case 'starting-out':
        return this.getRandomQuote('growth');
      case 'career-change':
        return this.getRandomQuote('opportunity');
      case 'advancement':
        return this.getRandomQuote('leadership');
      default:
        return this.getDailyQuote();
    }
  }
}