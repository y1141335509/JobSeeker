// LinkedIn OAuth integration service
// Note: This is a mock implementation for development purposes
// In production, you would need to implement proper OAuth flow with LinkedIn API

export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  location: {
    name: string;
    country: string;
  };
  industry: string;
  profilePicture?: string;
  positions: LinkedInPosition[];
  educations: LinkedInEducation[];
  skills: LinkedInSkill[];
}

export interface LinkedInPosition {
  id: string;
  title: string;
  companyName: string;
  description?: string;
  startDate: {
    month: number;
    year: number;
  };
  endDate?: {
    month: number;
    year: number;
  };
  location?: string;
  isCurrent: boolean;
}

export interface LinkedInEducation {
  id: string;
  schoolName: string;
  degreeName?: string;
  fieldOfStudy?: string;
  startDate: {
    year: number;
  };
  endDate?: {
    year: number;
  };
}

export interface LinkedInSkill {
  name: string;
  endorsementCount: number;
}

export interface LinkedInConnectionResult {
  success: boolean;
  profile?: LinkedInProfile;
  error?: string;
}

export class LinkedInService {
  private static readonly CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || 'demo-client-id';
  private static readonly REDIRECT_URI = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI || 'http://localhost:3000/auth/linkedin/callback';
  private static readonly SCOPES = ['r_liteprofile', 'r_emailaddress'];

