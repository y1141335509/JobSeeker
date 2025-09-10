import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  jobTitle: string;
  company: string;
  status: 'applied' | 'reviewing' | 'interview_scheduled' | 'interview_completed' | 'offer' | 'rejected' | 'withdrawn';
  appliedDate: string;
  lastUpdated: string;
  coverLetter?: string;
  resumeVersion?: string;
  notes?: string;
  interviewDates?: string[];
  feedback?: string;
  salaryExpectation?: number;
  expectedStartDate?: string;
  applicationUrl?: string;
  contactPerson?: {
    name: string;
    email: string;
    title: string;
  };
  timeline: ApplicationTimelineEvent[];
}

export interface ApplicationTimelineEvent {
  id: string;
  type: 'applied' | 'viewed' | 'interview_scheduled' | 'interview_completed' | 'feedback_received' | 'status_changed' | 'note_added';
  date: string;
  description: string;
  details?: any;
}

export interface ApplicationStats {
  total: number;
  applied: number;
  reviewing: number;
  interviews: number;
  offers: number;
  rejected: number;
  responseRate: number;
  averageResponseTime: number;
}

interface ApplicationsState {
  applications: JobApplication[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addApplication: (application: Omit<JobApplication, 'id' | 'timeline' | 'appliedDate' | 'lastUpdated'>) => void;
  updateApplication: (id: string, updates: Partial<JobApplication>) => void;
  addTimelineEvent: (applicationId: string, event: Omit<ApplicationTimelineEvent, 'id'>) => void;
  deleteApplication: (id: string) => void;
  getApplicationsByStatus: (status: JobApplication['status']) => JobApplication[];
  getApplicationStats: () => ApplicationStats;
  clearError: () => void;
}

export const useApplicationsStore = create<ApplicationsState>()(
  persist(
    (set, get) => ({
      applications: [],
      isLoading: false,
      error: null,

      addApplication: (applicationData) => {
        const newApplication: JobApplication = {
          ...applicationData,
          id: Date.now().toString(),
          appliedDate: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          status: 'applied',
          timeline: [{
            id: Date.now().toString(),
            type: 'applied',
            date: new Date().toISOString(),
            description: `Applied for ${applicationData.jobTitle} at ${applicationData.company}`,
            details: {
              coverLetter: applicationData.coverLetter,
              salaryExpectation: applicationData.salaryExpectation
            }
          }]
        };

        set(state => ({
          applications: [...state.applications, newApplication],
          error: null
        }));
      },

      updateApplication: (id, updates) => {
        set(state => ({
          applications: state.applications.map(app =>
            app.id === id
              ? {
                  ...app,
                  ...updates,
                  lastUpdated: new Date().toISOString()
                }
              : app
          ),
          error: null
        }));

        // Add timeline event for status changes
        if (updates.status) {
          const application = get().applications.find(app => app.id === id);
          if (application && application.status !== updates.status) {
            get().addTimelineEvent(id, {
              type: 'status_changed',
              date: new Date().toISOString(),
              description: `Status changed from ${application.status} to ${updates.status}`,
              details: { oldStatus: application.status, newStatus: updates.status }
            });
          }
        }
      },

      addTimelineEvent: (applicationId, event) => {
        const newEvent: ApplicationTimelineEvent = {
          ...event,
          id: Date.now().toString()
        };

        set(state => ({
          applications: state.applications.map(app =>
            app.id === applicationId
              ? {
                  ...app,
                  timeline: [...app.timeline, newEvent],
                  lastUpdated: new Date().toISOString()
                }
              : app
          ),
          error: null
        }));
      },

      deleteApplication: (id) => {
        set(state => ({
          applications: state.applications.filter(app => app.id !== id),
          error: null
        }));
      },

      getApplicationsByStatus: (status) => {
        return get().applications.filter(app => app.status === status);
      },

      getApplicationStats: () => {
        const applications = get().applications;
        const total = applications.length;
        
        if (total === 0) {
          return {
            total: 0,
            applied: 0,
            reviewing: 0,
            interviews: 0,
            offers: 0,
            rejected: 0,
            responseRate: 0,
            averageResponseTime: 0
          };
        }

        const statusCounts = applications.reduce((acc, app) => {
          acc[app.status] = (acc[app.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const applied = statusCounts.applied || 0;
        const reviewing = statusCounts.reviewing || 0;
        const interviews = (statusCounts.interview_scheduled || 0) + (statusCounts.interview_completed || 0);
        const offers = statusCounts.offer || 0;
        const rejected = statusCounts.rejected || 0;

        // Calculate response rate (non-applied status / total)
        const responded = total - applied;
        const responseRate = total > 0 ? (responded / total) * 100 : 0;

        // Calculate average response time (simplified)
        const responseTimes = applications
          .filter(app => app.status !== 'applied')
          .map(app => {
            const appliedDate = new Date(app.appliedDate);
            const lastUpdated = new Date(app.lastUpdated);
            return lastUpdated.getTime() - appliedDate.getTime();
          });

        const averageResponseTime = responseTimes.length > 0
          ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length / (1000 * 60 * 60 * 24) // Convert to days
          : 0;

        return {
          total,
          applied,
          reviewing,
          interviews,
          offers,
          rejected,
          responseRate: Math.round(responseRate),
          averageResponseTime: Math.round(averageResponseTime)
        };
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'applications-storage',
      partialize: (state) => ({ 
        applications: state.applications
      }),
    }
  )
);

// Helper functions
export const getStatusColor = (status: JobApplication['status']) => {
  switch (status) {
    case 'applied':
      return 'bg-blue-100 text-blue-800';
    case 'reviewing':
      return 'bg-yellow-100 text-yellow-800';
    case 'interview_scheduled':
      return 'bg-purple-100 text-purple-800';
    case 'interview_completed':
      return 'bg-indigo-100 text-indigo-800';
    case 'offer':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    case 'withdrawn':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusLabel = (status: JobApplication['status']) => {
  switch (status) {
    case 'applied':
      return 'Applied';
    case 'reviewing':
      return 'Under Review';
    case 'interview_scheduled':
      return 'Interview Scheduled';
    case 'interview_completed':
      return 'Interview Completed';
    case 'offer':
      return 'Offer Received';
    case 'rejected':
      return 'Rejected';
    case 'withdrawn':
      return 'Withdrawn';
    default:
      return 'Unknown';
  }
};

export const getTimelineEventIcon = (type: ApplicationTimelineEvent['type']) => {
  switch (type) {
    case 'applied':
      return '📝';
    case 'viewed':
      return '👀';
    case 'interview_scheduled':
      return '📅';
    case 'interview_completed':
      return '✅';
    case 'feedback_received':
      return '💬';
    case 'status_changed':
      return '🔄';
    case 'note_added':
      return '📋';
    default:
      return '📌';
  }
};