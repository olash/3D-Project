import { createClient } from "@supabase/supabase-js";

// These would normally use process.env.NEXT_PUBLIC_SUPABASE_URL and KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "public-anon-key";

export const supabase = createClient(supabaseUrl, supabaseKey);

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
