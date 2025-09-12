'use client';

import React, { useState, useEffect } from 'react';
import { LinkedInService } from '../../services/linkedin';
import { useAuthStore } from '../../store/auth';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import type { LinkedInProfile } from '../../services/linkedin';

interface LinkedInConnectProps {
  onProfileImported?: (profile: any) => void;
  className?: string;
}

export const LinkedInConnect: React.FC<LinkedInConnectProps> = ({ 
  onProfileImported, 
  className = '' 
}) => {
  const { updateProfile } = useAuthStore();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [linkedinProfile, setLinkedinProfile] = useState<LinkedInProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if LinkedIn is already connected
    const connected = LinkedInService.isConnected();
    setIsConnected(connected);
    
    if (connected) {
      const profile = LinkedInService.getStoredProfile();
      setLinkedinProfile(profile);
    }
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const result = await LinkedInService.connectAccount();
      
      if (result.success && result.profile) {
        setIsConnected(true);
        setLinkedinProfile(result.profile);
        LinkedInService.storeProfile(result.profile);
        
        // Convert LinkedIn profile to our format and update user profile
        const userUpdates = LinkedInService.convertToUserProfile(result.profile);
        updateProfile(userUpdates);
        
        if (onProfileImported) {
          onProfileImported(userUpdates);
        }
      } else {
        setError(result.error || 'Failed to connect LinkedIn account');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    LinkedInService.disconnectAccount();
    setIsConnected(false);
    setLinkedinProfile(null);
    setShowDetails(false);
  };

  const handleSync = async () => {
    if (!linkedinProfile) return;
    
    try {
      await LinkedInService.syncWithProfile(updateProfile);
      alert('Profile synced successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sync profile');
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">LinkedIn Integration</h3>
            <p className="text-sm text-gray-600">
              {isConnected ? 'Connected and synced' : 'Import your professional profile'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isConnected ? (
            <div className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium">Connected</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-400">
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
              <span className="text-sm">Not connected</span>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {!isConnected ? (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Benefits of connecting LinkedIn:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Auto-import your work experience and education</li>
              <li>• Sync your professional skills and endorsements</li>
              <li>• Keep your profile up-to-date automatically</li>
              <li>• Better job matching based on your background</li>
            </ul>
          </div>
          
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
              <>
                <LoadingSpinner size="sm" />
                Connecting to LinkedIn...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect with LinkedIn
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {linkedinProfile && (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {linkedinProfile.profilePicture && (
                    <img 
                      src={linkedinProfile.profilePicture} 
                      alt="LinkedIn Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {linkedinProfile.firstName} {linkedinProfile.lastName}
                    </h4>
                    <p className="text-sm text-gray-600">{linkedinProfile.headline}</p>
                    <p className="text-xs text-gray-500">{linkedinProfile.location.name}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
              </div>

              {showDetails && (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Current Position</h5>
                    {linkedinProfile.positions.filter(pos => pos.isCurrent).map(pos => (
                      <div key={pos.id} className="text-sm text-gray-700">
                        <p className="font-medium">{pos.title}</p>
                        <p>{pos.companyName}</p>
                        {pos.description && (
                          <p className="text-gray-600 mt-1">{pos.description}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Top Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {linkedinProfile.skills.slice(0, 6).map(skill => (
                        <span 
                          key={skill.name}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {skill.name} ({skill.endorsementCount})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleSync}
              className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors"
            >
              Sync Profile
            </button>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};