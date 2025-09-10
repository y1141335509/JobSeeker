// Job search data models and mock database

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: {
    city: string;
    state: string;
    country: string;
    remote: boolean;
    hybrid: boolean;
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
  };
  jobType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  experience: 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'executive';
  department: string;
  category: string;
  tags: string[];
  benefits: string[];
  postedDate: string;
  applicationDeadline?: string;
  companySize: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  industry: string;
  workModel: 'onsite' | 'remote' | 'hybrid';
  applicationCount: number;
  isUrgent: boolean;
  featured: boolean;
  companyRating?: number;
  companyDescription: string;
  contactEmail?: string;
  applicationUrl?: string;
}

export interface JobSearchFilters {
  query?: string;
  location?: string;
  jobType?: Job['jobType'][];
  experience?: Job['experience'][];
  workModel?: Job['workModel'][];
  salaryMin?: number;
  salaryMax?: number;
  category?: string[];
  company?: string[];
  datePosted?: 'today' | 'week' | 'month' | 'all';
  companySize?: Job['companySize'][];
  featured?: boolean;
  urgent?: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: 'applied' | 'reviewing' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
  appliedDate: string;
  lastUpdated: string;
  coverLetter?: string;
  resumeVersion?: string;
  notes?: string;
  interviewDates?: string[];
  feedback?: string;
  salaryExpectation?: number;
}

export interface JobMatch {
  job: Job;
  matchScore: number;
  matchReasons: string[];
  missingSkills: string[];
  strengths: string[];
}

// Mock job categories and data
export const JOB_CATEGORIES = [
  'Technology',
  'Marketing',
  'Sales',
  'Design',
  'Finance',
  'Human Resources',
  'Operations',
  'Customer Service',
  'Engineering',
  'Data Science',
  'Product Management',
  'Legal',
  'Healthcare',
  'Education',
  'Consulting',
  'Research',
  'Administrative',
  'Business Development'
];

export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level (0-1 years)' },
  { value: 'junior', label: 'Junior (1-3 years)' },
  { value: 'mid', label: 'Mid Level (3-5 years)' },
  { value: 'senior', label: 'Senior (5-8 years)' },
  { value: 'lead', label: 'Lead (8+ years)' },
  { value: 'executive', label: 'Executive (10+ years)' }
];

export const JOB_TYPES = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'internship', label: 'Internship' }
];

