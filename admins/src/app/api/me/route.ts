import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie");
  const token = cookie
    ?.split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ message: "Token tidak ditemukan" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ success: true, user: decoded });
  } catch (err) {
    return NextResponse.json({ message: "Token tidak valid" }, { status: 403 });
  }
}
