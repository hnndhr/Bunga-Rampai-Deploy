import React from "react";
import Footer from "@/components/layout/Footer";
import TermsTitle from "@/components/sections/TermsConditionTitle";
import TermsBody from "@/components/sections/TermsConditionPage";

export default function TermsCondition() {
  return (
    <main className="bg-white min-h-screen">
        <TermsTitle />
        <TermsBody />
        <Footer />
    </main>
  );
}
