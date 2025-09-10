// Horoscope data and generation system for career-focused guidance

export interface ZodiacSign {
  name: string;
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  modality: 'cardinal' | 'fixed' | 'mutable';
  planet: string;
  dates: string;
  traits: string[];
  careerStrengths: string[];
  challenges: string[];
}

export interface DailyHoroscope {
  sign: string;
  date: string;
  careerFocus: string;
  advice: string;
  luckyNumbers: number[];
  mood: 'positive' | 'neutral' | 'challenging';
  energy: number; // 1-10
  opportunities: string[];
  warnings: string[];
}

// Zodiac signs database with career-focused information
export const ZODIAC_SIGNS: Record<string, ZodiacSign> = {
  aries: {
    name: 'Aries',
    symbol: '♈',
    element: 'fire',
    modality: 'cardinal',
    planet: 'Mars',
    dates: 'March 21 - April 19',
    traits: ['Leadership', 'Initiative', 'Courage', 'Independence'],
    careerStrengths: ['Natural leadership', 'Entrepreneurial spirit', 'Quick decision-making', 'Competitive drive'],
    challenges: ['Impatience', 'Impulsiveness', 'Difficulty with routine tasks', 'May rush decisions']
  },
  taurus: {
    name: 'Taurus',
    symbol: '♉',
    element: 'earth',
    modality: 'fixed',
    planet: 'Venus',
    dates: 'April 20 - May 20',
    traits: ['Reliability', 'Persistence', 'Practicality', 'Stability'],
    careerStrengths: ['Strong work ethic', 'Attention to detail', 'Financial acumen', 'Consistent performance'],
    challenges: ['Resistance to change', 'Stubbornness', 'Slow to adapt', 'May avoid risks']
  },
  gemini: {
    name: 'Gemini',
    symbol: '♊',
    element: 'air',
    modality: 'mutable',
    planet: 'Mercury',
    dates: 'May 21 - June 20',
    traits: ['Communication', 'Adaptability', 'Curiosity', 'Versatility'],
    careerStrengths: ['Excellent communication', 'Quick learning', 'Networking abilities', 'Multi-tasking'],
    challenges: ['Scattered focus', 'Inconsistency', 'Difficulty with long-term projects', 'May lack depth']
  },
  cancer: {
    name: 'Cancer',
    symbol: '♋',
    element: 'water',
    modality: 'cardinal',
    planet: 'Moon',
    dates: 'June 21 - July 22',
    traits: ['Intuition', 'Empathy', 'Nurturing', 'Emotional intelligence'],
    careerStrengths: ['Team building', 'Customer relations', 'Emotional intelligence', 'Protective of colleagues'],
    challenges: ['Mood swings', 'Overly sensitive', 'Takes criticism personally', 'May avoid confrontation']
  },
  leo: {
    name: 'Leo',
    symbol: '♌',
    element: 'fire',
    modality: 'fixed',
    planet: 'Sun',
    dates: 'July 23 - August 22',
    traits: ['Confidence', 'Creativity', 'Generosity', 'Natural charisma'],
    careerStrengths: ['Public speaking', 'Creative leadership', 'Inspiring others', 'Brand building'],
    challenges: ['Need for recognition', 'Pride', 'May dominate meetings', 'Difficulty accepting feedback']
  },
  virgo: {
    name: 'Virgo',
    symbol: '♍',
    element: 'earth',
    modality: 'mutable',
    planet: 'Mercury',
    dates: 'August 23 - September 22',
    traits: ['Perfectionism', 'Analysis', 'Service', 'Efficiency'],
    careerStrengths: ['Quality control', 'Process improvement', 'Problem-solving', 'Reliable execution'],
    challenges: ['Perfectionist tendencies', 'Over-critical', 'Difficulty delegating', 'May get lost in details']
  },
  libra: {
    name: 'Libra',
    symbol: '♎',
    element: 'air',
    modality: 'cardinal',
    planet: 'Venus',
    dates: 'September 23 - October 22',
    traits: ['Balance', 'Diplomacy', 'Harmony', 'Fairness'],
    careerStrengths: ['Negotiation', 'Mediation', 'Team harmony', 'Aesthetic sense'],
    challenges: ['Indecisiveness', 'Conflict avoidance', 'People-pleasing', 'Difficulty with deadlines']
  },
  scorpio: {
    name: 'Scorpio',
    symbol: '♏',
    element: 'water',
    modality: 'fixed',
    planet: 'Mars/Pluto',
    dates: 'October 23 - November 21',
    traits: ['Intensity', 'Focus', 'Transformation', 'Determination'],
    careerStrengths: ['Deep analysis', 'Crisis management', 'Research abilities', 'Transformational leadership'],
    challenges: ['Trust issues', 'Secretiveness', 'All-or-nothing approach', 'May hold grudges']
  },
  sagittarius: {
    name: 'Sagittarius',
    symbol: '♐',
    element: 'fire',
    modality: 'mutable',
    planet: 'Jupiter',
    dates: 'November 22 - December 21',
    traits: ['Optimism', 'Adventure', 'Philosophy', 'Freedom'],
    careerStrengths: ['International business', 'Education', 'Big-picture thinking', 'Cultural awareness'],
    challenges: ['Impatience with details', 'Overcommitment', 'Restlessness', 'May lack follow-through']
  },
  capricorn: {
    name: 'Capricorn',
    symbol: '♑',
    element: 'earth',
    modality: 'cardinal',
    planet: 'Saturn',
    dates: 'December 22 - January 19',
    traits: ['Ambition', 'Discipline', 'Responsibility', 'Structure'],
    careerStrengths: ['Goal achievement', 'Strategic planning', 'Authority', 'Long-term vision'],
    challenges: ['Workaholism', 'Rigidity', 'Pessimism', 'May sacrifice work-life balance']
  },
  aquarius: {
    name: 'Aquarius',
    symbol: '♒',
    element: 'air',
    modality: 'fixed',
    planet: 'Uranus',
    dates: 'January 20 - February 18',
    traits: ['Innovation', 'Independence', 'Humanitarianism', 'Originality'],
    careerStrengths: ['Technology adoption', 'Innovation', 'Social causes', 'Unique perspectives'],
    challenges: ['Rebellious nature', 'Emotional detachment', 'Unpredictability', 'May resist authority']
  },
  pisces: {
    name: 'Pisces',
    symbol: '♓',
    element: 'water',
    modality: 'mutable',
    planet: 'Neptune',
    dates: 'February 19 - March 20',
    traits: ['Intuition', 'Creativity', 'Empathy', 'Spirituality'],
    careerStrengths: ['Creative industries', 'Healing professions', 'Intuitive insights', 'Compassionate leadership'],
    challenges: ['Boundary issues', 'Escapism', 'Indecisiveness', 'May take on others\' emotions']
  }
};

