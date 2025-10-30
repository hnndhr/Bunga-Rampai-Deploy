"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SurveyCardProps {
  image: string;
  title: string;
  altText: string;
  slug: string;
  showTitle?: boolean;
  href?: string;
}

export default function SurveyPageCard({
  image,
  title,
  altText,
  slug,
  showTitle = true,
}: SurveyCardProps) {
  return (
      <div className="relative bg-[#21262d] rounded-2xl overflow-hidden shadow-xl">
        {/* Gambar */}
        <div className="flex content-center justify-center relative aspect-[3/4] rounded-2xl overflow-hidden">
          <Image
            src={image || "/placeholder.png"}
            alt={altText}
            fill
            className="object-fill transition-transform duration-500"
          />

          {showTitle && (
            <>
              {/* Gradasi gelap bawah agar teks tetap kebaca */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Judul di bagian bawah */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left z-10">
                <h3 className="text-white font-semibold text-lg drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                  {title}
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
  );
}
