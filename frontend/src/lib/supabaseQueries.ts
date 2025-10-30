import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 🔹 Ambil daftar survei untuk halaman utama
export async function getSurveys({
  filterType = "all",
  sortBy = "created_at",
  order = "desc",
  search = "",
  limit,
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
    console.error("Error fetching surveys:", error);
    return [];
  }
  return data || [];
}

// 🔹 Ambil artikel berdasarkan slug
export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from("survey_articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching article:", error);
    return null;
  }
  return data;
}

// 🔹 Ambil blok artikel berdasarkan slug
export async function getArticleBlocks(slug: string) {
  const { data, error } = await supabase
    .from("survey_article_blocks")
    .select("*")
    .eq("slug_survey", slug)
    .order("ordering", { ascending: true });

  if (error) {
    console.error("Error fetching article blocks:", error);
    return [];
  }

  return data || [];
}

// 🔹 Gabungkan artikel + blok untuk konsumsi di page
export async function getFullArticle(slug: string) {
  try {
    const [article, blocks] = await Promise.all([
      getArticleBySlug(slug),
      getArticleBlocks(slug),
    ]);

    if (!article) return null;

    // ✅ Parse content JSON di setiap block
    const parsedBlocks = (blocks || []).map((block) => ({
      ...block,
      content: (() => {
        try {
          return JSON.parse(block.content);
        } catch {
          return block.content; // fallback kalau bukan JSON
        }
      })(),
    }));

    return { ...article, blocks: parsedBlocks };
  } catch (err) {
    console.error("Error fetching full article:", err);
    return null;
  }
}
