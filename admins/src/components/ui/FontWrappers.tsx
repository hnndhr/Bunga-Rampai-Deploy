// src/components/ui/FontWrappers.jsx
import { Cormorant, Montserrat } from "next/font/google";
import type { ReactNode } from "react";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
export const CormorantText = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={`${cormorant.className} block ${className ?? ""}`}>{children}</span>
);

export const MontserratText = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={`${montserrat.className} block ${className ?? ""}`}>{children}</span>
);

