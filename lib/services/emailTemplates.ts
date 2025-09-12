// Email template generation service for job applications and follow-ups

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'application' | 'followup' | 'thankyou' | 'networking' | 'rejection_response';
  variables: string[];
  description: string;
}

export interface EmailContext {
  candidateName: string;
  companyName: string;
  positionTitle: string;
  hiringManagerName?: string;
  interviewDate?: string;
  applicationDate?: string;
  referrerName?: string;
  customMessage?: string;
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'application-cover-letter',
    name: 'Job Application Cover Letter',
    category: 'application',
    subject: 'Application for {{positionTitle}} Position at {{companyName}}',
    body: `Dear {{hiringManagerName || 'Hiring Manager'}},

I am writing to express my strong interest in the {{positionTitle}} position at {{companyName}}. With my background in [relevant field] and passion for [relevant area], I am excited about the opportunity to contribute to your team.

{{customMessage || 'I believe my skills in [specific skills] and experience with [relevant experience] make me a strong candidate for this role. I am particularly drawn to {{companyName}} because of [specific reason related to company/mission].'}}

I have attached my resume for your review and would welcome the opportunity to discuss how my experience and enthusiasm can benefit {{companyName}}. Thank you for considering my application.

Best regards,
{{candidateName}}`,
    variables: ['candidateName', 'companyName', 'positionTitle', 'hiringManagerName', 'customMessage'],
    description: 'Professional cover letter for job applications'
  },
  {
    id: 'application-followup',
    name: 'Application Follow-up',
    category: 'followup',
    subject: 'Following up on {{positionTitle}} Application',
    body: `Dear {{hiringManagerName || 'Hiring Manager'}},

I hope this message finds you well. I wanted to follow up on my application for the {{positionTitle}} position at {{companyName}}, which I submitted on {{applicationDate}}.

I remain very interested in this opportunity and would love to learn more about the role and how I can contribute to your team. If you need any additional information or would like to schedule an interview, please don't hesitate to reach out.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
{{candidateName}}`,
    variables: ['candidateName', 'companyName', 'positionTitle', 'hiringManagerName', 'applicationDate'],
    description: 'Follow-up email for job applications after 1-2 weeks'
  },
  {
    id: 'interview-thankyou',
    name: 'Post-Interview Thank You',
    category: 'thankyou',
    subject: 'Thank you for the {{positionTitle}} interview',
    body: `Dear {{hiringManagerName || 'Hiring Manager'}},

Thank you for taking the time to speak with me about the {{positionTitle}} position at {{companyName}} on {{interviewDate}}. I enjoyed learning more about the role and your team's innovative approach to [specific topic discussed].

Our conversation reinforced my enthusiasm for this opportunity, particularly [specific aspect discussed]. I'm excited about the possibility of contributing my skills in [relevant skills] to help {{companyName}} achieve its goals.

{{customMessage || 'I wanted to follow up on [specific point from interview] and reiterate my strong interest in joining your team.'}}

Please don't hesitate to reach out if you need any additional information. I look forward to hearing about the next steps.

Best regards,
{{candidateName}}`,
    variables: ['candidateName', 'companyName', 'positionTitle', 'hiringManagerName', 'interviewDate', 'customMessage'],
    description: 'Thank you email to send within 24 hours of an interview'
  },
  {
    id: 'networking-introduction',
    name: 'Networking Introduction',
    category: 'networking',
    subject: 'Introduction from {{referrerName}} - Interested in {{companyName}}',
    body: `Dear {{hiringManagerName || 'Hiring Team'}},

I hope this email finds you well. {{referrerName}} suggested I reach out to you regarding potential opportunities at {{companyName}}.

I am a [your title/background] with experience in [relevant areas], and I'm very interested in learning more about {{companyName}} and any current or upcoming opportunities that might be a good fit.

{{customMessage || 'I would love the opportunity to connect and learn more about your team and how I might contribute to {{companyName}}\'s continued success.'}}

I've attached my resume for your reference. Would you be available for a brief conversation in the coming weeks?

Thank you for your time, and I look forward to hearing from you.

Best regards,
{{candidateName}}`,
    variables: ['candidateName', 'companyName', 'hiringManagerName', 'referrerName', 'customMessage'],
    description: 'Introduction email for networking connections'
  },
  {
    id: 'rejection-response',
    name: 'Professional Response to Rejection',
    category: 'rejection_response',
    subject: 'Thank you for the opportunity - {{positionTitle}} at {{companyName}}',
    body: `Dear {{hiringManagerName || 'Hiring Manager'}},

Thank you for informing me about your decision regarding the {{positionTitle}} position at {{companyName}}. While I'm disappointed that I won't be joining your team at this time, I appreciate the opportunity to learn more about {{companyName}} and the thoughtful interview process.

I remain very interested in {{companyName}} and would welcome the opportunity to be considered for future roles that might be a good fit. Please keep me in mind if similar positions become available.

{{customMessage || 'I wish you and your team continued success, and I hope our paths cross again in the future.'}}

Thank you again for your time and consideration.

Best regards,
{{candidateName}}`,
    variables: ['candidateName', 'companyName', 'positionTitle', 'hiringManagerName', 'customMessage'],
    description: 'Professional response to maintain relationships after rejection'
  },
  {
    id: 'salary-negotiation',
    name: 'Salary Negotiation',
    category: 'followup',
    subject: 'Re: {{positionTitle}} Offer Discussion',
    body: `Dear {{hiringManagerName || 'Hiring Manager'}},

Thank you for extending the offer for the {{positionTitle}} position at {{companyName}}. I am excited about the opportunity to join your team and contribute to {{companyName}}'s success.

After careful consideration of the offer, I would like to discuss the compensation package. Based on my research of market rates for similar positions and my [relevant experience/qualifications], I was hoping we could explore a salary of [desired amount].

{{customMessage || 'I am confident that my skills and experience will bring significant value to the role, and I believe this adjustment would better reflect the market rate for this position.'}}

I'm very excited about this opportunity and look forward to discussing this further. Thank you for your understanding.

Best regards,
{{candidateName}}`,
    variables: ['candidateName', 'companyName', 'positionTitle', 'hiringManagerName', 'customMessage'],
    description: 'Professional salary negotiation email'
  }
];