export const WORK_MODELS = [
  { value: 'onsite', label: 'On-site' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' }
];

export const COMPANY_SIZES = [
  { value: 'startup', label: 'Startup (1-10)' },
  { value: 'small', label: 'Small (11-50)' },
  { value: 'medium', label: 'Medium (51-200)' },
  { value: 'large', label: 'Large (201-1000)' },
  { value: 'enterprise', label: 'Enterprise (1000+)' }
];

// Mock job database
export const MOCK_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      remote: true,
      hybrid: true
    },
    description: 'We are looking for a passionate Senior Frontend Developer to join our growing team. You will be responsible for building beautiful, responsive user interfaces using modern technologies like React, TypeScript, and Next.js.',
    requirements: [
      '5+ years of experience in frontend development',
      'Expert knowledge of React and TypeScript',
      'Experience with Next.js and server-side rendering',
      'Strong understanding of modern CSS and responsive design',
      'Experience with state management (Redux, Zustand, etc.)',
      'Familiarity with testing frameworks (Jest, React Testing Library)',
      'Experience with Git and modern development workflows'
    ],
    responsibilities: [
      'Develop and maintain frontend applications using React and TypeScript',
      'Collaborate with designers to implement pixel-perfect UI/UX',
      'Optimize application performance and ensure cross-browser compatibility',
      'Write clean, maintainable, and well-documented code',
      'Mentor junior developers and contribute to code reviews',
      'Participate in agile development processes and sprint planning'
    ],
    salary: {
      min: 120000,
      max: 180000,
      currency: 'USD',
      period: 'yearly'
    },
    jobType: 'full-time',
    experience: 'senior',
    department: 'Engineering',
    category: 'Technology',
    tags: ['React', 'TypeScript', 'Next.js', 'Frontend', 'JavaScript', 'CSS'],
    benefits: ['Health Insurance', 'Dental Insurance', '401k', 'Remote Work', 'Flexible Hours', 'Stock Options'],
    postedDate: '2025-09-08',
    companySize: 'medium',
    industry: 'Software',
    workModel: 'hybrid',
    applicationCount: 47,
    isUrgent: false,
    featured: true,
    companyRating: 4.5,
    companyDescription: 'TechCorp Solutions is a leading technology company focused on building innovative software solutions for modern businesses.',
    applicationUrl: 'https://example.com/apply'
  },
  {
    id: 'job-2',
    title: 'Product Manager',
    company: 'InnovateLabs',
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA',
      remote: false,
      hybrid: true
    },
    description: 'Join our dynamic product team as a Product Manager and help shape the future of our SaaS platform. You will work closely with engineering, design, and business stakeholders to define and execute product strategy.',
    requirements: [
      '3-5 years of product management experience',
      'Experience with SaaS products and B2B markets',
      'Strong analytical and problem-solving skills',
      'Excellent communication and presentation skills',
      'Experience with agile development methodologies',
      'Data-driven approach to decision making',
      'Bachelor\'s degree in Business, Engineering, or related field'
    ],
    responsibilities: [
      'Define product roadmap and prioritize features based on business impact',
      'Work with engineering teams to deliver high-quality products on time',
      'Conduct market research and competitive analysis',
      'Gather and analyze user feedback to inform product decisions',
      'Create detailed product requirements and user stories',
      'Present product updates to stakeholders and leadership team'
    ],
    salary: {
      min: 110000,
      max: 160000,
      currency: 'USD',
      period: 'yearly'
    },
    jobType: 'full-time',
    experience: 'mid',
    department: 'Product',
    category: 'Product Management',
    tags: ['Product Management', 'SaaS', 'Analytics', 'Strategy', 'Agile'],
    benefits: ['Health Insurance', 'Dental Insurance', 'Vision Insurance', '401k', 'PTO', 'Learning Budget'],
    postedDate: '2025-09-07',
    companySize: 'large',
    industry: 'Software',
    workModel: 'hybrid',
    applicationCount: 92,
    isUrgent: true,
    featured: false,
    companyRating: 4.2,
    companyDescription: 'InnovateLabs is a fast-growing SaaS company that helps businesses optimize their operations through intelligent automation.',
    contactEmail: 'careers@innovatelabs.com'
  },
  {
    id: 'job-3',
    title: 'UX/UI Designer',
    company: 'Creative Studio Pro',
    location: {
      city: 'Austin',
      state: 'TX',
      country: 'USA',
      remote: true,
      hybrid: false
    },
    description: 'We are seeking a talented UX/UI Designer to create intuitive and engaging user experiences for our diverse client portfolio. This is a fully remote position with flexible working hours.',
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in Figma, Adobe Creative Suite, and prototyping tools',
      'Strong portfolio demonstrating user-centered design process',
      'Experience with user research and usability testing',
      'Knowledge of HTML/CSS basics',
      'Excellent visual design skills and attention to detail',
      'Strong communication and collaboration skills'
    ],
    responsibilities: [
      'Design user interfaces for web and mobile applications',
      'Conduct user research and create user personas',
      'Develop wireframes, prototypes, and high-fidelity designs',
      'Collaborate with developers to ensure design implementation',
      'Create and maintain design systems and style guides',
      'Present design concepts to clients and stakeholders'
    ],
    salary: {
      min: 75000,
      max: 120000,
      currency: 'USD',
      period: 'yearly'
    },
    jobType: 'full-time',
    experience: 'mid',
    department: 'Design',
    category: 'Design',
    tags: ['UX Design', 'UI Design', 'Figma', 'Prototyping', 'User Research'],
    benefits: ['Health Insurance', '100% Remote', 'Flexible Hours', 'Equipment Allowance', 'Professional Development'],
    postedDate: '2025-09-06',
    companySize: 'small',
    industry: 'Design Agency',
    workModel: 'remote',
    applicationCount: 156,
    isUrgent: false,
    featured: true,
    companyRating: 4.7,
    companyDescription: 'Creative Studio Pro is a boutique design agency specializing in digital product design for startups and established brands.',
    applicationUrl: 'https://creativestudiopro.com/careers'
  },
  {
    id: 'job-4',
    title: 'Data Scientist',
    company: 'DataDriven Analytics',
    location: {
      city: 'Seattle',
      state: 'WA',
      country: 'USA',
      remote: false,
      hybrid: true
    },
    description: 'Join our data science team to extract insights from large datasets and build machine learning models that drive business decisions. Work with cutting-edge technologies in a collaborative environment.',
    requirements: [
      'PhD or Master\'s in Data Science, Statistics, or related field',
      '2+ years of experience in data science or analytics',
      'Proficiency in Python, R, and SQL',
      'Experience with machine learning frameworks (TensorFlow, PyTorch, Scikit-learn)',
      'Strong statistical analysis and modeling skills',
      'Experience with cloud platforms (AWS, GCP, Azure)',
      'Excellent problem-solving and communication skills'
    ],
    responsibilities: [
      'Develop and deploy machine learning models for business applications',
      'Analyze large datasets to identify trends and patterns',
      'Create data visualizations and reports for stakeholders',
      'Collaborate with engineering teams to implement data solutions',
      'Design and conduct A/B tests and experiments',
      'Stay current with latest developments in data science and ML'
    ],
    salary: {
      min: 130000,
      max: 200000,
      currency: 'USD',
      period: 'yearly'
    },
    jobType: 'full-time',
    experience: 'mid',
    department: 'Data',
    category: 'Data Science',
    tags: ['Machine Learning', 'Python', 'Statistics', 'SQL', 'Analytics', 'AI'],
    benefits: ['Health Insurance', 'Dental Insurance', '401k Match', 'Research Budget', 'Conference Attendance'],
    postedDate: '2025-09-05',
    companySize: 'medium',
    industry: 'Analytics',
    workModel: 'hybrid',
    applicationCount: 78,
    isUrgent: false,
    featured: false,
    companyRating: 4.3,
    companyDescription: 'DataDriven Analytics helps companies leverage their data to make better business decisions through advanced analytics and machine learning.',
    contactEmail: 'hiring@datadriven.com'
  },
  {
    id: 'job-5',
    title: 'Marketing Manager',
    company: 'GrowthHackers Inc',
    location: {
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      remote: true,
      hybrid: true
    },
    description: 'Lead our marketing efforts to drive user acquisition and brand awareness. This role combines strategic thinking with hands-on execution across digital marketing channels.',
    requirements: [
      '4+ years of digital marketing experience',
      'Experience with performance marketing and growth hacking',
      'Proficiency in marketing tools (Google Ads, Facebook Ads, HubSpot)',
      'Strong analytical skills and data-driven approach',
      'Experience with SEO, content marketing, and social media',
      'Excellent written and verbal communication skills',
      'Bachelor\'s degree in Marketing, Business, or related field'
    ],
    responsibilities: [
      'Develop and execute comprehensive marketing strategies',
      'Manage digital advertising campaigns across multiple channels',
      'Create and oversee content marketing initiatives',
      'Analyze marketing performance and optimize campaigns',
      'Collaborate with product and sales teams on go-to-market strategies',
      'Manage marketing budget and vendor relationships'
    ],
    salary: {
      min: 85000,
      max: 130000,
      currency: 'USD',
      period: 'yearly'
    },
    jobType: 'full-time',
    experience: 'mid',
    department: 'Marketing',
    category: 'Marketing',
    tags: ['Digital Marketing', 'Growth Hacking', 'SEO', 'Content Marketing', 'Analytics'],
    benefits: ['Health Insurance', 'Stock Options', 'Unlimited PTO', 'Marketing Budget', 'Remote Work'],
    postedDate: '2025-09-04',
    companySize: 'startup',
    industry: 'Marketing Technology',
    workModel: 'remote',
    applicationCount: 134,
    isUrgent: true,
    featured: true,
    companyRating: 4.1,
    companyDescription: 'GrowthHackers Inc is a marketing technology startup that helps businesses accelerate their growth through innovative marketing strategies.',
    applicationUrl: 'https://growthhackers.com/careers'
  },
  {
    id: 'job-6',
    title: 'Full Stack Developer',
    company: 'WebTech Solutions',
    location: {
      city: 'Denver',
      state: 'CO',
      country: 'USA',
      remote: false,
      hybrid: false
    },
    description: 'Join our development team to build scalable web applications using modern technologies. Work on both frontend and backend systems in an agile environment.',
    requirements: [
      '3+ years of full stack development experience',
      'Proficiency in JavaScript, Node.js, and React',
      'Experience with databases (PostgreSQL, MongoDB)',
      'Knowledge of cloud services and deployment',
      'Understanding of RESTful APIs and microservices',
      'Experience with version control (Git) and CI/CD',
      'Strong problem-solving and debugging skills'
    ],
    responsibilities: [
      'Develop and maintain web applications using modern frameworks',
      'Design and implement RESTful APIs and database schemas',
      'Write clean, efficient, and well-tested code',
      'Collaborate with cross-functional teams on feature development',
      'Optimize application performance and scalability',
      'Participate in code reviews and technical discussions'
    ],
    salary: {
      min: 95000,
      max: 140000,
      currency: 'USD',
      period: 'yearly'
    },
    jobType: 'full-time',
    experience: 'mid',
    department: 'Engineering',
    category: 'Technology',
    tags: ['JavaScript', 'Node.js', 'React', 'Full Stack', 'APIs', 'Database'],
    benefits: ['Health Insurance', 'Dental Insurance', '401k', 'Gym Membership', 'Learning Stipend'],
    postedDate: '2025-09-03',
    companySize: 'medium',
    industry: 'Software',
    workModel: 'onsite',
    applicationCount: 89,
    isUrgent: false,
    featured: false,
    companyRating: 4.0,
    companyDescription: 'WebTech Solutions builds custom web applications and digital solutions for businesses across various industries.',
    contactEmail: 'careers@webtech.com'
  },
  {
    id: 'job-7',
    title: 'DevOps Engineer',
    company: 'CloudFirst Technologies',
    location: {
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      remote: true,
      hybrid: false
    },
    description: 'Help us build and maintain scalable cloud infrastructure. This remote position offers the opportunity to work with cutting-edge DevOps tools and practices.',
    requirements: [
      '3+ years of DevOps or infrastructure experience',
      'Strong experience with AWS or Azure cloud platforms',
      'Proficiency in containerization (Docker, Kubernetes)',
      'Experience with Infrastructure as Code (Terraform, CloudFormation)',
      'Knowledge of CI/CD pipelines and automation tools',
      'Scripting skills in Python, Bash, or PowerShell',
      'Understanding of monitoring and logging solutions'
    ],
    responsibilities: [
      'Design and maintain cloud infrastructure on AWS/Azure',
      'Implement and manage CI/CD pipelines',
      'Automate deployment and scaling processes',
      'Monitor system performance and troubleshoot issues',
      'Implement security best practices and compliance',
      'Collaborate with development teams on infrastructure needs'
    ],
    salary: {
      min: 110000,
      max: 165000,
      currency: 'USD',
      period: 'yearly'
    },
    jobType: 'full-time',
    experience: 'mid',
    department: 'Engineering',
    category: 'Technology',
    tags: ['DevOps', 'AWS', 'Kubernetes', 'Docker', 'CI/CD', 'Infrastructure'],
    benefits: ['Health Insurance', 'Stock Options', '100% Remote', 'Tech Allowance', 'Certification Reimbursement'],
    postedDate: '2025-09-02',
    companySize: 'large',
    industry: 'Cloud Services',
    workModel: 'remote',
    applicationCount: 67,
    isUrgent: false,
    featured: true,
    companyRating: 4.6,
    companyDescription: 'CloudFirst Technologies provides cloud infrastructure and DevOps solutions for enterprises looking to modernize their technology stack.',
    applicationUrl: 'https://cloudfirst.tech/jobs'
  },
  {
    id: 'job-8',
    title: 'Sales Development Representative',
    company: 'SalesForce Pro',
    location: {
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      remote: false,
      hybrid: true
    },
    description: 'Kickstart your sales career with our fast-growing SaaS company. Perfect for motivated individuals looking to develop sales skills and advance quickly.',
    requirements: [
      '1-2 years of sales or customer-facing experience',
      'Excellent communication and interpersonal skills',
      'Goal-oriented with a track record of meeting targets',
      'Experience with CRM software (Salesforce, HubSpot)',
      'Bachelor\'s degree preferred',
      'Resilience and ability to handle rejection',
      'Eagerness to learn and grow in sales'
    ],
    responsibilities: [
      'Generate and qualify leads through outbound prospecting',
      'Schedule demos and meetings for Account Executives',
      'Maintain accurate records in CRM system',
      'Follow up with prospects and nurture relationships',
      'Collaborate with marketing team on lead generation',
      'Meet monthly and quarterly activity and conversion goals'
    ],
    salary: {
      min: 45000,
      max: 65000,
      currency: 'USD',
      period: 'yearly'
    },
    jobType: 'full-time',
    experience: 'junior',
    department: 'Sales',
    category: 'Sales',
    tags: ['Sales', 'Lead Generation', 'CRM', 'Prospecting', 'SaaS'],
    benefits: ['Base + Commission', 'Health Insurance', 'Career Development', 'Team Events'],
    postedDate: '2025-09-01',
    companySize: 'medium',
    industry: 'Software',
    workModel: 'hybrid',
    applicationCount: 201,
    isUrgent: true,
    featured: false,
    companyRating: 3.9,
    companyDescription: 'SalesForce Pro provides sales automation and CRM solutions for small and medium businesses.',
    contactEmail: 'sdr-hiring@salesforcepro.com'
  }
];

