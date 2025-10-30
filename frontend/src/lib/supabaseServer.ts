// lib/supabaseServer.ts
import { createClient } from "@supabase/supabase-js";

// 🔹 Coba ambil dari server-side env dulu
const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

// 🔸 Tambahkan fallback biar error lebih jelas kalau env belum ketemu
if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("❌ Supabase environment variables not found in supabaseServer.ts");
}

export const supabaseServer = createClient(supabaseUrl, serviceRoleKey);
