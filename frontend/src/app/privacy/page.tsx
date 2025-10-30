import React from "react";
import PrivacyTitle from "@/components/sections/PrivacyPolicyTitle";
import PrivacyPolicyBody from "@/components/sections/PrivacyPolicyPage";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicy() {
  return (
    <main className="bg-white min-h-screen">
      <PrivacyTitle />
      <PrivacyPolicyBody />
      <Footer />
    </main>
  );
}
