import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET all survey articles
export async function GET() {
  const { data, error } = await supabase
    .from("survey_articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST new survey article
export async function POST(req: Request) {
  const newArticle = await req.json();

  const { data, error } = await supabase
    .from("survey_articles")
    .insert([newArticle])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 201 });
}