// Career-focused horoscope templates
const CAREER_TEMPLATES = {
  positive: [
    "The stars align favorably for your career today. {specific_advice}",
    "Your {sign_strength} will be particularly powerful in professional settings today. {specific_advice}",
    "A golden opportunity may present itself. {specific_advice}",
    "Your natural {trait} will attract positive attention from colleagues and superiors. {specific_advice}",
    "The cosmic energy supports career advancement today. {specific_advice}"
  ],
  neutral: [
    "Today calls for steady progress in your career journey. {specific_advice}",
    "Focus on {sign_strength} to navigate today's professional challenges. {specific_advice}",
    "A balanced approach to work will serve you well today. {specific_advice}",
    "Your {trait} may be tested, but this is an opportunity for growth. {specific_advice}",
    "Patience and persistence will be your allies today. {specific_advice}"
  ],
  challenging: [
    "The stars suggest caution in career matters today. {specific_advice}",
    "Your {sign_challenge} may surface today - use it as a learning opportunity. {specific_advice}",
    "Today requires extra attention to detail and careful communication. {specific_advice}",
    "Challenges may arise, but your natural {trait} will help you overcome them. {specific_advice}",
    "A difficult situation may teach you valuable lessons about your career path. {specific_advice}"
  ]
};

const SPECIFIC_ADVICE = {
  aries: [
    "Channel your leadership energy into a new project or initiative",
    "Your quick decision-making skills will be valued by your team",
    "Consider taking the lead on a challenging assignment",
    "Network with industry leaders - your confidence will make a strong impression"
  ],
  taurus: [
    "Focus on building long-term professional relationships",
    "Your reliability will be noticed and rewarded",
    "Consider investing in professional development or certifications",
    "Review your financial goals and career stability"
  ],
  gemini: [
    "Use your communication skills to facilitate team collaboration",
    "Explore new learning opportunities or skills development",
    "Network across different departments or industries",
    "Share your innovative ideas in meetings"
  ],
  cancer: [
    "Trust your intuition when evaluating new opportunities",
    "Focus on team building and creating supportive work environments",
    "Your empathetic nature will help resolve workplace conflicts",
    "Consider mentoring junior colleagues"
  ],
  leo: [
    "Showcase your creative ideas with confidence",
    "Take on projects that allow you to inspire and lead others",
    "Your natural charisma will open doors to new opportunities",
    "Consider roles that put you in the spotlight"
  ],
  virgo: [
    "Your attention to detail will prevent costly mistakes",
    "Focus on process improvement and efficiency",
    "Organize your workspace and digital files for better productivity",
    "Offer analytical insights to help solve complex problems"
  ],
  libra: [
    "Use your diplomatic skills to navigate office politics",
    "Focus on creating harmony and balance in team dynamics",
    "Your aesthetic sense could benefit creative or design projects",
    "Mediate conflicts and build consensus among colleagues"
  ],
  scorpio: [
    "Dive deep into research or complex problem-solving",
    "Your intensity and focus will drive important projects to completion",
    "Trust your instincts when evaluating people and opportunities",
    "Consider roles that involve transformation or crisis management"
  ],
  sagittarius: [
    "Explore international opportunities or global perspectives",
    "Share your optimistic vision to motivate the team",
    "Consider educational or training roles",
    "Network with diverse professionals to expand your horizons"
  ],
  capricorn: [
    "Set clear, achievable goals for your career advancement",
    "Your disciplined approach will lead to steady progress",
    "Focus on building authority and expertise in your field",
    "Plan for long-term career success with strategic moves"
  ],
  aquarius: [
    "Embrace innovative approaches to traditional problems",
    "Your unique perspective will bring fresh solutions",
    "Consider roles in technology or social impact organizations",
    "Network with forward-thinking professionals"
  ],
  pisces: [
    "Trust your creative instincts in problem-solving",
    "Your empathetic nature will help you understand client needs",
    "Consider roles in healing, arts, or service-oriented industries",
    "Use visualization techniques to manifest career goals"
  ]
};