  /**
   * Generate LinkedIn OAuth URL for user authentication
   */
  static getAuthUrl(): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.CLIENT_ID,
      redirect_uri: this.REDIRECT_URI,
      scope: this.SCOPES.join(' '),
      state: this.generateState(), // CSRF protection
    });

    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  static async exchangeCodeForToken(code: string, state: string): Promise<string> {
    // Validate state parameter for CSRF protection
    if (!this.validateState(state)) {
      throw new Error('Invalid state parameter');
    }

    // In a real implementation, this would make an API call to LinkedIn
    // For demo purposes, we'll simulate the token exchange
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return `mock-access-token-${Date.now()}`;
  }

  /**
   * Fetch user profile from LinkedIn API
   */
  static async fetchProfile(accessToken: string): Promise<LinkedInProfile> {
    // In a real implementation, this would make API calls to:
    // - https://api.linkedin.com/v2/me
    // - https://api.linkedin.com/v2/positions
    // - https://api.linkedin.com/v2/educations
    // etc.

    // For demo purposes, we'll return mock data
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      id: 'linkedin-user-123',
      firstName: 'John',
      lastName: 'Doe',
      headline: 'Software Engineer at TechCorp',
      summary: 'Passionate software engineer with 5+ years of experience in full-stack development. Specialized in React, Node.js, and cloud technologies.',
      location: {
        name: 'San Francisco Bay Area',
        country: 'United States'
      },
      industry: 'Computer Software',
      profilePicture: 'https://via.placeholder.com/150',
      positions: [
        {
          id: 'pos-1',
          title: 'Senior Software Engineer',
          companyName: 'TechCorp Inc.',
          description: 'Led development of cloud-native applications using React and Node.js. Mentored junior developers and improved team productivity by 30%.',
          startDate: { month: 3, year: 2022 },
          location: 'San Francisco, CA',
          isCurrent: true
        },
        {
          id: 'pos-2',
          title: 'Software Engineer',
          companyName: 'StartupXYZ',
          description: 'Developed and maintained web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality products.',
          startDate: { month: 6, year: 2020 },
          endDate: { month: 2, year: 2022 },
          location: 'Mountain View, CA',
          isCurrent: false
        }
      ],
      educations: [
        {
          id: 'edu-1',
          schoolName: 'University of California, Berkeley',
          degreeName: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          startDate: { year: 2016 },
          endDate: { year: 2020 }
        }
      ],
      skills: [
        { name: 'JavaScript', endorsementCount: 45 },
        { name: 'React', endorsementCount: 38 },
        { name: 'Node.js', endorsementCount: 32 },
        { name: 'Python', endorsementCount: 28 },
        { name: 'AWS', endorsementCount: 25 },
        { name: 'TypeScript', endorsementCount: 22 }
      ]
    };
  }

  /**
   * Connect LinkedIn account and import profile data
   */
  static async connectAccount(): Promise<LinkedInConnectionResult> {
    try {
      // In a real implementation, this would redirect to LinkedIn OAuth
      // For demo purposes, we'll simulate the connection process
      const authUrl = this.getAuthUrl();
      
      // Simulate user going through OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock authorization code
      const mockCode = 'mock-auth-code-' + Date.now();
      const mockState = 'mock-state';
      
      // Exchange code for token
      const accessToken = await this.exchangeCodeForToken(mockCode, mockState);
      
      // Fetch profile data
      const profile = await this.fetchProfile(accessToken);
      
      // Store access token securely (in production, this should be encrypted)
      localStorage.setItem('linkedin-access-token', accessToken);
      
      return {
        success: true,
        profile
      };
      
    } catch (error) {
      console.error('LinkedIn connection error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Disconnect LinkedIn account
   */
  static disconnectAccount(): void {
    localStorage.removeItem('linkedin-access-token');
    localStorage.removeItem('linkedin-profile');
  }

  /**
   * Check if LinkedIn account is connected
   */
  static isConnected(): boolean {
    return !!localStorage.getItem('linkedin-access-token');
  }

  /**
   * Get stored LinkedIn profile
   */
  static getStoredProfile(): LinkedInProfile | null {
    const stored = localStorage.getItem('linkedin-profile');
    return stored ? JSON.parse(stored) : null;
  }

  /**
   * Store LinkedIn profile data
   */
  static storeProfile(profile: LinkedInProfile): void {
    localStorage.setItem('linkedin-profile', JSON.stringify(profile));
  }

  /**
   * Convert LinkedIn profile to our user profile format
   */
  static convertToUserProfile(linkedinProfile: LinkedInProfile) {
    const currentPosition = linkedinProfile.positions.find(pos => pos.isCurrent);
    
    return {
      name: `${linkedinProfile.firstName} ${linkedinProfile.lastName}`,
      currentTitle: currentPosition?.title || linkedinProfile.headline,
      location: linkedinProfile.location.name,
      bio: linkedinProfile.summary,
      skills: linkedinProfile.skills.map(skill => skill.name),
      linkedin: `https://linkedin.com/in/${linkedinProfile.id}`,
      workExperience: linkedinProfile.positions.map(pos => ({
        title: pos.title,
        company: pos.companyName,
        description: pos.description,
        startDate: `${pos.startDate.year}-${pos.startDate.month.toString().padStart(2, '0')}-01`,
        endDate: pos.endDate ? `${pos.endDate.year}-${pos.endDate.month.toString().padStart(2, '0')}-01` : null,
        isCurrent: pos.isCurrent,
        location: pos.location
      })),
      education: linkedinProfile.educations.map(edu => ({
        school: edu.schoolName,
        degree: edu.degreeName,
        fieldOfStudy: edu.fieldOfStudy,
        startYear: edu.startDate.year,
        endYear: edu.endDate?.year
      }))
    };
  }

  /**
   * Generate state parameter for CSRF protection
   */
  private static generateState(): string {
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('linkedin-oauth-state', state);
    return state;
  }

  /**
   * Validate state parameter
   */
  private static validateState(state: string): boolean {
    const stored = localStorage.getItem('linkedin-oauth-state');
    localStorage.removeItem('linkedin-oauth-state');
    return stored === state;
  }

  /**
   * Sync LinkedIn data with user profile
   */
  static async syncWithProfile(updateProfileCallback: (updates: any) => void): Promise<void> {
    const profile = this.getStoredProfile();
    if (!profile) {
      throw new Error('No LinkedIn profile found');
    }

    const userUpdates = this.convertToUserProfile(profile);
    updateProfileCallback(userUpdates);
  }
}