import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET log by id
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from("survey_logs")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

// PUT update log
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const updates = await req.json();

  const { data, error } = await supabase
    .from("survey_logs")
    .update(updates)
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// DELETE log
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { error } = await supabase
    .from("survey_logs")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
