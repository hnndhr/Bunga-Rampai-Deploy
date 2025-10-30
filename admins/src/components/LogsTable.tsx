// admins/src/components/LogsTable.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import AdminPagination from "./Pagination";
import { MontserratText } from "@/components/ui/FontWrappers";
import { ArrowUp, ArrowDown } from "lucide-react";

interface SurveyData {
  id: string;
  title: string;
  username: string | null;
  created_at: string;
  updated_at: string | null;
}

function getActionLabel(item: SurveyData) {
  const isEdited = item.updated_at && item.updated_at !== item.created_at;
  const label = isEdited ? "Edited" : "Created";
  const colorClass = isEdited ? "text-yellow-400" : "text-green-400";
  return <span className={colorClass}>{label}</span>;
}

const LogsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // Tambahan: state untuk sorting
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SurveyData;
    direction: "asc" | "desc";
  } | null>({
    key: "updated_at",
    direction: "desc", // default: terbaru ke terlama
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/survey_logs?page=${currentPage}`,
          { method: "GET" }
        );
        const res = await response.json();

        if (res?.status === "OK" && Array.isArray(res.data)) {
          setSurveyData(res.data);
          setTotalPages(res.totalPages ?? 1);
        } else {
          setSurveyData([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setSurveyData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // Fungsi sorting client-side
  const sortedData = useMemo(() => {
    if (!sortConfig) return surveyData;

    return [...surveyData].sort((a, b) => {
      const key = sortConfig.key;

      // handle tanggal
      if (key === "created_at" || key === "updated_at") {
        const dateA = new Date(a.updated_at || a.created_at).getTime();
        const dateB = new Date(b.updated_at || b.created_at).getTime();
        return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
      }

      // handle string biasa
      const valA = (a[key] ?? "").toString().toLowerCase();
      const valB = (b[key] ?? "").toString().toLowerCase();
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [surveyData, sortConfig]);

  const handleSort = (key: keyof SurveyData) => {
    setSortConfig((prev) => {
      if (prev && prev.key === key) {
        // toggle arah sort
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const renderSortArrow = (key: keyof SurveyData) => {
    if (sortConfig?.key !== key)
      return (
        <div className="flex flex-col ml-1">
          <ArrowUp size={10} className="text-white/40" />
          <ArrowDown size={10} className="text-white/40" />
        </div>
      );

    return (
      <div className="flex flex-col ml-1">
        <ArrowUp
          size={10}
          className={`${
            sortConfig.direction === "asc" ? "text-white" : "text-white/40"
          }`}
        />
        <ArrowDown
          size={10}
          className={`${
            sortConfig.direction === "desc" ? "text-white" : "text-white/40"
          }`}
        />
      </div>
    );
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 flex flex-col">
      {/* Header Section */}
      <div className="flex justify-center items-center mb-8">
        <MontserratText className="text-2xl md:text-3xl font-bold text-white tracking-wider">
          SURVEY LOGS
        </MontserratText>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[0.5fr_1fr_0.5fr_0.5fr] gap-4 pb-4 border-b border-white/20 text-white/90 font-medium text-[13px] text-center">
        <div
          className="flex justify-center items-center cursor-pointer select-none"
          onClick={() => handleSort("updated_at")}
        >
          Date {renderSortArrow("updated_at")}
        </div>

        <div
          className="flex justify-center items-center cursor-pointer select-none"
          onClick={() => handleSort("title")}
        >
          Survey Title {renderSortArrow("title")}
        </div>

        <div
          className="flex justify-center items-center cursor-pointer select-none"
          onClick={() => handleSort("username")}
        >
          Username {renderSortArrow("username")}
        </div>

        <div>Action</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-auto">
        {sortedData.length === 0 ? (
          <div className="text-white/60 text-center py-8">
            No data available
          </div>
        ) : (
          sortedData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[0.5fr_1fr_0.5fr_0.5fr] gap-4 py-4 border-b border-white/10 text-white/80 hover:bg-white/5 transition-all text-sm"
            >
              {/* Date */}
              <div className="text-center">
                {new Date(
                  item.updated_at || item.created_at
                ).toLocaleDateString()}
              </div>

              {/* Title */}
              <div className="truncate overflow-hidden whitespace-nowrap text-ellipsis">
                {item.title}
              </div>

              {/* Username */}
              <div className="truncate overflow-hidden whitespace-nowrap text-ellipsis text-center">
                {item.username ?? "-"}
              </div>

              {/* Action */}
              <div className="text-center">{getActionLabel(item)}</div>
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

export default LogsTable;
