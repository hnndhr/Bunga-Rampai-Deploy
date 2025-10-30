"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import AdminPagination from "./Pagination";
import { MontserratText } from "@/components/ui/FontWrappers";
import CreateAdminModal from "./CreateAdminModal";
import { ArrowUp, ArrowDown, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // 🆕 Animasi notifikasi

interface AdminData {
  id: string;
  name: string;
  username: string;
  password: string;
  role: "master" | "admin";
}

interface Notification {
  message: string;
  type: "success" | "error";
}

const PAGE_LIMIT = 7;

const AdminTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [adminData, setAdminData] = useState<AdminData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 🆕 Notification system
  const [notification, setNotification] = useState<Notification | null>(null);
  const showNotification = useCallback(
    (message: string, type: "success" | "error") => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
    },
    []
  );

  // Sorting
  const [sortColumn, setSortColumn] = useState<keyof AdminData>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Delete confirmation state
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    target?: string;
  }>({
    open: false,
  });

  const fetchData = async (page = currentPage) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admins?page=${page}&limit=${PAGE_LIMIT}`
      );
      const res = await response.json();

      console.log("Fetched admins:", res); // 🔍 debug

      // Karena respon langsung array
      if (Array.isArray(res)) {
        setAdminData(res);
        setTotalPages(1); // atau nanti ubah kalau backend support pagination
      } else if (Array.isArray(res.data)) {
        setAdminData(res.data);
        setTotalPages(res.meta?.totalPages ?? 1);
      } else {
        console.warn("Unexpected response format:", res);
        setAdminData([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setAdminData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSort = (column: keyof AdminData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    const sorted = [...adminData];
    sorted.sort((a, b) => {
      const valA = (a[sortColumn] ?? "").toString().toLowerCase();
      const valB = (b[sortColumn] ?? "").toString().toLowerCase();
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [adminData, sortColumn, sortDirection]);

  // Request delete confirmation
  const requestDelete = (id: string) => {
    setConfirmDelete({ open: true, target: id });
  };

  // Delete confirmed
  const confirmDeleteAction = async () => {
    if (!confirmDelete.target) return;
    try {
      const res = await fetch(
        `/api/admins/${encodeURIComponent(confirmDelete.target)}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        const txt = await res.text().catch(() => "Delete failed");
        throw new Error(txt);
      }

      await fetchData(currentPage);
      setConfirmDelete({ open: false, target: undefined });
      // 🆕 Tampilkan notifikasi sukses
      showNotification("Admin berhasil dihapus!", "success");
    } catch (error) {
      console.error(error);
      showNotification("Admin gagal dihapus.", "error");
    }
  };

  // 🆕 Komponen notifikasi custom (framer-motion)
  const CustomNotification = () => (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`fixed top-0 left-0 right-0 z-50 p-4 shadow-lg backdrop-blur-md ${
            notification.type === "success"
              ? "bg-green-500/90 text-white"
              : "bg-red-500/90 text-white"
          }`}
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

  if (loading) {
    return (
      <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 flex flex-col">
      <CustomNotification /> {/* 🆕 Tambahkan di sini */}
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div></div>
        <MontserratText className="text-2xl md:text-3xl font-bold text-white tracking-wider">
          ADMIN MANAGEMENT
        </MontserratText>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white font-medium hover:bg-white/30 transition-all shadow-lg"
        >
          Create Admin
        </button>
      </div>
      {/* Table Header */}
      <div className="grid grid-cols-[0.75fr_1.2fr_1.2fr_1.2fr_1.2fr] gap-4 pb-4 border-b border-white/20 text-white/90 font-medium text-[13px]">
        <div>No</div>
        {["name", "username", "role"].map((col) => (
          <div
            key={col}
            className="flex items-center gap-1 cursor-pointer select-none"
            onClick={() => handleSort(col as keyof AdminData)}
          >
            {col.charAt(0).toUpperCase() + col.slice(1)}
            <div className="flex flex-col">
              <ArrowUp
                size={10}
                className={`${
                  sortColumn === col && sortDirection === "asc"
                    ? "text-white"
                    : "text-white/40"
                }`}
              />
              <ArrowDown
                size={10}
                className={`${
                  sortColumn === col && sortDirection === "desc"
                    ? "text-white"
                    : "text-white/40"
                }`}
              />
            </div>
          </div>
        ))}
        <div>Action</div>
      </div>
      {/* Table Body */}
      <div className="flex-1 overflow-auto">
        {sortedData.length === 0 ? (
          <div className="text-white/60 text-center py-8">
            No data available
          </div>
        ) : (
          sortedData.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[0.75fr_1.2fr_1.2fr_1.2fr_1.2fr] gap-4 py-4 border-b border-white/10 text-white/80 hover:bg-white/5 transition-all text-sm"
            >
              <div>{(currentPage - 1) * PAGE_LIMIT + (index + 1)}</div>
              <div className="truncate">{item.name}</div>
              <div className="truncate">{item.username}</div>
              <div>{item.role}</div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => requestDelete(item.id)}
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
      <CreateAdminModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false);
          fetchData(1);
          showNotification("Admin berhasil dibuat!", "success"); // 🆕 Ganti toast lama
        }}
      />
      {/* Confirm Delete Modal */}
      {confirmDelete.open && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
              Konfirmasi Hapus
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Apakah kamu yakin ingin menghapus admin ini?
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

export default AdminTable;
