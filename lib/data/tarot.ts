// Tarot card system for career-focused guidance

export interface TarotCard {
  id: string;
  name: string;
  suit: 'major' | 'cups' | 'pentacles' | 'swords' | 'wands';
  number?: number;
  keywords: string[];
  upright: {
    meaning: string;
    careerMeaning: string;
    advice: string;
  };
  reversed: {
    meaning: string;
    careerMeaning: string;
    advice: string;
  };
  emoji: string;
}

export interface TarotReading {
  id: string;
  date: string;
  cards: DrawnCard[];
  spread: 'single' | 'three-card' | 'career-cross';
  interpretation: string;
  actionItems: string[];
}

export interface DrawnCard extends TarotCard {
  position: string;
  reversed: boolean;
  relevantMeaning: string;
  relevantAdvice: string;
}

// Major Arcana and relevant Minor Arcana cards for career guidance
export const TAROT_DECK: TarotCard[] = [
  // Major Arcana
  {
    id: 'fool',
    name: 'The Fool',
    suit: 'major',
    number: 0,
    keywords: ['new beginnings', 'adventure', 'potential', 'innocence'],
    upright: {
      meaning: 'New beginnings, spontaneity, innocence, free spirit',
      careerMeaning: 'Starting a new career path or taking a leap of faith in your profession',
      advice: 'Trust your instincts and be open to new opportunities, even if they seem risky'
    },
    reversed: {
      meaning: 'Recklessness, risk-taking, foolishness, stagnation',
      careerMeaning: 'Avoiding necessary career risks or making impulsive professional decisions',
      advice: 'Balance spontaneity with careful planning before making major career moves'
    },
    emoji: '🃏'
  },
  {
    id: 'magician',
    name: 'The Magician',
    suit: 'major',
    number: 1,
    keywords: ['manifestation', 'willpower', 'desire', 'creation'],
    upright: {
      meaning: 'Manifestation, resourcefulness, power, inspired action',
      careerMeaning: 'You have all the tools needed to succeed in your career goals',
      advice: 'Focus your energy and use your skills to manifest your professional dreams'
    },
    reversed: {
      meaning: 'Manipulation, poor planning, untapped talents, lack of focus',
      careerMeaning: 'Scattered energy or misusing your professional talents',
      advice: 'Refocus your career strategy and align your actions with your goals'
    },
    emoji: '🎩'
  },
  {
    id: 'high-priestess',
    name: 'The High Priestess',
    suit: 'major',
    number: 2,
    keywords: ['intuition', 'sacred knowledge', 'divine feminine', 'subconscious'],
    upright: {
      meaning: 'Intuition, sacred knowledge, divine feminine, subconscious mind',
      careerMeaning: 'Trust your intuition in career decisions and tap into your inner wisdom',
      advice: 'Listen to your inner voice when evaluating job opportunities or career changes'
    },
    reversed: {
      meaning: 'Secrets, withdrawn, repressed intuition, lack of center',
      careerMeaning: 'Ignoring your intuition or keeping important career information hidden',
      advice: 'Reconnect with your inner guidance and be more transparent in professional relationships'
    },
    emoji: '🌙'
  },
  {
    id: 'emperor',
    name: 'The Emperor',
    suit: 'major',
    number: 4,
    keywords: ['authority', 'structure', 'control', 'father-figure'],
    upright: {
      meaning: 'Authority, establishment, structure, father figure',
      careerMeaning: 'Leadership opportunities and establishing authority in your field',
      advice: 'Take charge of your career and establish yourself as an authority in your industry'
    },
    reversed: {
      meaning: 'Tyranny, rigidity, coldness, control issues',
      careerMeaning: 'Micromanagement or abuse of power in professional settings',
      advice: 'Balance authority with flexibility and avoid being overly controlling'
    },
    emoji: '👑'
  },
  {
    id: 'hierophant',
    name: 'The Hierophant',
    suit: 'major',
    number: 5,
    keywords: ['spiritual wisdom', 'religious beliefs', 'conformity', 'tradition'],
    upright: {
      meaning: 'Spiritual wisdom, religious beliefs, conformity, tradition',
      careerMeaning: 'Learning from mentors and following established career paths',
      advice: 'Seek guidance from experienced professionals and respect traditional career wisdom'
    },
    reversed: {
      meaning: 'Personal beliefs, freedom, challenging the status quo',
      careerMeaning: 'Breaking away from conventional career paths and creating your own way',
      advice: 'Challenge industry norms and create innovative approaches to your profession'
    },
    emoji: '🏛️'
  },
  {
    id: 'chariot',
    name: 'The Chariot',
    suit: 'major',
    number: 7,
    keywords: ['control', 'willpower', 'success', 'determination'],
    upright: {
      meaning: 'Control, willpower, success, determination, hard work',
      careerMeaning: 'Achieving career success through determination and focused effort',
      advice: 'Stay focused on your career goals and push through obstacles with determination'
    },
    reversed: {
      meaning: 'Lack of control, lack of direction, aggression, obstacles',
      careerMeaning: 'Losing control of your career direction or facing professional setbacks',
      advice: 'Regain control of your career path and address any obstacles methodically'
    },
    emoji: '🏎️'
  },
  {
    id: 'strength',
    name: 'Strength',
    suit: 'major',
    number: 8,
    keywords: ['strength', 'courage', 'persuasion', 'influence'],
    upright: {
      meaning: 'Strength, courage, persuasion, influence, compassion',
      careerMeaning: 'Using inner strength and emotional intelligence to succeed professionally',
      advice: 'Lead with compassion and use your inner strength to overcome career challenges'
    },
    reversed: {
      meaning: 'Self-doubt, lack of confidence, weakness, insecurity',
      careerMeaning: 'Struggling with confidence or feeling weak in professional situations',
      advice: 'Build your confidence and remember your past achievements and capabilities'
    },
    emoji: '🦁'
  },
  {
    id: 'wheel-of-fortune',
    name: 'Wheel of Fortune',
    suit: 'major',
    number: 10,
    keywords: ['good luck', 'karma', 'life cycles', 'destiny'],
    upright: {
      meaning: 'Good luck, karma, life cycles, destiny, turning point',
      careerMeaning: 'A significant positive change or opportunity in your career',
      advice: 'Embrace the changes coming to your career and trust in the process'
    },
    reversed: {
      meaning: 'Bad luck, lack of control, clinging to control, unwelcome changes',
      careerMeaning: 'Career setbacks or resistance to necessary professional changes',
      advice: 'Accept that some career changes are beyond your control and adapt accordingly'
    },
    emoji: '🎡'
  },
  {
    id: 'star',
    name: 'The Star',
    suit: 'major',
    number: 17,
    keywords: ['hope', 'faith', 'purpose', 'renewal'],
    upright: {
      meaning: 'Hope, faith, purpose, renewal, spirituality, healing',
      careerMeaning: 'Finding hope and renewed purpose in your career journey',
      advice: 'Stay optimistic about your career future and trust that better opportunities are coming'
    },
    reversed: {
      meaning: 'Lack of faith, despair, self-trust, disconnection',
      careerMeaning: 'Feeling hopeless about your career prospects or losing faith in your abilities',
      advice: 'Reconnect with your career goals and remember why you chose your profession'
    },
    emoji: '⭐'
  },
  {
    id: 'sun',
    name: 'The Sun',
    suit: 'major',
    number: 19,
    keywords: ['happiness', 'success', 'optimism', 'vitality'],
    upright: {
      meaning: 'Happiness, success, optimism, vitality, joy, confidence',
      careerMeaning: 'Career success, recognition, and fulfillment in your professional life',
      advice: 'Celebrate your achievements and maintain your positive attitude toward work'
    },
    reversed: {
      meaning: 'Inner child, feeling down, overly optimistic, unrealistic',
      careerMeaning: 'Temporary career setbacks or being overly optimistic about prospects',
      advice: 'Stay realistic about career expectations while maintaining a positive outlook'
    },
    emoji: '☀️'
  },
  
  // Key Minor Arcana cards for career
  {
    id: 'ace-pentacles',
    name: 'Ace of Pentacles',
    suit: 'pentacles',
    number: 1,
    keywords: ['opportunity', 'prosperity', 'new venture', 'manifestation'],
    upright: {
      meaning: 'New financial opportunity, manifestation, abundance',
      careerMeaning: 'A new job offer, promotion, or business opportunity',
      advice: 'Seize new financial or career opportunities that present themselves'
    },
    reversed: {
      meaning: 'Lost opportunity, lack of planning, poor financial judgment',
      careerMeaning: 'Missed career opportunities or poor financial decisions',
      advice: 'Be more strategic about career planning and financial management'
    },
    emoji: '💰'
  },
  {
    id: 'three-pentacles',
    name: 'Three of Pentacles',
    suit: 'pentacles',
    number: 3,
    keywords: ['collaboration', 'teamwork', 'skill building', 'learning'],
    upright: {
      meaning: 'Collaboration, teamwork, skill building, learning from others',
      careerMeaning: 'Success through teamwork and collaborative efforts',
      advice: 'Focus on building skills and working effectively with your team'
    },
    reversed: {
      meaning: 'Disharmony, lack of teamwork, poor collaboration',
      careerMeaning: 'Conflicts with colleagues or ineffective teamwork',
      advice: 'Work on improving your collaboration and communication skills'
    },
    emoji: '🤝'
  },
  {
    id: 'ten-pentacles',
    name: 'Ten of Pentacles',
    suit: 'pentacles',
    number: 10,
    keywords: ['wealth', 'financial security', 'family', 'legacy'],
    upright: {
      meaning: 'Wealth, financial security, family, legacy, long-term success',
      careerMeaning: 'Achieving long-term career security and building a lasting professional legacy',
      advice: 'Think long-term about your career and focus on building lasting professional relationships'
    },
    reversed: {
      meaning: 'Financial failure, lack of stability, family conflicts',
      careerMeaning: 'Career instability or conflicts between work and family',
      advice: 'Work on creating better work-life balance and financial stability'
    },
    emoji: '🏰'
  },
  {
    id: 'ace-wands',
    name: 'Ace of Wands',
    suit: 'wands',
    number: 1,
    keywords: ['inspiration', 'creative spark', 'new project', 'growth'],
    upright: {
      meaning: 'Inspiration, creative spark, new project, fresh energy',
      careerMeaning: 'A burst of creative energy or a new exciting project',
      advice: 'Channel your creative energy into new professional projects or initiatives'
    },
    reversed: {
      meaning: 'Lack of energy, delays, blocked creativity, frustration',
      careerMeaning: 'Creative blocks or delays in launching new career projects',
      advice: 'Take time to recharge and find new sources of professional inspiration'
    },
    emoji: '🔥'
  },
  {
    id: 'three-wands',
    name: 'Three of Wands',
    suit: 'wands',
    number: 3,
    keywords: ['expansion', 'foresight', 'overseas opportunities', 'leadership'],
    upright: {
      meaning: 'Expansion, foresight, overseas opportunities, leadership',
      careerMeaning: 'Expanding your career reach and exploring new markets or opportunities',
      advice: 'Look for opportunities to expand your professional reach and influence'
    },
    reversed: {
      meaning: 'Playing small, lack of foresight, unexpected delays',
      careerMeaning: 'Limited career growth or lack of vision for professional expansion',
      advice: 'Think bigger about your career possibilities and develop a long-term vision'
    },
    emoji: '🌅'
  }
];

