'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProtectedRoute from '../../../lib/components/auth/ProtectedRoute';
import { useAuthStore } from '../../../lib/store/auth';
import { useApplicationsStore } from '../../../lib/store/applications';
import { useJobsStore } from '../../../lib/store/jobs';
import { JobSearchEngine } from '../../../lib/data/jobs';
import { JobMatchingEngine } from '../../../lib/utils/jobMatching';
import type { Job, JobMatch } from '../../../lib/data/jobs';
import type { UserProfile } from '../../../lib/utils/jobMatching';

const JobDetailPage: React.FC = () => {
  const params = useParams();
  const { user } = useAuthStore();
  const { applications, addApplication } = useApplicationsStore();
  const { saveJob, unsaveJob, getSavedJobs } = useJobsStore();
  const [job, setJob] = useState<Job | null>(null);
  const [jobMatch, setJobMatch] = useState<JobMatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isJobSaved, setIsJobSaved] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    salaryExpectation: '',
    startDate: ''
  });

  const userProfile: UserProfile = {
    id: user?.id || '',
    email: user?.email || '',
    name: user?.name || '',
    zodiacSign: user?.zodiacSign,
    experienceLevel: 'mid',
    preferredJobTypes: ['full-time'],
    preferredWorkModel: ['remote', 'hybrid'],
    preferredCategories: ['Technology', 'Design', 'Product Management'],
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Node.js'],
    salaryExpectation: {
      min: 80000,
      max: 150000,
      currency: 'USD'
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const jobId = params?.id as string;
        const fetchedJob = JobSearchEngine.getJobById(jobId);
        
        if (fetchedJob) {
          setJob(fetchedJob);
          // Calculate match score
          const match = JobMatchingEngine.calculateJobMatch(fetchedJob, userProfile);
          setJobMatch(match);
          
          // Check if user has already applied
          const existingApplication = applications.find(app => app.jobId === jobId && app.userId === user?.id);
          setApplied(!!existingApplication);
          
          // Check if job is saved
          if (user) {
            const savedJobs = getSavedJobs(user.id);
            setIsJobSaved(savedJobs.some(saved => saved.jobId === jobId));
          }
        }
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchJob();
    }
  }, [params?.id, applications, user?.id, getSavedJobs]);

  const handleApply = () => {
    setShowApplicationModal(true);
  };

  const submitApplication = async () => {
    if (!job || !user) return;
    
    setSubmitting(true);
    try {
      // Simulate application submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add application to store
      addApplication({
        jobId: job.id,
        userId: user.id,
        jobTitle: job.title,
        company: job.company,
        coverLetter: applicationData.coverLetter,
        salaryExpectation: applicationData.salaryExpectation ? Number(applicationData.salaryExpectation.replace(/[^0-9]/g, '')) : undefined,
        expectedStartDate: applicationData.startDate,
        applicationUrl: job.applicationUrl,
        contactEmail: job.contactEmail
      });
      
      setApplied(true);
      setShowApplicationModal(false);
      
      // Reset form
      setApplicationData({
        coverLetter: '',
        salaryExpectation: '',
        startDate: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleSaveJob = () => {
    if (!job || !user) return;
    
    if (isJobSaved) {
      unsaveJob(job.id, user.id);
      setIsJobSaved(false);
    } else {
      saveJob(job.id, user.id);
      setIsJobSaved(true);
    }
  };

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
    if (score >= 80) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 60) return 'text-blue-600 bg-blue-100 border-blue-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-300 mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <a href="/jobs" className="btn-primary">
            Back to Job Search
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/jobs" className="text-blue-600 hover:text-blue-800 mr-4">
                <i className="lucide-arrow-left mr-2"></i>
                Back to Jobs
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="lucide-printer mr-2"></i>
                Print
              </button>
              <button 
                onClick={handleSaveJob}
                className={`px-4 py-2 border rounded-lg transition-colors ${
                  isJobSaved
                    ? 'border-yellow-400 bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <i className={`lucide-bookmark${isJobSaved ? '-check' : ''} mr-2`}></i>
                {isJobSaved ? 'Saved' : 'Save Job'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                    {job.featured && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        ⭐ Featured
                      </span>
                    )}
                    {job.isUrgent && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        🔥 Urgent Hiring
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="text-xl font-semibold text-blue-600">{job.company}</span>
                    {job.companyRating && (
                      <span className="ml-4 flex items-center">
                        ⭐ {job.companyRating}/5.0
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <i className="lucide-map-pin mr-2"></i>
                      {job.location.city}, {job.location.state}
                    </div>
                    <div className="flex items-center">
                      <i className="lucide-briefcase mr-2"></i>
                      {job.jobType}
                    </div>
                    <div className="flex items-center">
                      <i className="lucide-clock mr-2"></i>
                      {job.experience}
                    </div>
                    <div className="flex items-center">
                      <i className="lucide-home mr-2"></i>
                      {job.workModel}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-t border-gray-200">
                <div>
                  <div className="text-2xl font-bold text-green-600">{formatSalary(job.salary)}</div>
                  <div className="text-sm text-gray-500">
                    {job.applicationCount} applicants • Posted {new Date(job.postedDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex space-x-4">
                  {applied ? (
                    <div className="px-6 py-3 bg-green-100 text-green-800 rounded-lg font-medium">
                      ✓ Application Submitted
                    </div>
                  ) : (
                    <button 
                      onClick={handleApply}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Apply Now
                    </button>
                  )}
                  <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    Contact Recruiter
                  </button>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <i className="lucide-check-circle text-green-500 mr-3 mt-0.5"></i>
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <i className="lucide-chevron-right text-blue-500 mr-3 mt-0.5"></i>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits & Perks</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <i className="lucide-gift text-blue-600 mr-3"></i>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Match Score */}
            {jobMatch && jobMatch.matchScore > 0 && (
              <div className={`rounded-lg border-2 p-6 ${getMatchScoreColor(jobMatch.matchScore)}`}>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold">{jobMatch.matchScore}%</div>
                  <div className="font-medium">Job Match</div>
                </div>
                
                {jobMatch.matchReasons.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Why this matches:</h4>
                    <ul className="space-y-1 text-sm">
                      {jobMatch.matchReasons.slice(0, 4).map((reason, index) => (
                        <li key={index} className="flex items-start">
                          <i className="lucide-check text-green-600 mr-2 mt-0.5"></i>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {jobMatch.missingSkills.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-current border-opacity-20">
                    <h4 className="font-medium">Areas to improve:</h4>
                    <ul className="space-y-1 text-sm mt-2">
                      {jobMatch.missingSkills.slice(0, 3).map((skill, index) => (
                        <li key={index} className="flex items-start">
                          <i className="lucide-alert-circle text-orange-600 mr-2 mt-0.5"></i>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About {job.company}</h3>
              <p className="text-gray-700 mb-4">{job.companyDescription}</p>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry:</span>
                  <span className="font-medium">{job.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Company Size:</span>
                  <span className="font-medium capitalize">{job.companySize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Department:</span>
                  <span className="font-medium">{job.department}</span>
                </div>
                {job.companyRating && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium">⭐ {job.companyRating}/5.0</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills & Tags */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Similar Jobs</h3>
              <div className="space-y-3">
                {JobSearchEngine.getJobsByCategory(job.category, 3)
                  .filter(similarJob => similarJob.id !== job.id)
                  .map((similarJob) => (
                    <div key={similarJob.id} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors">
                      <a href={`/jobs/${similarJob.id}`} className="block">
                        <h4 className="font-medium text-blue-600 hover:text-blue-800">{similarJob.title}</h4>
                        <p className="text-sm text-gray-600">{similarJob.company}</p>
                        <p className="text-sm text-green-600 font-medium">{formatSalary(similarJob.salary)}</p>
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Application Modal */}
        {showApplicationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h2>
                  <button
                    onClick={() => setShowApplicationModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="lucide-x text-2xl"></i>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                    <textarea
                      value={applicationData.coverLetter}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                      placeholder="Tell us why you're interested in this position..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salary Expectation</label>
                    <input
                      type="text"
                      value={applicationData.salaryExpectation}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, salaryExpectation: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., $120,000/year"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Start Date</label>
                    <input
                      type="date"
                      value={applicationData.startDate}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => setShowApplicationModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitApplication}
                    disabled={submitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function JobDetailPageWrapper() {
  return (
    <ProtectedRoute>
      <JobDetailPage />
    </ProtectedRoute>
  );
}