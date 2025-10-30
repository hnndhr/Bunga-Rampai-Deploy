"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MontserratText } from "./FontWrappers";

export default function CardMember({
  name,
  role,
  image,
  imageBack,
  desc,
}: {
  name: string;
  role: string;
  image: string;
  imageBack?: string;
  desc?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full max-w-[320px] h-[420px] cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((prev) => !prev)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 rounded-2xl shadow-xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src={image} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <MontserratText className="font-bold text-xl mb-1">{name}</MontserratText>
            <p className="text-sm text-gray-200 italic">as {role}</p>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Background image */}
          {imageBack ? (
            <>
              <img
                src={imageBack}
                alt={`${name} - back`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-slate-900/90" />
          )}

          {/* Scrollable content */}
          <div
            className="absolute inset-0 p-6 text-white overflow-y-auto scroll-smooth"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}
          >
            {/* Hide scrollbar visually but keep scroll active */}
            <style jsx>{`
              ::-webkit-scrollbar {
                width: 0px;
                background: transparent;
              }
            `}</style>

            <div className="mt-6 flex flex-col justify-start">
              <h3 className="font-bold text-2xl mb-1">{name}</h3>
              <p className="text-sm text-gray-200 italic">as {role}</p>
              <div className="w-full h-px bg-white/30 mt-3 mb-3" />
              {desc && (
                <p className="text-sm text-gray-100 leading-relaxed whitespace-pre-line">
                  {desc}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
