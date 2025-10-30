import React from "react";
import Footer from "@/components/layout/Footer";
import FAQTitle from "@/components/sections/FAQTitle";
import FAQPage from "@/components/sections/FAQPage";

export default function FAQ() {
  return (
    <main className="bg-white min-h-screen">
      <FAQTitle />
      <FAQPage />
      <Footer />
    </main>
  );
}