// Job search and filtering utilities
export class JobSearchEngine {
  static searchJobs(filters: JobSearchFilters = {}): Job[] {
    let filteredJobs = [...MOCK_JOBS];

    // Text search in title, company, description
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Location filter
    if (filters.location) {
      const location = filters.location.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.location.city.toLowerCase().includes(location) ||
        job.location.state.toLowerCase().includes(location) ||
        (job.location.remote && location.includes('remote'))
      );
    }

    // Job type filter
    if (filters.jobType && filters.jobType.length > 0) {
      filteredJobs = filteredJobs.filter(job =>
        filters.jobType!.includes(job.jobType)
      );
    }

    // Experience level filter
    if (filters.experience && filters.experience.length > 0) {
      filteredJobs = filteredJobs.filter(job =>
        filters.experience!.includes(job.experience)
      );
    }

    // Work model filter
    if (filters.workModel && filters.workModel.length > 0) {
      filteredJobs = filteredJobs.filter(job =>
        filters.workModel!.includes(job.workModel)
      );
    }

    // Salary range filter
    if (filters.salaryMin || filters.salaryMax) {
      filteredJobs = filteredJobs.filter(job => {
        const jobMinSalary = job.salary.min;
        const jobMaxSalary = job.salary.max;
        
        if (filters.salaryMin && jobMaxSalary < filters.salaryMin) return false;
        if (filters.salaryMax && jobMinSalary > filters.salaryMax) return false;
        
        return true;
      });
    }

