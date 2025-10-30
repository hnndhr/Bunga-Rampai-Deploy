import { supabase } from "../lib/supabaseClient.js";

export async function getSurveyArticles(page = 1, limit = 5) {
  const offset = (page - 1) * limit;

  // ambil total row untuk pagination
  const { count } = await supabase
    .from("survey_articles")
    .select("*", { count: "exact", head: true });

  // ambil data
  const { data, error } = await supabase
    .from("survey_articles")
    .select("id, title, author_username, created_at")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  return { data, total: count };
}
