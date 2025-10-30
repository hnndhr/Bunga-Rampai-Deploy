import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || "1");
    const pageSize = 10;

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabaseServer
      .from("survey_articles")           // ✅ nama tabel sudah benar
      .select("*", { count: "exact" })   // ✅ count agar tahu total
      .order("id", { ascending: true })
      .range(from, to);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const totalPages = Math.ceil((count ?? 0) / pageSize);

    return NextResponse.json({
      surveys: data ?? [],
      totalPages,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
