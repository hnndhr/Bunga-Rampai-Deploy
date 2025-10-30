"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import ShinyText from "../ui/ShinyText";

export default function HeroSection() {
  const scrollToNext = () => {
    const start = window.pageYOffset;
    const target = window.innerHeight;
    const duration = 800;
    const startTime = performance.now();

    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const scroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      window.scrollTo(0, start + (target - start) * easeInOutQuad(progress));

      if (progress < 1) requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);
  };

  return (
    <section className="relative h-[100dvh] flex flex-col overflow-hidden">
      {/* === Gradient Background === */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-800 to-emerald-900"></div>
      
      {/* === Konten Utama === */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center flex flex-col flex-grow">
        {/* Tengah: Teks Utama */}
        <div className="flex-grow flex flex-col items-center justify-center px-2">
          <ShinyText
            text="Welcome to Bunga Rampai"
            disabled={false}
            speed={3}
            className="mb-4 text-base sm:text-lg md:text-2xl font-light text-balance"
          />

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight text-balance max-w-[90%] mx-auto">
            <span className="text-white block mb-1 sm:mb-2">
              EXPLORING FACTS,
            </span>
            <span className="text-yellow-400 block">BUILDING THE FUTURE</span>
          </h1>
        </div>

        {/* Bawah: Tombol Scroll */}
        <div className="pb-10 sm:pb-12">
          <div className="animate-bounce">
            <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
              Get to Know Us More
            </p>
            <button
              onClick={scrollToNext}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white flex items-center justify-center mx-auto hover:bg-white/10 active:bg-white/20 transition-colors duration-700"
              aria-label="Scroll down"
            >
              <ChevronDown className="text-white" size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
