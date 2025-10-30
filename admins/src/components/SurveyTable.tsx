"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import AdminPagination from "./Pagination";
import { MontserratText } from "@/components/ui/FontWrappers";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowDown, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SurveyData {
  id: string;
  slug: string;
  title: string;
  header_image: string | null;
  respondents: number;
  period: string;
  method: string;
  survey_type: string;
  report_link: string | null;
  username: string | null;
  created_at: string;
  updated_at: string;
}

interface Notification {
  message: string;
  type: "success" | "error";
}

const PAGE_LIMIT = 7;

const SurveyTable: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [notification, setNotification] = useState<Notification | null>(null);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof SurveyData;
    direction: "asc" | "desc";
  }>({
    key: "updated_at",
    direction: "desc",
  });

  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    target?: string;
  }>({ open: false });

  // 🟢 Fungsi tampilkan notifikasi
  const showNotification = useCallback(
    (message: string, type: "success" | "error") => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
    },
    []
  );

  // 🟢 Ambil data survei
  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles?page=${page}&limit=${PAGE_LIMIT}`);
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Gagal memuat data");

      setSurveyData(json.data || []);
      setTotalPages(json.totalPages || 1);
    } catch (err) {
      console.error("Error fetching data:", err);
      showNotification("Gagal memuat data survei.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // 🟢 Sorting
  const handleSort = (key: keyof SurveyData) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = useMemo(() => {
    const sorted = [...surveyData];
    const { key, direction } = sortConfig;

    sorted.sort((a, b) => {
      if (key === "created_at" || key === "updated_at") {
        const dateA = new Date(a[key]).getTime();
        const dateB = new Date(b[key]).getTime();
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }

      const valA = (a[key] ?? "").toString().toLowerCase();
      const valB = (b[key] ?? "").toString().toLowerCase();
      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [surveyData, sortConfig]);

  // 🟢 Navigasi edit & create
  const handleEdit = (slug: string) => {
    router.push(`/articles/${slug}/update-article`);
  };

  const handleCreate = () => {
    router.push(`/articles/create-article`);
  };

  // 🟢 Hapus artikel
  const requestDelete = (slug: string) => {
    setConfirmDelete({ open: true, target: slug });
  };

  const confirmDeleteAction = async () => {
    if (!confirmDelete.target) return;
    try {
      const res = await fetch(
        `/api/articles/${encodeURIComponent(confirmDelete.target)}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Gagal menghapus survei");
      }

      await fetchData(currentPage);
      setConfirmDelete({ open: false, target: undefined });
      showNotification("Survei berhasil dihapus!", "success");
    } catch (error) {
      console.error(error);
      showNotification("Gagal menghapus survei.", "error");
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // 🟢 Komponen notifikasi
  const CustomNotification = () => (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`fixed top-0 left-0 right-0 z-50 p-4 shadow-lg ${
            notification.type === "success"
              ? "bg-green-500/90 text-white"
              : "bg-red-500/90 text-white"
          } backdrop-blur-md`}
        >
          <div className="max-w-xl mx-auto flex items-center justify-center space-x-3">
            {notification.type === "success" ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <XCircle className="h-6 w-6" />
            )}
            <p className="font-medium">{notification.message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // 🟢 Render
  if (loading) {
    return (
      <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 flex flex-col">
      <CustomNotification />

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div></div>
        <MontserratText className="text-2xl md:text-3xl font-bold text-white tracking-wider">
          SURVEY MANAGEMENT
        </MontserratText>
        <button
          onClick={handleCreate}
          className="px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white font-medium hover:bg-white/30 transition-all shadow-lg"
        >
          Create Survey
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[0.2fr_1fr_0.5fr_0.5fr_0.5fr] gap-4 pb-4 border-b border-white/20 text-white/90 font-medium text-[13px]">
        <div>No</div>
        <div
          className="cursor-pointer select-none flex items-center"
          onClick={() => handleSort("title")}
        >
          Title <ArrowUp size={12} className="ml-1" />
        </div>
        <div
          className="cursor-pointer select-none flex items-center"
          onClick={() => handleSort("updated_at")}
        >
          Last Modified <ArrowUp size={12} className="ml-1" />
        </div>
        <div
          className="cursor-pointer select-none flex items-center"
          onClick={() => handleSort("username")}
        >
          Username <ArrowUp size={12} className="ml-1" />
        </div>
        <div>Action</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-auto max-h-[500px]">
        {sortedData.length === 0 ? (
          <div className="text-white/60 text-center py-8">
            No data available
          </div>
        ) : (
          sortedData.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[0.2fr_1fr_0.5fr_0.5fr_0.5fr] gap-4 py-4 border-b border-white/10 text-white/80 hover:bg-white/5 transition-all text-sm"
            >
              <div>{(currentPage - 1) * PAGE_LIMIT + (index + 1)}</div>
              <div className="truncate">{item.title}</div>
              <div>
                {new Date(
                  item.updated_at || item.created_at
                ).toLocaleDateString()}
              </div>
              <div className="truncate">{item.username ?? "-"}</div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleEdit(item.slug)}
                  className="px-3 py-1.5 text-sm rounded-lg bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/30 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => requestDelete(item.slug)}
                  className="px-3 py-1.5 text-sm rounded-lg bg-red-500/20 border border-red-600/40 text-red-400 hover:bg-red-500/30 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Modal Konfirmasi Hapus */}
      {confirmDelete.open && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
              Konfirmasi Hapus
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Apakah kamu yakin ingin menghapus survei ini?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                onClick={() => setConfirmDelete({ open: false })}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                onClick={confirmDeleteAction}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyTable;
