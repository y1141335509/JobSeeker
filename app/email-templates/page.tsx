'use client';

import React, { useState } from 'react';
import ProtectedRoute from '../../lib/components/auth/ProtectedRoute';
import { useAuthStore } from '../../lib/store/auth';
import Header from '../../components/Header';
import { ErrorBoundary } from '../../lib/components/ui/ErrorBoundary';
import { EmailTemplateService } from '../../lib/services/emailTemplates';
import type { EmailTemplate, EmailContext } from '../../lib/services/emailTemplates';

export default function EmailTemplatesPage() {
  const { user } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState<EmailTemplate['category']>('application');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [emailContext, setEmailContext] = useState<EmailContext>({
    candidateName: user?.name || '',
    companyName: '',
    positionTitle: '',
    hiringManagerName: '',
    interviewDate: '',
    applicationDate: '',
    referrerName: '',
    customMessage: ''
  });
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string; body: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const categories = [
    { id: 'application' as const, name: 'Job Applications', icon: '📝', color: 'bg-blue-100 text-blue-800' },
    { id: 'followup' as const, name: 'Follow-ups', icon: '📞', color: 'bg-green-100 text-green-800' },
    { id: 'thankyou' as const, name: 'Thank You Notes', icon: '🙏', color: 'bg-purple-100 text-purple-800' },
    { id: 'networking' as const, name: 'Networking', icon: '🤝', color: 'bg-orange-100 text-orange-800' },
    { id: 'rejection_response' as const, name: 'Rejection Responses', icon: '💪', color: 'bg-gray-100 text-gray-800' }
  ];

  const templates = EmailTemplateService.getTemplatesByCategory(selectedCategory);

  const handleGenerateEmail = () => {
    if (!selectedTemplate) return;

    const validation = EmailTemplateService.validateContext(selectedTemplate.id, emailContext);
    if (!validation.isValid) {
      alert(`Please fill in the following fields: ${validation.missingVariables.join(', ')}`);
      return;
    }

    const email = EmailTemplateService.generateEmail(selectedTemplate.id, emailContext);
    if (email) {
      setGeneratedEmail(email);
      setShowPreview(true);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const handleContextChange = (field: keyof EmailContext, value: string) => {
    setEmailContext(prev => ({ ...prev, [field]: value }));
  };

  const getTemplatePreview = (template: EmailTemplate) => {
    return EmailTemplateService.getTemplatePreview(template.id);
  };

  return (
    <ErrorBoundary>
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Email Templates ✉️
              </h1>
              <p className="text-gray-600 text-lg">
                Professional email templates to help you communicate effectively throughout your job search
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Categories and Templates */}
              <div className="lg:col-span-1 space-y-6">
                {/* Category Selection */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Template Categories</h2>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedTemplate(null);
                          setGeneratedEmail(null);
                          setShowPreview(false);
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-indigo-50 border-2 border-indigo-200'
                            : 'hover:bg-gray-50 border-2 border-transparent'
                        }`}
                      >
                        <span className="text-xl">{category.icon}</span>
                        <span className="font-medium text-gray-900">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Template List */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {categories.find(c => c.id === selectedCategory)?.name} Templates
                  </h2>
                  <div className="space-y-3">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          selectedTemplate?.id === template.id
                            ? 'border-indigo-200 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <h3 className="font-medium text-gray-900 mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                {selectedCategory && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h3 className="font-semibold text-yellow-900 mb-3">💡 Tips for {categories.find(c => c.id === selectedCategory)?.name}</h3>
                    <ul className="space-y-2">
                      {EmailTemplateService.getEmailTips(selectedCategory).map((tip, index) => (
                        <li key={index} className="text-sm text-yellow-800 flex items-start gap-2">
                          <span className="text-yellow-600 mt-1">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column - Template Editor and Preview */}
              <div className="lg:col-span-2">
                {selectedTemplate ? (
                  <div className="space-y-6">
                    {/* Template Info */}
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">{selectedTemplate.name}</h2>
                          <p className="text-gray-600 mt-1">{selectedTemplate.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          categories.find(c => c.id === selectedTemplate.category)?.color
                        }`}>
                          {categories.find(c => c.id === selectedTemplate.category)?.name}
                        </span>
                      </div>

                      {/* Context Form */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            value={emailContext.candidateName}
                            onChange={(e) => handleContextChange('candidateName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={emailContext.companyName}
                            onChange={(e) => handleContextChange('companyName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Target company"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Position Title
                          </label>
                          <input
                            type="text"
                            value={emailContext.positionTitle}
                            onChange={(e) => handleContextChange('positionTitle', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Job title"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hiring Manager Name
                          </label>
                          <input
                            type="text"
                            value={emailContext.hiringManagerName}
                            onChange={(e) => handleContextChange('hiringManagerName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Optional"
                          />
                        </div>

                        {selectedTemplate.variables.includes('interviewDate') && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Interview Date
                            </label>
                            <input
                              type="text"
                              value={emailContext.interviewDate}
                              onChange={(e) => handleContextChange('interviewDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="e.g., Friday, March 15th"
                            />
                          </div>
                        )}

                        {selectedTemplate.variables.includes('applicationDate') && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Application Date
                            </label>
                            <input
                              type="text"
                              value={emailContext.applicationDate}
                              onChange={(e) => handleContextChange('applicationDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="e.g., March 1st, 2024"
                            />
                          </div>
                        )}

                        {selectedTemplate.variables.includes('referrerName') && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Referrer Name
                            </label>
                            <input
                              type="text"
                              value={emailContext.referrerName}
                              onChange={(e) => handleContextChange('referrerName', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="Person who referred you"
                            />
                          </div>
                        )}
                      </div>

                      {selectedTemplate.variables.includes('customMessage') && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Custom Message
                          </label>
                          <textarea
                            value={emailContext.customMessage}
                            onChange={(e) => handleContextChange('customMessage', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Add your personal touch to the email"
                          />
                        </div>
                      )}

                      <div className="mt-6 flex gap-3">
                        <button
                          onClick={handleGenerateEmail}
                          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Generate Email
                        </button>
                        <button
                          onClick={() => {
                            const preview = getTemplatePreview(selectedTemplate);
                            if (preview) {
                              setGeneratedEmail(preview);
                              setShowPreview(true);
                            }
                          }}
                          className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Show Example
                        </button>
                      </div>
                    </div>

                    {/* Generated Email Preview */}
                    {showPreview && generatedEmail && (
                      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">Generated Email</h3>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleCopyToClipboard(generatedEmail.subject)}
                              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                            >
                              Copy Subject
                            </button>
                            <button
                              onClick={() => handleCopyToClipboard(generatedEmail.body)}
                              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                            >
                              Copy Body
                            </button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject:</label>
                            <div className="p-3 bg-gray-50 rounded-lg font-medium text-gray-900">
                              {generatedEmail.subject}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Body:</label>
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <pre className="whitespace-pre-wrap text-gray-900 font-sans text-sm leading-relaxed">
                                {generatedEmail.body}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
                    <div className="text-6xl mb-4">📧</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Select a Template to Get Started
                    </h3>
                    <p className="text-gray-600">
                      Choose a template from the left sidebar to begin customizing your email
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </ErrorBoundary>
  );
}