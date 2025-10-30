"use client";

import Image from "next/image";
import React from "react";

interface Props {
  image?: string | null;
  text?: string | null;
}

export default function InfographicIntro({ image, text }: Props) {
  const showImage = Boolean(image);
  const showText = Boolean(text);
  const [open, setOpen] = React.useState(false);

  // Lock scroll saat modal terbuka
  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  return (
    <section className="max-w-full sm:max-w-3xl md:max-w-4xl mx-auto px-2 md:px-4 pt-12 md:pt-16">
      <div className="relative">
        {showImage && (
          <div className="md:float-left md:mr-6 mb-4">
            <Image
              src={image as string}
              alt="Infografis"
              width={800}
              height={842}
              className="object-contain rounded-lg shadow-md aspect-[2828/4000] md:max-w-[400px] sm:max-w-[200px] object-center cursor-zoom-in"
              onClick={() => setOpen(true)}
            />
          </div>
        )}

        <div className="leading-relaxed prose prose-xl prose-p:leading-relaxed prose-p:my-6 prose-headings:font-sans prose-headings:font-bold prose-headings:mt-0">
          {showText ? (
            <p className="whitespace-pre-line text-justify">{text}</p>
          ) : (
            <div className="space-y-3">
              <div className="w-4/5 h-5 bg-gray-300/50 animate-pulse rounded" />
              <div className="w-3/5 h-5 bg-gray-300/50 animate-pulse rounded" />
              <div className="w-2/5 h-5 bg-gray-300/50 animate-pulse rounded" />
            </div>
          )}
        </div>

        {/* clearfix */}
        <div className="clear-both" />
      </div>

      {/* ===== Modal Zoom ===== */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Image
              src={image as string}
              alt="Infografis"
              width={1200}
              height={800}
              className="rounded-lg object-contain max-h-[90vh] w-auto cursor-zoom-out"
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
}