// Tarot spread configurations
export const TAROT_SPREADS = {
  single: {
    name: 'Single Card',
    positions: ['Present Situation'],
    description: 'A single card for quick daily guidance'
  },
  'three-card': {
    name: 'Three Card Spread',
    positions: ['Past/Foundation', 'Present/Challenge', 'Future/Outcome'],
    description: 'Past, present, and future guidance for your career'
  },
  'career-cross': {
    name: 'Career Cross',
    positions: ['Current Career', 'Challenge', 'Distant Past', 'Recent Past', 'Possible Future', 'Immediate Future', 'Your Approach', 'External Influences', 'Hopes/Fears', 'Final Outcome'],
    description: 'Comprehensive career guidance spread'
  }
};

// Tarot reading generator
export class TarotReader {
  static drawCards(count: number = 1, avoidDuplicates: boolean = true): DrawnCard[] {
    const availableCards = [...TAROT_DECK];
    const drawnCards: DrawnCard[] = [];

    for (let i = 0; i < count; i++) {
      if (availableCards.length === 0) break;

      const randomIndex = Math.floor(Math.random() * availableCards.length);
      const card = availableCards[randomIndex];
      const reversed = Math.random() < 0.3; // 30% chance of reversed

      const drawnCard: DrawnCard = {
        ...card,
        position: '',
        reversed,
        relevantMeaning: reversed ? card.reversed.careerMeaning : card.upright.careerMeaning,
        relevantAdvice: reversed ? card.reversed.advice : card.upright.advice
      };

      drawnCards.push(drawnCard);

      if (avoidDuplicates) {
        availableCards.splice(randomIndex, 1);
      }
    }

    return drawnCards;
  }

