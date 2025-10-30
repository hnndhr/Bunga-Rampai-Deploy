"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivacyTitle() {
  const router = useRouter(); 

  return (
    <div className="bg-white">
      {/* ======= HERO SECTION ======= */}
      <section className="relative w-full h-[280px] md:h-[300px] lg:h-[300px] bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1630241772217-5d4926c594cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
          alt="Surveillance cameras on wall"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />

        {/* Back Button */}
        <div className="absolute top-12 left-4 md:left-8 lg:left-20 z-30">
          <button
            onClick={() => router.back()} 
            aria-label="Go back"
            className="flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
        </div>

        {/* Title Section */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 md:px-32 text-center">
          <h1 className="max-w-4xl text-xl md:text-3xl lg:text-5xl font-abhaya text-white font-medium leading-tight tracking-wide">
            Privacy and Policy
          </h1>

          <hr className="w-full md:w-full border-t-1 border-white mt-14" />
        </div>
      </section>
    </div>
  );
}
