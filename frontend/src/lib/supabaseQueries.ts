// src/lib/supabaseQueries.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getSurveys({
  filterType = "all",
  sortBy = "created_at",
  order = "desc",
  search = "",
  limit
}: {
  filterType?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  search?: string;
  limit?: number;
}) {
  let query = supabase
    .from("survey_articles")
    .select("title, slug, infographic_link, survey_type, created_at")
    .order(sortBy, { ascending: order === "asc" });

  if (filterType !== "all") {
    query = query.eq("survey_type", filterType);
  }

  if (search && search.trim() !== "") {
    query = query.ilike("title", `%${search}%`);
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) {
    console.error(error);
    return [];
  }
  return data || [];
}
export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from("survey_articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

