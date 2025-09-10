import { apiClient } from './client';
import { Job, Application } from '../store/jobs';

export interface JobSearchParams {
  query?: string;
  location?: string;
  type?: string;
  minSalary?: number;
  maxSalary?: number;
  page?: number;
  limit?: number;
}

export interface JobSearchResponse {
  jobs: Job[];
  total: number;
  page: number;
  totalPages: number;
}

export class JobsAPI {
  static async searchJobs(params: JobSearchParams): Promise<JobSearchResponse> {
    const response = await apiClient.get<JobSearchResponse>('/jobs/search', {
      params,
    });
    return response.data;
  }

  static async getJobById(id: string): Promise<Job> {
    const response = await apiClient.get<Job>(`/jobs/${id}`);
    return response.data;
  }

  static async getRecommendedJobs(userId: string): Promise<Job[]> {
    const response = await apiClient.get<Job[]>(`/jobs/recommended/${userId}`);
    return response.data;
  }

  static async saveJob(jobId: string): Promise<void> {
    await apiClient.post('/jobs/save', { jobId });
  }

  static async unsaveJob(jobId: string): Promise<void> {
    await apiClient.delete(`/jobs/save/${jobId}`);
  }

  static async getSavedJobs(): Promise<Job[]> {
    const response = await apiClient.get<Job[]>('/jobs/saved');
    return response.data;
  }

  static async applyToJob(jobId: string, resumeId?: string): Promise<Application> {
    const response = await apiClient.post<Application>('/applications', {
      jobId,
      resumeId,
    });
    return response.data;
  }

  static async getApplications(): Promise<Application[]> {
    const response = await apiClient.get<Application[]>('/applications');
    return response.data;
  }

  static async updateApplication(
    id: string,
    updates: Partial<Application>
  ): Promise<Application> {
    const response = await apiClient.patch<Application>(`/applications/${id}`, updates);
    return response.data;
  }

  static async getJobStats(): Promise<{
    totalApplications: number;
    interviews: number;
    responses: number;
    offers: number;
  }> {
    const response = await apiClient.get<{
      totalApplications: number;
      interviews: number;
      responses: number;
      offers: number;
    }>('/jobs/stats');
    return response.data;
  }
}