// Zodiac sign calculation utilities

export interface ZodiacDate {
  start: { month: number; day: number };
  end: { month: number; day: number };
}

export const ZODIAC_DATES: Record<string, ZodiacDate> = {
  aries: {
    start: { month: 3, day: 21 },
    end: { month: 4, day: 19 }
  },
  taurus: {
    start: { month: 4, day: 20 },
    end: { month: 5, day: 20 }
  },
  gemini: {
    start: { month: 5, day: 21 },
    end: { month: 6, day: 20 }
  },
  cancer: {
    start: { month: 6, day: 21 },
    end: { month: 7, day: 22 }
  },
  leo: {
    start: { month: 7, day: 23 },
    end: { month: 8, day: 22 }
  },
  virgo: {
    start: { month: 8, day: 23 },
    end: { month: 9, day: 22 }
  },
  libra: {
    start: { month: 9, day: 23 },
    end: { month: 10, day: 22 }
  },
  scorpio: {
    start: { month: 10, day: 23 },
    end: { month: 11, day: 21 }
  },
  sagittarius: {
    start: { month: 11, day: 22 },
    end: { month: 12, day: 21 }
  },
  capricorn: {
    start: { month: 12, day: 22 },
    end: { month: 1, day: 19 }
  },
  aquarius: {
    start: { month: 1, day: 20 },
    end: { month: 2, day: 18 }
  },
  pisces: {
    start: { month: 2, day: 19 },
    end: { month: 3, day: 20 }
  }
};

/**
 * Calculate zodiac sign from birth date
 */
export function calculateZodiacSign(birthDate: Date): string {
  const month = birthDate.getMonth() + 1; // getMonth() returns 0-11
  const day = birthDate.getDate();

  for (const [sign, dates] of Object.entries(ZODIAC_DATES)) {
    const { start, end } = dates;
    
    // Handle cross-year signs (Capricorn)
    if (start.month > end.month) {
      if ((month === start.month && day >= start.day) || 
          (month === end.month && day <= end.day)) {
        return sign;
      }
    } else {
      // Normal signs within the same year
      if ((month === start.month && day >= start.day) || 
          (month === end.month && day <= end.day) ||
          (month > start.month && month < end.month)) {
        return sign;
      }
    }
  }
  
  // Fallback (shouldn't happen with correct dates)
  return 'capricorn';
}

/**
 * Calculate age from birth date
 */
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Validate birth date
 */
export function validateBirthDate(birthDate: Date): { isValid: boolean; error?: string } {
  const today = new Date();
  const age = calculateAge(birthDate);
  
  if (isNaN(birthDate.getTime())) {
    return { isValid: false, error: 'Invalid date format' };
  }
  
  if (birthDate > today) {
    return { isValid: false, error: 'Birth date cannot be in the future' };
  }
  
  if (age > 120) {
    return { isValid: false, error: 'Birth date is too far in the past' };
  }
  
  if (age < 13) {
    return { isValid: false, error: 'You must be at least 13 years old' };
  }
  
  return { isValid: true };
}

/**
 * Format zodiac sign for display
 */
export function formatZodiacSign(sign: string): string {
  const formatted = sign.charAt(0).toUpperCase() + sign.slice(1);
  const symbols: Record<string, string> = {
    aries: '♈',
    taurus: '♉',
    gemini: '♊',
    cancer: '♋',
    leo: '♌',
    virgo: '♍',
    libra: '♎',
    scorpio: '♏',
    sagittarius: '♐',
    capricorn: '♑',
    aquarius: '♒',
    pisces: '♓'
  };
  
  return `${formatted} ${symbols[sign] || ''}`;
}