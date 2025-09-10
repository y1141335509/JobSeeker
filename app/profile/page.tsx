'use client';

import React, { useState } from 'react';
import ProtectedRoute from '../../lib/components/auth/ProtectedRoute';
import { useAuthStore } from '../../lib/store/auth';
import Header from '../../components/Header';
import { ErrorBoundary } from '../../lib/components/ui/ErrorBoundary';
import { LoadingSpinner } from '../../lib/components/ui/LoadingSpinner';
import { MBTI_TYPES } from '../../lib/data/mbti';
import { validateBirthDate, formatZodiacSign } from '../../lib/utils/zodiacCalculator';

const MBTI_OPTIONS = Object.entries(MBTI_TYPES).map(([code, type]) => ({
  value: code,
  label: `${code} - ${type.name}`,
  description: type.description
}));

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    birthDate: user?.birthDate || '',
    mbtiType: user?.mbtiType || '',
    bio: user?.bio || '',
    location: user?.location || '',
    currentTitle: user?.currentTitle || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (formData.birthDate) {
      const birthDate = new Date(formData.birthDate);
      const validation = validateBirthDate(birthDate);
      if (!validation.isValid) {
        newErrors.birthDate = validation.error || 'Invalid birth date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    setSuccessMessage('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateProfile({
        name: formData.name,
        birthDate: formData.birthDate,
        mbtiType: formData.mbtiType,
        bio: formData.bio,
        location: formData.location,
        currentTitle: formData.currentTitle,
      });
      
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      birthDate: user?.birthDate || '',
      mbtiType: user?.mbtiType || '',
      bio: user?.bio || '',
      location: user?.location || '',
      currentTitle: user?.currentTitle || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <ErrorBoundary>
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
              <p className="text-gray-600">Manage your account information and preferences</p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="icon-check-circle text-green-600 mr-3" />
                  <span className="text-green-800">{successMessage}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-white">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                    <p className="text-gray-600 mb-4">{user?.email}</p>
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                      {user?.zodiacSign && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                          <span className="mr-1">✨</span>
                          <span>{formatZodiacSign(user.zodiacSign)}</span>
                        </div>
                      )}
                      {user?.mbtiType && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800">
                          <span className="mr-1">🧠</span>
                          <span>{user.mbtiType}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Member since</span>
                        <span className="font-medium">
                          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      {user?.age && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Age</span>
                          <span className="font-medium">{user.age} years</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Email verified</span>
                        <span className={`font-medium ${user?.emailVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                          {user?.emailVerified ? 'Yes' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Profile complete</span>
                        <span className={`font-medium ${user?.profileComplete ? 'text-green-600' : 'text-yellow-600'}`}>
                          {user?.profileComplete ? 'Complete' : 'In Progress'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn-secondary"
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          onClick={handleCancel}
                          disabled={isSaving}
                          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="btn-primary flex items-center gap-2 disabled:opacity-50"
                        >
                          {isSaving ? (
                            <>
                              <LoadingSpinner size="sm" />
                              Saving...
                            </>
                          ) : (
                            'Save Changes'
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <form className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing || isSaving}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500 ${
                          errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        placeholder="Enter your email"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Email address cannot be changed. Contact support if needed.
                      </p>
                    </div>

                    {/* Birth Date Field */}
                    <div>
                      <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Birth Date 🎂
                      </label>
                      <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        disabled={!isEditing || isSaving}
                        max={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500 ${
                          errors.birthDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {errors.birthDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        Your zodiac sign will be automatically calculated from your birth date.
                      </p>
                    </div>

                    {/* MBTI Type Field */}
                    <div>
                      <label htmlFor="mbtiType" className="block text-sm font-medium text-gray-700 mb-2">
                        MBTI Personality Type 🧠
                      </label>
                      <select
                        id="mbtiType"
                        name="mbtiType"
                        value={formData.mbtiType}
                        onChange={handleChange}
                        disabled={!isEditing || isSaving}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                      >
                        <option value="">Select your MBTI personality type</option>
                        {MBTI_OPTIONS.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {formData.mbtiType && (
                        <div className="mt-2 p-3 bg-indigo-50 rounded-lg">
                          <p className="text-sm text-indigo-700">
                            <strong>{MBTI_TYPES[formData.mbtiType]?.name}:</strong>{' '}
                            {MBTI_TYPES[formData.mbtiType]?.description}
                          </p>
                        </div>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        Your MBTI type helps us match you with suitable career opportunities.
                      </p>
                    </div>

                    {/* Current Title Field */}
                    <div>
                      <label htmlFor="currentTitle" className="block text-sm font-medium text-gray-700 mb-2">
                        Current Job Title
                      </label>
                      <input
                        type="text"
                        id="currentTitle"
                        name="currentTitle"
                        value={formData.currentTitle}
                        onChange={handleChange}
                        disabled={!isEditing || isSaving}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="e.g., Software Engineer, Marketing Manager"
                      />
                    </div>

                    {/* Location Field */}
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        disabled={!isEditing || isSaving}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="City, State/Country"
                      />
                    </div>

                    {/* Bio Field */}
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleChange}
                        disabled={!isEditing || isSaving}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                        placeholder="Tell us about yourself, your career goals, and interests..."
                        maxLength={500}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        {formData.bio.length}/500 characters
                      </p>
                    </div>

                    {/* Additional Settings */}
                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              MBTI-based job recommendations
                            </label>
                            <p className="text-xs text-gray-500">
                              Get personalized job matches based on your personality type
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Daily career horoscope
                            </label>
                            <p className="text-xs text-gray-500">
                              Receive your daily career horoscope based on your zodiac sign
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Job match notifications
                            </label>
                            <p className="text-xs text-gray-500">
                              Get notified when new jobs match your preferences
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Weekly personality insights
                            </label>
                            <p className="text-xs text-gray-500">
                              Receive weekly career guidance based on your MBTI type
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-medium text-red-900 mb-2">Danger Zone</h3>
                <p className="text-sm text-red-700 mb-4">
                  These actions are permanent and cannot be undone.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Delete Account
                  </button>
                  <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </ErrorBoundary>
  );
}