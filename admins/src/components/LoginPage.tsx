"use client";
import { useState } from "react"; // Impor useState
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // State untuk mengelola input, error, dan status loading
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // URL backend Anda
  const BACKEND_URL = "/api/login";

  // Fungsi untuk menangani submit formulir
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Mencegah refresh halaman
    setIsLoading(true); // Mulai loading
    setError(null); // Hapus error sebelumnya

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Jika respons TIDAK ok (misal: 400, 401, 500)
        // 'data.message' seharusnya berisi pesan error dari NestJS (cth: "Invalid username or password")
        throw new Error(data.message || "Login gagal. Silakan coba lagi.");
      }

      // Login berhasil, 'data.token' seharusnya ada
      if (data.success) {
        // token sudah otomatis diset via cookies di route handler
        window.location.href = "/";
      } else {
        throw new Error(data.message || "Login gagal.");
      }
    } catch (err: any) {
      // Tangani error (baik dari 'throw new Error' di atas atau error jaringan)
      setError(err.message);
    } finally {
      // Hentikan loading terlepas dari berhasil atau gagal
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/vision.jpg')", // Pastikan path ini benar, mungkin perlu /images
      }}
    >
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-md">
        {/* Mengganti MontserratText dengan h1 standar untuk memperbaiki error kompilasi */}
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Login
        </h1>

        {/* Gunakan onSubmit pada form, bukan onClick pada button */}
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Tampilkan pesan error jika ada */}
          {error && (
            <div className="p-3 bg-red-800/60 border border-red-500 text-red-200 rounded-lg text-center text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-200 mb-1">Username</label>
            <div className="flex items-center border-b border-gray-300/40 focus-within:border-white">
              <input
                type="text"
                value={username} // Hubungkan ke state
                onChange={(e) => setUsername(e.target.value)} // Update state
                className="bg-transparent w-full text-white placeholder-gray-400 outline-none py-2 px-2"
                placeholder="Enter your username"
                required // Tambahkan validasi dasar
                disabled={isLoading} // Nonaktifkan saat loading
              />
              <span className="text-gray-400 pr-2">
                <i className="fa-regular fa-envelope"></i>
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-200 mb-1">Password</label>
            <div className="flex items-center border-b border-gray-300/40 focus-within:border-white">
              <input
                type="password"
                value={password} // Hubungkan ke state
                onChange={(e) => setPassword(e.target.value)} // Update state
                className="bg-transparent w-full text-white placeholder-gray-400 outline-none py-2 px-2"
                placeholder="Enter your password"
                required // Tambahkan validasi dasar
                disabled={isLoading} // Nonaktifkan saat loading
              />
              <span className="text-gray-400 pr-2">
                <i className="fa-solid fa-lock"></i>
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading} // Nonaktifkan tombol saat loading
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-md disabled:bg-gray-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {/* Ubah teks tombol saat loading */}
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