  static createReading(spreadType: keyof typeof TAROT_SPREADS = 'three-card'): TarotReading {
    const spread = TAROT_SPREADS[spreadType];
    const cards = this.drawCards(spread.positions.length);

    // Assign positions to cards
    cards.forEach((card, index) => {
      card.position = spread.positions[index];
    });

    // Generate interpretation based on cards
    const interpretation = this.generateInterpretation(cards, spreadType);
    const actionItems = this.generateActionItems(cards);

    return {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      cards,
      spread: spreadType,
      interpretation,
      actionItems
    };
  }

  private static generateInterpretation(cards: DrawnCard[], spreadType: string): string {
    if (spreadType === 'single') {
      const card = cards[0];
      return `The ${card.name}${card.reversed ? ' (reversed)' : ''} suggests ${card.relevantMeaning.toLowerCase()}. ${card.relevantAdvice}`;
    }

    if (spreadType === 'three-card') {
      const [past, present, future] = cards;
      return `Your career foundation (${past.name}${past.reversed ? ' reversed' : ''}) shows ${past.relevantMeaning.toLowerCase()}. Currently (${present.name}${present.reversed ? ' reversed' : ''}), you're facing ${present.relevantMeaning.toLowerCase()}. Looking ahead (${future.name}${future.reversed ? ' reversed' : ''}), the cards suggest ${future.relevantMeaning.toLowerCase()}. ${present.relevantAdvice}`;
    }

    // For more complex spreads, provide a general interpretation
    const positiveCards = cards.filter(card => !card.reversed && card.keywords.some(k => ['success', 'happiness', 'strength', 'prosperity'].includes(k)));
    const challengingCards = cards.filter(card => card.reversed || card.keywords.some(k => ['conflict', 'delay', 'challenge'].includes(k)));

    if (positiveCards.length > challengingCards.length) {
      return 'The cards show a generally positive outlook for your career. Focus on leveraging your strengths and embracing new opportunities.';
    } else if (challengingCards.length > positiveCards.length) {
      return 'The cards indicate some challenges ahead, but these are opportunities for growth. Approach your career with patience and wisdom.';
    } else {
      return 'The cards show a balanced energy in your career. Success will come through careful planning and adaptability.';
    }
  }

  private static generateActionItems(cards: DrawnCard[]): string[] {
    const actions = new Set<string>();

    cards.forEach(card => {
      // Add specific actions based on card meanings
      if (card.keywords.includes('new beginnings')) {
        actions.add('Explore new career opportunities or skill development');
      }
      if (card.keywords.includes('collaboration')) {
        actions.add('Focus on building stronger professional relationships');
      }
      if (card.keywords.includes('planning')) {
        actions.add('Create a detailed career development plan');
      }
      if (card.keywords.includes('strength')) {
        actions.add('Trust in your abilities and take on challenging projects');
      }
      if (card.reversed) {
        actions.add('Reflect on current career strategies and make necessary adjustments');
      }
    });

    // Ensure we have at least a few action items
    if (actions.size < 2) {
      actions.add('Update your resume and professional profiles');
      actions.add('Network with industry professionals');
      actions.add('Set clear career goals for the next quarter');
    }

    return Array.from(actions).slice(0, 4);
  }

  static getDailyCard(): DrawnCard {
    const cards = this.drawCards(1);
    cards[0].position = 'Daily Guidance';
    return cards[0];
  }
}