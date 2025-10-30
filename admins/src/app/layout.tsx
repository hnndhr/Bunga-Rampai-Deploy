import type { Metadata } from "next";
import { Cormorant } from "next/font/google";
import "./globals.css";

const cormorant  = Cormorant ({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Bunga Rampai",
  description: "Exploring Facts, Building the Future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
