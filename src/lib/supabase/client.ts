import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase credentials are missing. Please ensure .env.local is configured.");
}

export const supabase = createClient(supabaseUrl || "", supabaseKey || "");

/**
 * Stub wrapper for uploading STL meshes to Supabase Storage
 */
export async function uploadSTL(file: File, path: string) {
  const { data, error } = await supabase.storage
    .from("models")
    .upload(`${path}/${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    throw error;
  }
  return data;
}
