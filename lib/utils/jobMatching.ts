import type { Job, JobMatch } from '../data/jobs';
import { getMBTIJobMatch } from '../data/mbti';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  zodiacSign?: string;
  mbtiType?: string;
  
  // Professional Information
  currentTitle?: string;
  experienceLevel?: 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'executive';
  preferredJobTypes?: ('full-time' | 'part-time' | 'contract' | 'freelance' | 'internship')[];
  preferredWorkModel?: ('onsite' | 'remote' | 'hybrid')[];
  preferredLocations?: string[];
  salaryExpectation?: {
    min: number;
    max: number;
    currency: string;
  };
  
  // Skills and Interests
  skills?: string[];
  interests?: string[];
  preferredCategories?: string[];
  preferredCompanySizes?: ('startup' | 'small' | 'medium' | 'large' | 'enterprise')[];
  
  // Preferences
  willingToRelocate?: boolean;
  preferRemote?: boolean;
  prioritizeSalary?: boolean;
  prioritizeGrowth?: boolean;
  prioritizeWorkLifeBalance?: boolean;
}

export class JobMatchingEngine {
  static calculateJobMatch(job: Job, userProfile: UserProfile): JobMatch {
    let score = 0;
    const matchReasons: string[] = [];
    const missingSkills: string[] = [];
    const strengths: string[] = [];
    const maxScore = 100;

    // Experience Level Match (20 points)
    if (userProfile.experienceLevel) {
      const experienceScore = this.calculateExperienceMatch(job.experience, userProfile.experienceLevel);
      score += experienceScore;
      if (experienceScore > 15) {
        matchReasons.push(`Experience level match (${job.experience})`);
        strengths.push('Experience level alignment');
      } else if (experienceScore < 10) {
        missingSkills.push(`May need ${job.experience} level experience`);
      }
    }

    // Job Type Match (15 points)
    if (userProfile.preferredJobTypes?.includes(job.jobType)) {
      score += 15;
      matchReasons.push(`Preferred job type (${job.jobType})`);
      strengths.push('Job type preference match');
    }

    // Work Model Match (15 points)
    if (userProfile.preferredWorkModel?.includes(job.workModel)) {
      score += 15;
      matchReasons.push(`Preferred work model (${job.workModel})`);
      strengths.push('Work arrangement preference');
    }

    // Location Match (10 points)
    if (this.isLocationMatch(job, userProfile)) {
      score += 10;
      matchReasons.push('Location preference match');
      strengths.push('Geographic compatibility');
    }

    // Salary Match (15 points)
    if (userProfile.salaryExpectation) {
      const salaryScore = this.calculateSalaryMatch(job.salary, userProfile.salaryExpectation);
      score += salaryScore;
      if (salaryScore > 10) {
        matchReasons.push('Salary meets expectations');
        strengths.push('Compensation alignment');
      } else if (salaryScore < 5) {
        missingSkills.push('Salary may be below expectations');
      }
    }

    // Skills Match (15 points)
    if (userProfile.skills && userProfile.skills.length > 0) {
      const skillsScore = this.calculateSkillsMatch(job.tags, job.requirements, userProfile.skills);
      score += skillsScore.score;
      matchReasons.push(...skillsScore.matches);
      missingSkills.push(...skillsScore.missing);
      strengths.push(...skillsScore.strengths);
    }

    // Category Interest Match (10 points)
    if (userProfile.preferredCategories?.includes(job.category)) {
      score += 10;
      matchReasons.push(`Interest in ${job.category}`);
      strengths.push('Industry interest alignment');
    }

    // Company Size Preference (5 points)
    if (userProfile.preferredCompanySizes?.includes(job.companySize)) {
      score += 5;
      matchReasons.push(`Preferred company size (${job.companySize})`);
    }

    // Bonus factors
    if (job.featured) {
      score += 2;
    }
    
    if (job.isUrgent && userProfile.experienceLevel && 
        ['mid', 'senior', 'lead', 'executive'].includes(userProfile.experienceLevel)) {
      score += 3;
      matchReasons.push('Urgent hiring - quick opportunity');
    }

    // MBTI personality matching (10 points)
    if (userProfile.mbtiType) {
      const mbtiScore = this.calculateMBTIMatch(job, userProfile.mbtiType);
      score += mbtiScore.score;
      if (mbtiScore.reason) {
        matchReasons.push(mbtiScore.reason);
        if (mbtiScore.score > 5) {
          strengths.push('MBTI personality alignment');
        }
      }
    }

    // Astrological bonus (fun factor!)
    if (userProfile.zodiacSign) {
      const astroBonus = this.calculateAstrologicalMatch(job, userProfile.zodiacSign);
      score += astroBonus.score;
      if (astroBonus.reason) {
        matchReasons.push(astroBonus.reason);
      }
    }

    // Normalize score to 0-100
    const normalizedScore = Math.min(Math.round(score), 100);

    return {
      job,
      matchScore: normalizedScore,
      matchReasons,
      missingSkills: [...new Set(missingSkills)], // Remove duplicates
      strengths: [...new Set(strengths)]
    };
  }

