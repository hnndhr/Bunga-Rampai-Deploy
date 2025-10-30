import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CataloguePage from '@/components/sections/CataloguePage';

export default function HomePage() {
  return (
    <main className="bg-slate-900 min-h-screen">
      <Navbar />
      <CataloguePage />
      <Footer />
    </main>
  );
}