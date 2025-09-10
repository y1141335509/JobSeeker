'use client';

import React from 'react';
import { ErrorBoundary } from '../lib/components/ui/ErrorBoundary';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeatureGrid from '../components/FeatureGrid';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen" data-testid="home-page">
        <Header />
        <HeroSection />
        <FeatureGrid />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}