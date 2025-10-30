import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // penting: pakai SERVICE_ROLE agar bisa baca kolom hashed password
);

const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // 🔹 Validasi input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username dan password wajib diisi" },
        { status: 400 }
      );
    }

    // 🔹 Ambil data admin dari Supabase
    const { data: adminData, error } = await supabase
      .from("admins")
      .select("id, username, password, role")
      .eq("username", username)
      .maybeSingle();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Gagal menghubungi database");
    }

    if (!adminData) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 401 }
      );
    }

    // 🔹 Bandingkan password plaintext vs hashed password dari DB
    const match = await bcrypt.compare(password, adminData.password);

    if (!match) {
      return NextResponse.json(
        { success: false, message: "Password salah" },
        { status: 401 }
      );
    }

    // 🔹 Generate JWT
    const token = jwt.sign(
      {
        id: adminData.id,
        username: adminData.username,
        role: adminData.role,
      },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    // 🔹 Simpan cookie
    const res = NextResponse.json({
      success: true,
      message: "Login berhasil",
      token,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Login route active" });
}
