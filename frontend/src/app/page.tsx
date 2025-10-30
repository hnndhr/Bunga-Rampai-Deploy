import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/LandingPage';
import CatalogueSection from '../components/sections/IntroSection';
import AboutSection from '../components/sections/AboutSection';
import OurSurveysSection from '@/components/sections/OurSurveysSection';

export default function HomePage() {
  return (
    <main className="bg-slate-900 min-h-screen">
      <Navbar />
      <HeroSection />
      <CatalogueSection />
      <OurSurveysSection/>
      <AboutSection/>
      <Footer />
    </main>
  );
}