export class EmailTemplateService {
  /**
   * Get all available email templates
   */
  static getAllTemplates(): EmailTemplate[] {
    return EMAIL_TEMPLATES;
  }

  /**
   * Get templates by category
   */
  static getTemplatesByCategory(category: EmailTemplate['category']): EmailTemplate[] {
    return EMAIL_TEMPLATES.filter(template => template.category === category);
  }

  /**
   * Get a specific template by ID
   */
  static getTemplate(id: string): EmailTemplate | undefined {
    return EMAIL_TEMPLATES.find(template => template.id === id);
  }

  /**
   * Generate email from template with provided context
   */
  static generateEmail(templateId: string, context: EmailContext): { subject: string; body: string } | null {
    const template = this.getTemplate(templateId);
    if (!template) return null;

    // Replace variables in subject and body
    const subject = this.replaceVariables(template.subject, context);
    const body = this.replaceVariables(template.body, context);

    return { subject, body };
  }

  /**
   * Replace template variables with actual values
   */
  private static replaceVariables(text: string, context: EmailContext): string {
    let result = text;

    // Handle conditional replacements like {{hiringManagerName || 'Hiring Manager'}}
    result = result.replace(/\{\{(\w+)\s*\|\|\s*'([^']+)'\}\}/g, (match, variable, fallback) => {
      const value = (context as any)[variable];
      return value || fallback;
    });

    // Handle simple variable replacements like {{candidateName}}
    result = result.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
      const value = (context as any)[variable];
      return value || `[${variable}]`;
    });

    return result;
  }

  /**
   * Get personalized template suggestions based on user context
   */
  static getSuggestedTemplates(
    context: Partial<EmailContext>, 
    scenario: 'new_application' | 'follow_up' | 'post_interview' | 'networking'
  ): EmailTemplate[] {
    switch (scenario) {
      case 'new_application':
        return this.getTemplatesByCategory('application');
      case 'follow_up':
        return this.getTemplatesByCategory('followup');
      case 'post_interview':
        return this.getTemplatesByCategory('thankyou');
      case 'networking':
        return this.getTemplatesByCategory('networking');
      default:
        return this.getAllTemplates();
    }
  }

  /**
   * Validate that all required variables are provided
   */
  static validateContext(templateId: string, context: EmailContext): { isValid: boolean; missingVariables: string[] } {
    const template = this.getTemplate(templateId);
    if (!template) return { isValid: false, missingVariables: [] };

    const missingVariables = template.variables.filter(variable => {
      const value = (context as any)[variable];
      return !value || value.trim() === '';
    });

    return {
      isValid: missingVariables.length === 0,
      missingVariables
    };
  }

  /**
   * Get template preview with sample data
   */
  static getTemplatePreview(templateId: string): { subject: string; body: string } | null {
    const sampleContext: EmailContext = {
      candidateName: 'John Doe',
      companyName: 'TechCorp Inc.',
      positionTitle: 'Senior Software Engineer',
      hiringManagerName: 'Sarah Johnson',
      interviewDate: 'Friday, March 15th',
      applicationDate: 'March 1st, 2024',
      referrerName: 'Mike Chen',
      customMessage: 'I am particularly excited about working on your AI-powered solutions.'
    };

    return this.generateEmail(templateId, sampleContext);
  }

  /**
   * Export email templates as JSON for backup
   */
  static exportTemplates(): string {
    return JSON.stringify(EMAIL_TEMPLATES, null, 2);
  }

  /**
   * Get email tips based on template category
   */
  static getEmailTips(category: EmailTemplate['category']): string[] {
    const tips: Record<EmailTemplate['category'], string[]> = {
      application: [
        'Research the company and mention specific details',
        'Keep it concise - aim for 3-4 paragraphs',
        'Include relevant keywords from the job description',
        'Proofread carefully for spelling and grammar'
      ],
      followup: [
        'Wait 1-2 weeks before following up',
        'Keep it brief and professional',
        'Reiterate your interest in the position',
        'Avoid being pushy or demanding'
      ],
      thankyou: [
        'Send within 24 hours of the interview',
        'Mention specific conversation points',
        'Reaffirm your interest and qualifications',
        'Keep it personal but professional'
      ],
      networking: [
        'Mention your mutual connection early',
        'Be specific about what you\'re looking for',
        'Offer value, not just ask for help',
        'Suggest a brief coffee meeting or call'
      ],
      rejection_response: [
        'Respond promptly and graciously',
        'Thank them for their time and consideration',
        'Express continued interest in the company',
        'Leave the door open for future opportunities'
      ]
    };

    return tips[category] || [];
  }
}