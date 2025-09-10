// MBTI personality types and career matching

export interface MBTIType {
  code: string;
  name: string;
  description: string;
  cognitiveFunction: {
    dominant: string;
    auxiliary: string;
    tertiary: string;
    inferior: string;
  };
  workStyle: string[];
  idealJobEnvironment: string[];
  careerStrengths: string[];
  careerChallenges: string[];
  preferredRoles: string[];
  communicationStyle: string;
  decisionMaking: string;
  stressManagement: string;
}

export const MBTI_TYPES: Record<string, MBTIType> = {
  INTJ: {
    code: 'INTJ',
    name: 'The Architect',
    description: 'Strategic, analytical, and innovative. Natural leaders who focus on systems and long-term planning.',
    cognitiveFunction: {
      dominant: 'Introverted Intuition (Ni)',
      auxiliary: 'Extraverted Thinking (Te)',
      tertiary: 'Introverted Feeling (Fi)',
      inferior: 'Extraverted Sensing (Se)'
    },
    workStyle: ['Independent', 'Strategic', 'Long-term focused', 'Systems thinking'],
    idealJobEnvironment: ['Autonomous', 'Intellectually challenging', 'Results-oriented', 'Minimal micromanagement'],
    careerStrengths: ['Strategic planning', 'Systems design', 'Independent work', 'Complex problem solving'],
    careerChallenges: ['Team collaboration', 'Routine tasks', 'Micromanagement', 'Networking'],
    preferredRoles: ['Technology', 'Strategy', 'Research', 'Engineering', 'Data Science'],
    communicationStyle: 'Direct and concise, prefers written communication',
    decisionMaking: 'Logical and data-driven with long-term perspective',
    stressManagement: 'Needs alone time and autonomy to recharge'
  },
  INTP: {
    code: 'INTP',
    name: 'The Thinker',
    description: 'Logical, innovative, and analytical. Love theoretical concepts and abstract thinking.',
    cognitiveFunction: {
      dominant: 'Introverted Thinking (Ti)',
      auxiliary: 'Extraverted Intuition (Ne)',
      tertiary: 'Introverted Sensing (Si)',
      inferior: 'Extraverted Feeling (Fe)'
    },
    workStyle: ['Analytical', 'Flexible', 'Theory-focused', 'Independent'],
    idealJobEnvironment: ['Research-oriented', 'Flexible schedules', 'Intellectual freedom', 'Minimal bureaucracy'],
    careerStrengths: ['Research and analysis', 'Innovation', 'Problem solving', 'Technical expertise'],
    careerChallenges: ['Administrative tasks', 'Strict deadlines', 'People management', 'Detail implementation'],
    preferredRoles: ['Research', 'Technology', 'Academia', 'Data Science', 'Engineering'],
    communicationStyle: 'Logical and precise, enjoys intellectual debates',
    decisionMaking: 'Thorough analysis with focus on logical consistency',
    stressManagement: 'Needs intellectual stimulation and freedom to explore ideas'
  },
  ENTJ: {
    code: 'ENTJ',
    name: 'The Commander',
    description: 'Natural leaders who are driven, decisive, and strategic in achieving goals.',
    cognitiveFunction: {
      dominant: 'Extraverted Thinking (Te)',
      auxiliary: 'Introverted Intuition (Ni)',
      tertiary: 'Extraverted Sensing (Se)',
      inferior: 'Introverted Feeling (Fi)'
    },
    workStyle: ['Leadership-oriented', 'Goal-driven', 'Efficient', 'Strategic'],
    idealJobEnvironment: ['Leadership opportunities', 'Goal-oriented', 'Fast-paced', 'Results-focused'],
    careerStrengths: ['Leadership', 'Strategic planning', 'Goal achievement', 'Team building'],
    careerChallenges: ['Patience with details', 'Emotional considerations', 'Routine maintenance', 'Being micromanaged'],
    preferredRoles: ['Leadership', 'Business Development', 'Strategy', 'Operations', 'Consulting'],
    communicationStyle: 'Direct and assertive, focuses on results',
    decisionMaking: 'Quick and decisive with strategic focus',
    stressManagement: 'Needs challenge and authority to thrive'
  },
  ENTP: {
    code: 'ENTP',
    name: 'The Debater',
    description: 'Innovative, energetic, and enthusiastic. Love generating new ideas and possibilities.',
    cognitiveFunction: {
      dominant: 'Extraverted Intuition (Ne)',
      auxiliary: 'Introverted Thinking (Ti)',
      tertiary: 'Extraverted Feeling (Fe)',
      inferior: 'Introverted Sensing (Si)'
    },
    workStyle: ['Creative', 'Energetic', 'Adaptable', 'Idea-focused'],
    idealJobEnvironment: ['Dynamic', 'Creative freedom', 'Variety', 'Intellectual stimulation'],
    careerStrengths: ['Innovation', 'Brainstorming', 'Adaptability', 'Communication'],
    careerChallenges: ['Routine tasks', 'Detail work', 'Follow-through', 'Rigid structures'],
    preferredRoles: ['Marketing', 'Innovation', 'Business Development', 'Consulting', 'Product Management'],
    communicationStyle: 'Enthusiastic and persuasive, enjoys brainstorming',
    decisionMaking: 'Considers multiple options and possibilities',
    stressManagement: 'Needs variety and creative outlets'
  },
  INFJ: {
    code: 'INFJ',
    name: 'The Advocate',
    description: 'Empathetic, insightful, and driven by values. Focus on helping others and meaningful work.',
    cognitiveFunction: {
      dominant: 'Introverted Intuition (Ni)',
      auxiliary: 'Extraverted Feeling (Fe)',
      tertiary: 'Introverted Thinking (Ti)',
      inferior: 'Extraverted Sensing (Se)'
    },
    workStyle: ['Purpose-driven', 'Empathetic', 'Insightful', 'Perfectionist'],
    idealJobEnvironment: ['Meaningful work', 'Harmonious team', 'Autonomy', 'Growth opportunities'],
    careerStrengths: ['Empathy', 'Insight', 'Writing', 'Counseling'],
    careerChallenges: ['Conflict', 'Criticism', 'Routine tasks', 'High-pressure environments'],
    preferredRoles: ['Human Resources', 'Counseling', 'Education', 'Healthcare', 'Writing'],
    communicationStyle: 'Thoughtful and empathetic, prefers one-on-one',
    decisionMaking: 'Values-based with consideration for others',
    stressManagement: 'Needs quiet time and meaningful connections'
  },
  INFP: {
    code: 'INFP',
    name: 'The Mediator',
    description: 'Creative, idealistic, and driven by personal values. Seek harmony and authenticity.',
    cognitiveFunction: {
      dominant: 'Introverted Feeling (Fi)',
      auxiliary: 'Extraverted Intuition (Ne)',
      tertiary: 'Introverted Sensing (Si)',
      inferior: 'Extraverted Thinking (Te)'
    },
    workStyle: ['Values-driven', 'Creative', 'Flexible', 'Independent'],
    idealJobEnvironment: ['Creative freedom', 'Values alignment', 'Flexible schedule', 'Supportive team'],
    careerStrengths: ['Creativity', 'Empathy', 'Authenticity', 'Adaptability'],
    careerChallenges: ['Criticism', 'Conflict', 'Strict deadlines', 'Bureaucracy'],
    preferredRoles: ['Creative Industries', 'Writing', 'Counseling', 'Social Work', 'Design'],
    communicationStyle: 'Gentle and authentic, values harmony',
    decisionMaking: 'Values-based with personal authenticity focus',
    stressManagement: 'Needs creative expression and value alignment'
  },
  ENFJ: {
    code: 'ENFJ',
    name: 'The Protagonist',
    description: 'Charismatic, empathetic leaders who inspire and develop others.',
    cognitiveFunction: {
      dominant: 'Extraverted Feeling (Fe)',
      auxiliary: 'Introverted Intuition (Ni)',
      tertiary: 'Extraverted Sensing (Se)',
      inferior: 'Introverted Thinking (Ti)'
    },
    workStyle: ['People-focused', 'Inspirational', 'Organized', 'Collaborative'],
    idealJobEnvironment: ['Team-oriented', 'Development opportunities', 'People interaction', 'Positive culture'],
    careerStrengths: ['Leadership', 'Team development', 'Communication', 'Motivation'],
    careerChallenges: ['Criticism', 'Conflict resolution', 'Detail work', 'Saying no'],
    preferredRoles: ['Human Resources', 'Education', 'Training', 'Team Leadership', 'Counseling'],
    communicationStyle: 'Warm and encouraging, focuses on people',
    decisionMaking: 'Considers impact on people and relationships',
    stressManagement: 'Needs social connection and positive feedback'
  },
  ENFP: {
    code: 'ENFP',
    name: 'The Campaigner',
    description: 'Enthusiastic, creative, and people-focused. Love exploring possibilities and inspiring others.',
    cognitiveFunction: {
      dominant: 'Extraverted Intuition (Ne)',
      auxiliary: 'Introverted Feeling (Fi)',
      tertiary: 'Extraverted Thinking (Te)',
      inferior: 'Introverted Sensing (Si)'
    },
    workStyle: ['Enthusiastic', 'Creative', 'People-oriented', 'Flexible'],
    idealJobEnvironment: ['Creative freedom', 'People interaction', 'Variety', 'Positive atmosphere'],
    careerStrengths: ['Innovation', 'Motivation', 'Communication', 'Adaptability'],
    careerChallenges: ['Routine tasks', 'Detail work', 'Follow-through', 'Criticism'],
    preferredRoles: ['Marketing', 'Sales', 'Training', 'Creative Industries', 'Human Resources'],
    communicationStyle: 'Enthusiastic and inspiring, builds rapport easily',
    decisionMaking: 'Considers people impact and creative possibilities',
    stressManagement: 'Needs variety and social interaction'
  },
  ISTJ: {
    code: 'ISTJ',
    name: 'The Logistician',
    description: 'Practical, responsible, and detail-oriented. Value tradition and systematic approaches.',
    cognitiveFunction: {
      dominant: 'Introverted Sensing (Si)',
      auxiliary: 'Extraverted Thinking (Te)',
      tertiary: 'Introverted Feeling (Fi)',
      inferior: 'Extraverted Intuition (Ne)'
    },
    workStyle: ['Systematic', 'Reliable', 'Detail-oriented', 'Traditional'],
    idealJobEnvironment: ['Structured', 'Clear expectations', 'Stable', 'Organized'],
    careerStrengths: ['Organization', 'Reliability', 'Attention to detail', 'Planning'],
    careerChallenges: ['Rapid change', 'Ambiguity', 'Innovation pressure', 'Risk-taking'],
    preferredRoles: ['Operations', 'Finance', 'Administration', 'Legal', 'Project Management'],
    communicationStyle: 'Clear and factual, prefers structured meetings',
    decisionMaking: 'Methodical with focus on proven approaches',
    stressManagement: 'Needs structure and predictability'
  },
  ISFJ: {
    code: 'ISFJ',
    name: 'The Protector',
    description: 'Caring, reliable, and detail-oriented. Focus on supporting others and maintaining harmony.',
    cognitiveFunction: {
      dominant: 'Introverted Sensing (Si)',
      auxiliary: 'Extraverted Feeling (Fe)',
      tertiary: 'Introverted Thinking (Ti)',
      inferior: 'Extraverted Intuition (Ne)'
    },
    workStyle: ['Supportive', 'Reliable', 'Detail-oriented', 'Service-focused'],
    idealJobEnvironment: ['Supportive team', 'Clear structure', 'Service-oriented', 'Harmonious'],
    careerStrengths: ['Support', 'Reliability', 'Attention to detail', 'Empathy'],
    careerChallenges: ['Conflict', 'Criticism', 'Self-promotion', 'Change'],
    preferredRoles: ['Healthcare', 'Education', 'Human Resources', 'Customer Service', 'Administration'],
    communicationStyle: 'Gentle and supportive, avoids conflict',
    decisionMaking: 'Considers impact on others and established practices',
    stressManagement: 'Needs appreciation and stable environment'
  },
  ESTJ: {
    code: 'ESTJ',
    name: 'The Executive',
    description: 'Organized, practical leaders who focus on efficiency and results.',
    cognitiveFunction: {
      dominant: 'Extraverted Thinking (Te)',
      auxiliary: 'Introverted Sensing (Si)',
      tertiary: 'Extraverted Intuition (Ne)',
      inferior: 'Introverted Feeling (Fi)'
    },
    workStyle: ['Leadership-oriented', 'Organized', 'Results-focused', 'Traditional'],
    idealJobEnvironment: ['Structured', 'Leadership opportunities', 'Clear goals', 'Efficient processes'],
    careerStrengths: ['Leadership', 'Organization', 'Efficiency', 'Goal achievement'],
    careerChallenges: ['Flexibility', 'Innovation', 'Emotional considerations', 'Ambiguity'],
    preferredRoles: ['Management', 'Operations', 'Sales', 'Business Development', 'Finance'],
    communicationStyle: 'Direct and authoritative, focuses on results',
    decisionMaking: 'Quick and decisive with practical focus',
    stressManagement: 'Needs clear authority and achievable goals'
  },
  ESFJ: {
    code: 'ESFJ',
    name: 'The Consul',
    description: 'Caring, organized, and people-focused. Excel at supporting others and building relationships.',
    cognitiveFunction: {
      dominant: 'Extraverted Feeling (Fe)',
      auxiliary: 'Introverted Sensing (Si)',
      tertiary: 'Extraverted Intuition (Ne)',
      inferior: 'Introverted Thinking (Ti)'
    },
    workStyle: ['People-focused', 'Organized', 'Supportive', 'Traditional'],
    idealJobEnvironment: ['Team-oriented', 'People interaction', 'Structured', 'Positive culture'],
    careerStrengths: ['People skills', 'Organization', 'Support', 'Team building'],
    careerChallenges: ['Criticism', 'Conflict', 'Technical details', 'Impersonal decisions'],
    preferredRoles: ['Human Resources', 'Customer Service', 'Healthcare', 'Education', 'Event Planning'],
    communicationStyle: 'Warm and personal, builds relationships',
    decisionMaking: 'Considers people impact and group harmony',
    stressManagement: 'Needs social support and positive feedback'
  },
  ISTP: {
    code: 'ISTP',
    name: 'The Virtuoso',
    description: 'Practical, hands-on problem solvers who value efficiency and independence.',
    cognitiveFunction: {
      dominant: 'Introverted Thinking (Ti)',
      auxiliary: 'Extraverted Sensing (Se)',
      tertiary: 'Introverted Intuition (Ni)',
      inferior: 'Extraverted Feeling (Fe)'
    },
    workStyle: ['Hands-on', 'Independent', 'Practical', 'Flexible'],
    idealJobEnvironment: ['Independent work', 'Practical tasks', 'Flexible schedule', 'Minimal meetings'],
    careerStrengths: ['Problem solving', 'Technical skills', 'Adaptability', 'Crisis management'],
    careerChallenges: ['Long-term planning', 'Team meetings', 'Emotional expression', 'Routine'],
    preferredRoles: ['Engineering', 'Technology', 'Trades', 'Operations', 'Troubleshooting'],
    communicationStyle: 'Direct and practical, prefers action over discussion',
    decisionMaking: 'Logical and practical with immediate focus',
    stressManagement: 'Needs hands-on work and independence'
  },
  ISFP: {
    code: 'ISFP',
    name: 'The Adventurer',
    description: 'Gentle, creative, and values-driven. Seek harmony and authentic expression.',
    cognitiveFunction: {
      dominant: 'Introverted Feeling (Fi)',
      auxiliary: 'Extraverted Sensing (Se)',
      tertiary: 'Introverted Intuition (Ni)',
      inferior: 'Extraverted Thinking (Te)'
    },
    workStyle: ['Creative', 'Flexible', 'Values-driven', 'Independent'],
    idealJobEnvironment: ['Creative freedom', 'Values alignment', 'Flexible', 'Low conflict'],
    careerStrengths: ['Creativity', 'Empathy', 'Adaptability', 'Aesthetics'],
    careerChallenges: ['Criticism', 'Conflict', 'Pressure', 'Structure'],
    preferredRoles: ['Design', 'Arts', 'Healthcare', 'Counseling', 'Social Work'],
    communicationStyle: 'Gentle and authentic, avoids confrontation',
    decisionMaking: 'Values-based with personal impact consideration',
    stressManagement: 'Needs creative expression and harmony'
  },
  ESTP: {
    code: 'ESTP',
    name: 'The Entrepreneur',
    description: 'Energetic, pragmatic, and adaptable. Excel in dynamic environments and real-time problem solving.',
    cognitiveFunction: {
      dominant: 'Extraverted Sensing (Se)',
      auxiliary: 'Introverted Thinking (Ti)',
      tertiary: 'Extraverted Feeling (Fe)',
      inferior: 'Introverted Intuition (Ni)'
    },
    workStyle: ['Energetic', 'Practical', 'Adaptable', 'Action-oriented'],
    idealJobEnvironment: ['Dynamic', 'People interaction', 'Variety', 'Fast-paced'],
    careerStrengths: ['Adaptability', 'Crisis management', 'People skills', 'Practical solutions'],
    careerChallenges: ['Long-term planning', 'Detailed analysis', 'Routine', 'Abstract concepts'],
    preferredRoles: ['Sales', 'Business Development', 'Operations', 'Customer Service', 'Emergency Services'],
    communicationStyle: 'Energetic and persuasive, focuses on immediate needs',
    decisionMaking: 'Quick and practical with immediate focus',
    stressManagement: 'Needs action and variety'
  },
  ESFP: {
    code: 'ESFP',
    name: 'The Entertainer',
    description: 'Enthusiastic, creative, and people-focused. Bring energy and positivity to everything they do.',
    cognitiveFunction: {
      dominant: 'Extraverted Sensing (Se)',
      auxiliary: 'Introverted Feeling (Fi)',
      tertiary: 'Extraverted Thinking (Te)',
      inferior: 'Introverted Intuition (Ni)'
    },
    workStyle: ['Enthusiastic', 'People-oriented', 'Creative', 'Flexible'],
    idealJobEnvironment: ['People interaction', 'Positive atmosphere', 'Creative freedom', 'Variety'],
    careerStrengths: ['Enthusiasm', 'People skills', 'Creativity', 'Adaptability'],
    careerChallenges: ['Criticism', 'Conflict', 'Long-term planning', 'Detail work'],
    preferredRoles: ['Entertainment', 'Sales', 'Marketing', 'Customer Service', 'Event Planning'],
    communicationStyle: 'Warm and enthusiastic, focuses on people and experiences',
    decisionMaking: 'People-focused with emphasis on immediate impact',
    stressManagement: 'Needs social interaction and positive environment'
  }
};

