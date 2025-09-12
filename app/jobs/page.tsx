'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ProtectedRoute from '../../lib/components/auth/ProtectedRoute';
import { useAuthStore } from '../../lib/store/auth';
import { JobSearchEngine, MOCK_JOBS } from '../../lib/data/jobs';
import { JobMatchingEngine } from '../../lib/utils/jobMatching';
import type { Job, JobSearchFilters, JobMatch } from '../../lib/data/jobs';
import type { UserProfile } from '../../lib/utils/jobMatching';

const JobsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [filters, setFilters] = useState<JobSearchFilters>({});
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [viewMode, setViewMode] = useState<'all' | 'matched'>('all');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Create user profile for matching
  const userProfile: UserProfile = useMemo(() => ({
    id: user?.id || '',
    email: user?.email || '',
    name: user?.name || '',
    zodiacSign: user?.zodiacSign,
    experienceLevel: 'mid', // Default - would come from user profile
    preferredJobTypes: ['full-time'],
    preferredWorkModel: ['remote', 'hybrid'],
    preferredCategories: ['Technology', 'Design', 'Product Management'],
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Node.js'], // Mock data
    salaryExpectation: {
      min: 80000,
      max: 150000,
      currency: 'USD'
    }
  }), [user]);

  useEffect(() => {
    searchJobs();
  }, [filters, userProfile]);

  const searchJobs = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const filteredJobs = JobSearchEngine.searchJobs(filters);
      setJobs(filteredJobs);
      
      // Calculate job matches
      const matches = JobMatchingEngine.rankJobsByMatch(filteredJobs, userProfile);
      setJobMatches(matches);
    } catch (error) {
      console.error('Error searching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: Partial<JobSearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const displayedJobs = viewMode === 'matched' ? jobMatches : jobs.map(job => ({ job, matchScore: 0, matchReasons: [], missingSkills: [], strengths: [] }));

  const formatSalary = (salary: Job['salary']) => {
    const { min, max, currency, period } = salary;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    const periodLabel = period === 'yearly' ? '/year' : period === 'monthly' ? '/month' : '/hour';
    return `${formatter.format(min)} - ${formatter.format(max)}${periodLabel}`;
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/dashboard" className="text-blue-600 hover:text-blue-800 mr-4">
                <i className="lucide-arrow-left mr-2"></i>
                Back to Dashboard
              </a>
              <h1 className="text-2xl font-bold text-gray-900">Job Search</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="lucide-filter mr-2"></i>
                Filters
              </button>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All Jobs ({jobs.length})
                </button>
                <button
                  onClick={() => setViewMode('matched')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'matched' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Best Matches ({jobMatches.filter(m => m.matchScore >= 60).length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for jobs, companies, or skills..."
                  value={filters.query || ''}
                  onChange={(e) => handleFilterChange({ query: e.target.value })}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <i className="lucide-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>
            <div className="w-64">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Location"
                  value={filters.location || ''}
                  onChange={(e) => handleFilterChange({ location: e.target.value })}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <i className="lucide-map-pin absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <select 
                  multiple
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value) as Job['jobType'][];
                    handleFilterChange({ jobType: values });
                  }}
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <select 
                  multiple
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value) as Job['experience'][];
                    handleFilterChange({ experience: values });
                  }}
                >
                  <option value="entry">Entry Level</option>
                  <option value="junior">Junior</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior</option>
                  <option value="lead">Lead</option>
                  <option value="executive">Executive</option>
                </select>
              </div>

              {/* Work Model */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Model</label>
                <select 
                  multiple
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value) as Job['workModel'][];
                    handleFilterChange({ workModel: values });
                  }}
                >
                  <option value="onsite">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Min salary"
                    value={filters.salaryMin || ''}
                    onChange={(e) => handleFilterChange({ salaryMin: Number(e.target.value) || undefined })}
                    className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max salary"
                    value={filters.salaryMax || ''}
                    onChange={(e) => handleFilterChange({ salaryMax: Number(e.target.value) || undefined })}
                    className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.featured || false}
                  onChange={(e) => handleFilterChange({ featured: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Featured jobs only</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.urgent || false}
                  onChange={(e) => handleFilterChange({ urgent: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Urgent hiring</span>
              </label>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for jobs...</p>
            </div>
          ) : displayedJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl text-gray-300 mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            displayedJobs.map((jobMatch) => (
              <div key={jobMatch.job.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{jobMatch.job.title}</h3>
                      {jobMatch.job.featured && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          ⭐ Featured
                        </span>
                      )}
                      {jobMatch.job.isUrgent && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          🔥 Urgent
                        </span>
                      )}
                      {viewMode === 'matched' && jobMatch.matchScore > 0 && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMatchScoreColor(jobMatch.matchScore)}`}>
                          {jobMatch.matchScore}% Match
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <span className="font-medium">{jobMatch.job.company}</span>
                      <span className="mx-2">•</span>
                      <span>{jobMatch.job.location.city}, {jobMatch.job.location.state}</span>
                      <span className="mx-2">•</span>
                      <span className="capitalize">{jobMatch.job.workModel}</span>
                      {jobMatch.job.companyRating && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="flex items-center">
                            ⭐ {jobMatch.job.companyRating}
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{jobMatch.job.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-semibold text-green-600">
                          {formatSalary(jobMatch.job.salary)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {jobMatch.job.applicationCount} applicants
                        </span>
                        <span className="text-sm text-gray-500">
                          Posted {new Date(jobMatch.job.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => window.location.href = `/jobs/${jobMatch.job.id}`}
                          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Quick Apply
                        </button>
                      </div>
                    </div>

                    {/* Match Reasons for matched view */}
                    {viewMode === 'matched' && jobMatch.matchReasons.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Why this matches:</h4>
                        <div className="flex flex-wrap gap-2">
                          {jobMatch.matchReasons.slice(0, 3).map((reason, index) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {reason}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {jobMatch.job.tags.slice(0, 5).map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Saved Jobs Panel */}
        <SavedJobsPanel 
          isOpen={showSavedPanel}
          onClose={() => setShowSavedPanel(false)}
          onJobClick={handleJobClick}
        />
      </div>
    </div>
  );
};

export default function JobsPageWrapper() {
  return (
    <ProtectedRoute>
      <JobsPage />
    </ProtectedRoute>
  );
}