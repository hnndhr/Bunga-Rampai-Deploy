"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const AnimatedTitle = ({ isScrolled }: { isScrolled: boolean }) => {
  const text = "BUNGA RAMPAI";
  const containerVariants = {
    visible: { transition: { staggerChildren: 0.04 } },
    hidden: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
  };
  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 12, stiffness: 200 },
    },
    hidden: {
      opacity: 0,
      y: 40,
      transition: { type: "spring" as const, damping: 12, stiffness: 200 },
    },
  };

  return (
    <motion.div
      className="text-white text-3xl font-abhaya leading-140 tracking-10 inline-flex overflow-hidden ml-3 pointer-events-none md:pointer-events-auto whitespace-nowrap"
      variants={containerVariants}
      initial="visible"
      animate={isScrolled ? "hidden" : "visible"}
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={childVariants} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scaleFactor, setScaleFactor] = useState(1);
  const pathname = usePathname();

  // 🔹 Adjust scale dynamically for very small screens
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 340) setScaleFactor(0.85);
      else if (width < 380) setScaleFactor(0.9);
      else setScaleFactor(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 10);
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowMobileNav(false);
        setIsMenuOpen(false);
      } else {
        setShowMobileNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Catalogue", href: "/catalogue" },
    { name: "About Us", href: "/about-us" },
  ];

  return (
    <>
      {/* 🌸 Desktop Navbar */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <motion.div
          layout
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={clsx(
            "container mx-auto flex flex-col items-center transition-all duration-700 ease-in-out overflow-hidden",
            isScrolled
              ? "bg-black/15 backdrop-blur-2xl border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-8 py-3 mt-3 rounded-full max-w-screen-sm"
              : "px-6 py-4"
          )}
        >
          <div className="flex items-center justify-between w-full -space-x-16">
            {/* Logo & Title */}
            <div className="flex items-center">
              <Link href="/">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center -translate-y-1">
                  <img src="/images/rnd_logo.png" alt="rnd logo" className="w-10 h-10" />
                </div>
              </Link>
              <Link href="/" className={isScrolled ? "pointer-events-none" : ""}>
                <AnimatedTitle isScrolled={isScrolled} />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="flex items-center space-x-8 font-abhaya text-xl leading-140 tracking-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "transition-colors duration-300",
                    pathname === item.href
                      ? "text-white"
                      : "text-gray-500 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </nav>

      {/* 📱 Mobile Navbar */}
      <AnimatePresence>
        {showMobileNav && (
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={clsx(
              "md:hidden fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
              isScrolled
                ? "bg-black/10 backdrop-blur-md rounded-b-3xl shadow-md"
                : "bg-transparent"
            )}
          >
            <div className="px-6 py-4">
              <div className="flex items-center justify-between w-full">
                {/* Logo & Title */}
                <div
                  className="flex items-center"
                  style={{ transform: `scale(${scaleFactor})` }}
                >
                  <Link href="/">
                    <div className="w-10 h-10 flex items-center justify-center -translate-y-1">
                      <img src="/images/rnd_logo.png" alt="rnd logo" className="w-10 h-10" />
                    </div>
                  </Link>
                  <Link href="/">
                    <div className="text-white text-[6vw] sm:text-3xl md:text-4xl font-abhaya leading-140 tracking-10 ml-3 whitespace-nowrap">
                      BUNGA RAMPAI
                    </div>
                  </Link>
                </div>

                {/* Hamburger Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full mt-4 space-y-4 overflow-hidden"
                  >
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={clsx(
                          "block font-abhaya text-xl leading-140 tracking-10 transition-colors duration-300",
                          pathname === item.href
                            ? "text-white font-semibold"
                            : "text-gray-400 hover:text-white"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
