  "use client";

  import { useState, useEffect } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { useDrag } from "@use-gesture/react";
  import { useRouter } from "next/navigation";

  interface CarouselCard {
    key: string | number;
    content: React.ReactNode;
    link?: string;
  }

  interface CarrousselCustomProps {
    cards: CarouselCard[] | undefined | null;
    height?: string;
  }

  export default function CarrousselCustom({
    cards,
    height = "70vh",
  }: CarrousselCustomProps) {
    const safeCards = Array.isArray(cards) ? cards : [];
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    // Deteksi ukuran layar
    useEffect(() => {
      const checkScreen = () => setIsMobile(window.innerWidth < 768);
      checkScreen();
      window.addEventListener("resize", checkScreen);
      return () => window.removeEventListener("resize", checkScreen);
    }, []);

    // Jika jumlah kartu berubah, pastikan index valid
    useEffect(() => {
      if (safeCards.length === 0) {
        setIndex(0);
      } else {
        setIndex((i) => Math.min(i, Math.max(0, safeCards.length - 1)));
      }
    }, [safeCards.length]);

    const next = () =>
      setIndex((prev) => (safeCards.length ? (prev + 1) % safeCards.length : 0));
    const prev = () =>
      setIndex((prev) =>
        safeCards.length ? (prev - 1 + safeCards.length) % safeCards.length : 0
      );

    const bind = useDrag(
      ({ movement: [mx], last }) => {
        if (last) {
          if (mx < -50) next();
          else if (mx > 50) prev();
        }
      },
      { axis: "x" }
    );

    // jika tidak ada kartu, tampilkan placeholder ringan
    if (!safeCards.length) {
      return (
        <div
          className="w-full flex items-center justify-center text-gray-400"
          style={{ height }}
        >
          No cards to display
        </div>
      );
    }

    const half = Math.floor(safeCards.length / 2);

    return (
      <div
        {...bind()}
        className="relative mx-auto flex items-center justify-center overflow-hidden select-none"
        style={{
          width: "100%",
          height,
          perspective: "1000px",
          alignItems: "center",
          touchAction: "pan-y",
          minHeight: 320, // pastikan tidak collapse
        }}
      >
        <AnimatePresence initial={false}>
          {safeCards.map((card, i) => {
            // --- hitung diff yang simetris antara -half..+half ---
            let diff = i - index;
            if (diff > half) diff -= safeCards.length;
            if (diff < -half) diff += safeCards.length;

            // --- variabel dasar ---
            let x = 0,
              scale = 1,
              opacity = 1,
              zIndex = 1,
              blur = "0px";

            const baseOffset = isMobile ? 140 : 300;
            // baseScale hanya multiplikator, scale override lebih aman
            const distance = Math.abs(diff);
            const t = Math.min(distance / half, 1);

            x = diff * baseOffset * 1.5;
            scale = 1 - t * 0.2;
            opacity = 1 - t * 0.6;
            blur = `${t * 3}px`;
            zIndex = 10 - distance;

            return (
              <motion.div
                key={card.key}
                layout
                data-carousel-index={i}
                className="absolute cursor-grab flex items-center justify-center "
                style={{
                  transformStyle: "preserve-3d",
                  zIndex,
                  filter: `blur(${blur})`,
                  pointerEvents: i === index ? "auto" : "auto",
                }}
                animate={{
                  x,
                  scale,
                  opacity,
                  y: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 19,
                }}
                onClick={() => {
                  if (i === index) {
                    card.link && router.push(card.link);
                    return;
                  }

                  if (i === (index + 1) % safeCards.length) {
                    next();
                    return;
                  }

                  if (i === (index - 1 + safeCards.length) % safeCards.length) {
                    prev();
                    return;
                  }

                  setIndex(i);
                }}
              >
                {/* Card wrapper: gunakan ukuran eksplisit agar isi (Next/Image fill) terlihat */}
                <div
                  className={`
                    rounded-2xl overflow-hidden
                    w-[220px] sm:w-[300px] md:w-[360px] lg:w-[360px]
                    transition-transform duration-300 ease-in-out hover:scale-105
                  `}
                  // tambahkan sedikit background sementara untuk debugging
                  // style={{ background: i === index ? 'transparent' : 'transparent' }}
                >
                  {card.content}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    );
  }