  private static calculateExperienceMatch(jobLevel: string, userLevel: string): number {
    const levels = ['entry', 'junior', 'mid', 'senior', 'lead', 'executive'];
    const jobIndex = levels.indexOf(jobLevel);
    const userIndex = levels.indexOf(userLevel);

    if (jobIndex === -1 || userIndex === -1) return 10; // Default moderate score

    const difference = Math.abs(jobIndex - userIndex);
    
    if (difference === 0) return 20; // Perfect match
    if (difference === 1) return 15; // Close match
    if (difference === 2) return 10; // Moderate match
    return 5; // Poor match
  }

  private static isLocationMatch(job: Job, profile: UserProfile): boolean {
    // Remote work preferences
    if (profile.preferRemote && job.workModel === 'remote') return true;
    if (job.location.remote && profile.preferredWorkModel?.includes('remote')) return true;

    // Location preferences
    if (profile.preferredLocations) {
      const jobLocation = `${job.location.city}, ${job.location.state}`;
      return profile.preferredLocations.some(prefLocation =>
        jobLocation.toLowerCase().includes(prefLocation.toLowerCase()) ||
        job.location.city.toLowerCase().includes(prefLocation.toLowerCase()) ||
        job.location.state.toLowerCase().includes(prefLocation.toLowerCase())
      );
    }

    return false;
  }

  private static calculateSalaryMatch(
    jobSalary: Job['salary'], 
    userExpectation: { min: number; max: number; currency: string }
  ): number {
    if (jobSalary.currency !== userExpectation.currency) return 5; // Different currency

    const jobMin = jobSalary.min;
    const jobMax = jobSalary.max;
    const userMin = userExpectation.min;
    const userMax = userExpectation.max;

    // Check if ranges overlap
    if (jobMax >= userMin && jobMin <= userMax) {
      // Calculate overlap percentage
      const overlapStart = Math.max(jobMin, userMin);
      const overlapEnd = Math.min(jobMax, userMax);
      const overlapSize = overlapEnd - overlapStart;
      const userRangeSize = userMax - userMin;
      
      const overlapPercentage = overlapSize / userRangeSize;
      return Math.round(15 * overlapPercentage);
    }

    // No overlap - check how close they are
    if (jobMax < userMin) {
      const gap = userMin - jobMax;
      const userRangeSize = userMax - userMin;
      if (gap <= userRangeSize * 0.2) return 8; // Within 20% of expectations
      if (gap <= userRangeSize * 0.5) return 5; // Within 50% of expectations
      return 2; // Far below expectations
    }

    if (jobMin > userMax) {
      return 10; // Above expectations (generally good)
    }

    return 7; // Default moderate score
  }

