"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ToastProps {
  message: string;
  type: "success" | "error";
  duration?: number;
}

export function Toast({ message, type, duration = 3000 }: ToastProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`fixed top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-md border z-[9999] ${
            type === "success" ? "bg-white text-green-600" : "bg-white text-red-600"
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
