import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
console.log("KEY:", process.env.SUPABASE_ANON_KEY ? "TERBACA" : "TIDAK TERBACA");
console.log("URL:", process.env.SUPABASE_URL);

const supabase = createClient(supabaseUrl, supabaseKey);


async function testConnection() {
  const { data, error } = await supabase
    .from("survey_articles")
    .select("*")
    .limit(1);

  if (error) {
    console.log("❌ Tidak terhubung:", error.message);
  } else {
    console.log("✅ Terhubung ke Supabase!");
    console.log(data);
  }
}

testConnection();
