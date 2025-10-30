import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET by slug
export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const { data: article, error: articleError } = await supabase
      .from("survey_articles")
      .select("*")
      .eq("slug", params.slug)
      .single();

    if (articleError) throw articleError;
    if (!article) throw new Error("Article not found");

    const { data: blocks, error: blocksError } = await supabase
      .from("survey_article_blocks")
      .select("*")
      .eq("slug_survey", params.slug)
      .order("ordering", { ascending: true });

    if (blocksError) throw blocksError;

    return NextResponse.json({
      ...article,
      blocks: blocks ?? [],
    });
  } catch (err: any) {
    console.error("❌ GET Article Error:", err.message);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}

// PATCH (partial update)
export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
  try {
    const updates = await req.json();
    const { blocks, slug: newSlug, ...articleUpdates } = updates;

    // 🔹 Jika slug berubah, handle dengan urutan yang benar
    if (newSlug && newSlug !== params.slug) {
      // 1. Hapus semua blocks lama dulu
      await supabase
        .from("survey_article_blocks")
        .delete()
        .eq("slug_survey", params.slug);

      // 2. Update artikel dengan slug baru
      const { data: updatedArticle, error: updateError } = await supabase
        .from("survey_articles")
        .update({ ...articleUpdates, slug: newSlug })
        .eq("slug", params.slug)
        .select()
        .single();

      if (updateError) throw updateError;
      if (!updatedArticle) throw new Error("Article not found");

      // 3. Insert blocks baru dengan slug baru
      if (Array.isArray(blocks) && blocks.length > 0) {
        const preparedBlocks = blocks.map((b: any, i: number) => ({
          slug_survey: newSlug,
          ordering: b.ordering ?? b.order_index ?? i,
          block_type: b.block_type,
          content: typeof b.content === "object" ? JSON.stringify(b.content) : b.content,
        }));

        const { error: insertError } = await supabase
          .from("survey_article_blocks")
          .insert(preparedBlocks);

        if (insertError) throw insertError;
      }

      return NextResponse.json({ success: true, data: updatedArticle });
    }

    // 🔹 Update normal tanpa perubahan slug
    let updatedArticle = null;
    if (Object.keys(articleUpdates).length > 0) {
      const { data, error: updateError } = await supabase
        .from("survey_articles")
        .update(articleUpdates)
        .eq("slug", params.slug)
        .select()
        .single();

      if (updateError) throw updateError;
      if (!data) throw new Error("Article not found");
      updatedArticle = data;
    }

    // 🔹 Update blocks (hapus lalu insert baru)
    if (Array.isArray(blocks)) {
      await supabase
        .from("survey_article_blocks")
        .delete()
        .eq("slug_survey", params.slug);

      if (blocks.length > 0) {
        const preparedBlocks = blocks.map((b: any, i: number) => ({
          slug_survey: params.slug,
          ordering: b.ordering ?? b.order_index ?? i,
          block_type: b.block_type,
          content: typeof b.content === "object" ? JSON.stringify(b.content) : b.content,
        }));

        const { error: insertError } = await supabase
          .from("survey_article_blocks")
          .insert(preparedBlocks);

        if (insertError) throw insertError;
      }
    }

    return NextResponse.json({ success: true, data: updatedArticle });
  } catch (err: any) {
    console.error("❌ PATCH Article Error:", err.message);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}

// PUT (full update)
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  return PATCH(req, { params });
}

// DELETE
export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  try {
    await supabase
      .from("survey_article_blocks")
      .delete()
      .eq("slug_survey", params.slug);

    const { error: deleteError } = await supabase
      .from("survey_articles")
      .delete()
      .eq("slug", params.slug);

    if (deleteError) throw deleteError;

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err: any) {
    console.error("❌ DELETE Article Error:", err.message);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}