"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CatalogueSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900"></div>

      <div className="container mx-auto px-8 md:px-16 lg:px-32 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
          {/* BAGIAN KIRI: Gambar */}
          <div className="lg:w-1/2 w-full">
            <div className="w-full h-[220px] md:h-[320px] lg:h-[460px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://ik.imagekit.io/hnndhr/Members/1.jpg?updatedAt=1761742340433"
                alt="Member Kementerian Riset dan Data"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* BAGIAN KANAN: Teks */}
          <div className="lg:w-1/2 space-y-6 text-justify lg:text-justify">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              KEMENTERIAN <br /> RISET DAN DATA
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              Kementerian Riset dan Data merupakan kementerian yang mengelola dan
              mengembangkan database BEM UNS melalui riset dan survei yang dilakukan
              secara mandiri maupun kolaboratif. Selain mendukung kebutuhan data internal
              organisasi, kementerian ini juga bertanggung jawab dalam memberikan
              informasi yang relevan untuk pengawalan isu strategis dan insidental.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              Di era digital, kementerian ini berperan sebagai pusat edukasi dan publikasi
              data, menyajikan informasi yang akurat dan bermanfaat bagi mahasiswa UNS.
              Dengan pendekatan yang responsif dan inovatif, kementerian ini berkomitmen
              untuk mengoptimalkan pengelolaan data sebagai landasan strategis dalam
              berbagai aktivitas organisasi.
            </p>

            {/* Tombol Glassy */}
            <div className="pt-0 flex justify-end">
              <Link href="/about-us">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
                  className="
                    relative px-8 py-2.5 text-white font-semibold rounded-3xl
                    bg-[rgba(255,255,255,0.08)]
                    border border-[rgba(255,255,255,0.08)]
                    shadow-[0_4px_30px_rgba(0,0,0,0.2)]
                    backdrop-blur-[12px]
                    overflow-hidden
                    transition-all duration-500 ease-\[cubic-bezier(0.4,0,0.2,1)\]
                    hover:bg-[rgba(255,255,255,0.10)]
                    hover:shadow-[0_6px_40px_rgba(255,255,255,0.15)]
                  "
                >
                  {/* Lapisan refleksi glossy */}
                  <span
                    className="
                      absolute inset-0 rounded-3xl
                      bg-gradient-to-b from-[rgba(255,255,255,0.5)] to-transparent
                      opacity-30 translate-y-[-70%] blur-[2px]
                    "
                  />
                  <span className="relative z-10">Who are we?</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
