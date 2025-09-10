'use client';

import React, { useState } from 'react';
import { useAuthStore } from '../../../lib/store/auth';
import { LoadingSpinner } from '../../../lib/components/ui/LoadingSpinner';
import { MBTI_TYPES } from '../../../lib/data/mbti';
import { validateBirthDate } from '../../../lib/utils/zodiacCalculator';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  mbtiType: string;
  agreeToTerms: boolean;
}

const MBTI_OPTIONS = Object.entries(MBTI_TYPES).map(([code, type]) => ({
  value: code,
  label: `${code} - ${type.name}`,
  description: type.description
}));

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    mbtiType: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register, isLoading, error } = useAuthStore();

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    if (!formData.name) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Birth date is required';
    } else {
      const birthDate = new Date(formData.birthDate);
      const validation = validateBirthDate(birthDate);
      if (!validation.isValid) {
        newErrors.birthDate = validation.error;
      }
    }

    if (!formData.mbtiType) {
      newErrors.mbtiType = 'Please select your MBTI personality type';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        birthDate: formData.birthDate,
        mbtiType: formData.mbtiType
      });
      
      // Registration successful, small delay then redirect to dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 100);
    } catch (authError) {
      // Handle specific auth errors
      if (error?.field) {
        setErrors({ 
          [error.field]: error.message 
        });
      } else {
        setErrors({ 
          email: error?.message || 'Registration failed. Please try again.' 
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing/selecting
    if (errors[name as keyof RegisterFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="register-form">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
            disabled={isLoading}
            data-testid="name-input"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="icon-user text-gray-400" />
          </div>
        </div>
        {errors.name && (
          <p className="mt-2 text-sm text-red-600" data-testid="name-error">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
            disabled={isLoading}
            data-testid="email-input"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="icon-mail text-gray-400" />
          </div>
        </div>
        {errors.email && (
          <p className="mt-2 text-sm text-red-600" data-testid="email-error">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pr-12 ${
              errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Create a strong password"
            disabled={isLoading}
            data-testid="password-input"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            data-testid="toggle-password"
          >
            <div className={showPassword ? 'icon-eye-off' : 'icon-eye'} />
          </button>
        </div>
        {errors.password && (
          <p className="mt-2 text-sm text-red-600" data-testid="password-error">
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pr-12 ${
              errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Confirm your password"
            disabled={isLoading}
            data-testid="confirm-password-input"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            data-testid="toggle-confirm-password"
          >
            <div className={showConfirmPassword ? 'icon-eye-off' : 'icon-eye'} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-600" data-testid="confirm-password-error">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Birth Date Field */}
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
          Birth Date 🎂
        </label>
        <div className="relative">
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              errors.birthDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            disabled={isLoading}
            data-testid="birth-date-input"
            max={new Date().toISOString().split('T')[0]}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="icon-calendar text-gray-400" />
          </div>
        </div>
        {errors.birthDate && (
          <p className="mt-2 text-sm text-red-600" data-testid="birth-date-error">
            {errors.birthDate}
          </p>
        )}
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
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
            errors.mbtiType ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          disabled={isLoading}
          data-testid="mbti-select"
        >
          <option value="">Select your MBTI personality type</option>
          {MBTI_OPTIONS.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.mbtiType && (
          <p className="mt-2 text-sm text-red-600" data-testid="mbti-error">
            {errors.mbtiType}
          </p>
        )}
        {formData.mbtiType && (
          <div className="mt-2 p-3 bg-indigo-50 rounded-lg">
            <p className="text-sm text-indigo-700">
              <strong>{MBTI_TYPES[formData.mbtiType]?.name}:</strong>{' '}
              {MBTI_TYPES[formData.mbtiType]?.description}
            </p>
          </div>
        )}
      </div>

      {/* Terms Agreement */}
      <div>
        <div className="flex items-start">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
            disabled={isLoading}
            data-testid="terms-checkbox"
          />
          <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-700">
            I agree to the{' '}
            <button type="button" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Terms of Service
            </button>
            {' '}and{' '}
            <button type="button" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Privacy Policy
            </button>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="mt-2 text-sm text-red-600" data-testid="terms-error">
            {errors.agreeToTerms}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        data-testid="register-submit"
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
};

export default RegisterForm;