  private static calculateSkillsMatch(
    jobTags: string[], 
    jobRequirements: string[], 
    userSkills: string[]
  ) {
    const matches: string[] = [];
    const missing: string[] = [];
    const strengths: string[] = [];
    
    // Normalize skills for comparison
    const normalizedUserSkills = userSkills.map(skill => skill.toLowerCase());
    const normalizedJobTags = jobTags.map(tag => tag.toLowerCase());
    
    // Check tag matches
    let matchCount = 0;
    normalizedJobTags.forEach(tag => {
      const matchingSkill = normalizedUserSkills.find(skill => 
        skill.includes(tag) || tag.includes(skill)
      );
      if (matchingSkill) {
        matchCount++;
        matches.push(`Skill match: ${tag}`);
        strengths.push(tag);
      }
    });

    // Check for missing critical skills in requirements
    jobRequirements.forEach(req => {
      const reqLower = req.toLowerCase();
      const hasSkill = normalizedUserSkills.some(skill => 
        reqLower.includes(skill) || skill.includes(reqLower.split(' ')[0])
      );
      
      if (!hasSkill && (reqLower.includes('required') || reqLower.includes('must'))) {
        missing.push(req);
      }
    });

    // Calculate score based on match percentage
    const matchPercentage = normalizedJobTags.length > 0 ? matchCount / normalizedJobTags.length : 0;
    const score = Math.round(15 * matchPercentage);

    return { score, matches, missing, strengths };
  }

  private static calculateMBTIMatch(job: Job, mbtiType: string): { score: number; reason?: string } {
    // Get MBTI job matching score (0-100)
    const mbtiJobScore = getMBTIJobMatch(mbtiType, job.category);
    
    // Convert to our scoring system (0-10 points)
    let score = 0;
    let reason = '';
    
    if (mbtiJobScore >= 85) {
      score = 10;
      reason = `Excellent MBTI match: ${mbtiType} personalities thrive in ${job.category}`;
    } else if (mbtiJobScore >= 70) {
      score = 7;
      reason = `Good MBTI alignment: ${mbtiType} traits suit ${job.category} roles`;
    } else if (mbtiJobScore >= 55) {
      score = 4;
      reason = `Moderate MBTI fit for ${job.category} position`;
    } else {
      score = 0; // Below 55 gets no bonus
    }
    
    return { score, reason: reason || undefined };
  }

  private static calculateAstrologicalMatch(job: Job, zodiacSign: string): { score: number; reason?: string } {
    // Fun astrological matching based on job categories and zodiac traits
    const astroMatches: Record<string, string[]> = {
      'aries': ['Sales', 'Marketing', 'Business Development'], // Leadership, competitive
      'taurus': ['Finance', 'Operations', 'Administrative'], // Reliable, practical
      'gemini': ['Marketing', 'Technology', 'Customer Service'], // Communication, adaptability
      'cancer': ['Human Resources', 'Healthcare', 'Education'], // Nurturing, empathetic
      'leo': ['Design', 'Marketing', 'Product Management'], // Creative, leadership
      'virgo': ['Technology', 'Data Science', 'Operations'], // Detail-oriented, analytical
      'libra': ['Legal', 'Human Resources', 'Design'], // Balance, harmony
      'scorpio': ['Data Science', 'Research', 'Consulting'], // Intense, investigative
      'sagittarius': ['Consulting', 'Education', 'Business Development'], // Adventure, growth
      'capricorn': ['Finance', 'Operations', 'Engineering'], // Ambitious, structured
      'aquarius': ['Technology', 'Research', 'Product Management'], // Innovation, independence
      'pisces': ['Design', 'Healthcare', 'Education'] // Creative, compassionate
    };

    const preferredCategories = astroMatches[zodiacSign.toLowerCase()] || [];
    
    if (preferredCategories.includes(job.category)) {
      return {
        score: 2,
        reason: `Astrological alignment: ${zodiacSign} traits suit ${job.category} roles ✨`
      };
    }

    return { score: 0 };
  }

  static rankJobsByMatch(jobs: Job[], userProfile: UserProfile): JobMatch[] {
    return jobs
      .map(job => this.calculateJobMatch(job, userProfile))
      .sort((a, b) => b.matchScore - a.matchScore);
  }

  static getTopMatches(jobs: Job[], userProfile: UserProfile, limit: number = 10): JobMatch[] {
    return this.rankJobsByMatch(jobs, userProfile).slice(0, limit);
  }

  static getMatchingJobs(jobs: Job[], userProfile: UserProfile, minScore: number = 60): JobMatch[] {
    return this.rankJobsByMatch(jobs, userProfile)
      .filter(match => match.matchScore >= minScore);
  }
}