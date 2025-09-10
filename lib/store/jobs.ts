import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  description: string;
  requirements: string[];
  postedDate: Date;
  applicationDeadline?: Date;
  matchScore?: number;
}

export interface Application {
  id: string;
  jobId: string;
  status: 'applied' | 'interview' | 'rejected' | 'offered' | 'accepted';
  appliedDate: Date;
  interviewDate?: Date;
  notes?: string;
}

interface JobsState {
  jobs: Job[];
  applications: Application[];
  savedJobs: string[];
  isLoading: boolean;
  searchQuery: string;
  filters: {
    location: string;
    type: string;
    salaryRange: [number, number];
  };
  
  // Actions
  setJobs: (jobs: Job[]) => void;
  addApplication: (application: Omit<Application, 'id'>) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<JobsState['filters']>) => void;
  setLoading: (loading: boolean) => void;
  searchJobs: () => Promise<void>;
}

export const useJobsStore = create<JobsState>()(
  devtools(
    (set, get) => ({
      jobs: [],
      applications: [],
      savedJobs: [],
      isLoading: false,
      searchQuery: '',
      filters: {
        location: '',
        type: '',
        salaryRange: [0, 200000],
      },
      
      setJobs: (jobs) => set({ jobs }),
      
      addApplication: (application) => {
        const newApplication: Application = {
          ...application,
          id: Date.now().toString(),
        };
        set((state) => ({
          applications: [...state.applications, newApplication],
        }));
      },
      
      updateApplication: (id, updates) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, ...updates } : app
          ),
        }));
      },
      
      saveJob: (jobId) => {
        set((state) => ({
          savedJobs: Array.from(new Set([...state.savedJobs, jobId])),
        }));
      },
      
      unsaveJob: (jobId) => {
        set((state) => ({
          savedJobs: state.savedJobs.filter((id) => id !== jobId),
        }));
      },
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      searchJobs: async () => {
        const { searchQuery, filters } = get();
        set({ isLoading: true });
        
        try {
          // Mock API call - replace with actual API integration
          const mockJobs: Job[] = [
            {
              id: '1',
              title: 'Senior Frontend Developer',
              company: 'TechCorp Inc.',
              location: 'San Francisco, CA',
              salary: '$120,000 - $150,000',
              type: 'full-time',
              description: 'We are looking for a senior frontend developer...',
              requirements: ['React', 'TypeScript', '5+ years experience'],
              postedDate: new Date(),
              matchScore: 92,
            },
            {
              id: '2',
              title: 'Product Manager',
              company: 'StartupXYZ',
              location: 'Remote',
              salary: '$90,000 - $120,000',
              type: 'remote',
              description: 'Join our growing product team...',
              requirements: ['Product Management', 'Analytics', 'Leadership'],
              postedDate: new Date(),
              matchScore: 78,
            },
          ];
          
          set({ jobs: mockJobs, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          console.error('Failed to search jobs:', error);
        }
      },
    }),
    { name: 'jobs-store' }
  )
);