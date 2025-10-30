// admins/src/app/api/survey_logs/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 10;
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("survey_articles")
    .select("*", { count: "exact" })
    .order("updated_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json(
      { status: "ERROR", message: error.message },
      { status: 500 }
    );
  }

  // Transform data agar sesuai struktur frontend LogsTable
  const transformed = data.map((item) => ({
    id: item.id,
    title: item.title,
    username: item.updated_by || item.created_by || "-",
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  const totalPages = count ? Math.ceil(count / limit) : 1;

  return NextResponse.json({
    status: "OK",
    data: transformed,
    totalPages,
    currentPage: page,
  });
}
