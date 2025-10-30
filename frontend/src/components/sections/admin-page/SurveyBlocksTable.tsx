"use client";

import React, { useState, useEffect } from "react";
import AdminPagination from "./Pagination";
import { MontserratText } from "@/components/ui/FontWrappers";

interface SurveyBlockData {
  id: string;
  ordering: number;
  block_type: string;
  content: string;
  slug_survey: string;
}


const SurveyBlocksTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blocksData, setBlocksData] = useState<SurveyBlockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlocks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/connect/survey-article-blocks/?page=${currentPage}`
        );
        const res = await response.json();

        if (res?.status === "OK" && Array.isArray(res.data)) {
          setBlocksData(res.data);
          setTotalPages(res.totalPages ?? 1);
        } else {
          setBlocksData([]);
        }
      } catch (err) {
        console.error("Error fetching blocks:", err);
        setBlocksData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 flex items-center justify-center">
        <div className="text-white text-lg">Loading blocks...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div></div>
        <MontserratText className="text-2xl md:text-3xl font-bold text-white tracking-wider">
          SURVEY BLOCKS
        </MontserratText>
        <button
          onClick={() =>
            (window.location.href = `/admin/create-survey-block`)
          }
          className="px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white font-medium hover:bg-white/30 transition-all shadow-lg"
        >
          Add Block
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[0.4fr_0.4fr_0.5fr_2fr] gap-4 pb-4 border-b border-white/20 text-white/90 font-medium text-[13px]">
        <div>No</div>
        <div>Ordering</div>
        <div>Type</div>
        <div>Content</div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto">
        {blocksData.length === 0 ? (
          <div className="text-white/60 text-center py-8">
            No blocks available
          </div>
        ) : (
          blocksData.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[0.42fr_0.3fr_0.4fr_2fr] gap-4 py-4 border-b border-white/10 text-white/80 hover:bg-white/5 transition-all text-sm"
            >
              <div>{(currentPage - 1) * blocksData.length + (index + 1)}</div>
              <div>{item.ordering}</div>
              <div>{item.block_type}</div>
              <div className="truncate overflow-hidden whitespace-nowrap text-ellipsis">{item.content}</div>
            </div>
          ))
        )}
      </div>

      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SurveyBlocksTable;
