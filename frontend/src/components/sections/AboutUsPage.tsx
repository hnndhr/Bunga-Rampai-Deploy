"use client";
import { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";

//About Us - Landing Page

export default function AboutUsPage() {
  const images = [
    "https://ik.imagekit.io/hnndhr/Members/1.jpg?updatedAt=1761742340433",
    "https://ik.imagekit.io/hnndhr/Members/16.jpg?updatedAt=1761742339285",
    "https://ik.imagekit.io/hnndhr/Members/13.jpg?updatedAt=1761742340202",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Ganti background setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <main>
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background slideshow */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}

        {/* Overlay hitam */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Gradasi bawah */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0D1117] to-transparent"></div>

        {/* Navbar */}
        <Navbar />

        {/* Konten teks */}
        <div className="absolute bottom-16 left-20 px-2 max-w-2xl text-start z-10">
          <h1 className="text-5xl font-bold text-white uppercase tracking-wider">
            Kementerian Riset dan Data
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Kementerian Riset dan Data bertugas mengelola database BEM UNS melalui riset dan survei,
            serta menyajikan informasi akurat untuk mendukung isu strategis. Kementerian ini menjadi
            pusat edukasi dan publikasi data bagi mahasiswa UNS.
          </p>
        </div>
      </header>
    </main>
  );
}
