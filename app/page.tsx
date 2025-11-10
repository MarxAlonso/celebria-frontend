'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/uiHomePage/CTASection';
import { Footer } from '@/components/uiHomePage/Footer';
import { FeaturesSection } from '@/components/uiHomePage/FeaturesSection';
import { HeroSection } from '@/components/uiHomePage/HeroSection';
import { WorksSection } from '@/components/uiHomePage/WorksSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-invitaciones from-celebrity-purple/5 via-white to-celebrity-pink/5">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <WorksSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer -[#FFD8C2]*/}
      <Footer />
    </div>
  );
}
