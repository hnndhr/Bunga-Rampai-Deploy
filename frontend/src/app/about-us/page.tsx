// frontend/src/app/about-us/page.tsx
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutUsPage from "@/components/sections/AboutUsPage";
import VisionMissionSection from "@/components/sections/VisiMisiSection";
import Members from "@/components/sections/members/Members";
export default function HomePage() {
  return (
    <main className="bg-slate-900 min-h-screen">
      <Navbar />
      <AboutUsPage />
      <VisionMissionSection />
      <Members />
      <Footer />
    </main>
  );
}