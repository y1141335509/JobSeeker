import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Job, JobSearchFilters } from '../data/jobs';

// Moved to lib/data/jobs.ts for better organization

// Moved to lib/store/applications.ts

export interface SavedJob {
  id: string;
  jobId: string;
  userId: string;
  savedDate: string;
  tags?: string[];
  notes?: string;
}

export interface SearchHistory {
  id: string;
  filters: JobSearchFilters;
  resultsCount: number;
  searchDate: string;
  name?: string; // User can name their searches
}

interface JobsState {
  jobs: Job[];
  savedJobs: SavedJob[];
  searchHistory: SearchHistory[];
  isLoading: boolean;
  currentFilters: JobSearchFilters;
  
  // Actions
  setJobs: (jobs: Job[]) => void;
  saveJob: (jobId: string, userId: string, tags?: string[], notes?: string) => void;
  unsaveJob: (jobId: string, userId: string) => void;
  getSavedJobs: (userId: string) => SavedJob[];
  updateSavedJobNotes: (savedJobId: string, notes: string) => void;
  addSavedJobTag: (savedJobId: string, tag: string) => void;
  removeSavedJobTag: (savedJobId: string, tag: string) => void;
  
  // Search History
  saveSearchToHistory: (filters: JobSearchFilters, resultsCount: number, name?: string) => void;
  getSearchHistory: () => SearchHistory[];
  deleteSearchFromHistory: (searchId: string) => void;
  loadSearchFromHistory: (searchId: string) => void;
  
  setCurrentFilters: (filters: JobSearchFilters) => void;
  setLoading: (loading: boolean) => void;
  searchJobs: (filters: JobSearchFilters) => Promise<Job[]>;
}

export const useJobsStore = create<JobsState>()(
  devtools(
    persist(
      (set, get) => ({
        jobs: [],
        savedJobs: [],
        searchHistory: [],
        isLoading: false,
        currentFilters: {},
      
        setJobs: (jobs) => set({ jobs }),
        
        saveJob: (jobId, userId, tags = [], notes = '') => {
          const savedJob: SavedJob = {
            id: `saved-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
            jobId,
            userId,
            savedDate: new Date().toISOString(),
            tags,
            notes
          };
          set((state) => ({
            savedJobs: [...state.savedJobs, savedJob]
          }));
        },
        
        unsaveJob: (jobId, userId) => {
          set((state) => ({
            savedJobs: state.savedJobs.filter(saved => 
              !(saved.jobId === jobId && saved.userId === userId)
            )
          }));
        },
        
        getSavedJobs: (userId) => {
          const { savedJobs } = get();
          return savedJobs.filter(saved => saved.userId === userId);
        },
        
        updateSavedJobNotes: (savedJobId, notes) => {
          set((state) => ({
            savedJobs: state.savedJobs.map(saved => 
              saved.id === savedJobId ? { ...saved, notes } : saved
            )
          }));
        },
        
        addSavedJobTag: (savedJobId, tag) => {
          set((state) => ({
            savedJobs: state.savedJobs.map(saved => {
              if (saved.id === savedJobId) {
                const existingTags = saved.tags || [];
                if (!existingTags.includes(tag)) {
                  return { ...saved, tags: [...existingTags, tag] };
                }
              }
              return saved;
            })
          }));
        },
        
        removeSavedJobTag: (savedJobId, tag) => {
          set((state) => ({
            savedJobs: state.savedJobs.map(saved => {
              if (saved.id === savedJobId && saved.tags) {
                return { ...saved, tags: saved.tags.filter(t => t !== tag) };
              }
              return saved;
            })
          }));
        },
        
        saveSearchToHistory: (filters, resultsCount, name) => {
          const searchHistory: SearchHistory = {
            id: `search-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
            filters,
            resultsCount,
            searchDate: new Date().toISOString(),
            name
          };
          set((state) => ({
            searchHistory: [searchHistory, ...state.searchHistory.slice(0, 19)] // Keep last 20
          }));
        },
        
        getSearchHistory: () => {
          return get().searchHistory;
        },
        
        deleteSearchFromHistory: (searchId) => {
          set((state) => ({
            searchHistory: state.searchHistory.filter(search => search.id !== searchId)
          }));
        },
        
        loadSearchFromHistory: (searchId) => {
          const { searchHistory } = get();
          const search = searchHistory.find(s => s.id === searchId);
          if (search) {
            set({ currentFilters: search.filters });
          }
        },
        
        setCurrentFilters: (filters) => set({ currentFilters: filters }),
        
        setLoading: (loading) => set({ isLoading: loading }),
        
        searchJobs: async (filters) => {
          const { JobSearchEngine } = await import('../data/jobs');
          set({ isLoading: true });
          
          try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const filteredJobs = JobSearchEngine.searchJobs(filters);
            set({ jobs: filteredJobs, isLoading: false });
            
            return filteredJobs;
          } catch (error) {
            set({ isLoading: false });
            console.error('Failed to search jobs:', error);
            return [];
          }
        },
      }),
      {
        name: 'jobs-store',
        // Only persist certain fields
        partialize: (state) => ({
          savedJobs: state.savedJobs,
          searchHistory: state.searchHistory,
          currentFilters: state.currentFilters
        })
      }
    ),
    { name: 'jobs-store' }
  )
);
