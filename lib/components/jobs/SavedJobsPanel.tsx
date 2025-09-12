'use client';

import React, { useState } from 'react';
import { useJobsStore } from '../../store/jobs';
import { useAuthStore } from '../../store/auth';
import { JobSearchEngine } from '../../data/jobs';
import type { SavedJob, SearchHistory } from '../../store/jobs';
import type { Job } from '../../data/jobs';

interface SavedJobsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onJobClick: (jobId: string) => void;
}

export const SavedJobsPanel: React.FC<SavedJobsPanelProps> = ({ isOpen, onClose, onJobClick }) => {
  const { user } = useAuthStore();
  const { 
    getSavedJobs, 
    unsaveJob, 
    updateSavedJobNotes, 
    addSavedJobTag, 
    removeSavedJobTag,
    getSearchHistory,
    deleteSearchFromHistory,
    loadSearchFromHistory
  } = useJobsStore();
  
  const [activeTab, setActiveTab] = useState<'saved' | 'history'>('saved');
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState('');
  const [newTag, setNewTag] = useState('');
  const [addingTagTo, setAddingTagTo] = useState<string | null>(null);

  if (!isOpen || !user) return null;

  const savedJobs = getSavedJobs(user.id);
  const searchHistory = getSearchHistory();

  const handleNotesEdit = (savedJob: SavedJob) => {
    setEditingNotes(savedJob.id);
    setNotesValue(savedJob.notes || '');
  };

  const handleNotesSave = () => {
    if (editingNotes) {
      updateSavedJobNotes(editingNotes, notesValue);
      setEditingNotes(null);
      setNotesValue('');
    }
  };

  const handleAddTag = (savedJobId: string) => {
    if (newTag.trim()) {
      addSavedJobTag(savedJobId, newTag.trim());
      setNewTag('');
      setAddingTagTo(null);
    }
  };

  const formatSearchFilters = (filters: any) => {
    const parts = [];
    if (filters.query) parts.push(`"${filters.query}"`);
    if (filters.location) parts.push(`in ${filters.location}`);
    if (filters.jobType?.length) parts.push(filters.jobType.join(', '));
    if (filters.workModel?.length) parts.push(filters.workModel.join(', '));
    return parts.join(' • ') || 'All jobs';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === 'saved' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Saved Jobs ({savedJobs.length})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === 'history' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Search History ({searchHistory.length})
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <i className="lucide-x text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {activeTab === 'saved' && (
            <div className="space-y-4">
              {savedJobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl text-gray-300 mb-4">📌</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No saved jobs yet</h3>
                  <p className="text-gray-600">Start saving jobs you're interested in to keep track of them.</p>
                </div>
              ) : (
                savedJobs.map((savedJob) => {
                  const job = JobSearchEngine.getJobById(savedJob.jobId);
                  if (!job) return null;

                  return (
                    <div key={savedJob.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <button
                            onClick={() => onJobClick(job.id)}
                            className="text-left w-full"
                          >
                            <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800">
                              {job.title}
                            </h3>
                            <p className="text-gray-600">{job.company}</p>
                            <p className="text-sm text-gray-500">
                              Saved {new Date(savedJob.savedDate).toLocaleDateString()}
                            </p>
                          </button>
                        </div>
                        <button
                          onClick={() => unsaveJob(job.id, user.id)}
                          className="text-red-600 hover:text-red-800 ml-4"
                        >
                          <i className="lucide-trash-2"></i>
                        </button>
                      </div>

                      {/* Tags */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {(savedJob.tags || []).map((tag, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {tag}
                              <button
                                onClick={() => removeSavedJobTag(savedJob.id, tag)}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                          {addingTagTo === savedJob.id ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddTag(savedJob.id)}
                                className="px-2 py-1 text-xs border border-gray-300 rounded"
                                placeholder="Add tag"
                                autoFocus
                              />
                              <button
                                onClick={() => handleAddTag(savedJob.id)}
                                className="text-green-600 hover:text-green-800"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => {setAddingTagTo(null); setNewTag('');}}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setAddingTagTo(savedJob.id)}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
                            >
                              + Add tag
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        {editingNotes === savedJob.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={notesValue}
                              onChange={(e) => setNotesValue(e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              rows={3}
                              placeholder="Add notes about this job..."
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={handleNotesSave}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {setEditingNotes(null); setNotesValue('');}}
                                className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            {savedJob.notes ? (
                              <p className="text-sm text-gray-700 mb-2">{savedJob.notes}</p>
                            ) : (
                              <p className="text-sm text-gray-400 mb-2">No notes added</p>
                            )}
                            <button
                              onClick={() => handleNotesEdit(savedJob)}
                              className="text-xs text-blue-600 hover:text-blue-800"
                            >
                              {savedJob.notes ? 'Edit notes' : 'Add notes'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              {searchHistory.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl text-gray-300 mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No search history</h3>
                  <p className="text-gray-600">Your recent searches will appear here.</p>
                </div>
              ) : (
                searchHistory.map((search) => (
                  <div key={search.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {search.name && (
                            <h4 className="font-medium text-gray-900">{search.name}</h4>
                          )}
                          <span className="text-sm text-gray-500">
                            {search.resultsCount} results
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          {formatSearchFilters(search.filters)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(search.searchDate).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => {
                            loadSearchFromHistory(search.id);
                            onClose();
                          }}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                          Load Search
                        </button>
                        <button
                          onClick={() => deleteSearchFromHistory(search.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <i className="lucide-trash-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};