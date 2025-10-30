"use client";

export default function Pagination({
  totalPages = 5,
  currentPage,
  onPageChange,
}: {
  totalPages?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const handlePageChange = (page: number) => {
    onPageChange(page);

    const section = document.getElementById("Members");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-10">
      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        const isActive = currentPage === page;
        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`
              transition-all duration-300
              ${isActive
                ? "w-40 h-5 rounded-full bg-gray-200"
                : "w-5 h-5 rounded-full border-2 border-gray-300 hover:border-gray-100"}
            `}
          />
        );
      })}
    </div>
  );
}
