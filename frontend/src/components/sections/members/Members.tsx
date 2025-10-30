"use client";
import { useState } from "react";
import MembersPHT from "./Members-PHT";
import Pagination from "@/components/layout/Pagination";
import MembersMedia from "./MembersMedia";
import MembersKanal from "./MembersKanal";
import MembersRiset from "./MembersRiset";

export default function Members() {
  const [page, setPage] = useState(1);

  const sections = [
    <MembersPHT key="pht" />,
    <MembersRiset key="Riset" />,
    <MembersMedia key="Media" />,
    <MembersKanal key="Kanal" />,
  ];

  return (
    <section
      id="Members"
      className="relative bg-gray-900 py-20 min-h-screen transition-all duration-700 lazyload"
    >
      {sections[page - 1]}

      {/* Pagination */}
      <Pagination
        totalPages={sections.length}
        currentPage={page}
        onPageChange={setPage}
      />
    </section>
  );
}
