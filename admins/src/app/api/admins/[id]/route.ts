import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcrypt";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from("admins")
    .select("id, name, username, role")
    .eq("id", params.id)
    .single();

  if (error)
    return NextResponse.json({ status: "ERROR", error: error.message }, { status: 404 });

  return NextResponse.json({ status: "SUCCESS", data });
}

// ✅ Tambahkan PATCH handler
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username && !password) {
      return NextResponse.json(
        { status: "ERROR", error: "No update fields provided." },
        { status: 400 }
      );
    }

    const updates: Record<string, any> = {};
    if (username) updates.username = username;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updates.password = hashed;
    }

    const { data, error } = await supabase
      .from("admins")
      .update(updates)
      .eq("id", params.id)
      .select("id, name, username, role");

    if (error)
      return NextResponse.json({ status: "ERROR", error: error.message }, { status: 500 });

    return NextResponse.json({ status: "SUCCESS", data });
  } catch (err: any) {
    console.error("Error updating admin:", err);
    return NextResponse.json(
      { status: "ERROR", error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { error } = await supabase.from("admins").delete().eq("id", params.id);

  if (error)
    return NextResponse.json({ status: "ERROR", error: error.message }, { status: 500 });

  return NextResponse.json({ status: "SUCCESS", message: "Deleted successfully" });
}
