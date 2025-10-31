"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, Users, FileText, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SidebarNavigationProps {
  onNavigate: (view: "Logs" | "admin" | "survey" | "profile") => void;
  currentView: "Logs" | "admin" | "survey" | "profile";
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  onNavigate,
  currentView,
}) => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Ambil user aktif dari /api/me
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUserRole(data.user.role);

        // 🔹 Fetch data lain (harus juga include cookie)
        if (data.user.role === "master") {
          const [adminsRes, surveyRes] = await Promise.all([
            fetch("/api/admins", { credentials: "include" }),
            fetch("/api/articles", { credentials: "include" }),
          ]);

          const admins = await adminsRes.json();
          const articles = await surveyRes.json();

          console.log("✅ Admins:", admins);
          console.log("✅ Articles:", articles);
        }
      } catch (err) {
        console.error("❌ Auth error:", err);
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/admin");
  };

  const navItem = (
    view: "Logs" | "admin" | "survey" | "profile",
    Icon: React.ElementType
  ) => (
    <div
      onClick={() => onNavigate(view)}
      className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer group transition-all backdrop-blur-md border
        ${
          currentView === view
            ? "bg-white/40 border-white/70 shadow-xl"
            : "bg-white/10 border-white/20 hover:bg-white/30"
        }`}
    >
      <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
    </div>
  );

  if (loading) {
    return (
      <div className="w-20 flex items-center justify-center text-white opacity-70">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-20 flex flex-col items-center py-8 justify-between">
      {/* Logo */}
      <div className="w-24 h-24 flex items-center justify-center cursor-pointer">
        <Image
          src="/images/rnd_logo.png"
          alt="rnd logo"
          width={50}
          height={50}
        />
      </div>

      {/* Navigasi */}
      <div className="bg-white/10 backdrop-blur-md rounded-full border border-white/30 shadow-lg p-2 flex flex-col space-y-4">
        {navItem("Logs", BarChart3)}

        {/* hanya tampil untuk role master */}
        {userRole === "master" && navItem("admin", Users)}

        {navItem("survey", FileText)}
        {navItem("profile", User)}
      </div>

      {/* Tombol Logout */}
      <div
        onClick={handleLogout}
        className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg hover:bg-red-500/50 transition-all cursor-pointer group"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </div>
    </div>
  );
};

export default SidebarNavigation;
