//  admins/src/components/CreateAdminModal.tsx
"use client";

import React, { useState } from "react";
import { Toast } from "@/components/ui/Toast";

interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateAdminModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateAdminModalProps) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !username || !password) {
      setToast({ message: "Semua field wajib diisi", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          password,
          role: "admin",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setToast({
          message: err.message || "Gagal membuat admin",
          type: "error",
        });
      } else {
        setToast({ message: "Admin berhasil dibuat", type: "success" });
        onSuccess();
        onClose();
        setName("");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      setToast({ message: "Terjadi kesalahan koneksi", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Create Admin</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
              >
                {loading ? "Loading..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
