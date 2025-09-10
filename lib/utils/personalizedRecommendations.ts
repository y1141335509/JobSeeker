import { QuoteManager } from '../data/quotes';
import { HoroscopeGenerator } from '../data/horoscope';
import { TarotReader } from '../data/tarot';
import type { MotivationalQuote } from '../data/quotes';
import type { DailyHoroscope } from '../data/horoscope';
import type { DrawnCard } from '../data/tarot';

export interface UserProfile {
  id: string;
  zodiacSign: string;
  careerStage?: 'job-seeking' | 'career-change' | 'advancement' | 'starting-out';
  interests?: string[];
  goals?: string[];
  recentActivity?: {
    applications?: number;
    rejections?: number;
    interviews?: number;
    lastLoginDays?: number;
  };
  preferences?: {
    preferredCategories?: string[];
    motivationLevel?: 'low' | 'medium' | 'high';
    challengeComfort?: 'conservative' | 'moderate' | 'adventurous';
  };
}

export interface PersonalizedGuidance {
  horoscope: DailyHoroscope;
  dailyCard: DrawnCard;
  primaryQuote: MotivationalQuote;
  additionalQuotes: MotivationalQuote[];
  personalizedInsights: string[];
  actionRecommendations: string[];
  moodAnalysis: {
    current: 'positive' | 'neutral' | 'challenging';
    factors: string[];
    suggestions: string[];
  };
}

export class PersonalizationEngine {
  static generatePersonalizedGuidance(user: UserProfile, date: Date = new Date()): PersonalizedGuidance {
    // Generate base horoscope
    const horoscope = HoroscopeGenerator.generateDailyHoroscope(user.zodiacSign, date);
    
    // Get daily tarot card
    const dailyCard = TarotReader.getDailyCard();
    
    // Get personalized quotes based on user context
    const primaryQuote = this.selectContextualQuote(user, horoscope.mood);
    const additionalQuotes = this.getAdditionalQuotes(user, primaryQuote);
    
    // Generate personalized insights
    const personalizedInsights = this.generatePersonalizedInsights(user, horoscope, dailyCard);
    
    // Generate action recommendations
    const actionRecommendations = this.generateActionRecommendations(user, horoscope, dailyCard);
    
    // Analyze mood and provide suggestions
    const moodAnalysis = this.analyzeMoodAndSuggest(user, horoscope);

    return {
      horoscope,
      dailyCard,
      primaryQuote,
      additionalQuotes,
      personalizedInsights,
      actionRecommendations,
      moodAnalysis
    };
  }

  private static selectContextualQuote(user: UserProfile, horoscopeMood: string): MotivationalQuote {
    const context = {
      recentApplications: user.recentActivity?.applications || 0,
      recentRejections: user.recentActivity?.rejections || 0,
      interviews: user.recentActivity?.interviews || 0,
      careerStage: user.careerStage
    };

    // Use contextual quote selection from QuoteManager
    let contextualQuote = QuoteManager.getContextualQuote(context);
    
    // If user has preferences, try to align with them
    if (user.preferences?.preferredCategories?.length) {
      const preferredQuotes = user.preferences.preferredCategories
        .flatMap(category => QuoteManager.getQuotesByCategory(category as any))
        .filter(quote => quote);
        
      if (preferredQuotes.length > 0) {
        contextualQuote = preferredQuotes[Math.floor(Math.random() * preferredQuotes.length)];
      }
    }

    // Fallback to mood-based selection
    return contextualQuote || QuoteManager.getMotivationalQuoteForMood(horoscopeMood as any);
  }

