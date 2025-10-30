import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET all survey articles with pagination
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "7", 10);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("survey_articles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    total: count,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  });
}

// POST new survey article
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { blocks, ...newArticle } = body; // 👈 ini WAJIB

    // 1️⃣ Insert article (tanpa blocks)
    const { data: insertedArticle, error: articleError } = await supabase
      .from("survey_articles")
      .insert([newArticle]) // ✅ hanya kolom yang sesuai schema
      .select()
      .single();

    if (articleError) throw articleError;

    // 2️⃣ Insert blocks
    if (Array.isArray(blocks) && blocks.length > 0) {
      const preparedBlocks = blocks.map((b: any, i: number) => ({
        slug_survey: insertedArticle.slug,
        ordering: b.ordering ?? i + 1,
        block_type: b.block_type,
        content:
          typeof b.content === "object" ? JSON.stringify(b.content) : b.content,
      }));

      const { error: blockError } = await supabase
        .from("survey_article_blocks")
        .insert(preparedBlocks);

      if (blockError) throw blockError;
    }

    return NextResponse.json(
      { ...insertedArticle, blocks: blocks ?? [] },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("❌ POST Article Error:", err.message);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}
