// components/Pagination.tsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const AdminPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-center space-x-2">
      {/* Tombol Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      {/* Pagination utama */}
      {totalPages === 2 ? (
        <>
          {[1, 2].map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                currentPage === page
                  ? "bg-white/30 backdrop-blur-md border-white/40 text-white font-semibold"
                  : "bg-white/10 backdrop-blur-md border-white/20 text-white/70 hover:bg-white/20"
              }`}
            >
              {page}
            </button>
          ))}
        </>
      ) : (

        <>
          {[1, 2].map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                currentPage === page
                  ? "bg-white/30 backdrop-blur-md border-white/40 text-white font-semibold"
                  : "bg-white/10 backdrop-blur-md border-white/20 text-white/70 hover:bg-white/20"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Titik-titik */}
          <div className="flex items-center space-x-1 text-white/70">
            <span>...</span>
          </div>

          {/* Halaman terakhir */}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
              currentPage === totalPages
                ? "bg-white/30 backdrop-blur-md border-white/40 text-white font-semibold"
                : "bg-white/10 backdrop-blur-md border-white/20 text-white/70 hover:bg-white/20"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Tombol Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default AdminPagination;