  private static getAdditionalQuotes(user: UserProfile, primaryQuote: MotivationalQuote): MotivationalQuote[] {
    const additionalQuotes: MotivationalQuote[] = [];
    
    // Add quotes from similar categories
    const relatedQuotes = QuoteManager.getQuotesByCategory(primaryQuote.category)
      .filter(quote => quote.id !== primaryQuote.id);
    
    if (relatedQuotes.length > 0) {
      additionalQuotes.push(relatedQuotes[Math.floor(Math.random() * relatedQuotes.length)]);
    }

    // Add quote based on career stage
    if (user.careerStage) {
      const stageQuote = QuoteManager.getContextualQuote({ careerStage: user.careerStage });
      if (stageQuote && stageQuote.id !== primaryQuote.id && !additionalQuotes.find(q => q.id === stageQuote.id)) {
        additionalQuotes.push(stageQuote);
      }
    }

    // Add motivational boost if user has low activity
    const daysSinceLogin = user.recentActivity?.lastLoginDays || 0;
    if (daysSinceLogin > 3 || user.preferences?.motivationLevel === 'low') {
      const boostQuotes = QuoteManager.getQuotesByCategory('motivation')
        .filter(quote => !additionalQuotes.find(q => q.id === quote.id) && quote.id !== primaryQuote.id);
      
      if (boostQuotes.length > 0) {
        additionalQuotes.push(boostQuotes[Math.floor(Math.random() * boostQuotes.length)]);
      }
    }

    return additionalQuotes.slice(0, 2); // Limit to 2 additional quotes
  }

  private static generatePersonalizedInsights(
    user: UserProfile, 
    horoscope: DailyHoroscope, 
    dailyCard: DrawnCard
  ): string[] {
    const insights: string[] = [];

    // Combine astrological and tarot insights
    if (horoscope.mood === 'positive' && !dailyCard.reversed) {
      insights.push("Both your horoscope and tarot card align positively - this is an excellent day to take career initiatives.");
    } else if (horoscope.mood === 'challenging' || dailyCard.reversed) {
      insights.push("Today calls for patience and reflection. Use this time to plan and prepare for future opportunities.");
    }

    // Career stage insights
    if (user.careerStage === 'job-seeking') {
      if (horoscope.energy >= 7) {
        insights.push("Your high energy today is perfect for networking and reaching out to potential employers.");
      }
      if (user.recentActivity?.applications && user.recentActivity.applications > 5) {
        insights.push("You've been actively applying - remember that quality applications often outperform quantity.");
      }
    }

    if (user.careerStage === 'career-change') {
      insights.push(`As a ${horoscope.sign}, your natural ${user.zodiacSign === 'aries' ? 'leadership' : 
        user.zodiacSign === 'taurus' ? 'reliability' : 
        user.zodiacSign === 'gemini' ? 'adaptability' : 'intuition'} will serve you well during this transition.`);
    }

    // Activity-based insights
    if (user.recentActivity?.rejections && user.recentActivity.rejections > 2) {
      insights.push("Recent rejections are redirections. Each 'no' brings you closer to the right 'yes'.");
    }

    if (user.recentActivity?.interviews && user.recentActivity.interviews > 0) {
      insights.push("Interview opportunities show you're on the right track. Confidence is your ally.");
    }

    // Personalized astrological insights
    if (dailyCard.keywords.includes('new beginnings') && horoscope.opportunities.length > 0) {
      insights.push("The cards suggest new beginnings align with opportunities in your horoscope - be ready to act.");
    }

    return insights.length > 0 ? insights : [
      "Trust in your unique journey. Every step forward, no matter how small, is progress."
    ];
  }

