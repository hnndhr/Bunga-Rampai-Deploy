"use client";

import { useEffect, useState } from "react";
// import { useRouter } from 'next/navigation'; // Dihapus untuk memperbaiki error

// Impor dari layout dashboard baru Anda
// Pastikan path ini benar relatif terhadap file page.tsx ini
import Sidebar from "./SidebarNavigation";
import SurveyTable from "./SurveyTable";
import AdminTable from "./AdminTable";
import SurveyLogs from "./LogsTable";
import ProfilePage from "./profilePage";

// Tipe untuk view
type AdminView = "Logs" | "admin" | "survey" | "profile";

export default function AdminDashboardPage() {
  // const router = useRouter(); // Dihapus

  // State untuk view dari layout baru
  const [currentView, setCurrentView] = useState<AdminView>("Logs");

  // State loading dari penjaga otentikasi
  const [isLoading, setIsLoading] = useState(true);

  // Penjaga otentikasi
  useEffect(() => {
    setIsLoading(false);
  }, []); // Dependency array dikosongkan

  // Fungsi render konten dari layout baru
  const renderContent = () => {
    switch (currentView) {
      case "admin":
        return <AdminTable />;
      case "survey":
        return <SurveyTable />;
      case "profile":
        return <ProfilePage />;
      default:
        return <SurveyLogs />;
    }
  };

  // Selama pemeriksaan token, tampilkan layar loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Memeriksa otentikasi...</p>
        {/* Anda bisa mengganti ini dengan komponen spinner/loading yang lebih bagus */}
      </div>
    );
  }

  // Jika lolos pemeriksaan (isLoading=false), tampilkan layout dashboard lengkap
  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('../images/vision.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full px-7">
        {/* Sidebar */}
        <Sidebar onNavigate={setCurrentView} currentView={currentView} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-auto p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