// MBTI to job category matching weights
export const MBTI_JOB_WEIGHTS: Record<string, Record<string, number>> = {
  INTJ: {
    'Technology': 90,
    'Data Science': 85,
    'Engineering': 85,
    'Consulting': 75,
    'Finance': 70,
    'Product Management': 80,
    'Research': 85
  },
  INTP: {
    'Technology': 85,
    'Data Science': 90,
    'Research': 90,
    'Engineering': 80,
    'Academia': 85,
    'Product Management': 70
  },
  ENTJ: {
    'Business Development': 90,
    'Consulting': 85,
    'Operations': 85,
    'Finance': 80,
    'Product Management': 85,
    'Sales': 75
  },
  ENTP: {
    'Marketing': 90,
    'Business Development': 85,
    'Product Management': 85,
    'Consulting': 80,
    'Sales': 80,
    'Technology': 75
  },
  INFJ: {
    'Human Resources': 85,
    'Education': 85,
    'Healthcare': 80,
    'Counseling': 90,
    'Writing': 80
  },
  INFP: {
    'Design': 85,
    'Writing': 90,
    'Counseling': 85,
    'Arts': 90,
    'Social Work': 80,
    'Marketing': 70
  },
  ENFJ: {
    'Human Resources': 90,
    'Education': 90,
    'Training': 85,
    'Counseling': 85,
    'Healthcare': 75
  },
  ENFP: {
    'Marketing': 85,
    'Sales': 85,
    'Human Resources': 80,
    'Training': 80,
    'Design': 75,
    'Business Development': 75
  },
  ISTJ: {
    'Finance': 90,
    'Operations': 85,
    'Administrative': 90,
    'Legal': 85,
    'Engineering': 75
  },
  ISFJ: {
    'Healthcare': 85,
    'Education': 80,
    'Human Resources': 85,
    'Customer Service': 85,
    'Administrative': 80
  },
  ESTJ: {
    'Operations': 90,
    'Sales': 85,
    'Finance': 80,
    'Business Development': 80,
    'Administrative': 75
  },
  ESFJ: {
    'Human Resources': 90,
    'Customer Service': 85,
    'Healthcare': 80,
    'Education': 80,
    'Event Planning': 85
  },
  ISTP: {
    'Engineering': 90,
    'Technology': 85,
    'Operations': 80,
    'Trades': 90
  },
  ISFP: {
    'Design': 90,
    'Arts': 85,
    'Healthcare': 75,
    'Counseling': 80,
    'Social Work': 75
  },
  ESTP: {
    'Sales': 90,
    'Business Development': 85,
    'Operations': 80,
    'Customer Service': 80,
    'Emergency Services': 85
  },
  ESFP: {
    'Entertainment': 90,
    'Sales': 85,
    'Marketing': 80,
    'Customer Service': 85,
    'Event Planning': 85
  }
};

export function getMBTIJobMatch(mbtiType: string, jobCategory: string): number {
  const weights = MBTI_JOB_WEIGHTS[mbtiType];
  if (!weights) return 50; // Default neutral score
  
  return weights[jobCategory] || 50; // Default neutral score if category not found
}

export function getMBTICareerAdvice(mbtiType: string): string[] {
  const type = MBTI_TYPES[mbtiType];
  if (!type) return ['Focus on your strengths and interests'];
  
  return [
    `Leverage your ${type.careerStrengths[0].toLowerCase()} skills`,
    `Seek roles that offer ${type.idealJobEnvironment[0].toLowerCase()}`,
    `Be aware of challenges with ${type.careerChallenges[0].toLowerCase()}`,
    `Consider positions in ${type.preferredRoles.slice(0, 2).join(' or ')}`
  ];
}