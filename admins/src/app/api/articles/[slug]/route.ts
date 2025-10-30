import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET by slug
export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const { data, error } = await supabase
    .from("survey_articles")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

// PUT (update)
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const updates = await req.json();

  const { data, error } = await supabase
    .from("survey_articles")
    .update(updates)
    .eq("slug", params.slug)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// DELETE
export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  const { error } = await supabase
    .from("survey_articles")
    .delete()
    .eq("slug", params.slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