  private static generateActionRecommendations(
    user: UserProfile, 
    horoscope: DailyHoroscope, 
    dailyCard: DrawnCard
  ): string[] {
    const actions: string[] = [];

    // Energy-based recommendations
    if (horoscope.energy >= 7) {
      actions.push("High energy day - tackle your most challenging career tasks first");
      if (user.careerStage === 'job-seeking') {
        actions.push("Reach out to 2-3 new networking contacts");
      }
    } else if (horoscope.energy <= 4) {
      actions.push("Lower energy today - focus on planning and organizing rather than high-stress activities");
    }

    // Mood-based actions
    if (horoscope.mood === 'positive') {
      actions.push("Take advantage of today's positive energy to make important career calls or send applications");
      if (user.preferences?.challengeComfort === 'adventurous') {
        actions.push("Consider applying for that stretch role you've been eyeing");
      }
    } else if (horoscope.mood === 'challenging') {
      actions.push("Practice self-care and avoid making major career decisions today");
      actions.push("Review and update your career materials instead");
    }

    // Tarot-based actions
    if (dailyCard.keywords.includes('collaboration')) {
      actions.push("Focus on team building and professional relationship development");
    }
    if (dailyCard.keywords.includes('planning')) {
      actions.push("Create or refine your career development plan");
    }
    if (dailyCard.keywords.includes('new beginnings')) {
      actions.push("Explore new career opportunities or skill development options");
    }

    // Career stage specific actions
    if (user.careerStage === 'job-seeking') {
      if (user.recentActivity?.applications === 0) {
        actions.push("Start with 1-2 targeted job applications today");
      }
      if (!user.recentActivity?.interviews) {
        actions.push("Review your resume and optimize for applicant tracking systems");
      }
    }

    // Fallback actions
    if (actions.length === 0) {
      actions.push("Update your LinkedIn profile");
      actions.push("Spend 30 minutes learning a new skill related to your field");
      actions.push("Network with one industry professional");
    }

    return actions.slice(0, 4); // Limit to 4 actions to avoid overwhelm
  }

  private static analyzeMoodAndSuggest(user: UserProfile, horoscope: DailyHoroscope) {
    const factors: string[] = [];
    const suggestions: string[] = [];

    // Analyze factors affecting mood
    if (user.recentActivity?.rejections && user.recentActivity.rejections > 3) {
      factors.push("Recent job rejections may be affecting confidence");
      suggestions.push("Remember that rejections are often about fit, not your worth");
    }

    if (user.recentActivity?.lastLoginDays && user.recentActivity.lastLoginDays > 7) {
      factors.push("Extended time away from job search activities");
      suggestions.push("Start with small, manageable career tasks to rebuild momentum");
    }

    if (user.recentActivity?.applications && user.recentActivity.applications > 20) {
      factors.push("High application activity may lead to burnout");
      suggestions.push("Balance application quantity with quality and self-care");
    }

    // Horoscope-based factors
    if (horoscope.mood === 'challenging') {
      factors.push("Astrological influences suggest a more cautious day");
      suggestions.push("Use this time for reflection and strategic planning");
    }

    if (horoscope.energy <= 4) {
      factors.push("Lower energy levels indicated by your horoscope");
      suggestions.push("Focus on rest and preparation rather than high-intensity activities");
    }

    // Default positive suggestions
    if (suggestions.length === 0) {
      suggestions.push("Maintain your positive momentum with consistent daily actions");
      suggestions.push("Celebrate small wins to build lasting confidence");
    }

    return {
      current: horoscope.mood,
      factors: factors.length > 0 ? factors : ["Overall outlook appears stable"],
      suggestions
    };
  }

  // Helper method to create user profile from auth store data
  static createUserProfile(userData: any, activityData?: any): UserProfile {
    return {
      id: userData.id,
      zodiacSign: userData.zodiacSign,
      careerStage: userData.careerStage || 'job-seeking',
      interests: userData.interests || [],
      goals: userData.goals || [],
      recentActivity: {
        applications: activityData?.applications || 0,
        rejections: activityData?.rejections || 0,
        interviews: activityData?.interviews || 0,
        lastLoginDays: activityData?.lastLoginDays || 0,
      },
      preferences: {
        preferredCategories: userData.preferredCategories || [],
        motivationLevel: userData.motivationLevel || 'medium',
        challengeComfort: userData.challengeComfort || 'moderate',
      }
    };
  }
}