// Horoscope generation engine
export class HoroscopeGenerator {
  static generateDailyHoroscope(sign: string, date: Date = new Date()): DailyHoroscope {
    const zodiacInfo = ZODIAC_SIGNS[sign.toLowerCase()];
    if (!zodiacInfo) {
      throw new Error(`Unknown zodiac sign: ${sign}`);
    }

    // Generate mood based on date and sign
    const mood = this.calculateMood(sign, date);
    const energy = this.calculateEnergy(sign, date);
    
    // Select appropriate template
    const templates = CAREER_TEMPLATES[mood];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Get specific advice for the sign
    const adviceOptions = SPECIFIC_ADVICE[sign.toLowerCase() as keyof typeof SPECIFIC_ADVICE];
    const specificAdvice = adviceOptions[Math.floor(Math.random() * adviceOptions.length)];
    
    // Replace placeholders in template
    const careerFocus = template
      .replace('{specific_advice}', '')
      .replace('{sign_strength}', zodiacInfo.careerStrengths[0].toLowerCase())
      .replace('{trait}', zodiacInfo.traits[0].toLowerCase())
      .replace('{sign_challenge}', zodiacInfo.challenges[0].toLowerCase());

    return {
      sign: zodiacInfo.name,
      date: date.toISOString().split('T')[0],
      careerFocus: careerFocus.trim(),
      advice: specificAdvice,
      luckyNumbers: this.generateLuckyNumbers(sign, date),
      mood,
      energy,
      opportunities: this.generateOpportunities(sign, mood),
      warnings: this.generateWarnings(sign, mood)
    };
  }

  private static calculateMood(sign: string, date: Date): 'positive' | 'neutral' | 'challenging' {
    // Simple algorithm based on date and sign
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    const signIndex = Object.keys(ZODIAC_SIGNS).indexOf(sign.toLowerCase());
    const moodValue = (dayOfYear + signIndex) % 10;
    
    if (moodValue >= 7) return 'positive';
    if (moodValue >= 4) return 'neutral';
    return 'challenging';
  }

  private static calculateEnergy(sign: string, date: Date): number {
    const zodiacInfo = ZODIAC_SIGNS[sign.toLowerCase()];
    const baseEnergy = zodiacInfo.element === 'fire' ? 8 : 
                      zodiacInfo.element === 'air' ? 7 :
                      zodiacInfo.element === 'earth' ? 6 : 5;
    
    const dayVariation = (date.getDate() % 4) - 2; // -2 to +1
    return Math.max(1, Math.min(10, baseEnergy + dayVariation));
  }

  private static generateLuckyNumbers(sign: string, date: Date): number[] {
    const signIndex = Object.keys(ZODIAC_SIGNS).indexOf(sign.toLowerCase()) + 1;
    const dateSum = date.getDate();
    
    return [
      signIndex,
      dateSum % 50 + 1,
      (signIndex + dateSum) % 100 + 1
    ].sort((a, b) => a - b);
  }

  private static generateOpportunities(sign: string, mood: string): string[] {
    const zodiacInfo = ZODIAC_SIGNS[sign.toLowerCase()];
    const opportunities = [];

    if (mood === 'positive') {
      opportunities.push(`Leverage your ${zodiacInfo.careerStrengths[0].toLowerCase()}`);
      opportunities.push("Network with influential contacts");
    }
    
    if (mood !== 'challenging') {
      opportunities.push("Explore new learning opportunities");
    }

    return opportunities;
  }

  private static generateWarnings(sign: string, mood: string): string[] {
    const zodiacInfo = ZODIAC_SIGNS[sign.toLowerCase()];
    const warnings = [];

    if (mood === 'challenging') {
      warnings.push(`Watch out for ${zodiacInfo.challenges[0].toLowerCase()}`);
      warnings.push("Avoid making major career decisions today");
    }

    if (mood !== 'positive') {
      warnings.push("Double-check important communications");
    }

    return warnings;
  }
}