    // Category filter
    if (filters.category && filters.category.length > 0) {
      filteredJobs = filteredJobs.filter(job =>
        filters.category!.includes(job.category)
      );
    }

    // Date posted filter
    if (filters.datePosted && filters.datePosted !== 'all') {
      const today = new Date();
      const cutoffDate = new Date();
      
      switch (filters.datePosted) {
        case 'today':
          cutoffDate.setDate(today.getDate() - 1);
          break;
        case 'week':
          cutoffDate.setDate(today.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setDate(today.getDate() - 30);
          break;
      }

      filteredJobs = filteredJobs.filter(job =>
        new Date(job.postedDate) >= cutoffDate
      );
    }

    // Company size filter
    if (filters.companySize && filters.companySize.length > 0) {
      filteredJobs = filteredJobs.filter(job =>
        filters.companySize!.includes(job.companySize)
      );
    }

    // Featured jobs filter
    if (filters.featured) {
      filteredJobs = filteredJobs.filter(job => job.featured);
    }

    // Urgent jobs filter
    if (filters.urgent) {
      filteredJobs = filteredJobs.filter(job => job.isUrgent);
    }

    return filteredJobs;
  }

  static getJobById(id: string): Job | null {
    return MOCK_JOBS.find(job => job.id === id) || null;
  }

  static getFeaturedJobs(limit: number = 6): Job[] {
    return MOCK_JOBS.filter(job => job.featured).slice(0, limit);
  }

  static getRecentJobs(limit: number = 10): Job[] {
    return MOCK_JOBS
      .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
      .slice(0, limit);
  }

  static getJobsByCategory(category: string, limit: number = 6): Job[] {
    return MOCK_JOBS
      .filter(job => job.category === category)
      .slice(0, limit);
  }

  static getJobStats() {
    return {
      totalJobs: MOCK_JOBS.length,
      featuredJobs: MOCK_JOBS.filter(job => job.featured).length,
      urgentJobs: MOCK_JOBS.filter(job => job.isUrgent).length,
      remoteJobs: MOCK_JOBS.filter(job => job.workModel === 'remote').length,
      companiesCount: new Set(MOCK_JOBS.map(job => job.company)).size,
      categoriesCount: new Set(MOCK_JOBS.map(job => job.category)).size
    };
  }
}